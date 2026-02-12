import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover' as any, // Type assertion to avoid further issues if types are slightly off
    typescript: true,
});
