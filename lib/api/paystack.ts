import axios from 'axios';

const PAYSTACK_SECRET_KEY = process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY;
const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

const paystackApi = axios.create({
  baseURL: 'https://api.paystack.co',
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const paystackService = {
  // Initialize transaction
  initializeTransaction: async (email: string, amount: number) => {
    const response = await paystackApi.post('/transaction/initialize', {
      email,
      amount: amount * 100, // Convert to kobo
      currency: 'NGN',
    });
    return response.data;
  },

  // Verify transaction
  verifyTransaction: async (reference: string) => {
    const response = await paystackApi.get(`/transaction/verify/${reference}`);
    return response.data;
  },

  // List transactions
  listTransactions: async () => {
    const response = await paystackApi.get('/transaction');
    return response.data;
  },

  // Create subscription
  createSubscription: async (planCode: string, email: string) => {
    const response = await paystackApi.post('/subscription', {
      plan: planCode,
      customer: email,
    });
    return response.data;
  },

  // List subscription plans
  listPlans: async () => {
    const response = await paystackApi.get('/plan');
    return response.data;
  },
};

// Client-side payment initialization
export const initializePayment = (email: string, amount: number) => {
  const handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email,
    amount: amount * 100,
    currency: 'NGN',
    callback: (response: any) => {
      // Handle successful payment
      console.log(response);
    },
    onClose: () => {
      // Handle payment modal close
    },
  });
  handler.openIframe();
};