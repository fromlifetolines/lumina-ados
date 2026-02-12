import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const { planName, isYearly } = await req.json();

        const supabase = createClient();

        // Get authenticated user
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Map plan names to fake Price IDs for Test Mode if not provided
        // In a real app, you'd use actual Stripe Price IDs (e.g., price_12345)
        // For this demo, we'll use ad-hoc line items

        const unitAmount =
            planName === 'Lite' ? (isYearly ? 2900 * 12 * 0.8 : 2900) :
                planName === 'Pro' ? (isYearly ? 7900 * 12 * 0.8 : 7900) :
                    planName === 'Agency' ? (isYearly ? 19900 * 12 * 0.8 : 19900) : 0;

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
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
                },
            ],
            customer_email: user.email,
            metadata: {
                userId: user.id,
                planName: planName,
            },
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription?payment=cancelled`,
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
