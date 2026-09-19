import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

/**
 * Comma-separated list of origins permitted to call this API, e.g.
 * ALLOWED_ORIGINS="https://www.aakarmineral.com,http://localhost:5173".
 * Previously this server ran `cors()` with no options, which let any site on
 * the internet post to the contact endpoint.
 */
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');

app.use(
  cors({
    origin(origin, callback) {
      // No Origin header: same-origin request, curl, or a health probe.
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Origin not allowed'));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
  }),
);

// Cap the body size. The default is 100kb, but be explicit: a contact form has
// no reason to accept more than this.
app.use(express.json({ limit: '32kb' }));

/**
 * Minimal fixed-window rate limiter keyed by IP. The endpoint writes to a
 * spreadsheet and sends email, so leaving it unthrottled invites abuse.
 * For a multi-instance deployment, replace this with a shared store.
 */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const hits = new Map();

function rateLimit(req, res, next) {
  const key = req.ip ?? 'unknown';
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    res.set('Retry-After', String(Math.ceil((entry.resetAt - now) / 1000)));
    return res.status(429).json({
      error: 'Too many requests',
      message: 'Please wait a few minutes before sending another message.',
    });
  }

  entry.count += 1;
  return next();
}

// Drop expired buckets so the map cannot grow without bound.
const sweeper = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of hits) {
    if (now > entry.resetAt) hits.delete(key);
  }
}, RATE_LIMIT_WINDOW_MS);
sweeper.unref?.();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Trim, cap length, and strip control characters before forwarding. */
const clean = (value, maxLength) =>
  typeof value === 'string'
    ? value
        .split('')
        .filter((char) => {
          const code = char.charCodeAt(0);
          return code > 31 && code !== 127;
        })
        .join('')
        .trim()
        .slice(0, maxLength)
    : '';

app.post('/api/contact', rateLimit, async (req, res) => {
  try {
    const name = clean(req.body?.name, 120);
    const email = clean(req.body?.email, 200);
    const phone = clean(req.body?.phone, 40);
    const company = clean(req.body?.company, 160);
    const subject = clean(req.body?.subject, 200);
    const message = clean(req.body?.message, 5000);
    const inquiryType = clean(req.body?.inquiryType, 40);

    if (!name || !email || !subject || !message || !inquiryType) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please fill in all required fields.',
      });
    }

    // The original handler accepted any string as an email address.
    if (!EMAIL_PATTERN.test(email)) {
      return res.status(400).json({
        error: 'Invalid email',
        message: 'Please provide a valid email address.',
      });
    }

    if (!process.env.GOOGLE_SCRIPT_ID) {
      console.error('GOOGLE_SCRIPT_ID is not configured.');
      return res.status(500).json({
        error: 'Server not configured',
        message: 'Please contact us directly while we look into this.',
      });
    }

    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
    });

    const rowData = [
      timestamp,
      name,
      email,
      phone || 'Not provided',
      company || 'Not provided',
      inquiryType,
      subject,
      message,
      'New',
    ];

    // Don't let a hung upstream hold the request open indefinitely.
    const sheetsResponse = await fetch(
      `https://script.google.com/macros/s/${process.env.GOOGLE_SCRIPT_ID}/exec`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'addRow', data: rowData }),
        signal: AbortSignal.timeout(15000),
      },
    );

    if (!sheetsResponse.ok) {
      throw new Error(`Google Sheets responded ${sheetsResponse.status}`);
    }

    // Best-effort email notification; a failure here must not fail the request,
    // because the enquiry is already recorded in the sheet.
    if (
      process.env.EMAILJS_SERVICE_ID &&
      process.env.EMAILJS_TEMPLATE_ID &&
      process.env.EMAILJS_PUBLIC_KEY
    ) {
      try {
        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: process.env.EMAILJS_TEMPLATE_ID,
            user_id: process.env.EMAILJS_PUBLIC_KEY,
            template_params: {
              to_email: process.env.BUSINESS_EMAIL,
              from_name: name,
              from_email: email,
              phone: phone || 'Not provided',
              company: company || 'Not provided',
              inquiry_type: inquiryType,
              subject,
              message,
              timestamp,
            },
          }),
          signal: AbortSignal.timeout(10000),
        });
      } catch (emailError) {
        console.error('Email notification failed (submission saved):', emailError);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully.',
    });
  } catch (error) {
    // Log the detail, return something generic. The original handler returned
    // upstream failure text straight to the browser.
    console.error('Error processing contact form:', error);
    return res.status(502).json({
      error: 'Failed to send message',
      message: 'Please try again later, or contact us directly.',
    });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// CORS rejections arrive here as errors; answer with 403 rather than a stack.
app.use((err, _req, res, _next) => {
  if (err?.message === 'Origin not allowed') {
    return res.status(403).json({ error: 'Origin not allowed' });
  }
  console.error('Unhandled server error:', err);
  return res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Contact API server running on port ${PORT}`);
});

export default app;
