import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL;
const SECRET = import.meta.env.VITE_API_SECRET;

const client = axios.create({
  baseURL: BASE,
  headers: {
    'x-api-secret': SECRET,
    'Content-Type': 'application/json',
  },
});

export async function analyseObjection(input, context = 'B2B Enterprise') {
  try {
    const res = await client.post('/analyse', { input, context });
    return { data: res.data, error: null };
  } catch (err) {
    const status = err.response?.status;
    const messages = {
      400: 'Please check your input and try again.',
      401: 'Authentication error. Please refresh the page.',
      429: 'Too many requests. Wait a moment and try again.',
      500: 'Our AI is taking a break. Try again in a few seconds.',
    };
    return {
      data: null,
      error: messages[status] || 'Something went wrong. Please try again.',
    };
  }
}

export async function rateResponse(objectionId, responseStyle, rating) {
  try {
    await client.post('/rate', { objectionId, responseStyle, rating });
    return { error: null };
  } catch (err) {
    return { error: 'Could not save your feedback.' };
  }
}