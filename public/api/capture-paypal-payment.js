export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderID } = req.body;

  if (!orderID) {
    return res.status(400).json({ error: 'Missing orderID' });
  }

  try {
    const PAYPAL_CLIENT_ID = 'AT-7PzkE53BJ0EklY8Hp4G2EVDdEh2cLI5msW06Jv7V0yO9IlqXU6w0I0PjTTmbCaiuIPMr0qYnlokob';
    const PAYPAL_CLIENT_SECRET = 'EEpthd0KhAJXd-_SsBg9JqlrzRd2YfLVxdnR9qcimA7LLU_VeCnlxm0HtgmAkYY7T2od8r9M4o_GJD6G';
    const PAYPAL_BASE_URL = 'https://api-m.sandbox.paypal.com';

    // Get access token
    const authResponse = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en_US',
        'Authorization': `Basic ${Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });

    if (!authResponse.ok) {
      throw new Error('Failed to get PayPal access token');
    }

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    // Capture the order
    const captureResponse = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'PayPal-Request-Id': `${Date.now()}-${Math.random()}`
      }
    });

    if (!captureResponse.ok) {
      const errorData = await captureResponse.text();
      throw new Error(`PayPal capture failed: ${errorData}`);
    }

    const captureData = await captureResponse.json();
    
    res.status(200).json(captureData);
  } catch (error) {
    console.error('PayPal capture error:', error);
    res.status(500).json({ 
      error: 'Failed to capture PayPal payment',
      details: error.message 
    });
  }
}