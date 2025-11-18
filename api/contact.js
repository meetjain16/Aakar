// Serverless proxy to forward contact form requests to Google Apps Script
// Place this file in /api so Vercel will deploy it as a serverless function.

module.exports = async (req, res) => {
  // Allow CORS from the browser
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Return early for preflight
    res.statusCode = 204;
    res.end();
    return;
  }

  try {
    // Vercel (server) env var: set APPSCRIPT_URL to your /exec URL in the project settings
    const appScriptUrl = process.env.APPSCRIPT_URL || process.env.VITE_APPSCRIPT_URL;
    if (!appScriptUrl) {
      res.status(500).json({ error: 'APPSCRIPT_URL not configured on server. Set APPSCRIPT_URL in environment.' });
      return;
    }

    // Body should already be parsed by Vercel. If not, fallback to raw body.
    const body = req.body || '';

    const forwardRes = await fetch(appScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: typeof body === 'string' ? body : JSON.stringify(body)
    });

    const text = await forwardRes.text();
    // Mirror status and body from Apps Script
    res.status(forwardRes.status).send(text);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: String(err) });
  }
};
