export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, planType } = req.body;

  if (!amount || !planType) {
    return res.status(400).json({ error: 'Missing required fields' });
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

    // Create order
    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: amount.toString()
        },
        description: `License: ${planType}`
      }],
      application_context: {
        return_url: `${req.headers.origin || 'http://localhost:3000'}/payment-success`,
        cancel_url: `${req.headers.origin || 'http://localhost:3000'}/license`,
        brand_name: 'Race Track Analysis',
        landing_page: 'LOGIN',
        user_action: 'PAY_NOW'
      }
    };

    const orderResponse = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'PayPal-Request-Id': `${Date.now()}-${Math.random()}`
      },
      body: JSON.stringify(orderData)
    });

    if (!orderResponse.ok) {
      const errorData = await orderResponse.text();
      throw new Error(`PayPal order creation failed: ${errorData}`);
    }

    const order = await orderResponse.json();
    
    res.status(200).json(order);
  } catch (error) {
    console.error('PayPal order creation error:', error);
    res.status(500).json({ 
      error: 'Failed to create PayPal order',
      details: error.message 
    });
  }
}