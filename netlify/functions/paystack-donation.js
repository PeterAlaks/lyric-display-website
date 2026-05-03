/* global process */

const PAYSTACK_BASE_URL = 'https://api.paystack.co';

const fixedPlans = {
  supporter: {
    name: 'Supporter',
    amount: 5,
    planCode: process.env.PAYSTACK_PLAN_SUPPORTER || '',
  },
  builder: {
    name: 'Builder',
    amount: 15,
    planCode: process.env.PAYSTACK_PLAN_BUILDER || '',
  },
  patron: {
    name: 'Patron',
    amount: 30,
    planCode: process.env.PAYSTACK_PLAN_PATRON || '',
  },
};

const allowedIntervals = new Set(['monthly', 'quarterly', 'annually']);
const currency = process.env.PAYSTACK_CURRENCY || 'USD';

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
  body: JSON.stringify(body),
});

const toMinorUnit = amount => Math.round(Number(amount) * 100);

const cleanString = value => String(value || '').trim();

const paystackRequest = async (path, payload) => {
  const response = await fetch(`${PAYSTACK_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.status === false) {
    throw new Error(data.message || 'Paystack request failed.');
  }

  return data.data;
};

const createCustomPlan = async ({ amountMinor, interval }) => {
  const amount = amountMinor / 100;
  const name = `LyricDisplay Custom ${interval} ${currency} ${amount}`;

  return paystackRequest('/plan', {
    name,
    amount: amountMinor,
    interval,
    currency,
    description: `Custom recurring LyricDisplay donation of ${currency} ${amount} ${interval}`,
  });
};

export const handler = async event => {
  if (event.httpMethod !== 'POST') {
    return json(405, { message: 'Method not allowed.' });
  }

  if (!process.env.PAYSTACK_SECRET_KEY) {
    return json(500, { message: 'PAYSTACK_SECRET_KEY is not configured.' });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { message: 'Invalid JSON payload.' });
  }

  const email = cleanString(payload.email).toLowerCase();
  const name = cleanString(payload.name);
  const note = cleanString(payload.note);
  const type = cleanString(payload.type);
  const reference = cleanString(payload.reference);

  if (!email || !email.includes('@')) {
    return json(400, { message: 'A valid donor email is required.' });
  }

  if (!reference || !/^[A-Za-z0-9.=-]+$/.test(reference)) {
    return json(400, { message: 'A valid payment reference is required.' });
  }

  try {
    let amount = Number(payload.amount);
    let amountMinor = toMinorUnit(amount);
    let plan;
    let planCode = '';
    let frequency = cleanString(payload.frequency) || 'once';

    if (type === 'subscription') {
      plan = fixedPlans[cleanString(payload.planId)];
      if (!plan) return json(400, { message: 'Invalid subscription plan.' });
      if (!plan.planCode) return json(500, { message: `Plan code for ${plan.name} is not configured.` });

      amount = plan.amount;
      amountMinor = toMinorUnit(plan.amount);
      planCode = plan.planCode;
      frequency = 'monthly';
    } else if (type === 'custom_subscription') {
      if (!allowedIntervals.has(frequency)) {
        return json(400, { message: 'Invalid custom subscription frequency.' });
      }

      if (!Number.isFinite(amount) || amount < 1 || amount > 10000) {
        return json(400, { message: 'Custom subscription amount must be between 1 and 10000.' });
      }

      const customPlan = await createCustomPlan({ amountMinor, interval: frequency });
      planCode = customPlan.plan_code;
    } else if (type === 'one_time') {
      if (!Number.isFinite(amount) || amount < 1 || amount > 10000) {
        return json(400, { message: 'Donation amount must be between 1 and 10000.' });
      }
    } else {
      return json(400, { message: 'Invalid donation type.' });
    }

    const transaction = await paystackRequest('/transaction/initialize', {
      email,
      amount: String(amountMinor),
      currency,
      reference,
      plan: planCode || undefined,
      callback_url: process.env.PAYSTACK_CALLBACK_URL || undefined,
      metadata: {
        source: 'lyricdisplay-donate-page',
        donation_type: type,
        frequency,
        amount,
        currency,
        donor_name: name || 'Anonymous',
        donation_note: note || '',
      },
    });

    return json(200, {
      authorization_url: transaction.authorization_url,
      access_code: transaction.access_code,
      reference: transaction.reference,
    });
  } catch (error) {
    return json(502, { message: error.message || 'Unable to initialize Paystack donation.' });
  }
};
