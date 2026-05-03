/* global process */

const PAYSTACK_BASE_URL = 'https://api.paystack.co';

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
  body: JSON.stringify(body),
});

const cleanReference = value => String(value || '').trim();

export const handler = async event => {
  if (event.httpMethod !== 'GET') {
    return json(405, { message: 'Method not allowed.' });
  }

  if (!process.env.PAYSTACK_SECRET_KEY) {
    return json(500, { message: 'PAYSTACK_SECRET_KEY is not configured.' });
  }

  const reference = cleanReference(event.queryStringParameters?.reference);

  if (!reference || !/^[A-Za-z0-9.=-]+$/.test(reference)) {
    return json(400, { message: 'A valid payment reference is required.' });
  }

  try {
    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.status === false) {
      return json(response.status || 502, { message: data.message || 'Unable to verify payment.' });
    }

    const transaction = data.data || {};
    return json(200, {
      reference: transaction.reference,
      status: transaction.status,
      amount: transaction.amount,
      currency: transaction.currency,
      paid_at: transaction.paid_at,
      gateway_response: transaction.gateway_response,
      channel: transaction.channel,
      metadata: transaction.metadata || {},
    });
  } catch (error) {
    return json(502, { message: error.message || 'Unable to verify payment.' });
  }
};
