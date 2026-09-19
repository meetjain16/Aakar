// Serverless proxy that forwards contact-form submissions to Google Apps Script.
// Lives in /api so Vercel deploys it as a serverless function.

/**
 * Origins allowed to call this function, as a comma-separated env var, e.g.
 * ALLOWED_ORIGINS="https://www.aakarmineral.com,https://aakarmineral.com".
 * The previous version sent `Access-Control-Allow-Origin: *`, so any site
 * could post through this proxy.
 */
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

module.exports = async (req, res) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    // The allowed origin depends on the request, so caches must not reuse it.
    res.setHeader('Vary', 'Origin');
  } else if (origin) {
    res.status(403).json({ error: 'Origin not allowed' });
    return;
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // Previously any method fell through to the forwarding branch.
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const appScriptUrl = process.env.APPSCRIPT_URL || process.env.VITE_APPSCRIPT_URL;
  if (!appScriptUrl) {
    console.error('APPSCRIPT_URL is not configured.');
    res.status(500).json({ error: 'Server is not configured.' });
    return;
  }

  try {
    const body = req.body ?? {};
    const payload = typeof body === 'string' ? body : JSON.stringify(body);

    // Reject oversized payloads rather than paying to forward them.
    if (Buffer.byteLength(payload, 'utf8') > 32 * 1024) {
      res.status(413).json({ error: 'Payload too large' });
      return;
    }

    const forwarded = await fetch(appScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      signal: AbortSignal.timeout(15000),
    });

    const text = await forwarded.text();
    res.status(forwarded.status).send(text);
  } catch (err) {
    // Log the detail; return something generic. The original returned
    // String(err) to the client, leaking internal failure information.
    console.error('Proxy error:', err);
    res.status(502).json({ error: 'Upstream request failed. Please try again.' });
  }
};
