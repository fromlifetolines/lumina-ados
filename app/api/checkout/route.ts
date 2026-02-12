import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const { priceId, planName, isYearly } = await req.json();

        const supabase = createClient();

        // Get authenticated user
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        let lineItem;

        // If a real Stripe Price ID is provided, use it
        if (priceId && typeof priceId === 'string' && priceId.startsWith('price_')) {
            lineItem = {
                price: priceId,
                quantity: 1,
            };
        } else {
            // Fallback to ad-hoc pricing for development/test
            const unitAmount =
                planName === 'Lite' ? (isYearly ? 2900 * 12 * 0.8 : 2900) :
                    planName === 'Pro' ? (isYearly ? 7900 * 12 * 0.8 : 7900) :
                        planName === 'Agency' ? (isYearly ? 19900 * 12 * 0.8 : 19900) : 0;

            lineItem = {
                price_data: {
                    currency: 'twd',
                    product_data: {
                        name: `Lumina AdOS - ${planName} Plan (${isYearly ? 'Yearly' : 'Monthly'})`,
                        description: `Access to ${planName} features.`,
                    },
                    unit_amount: Math.round(unitAmount * 100), // Amount in cents (or smallest unit)
                    recurring: {
                        interval: isYearly ? 'year' : 'month',
                    },
                },
                quantity: 1,
            };
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [lineItem],
            customer_email: user.email,
            metadata: {
                userId: user.id,
                planName: planName,
            },
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://lumina-ados.vercel.app'}/dashboard?payment=success`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://lumina-ados.vercel.app'}/subscription?payment=cancelled`,
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
