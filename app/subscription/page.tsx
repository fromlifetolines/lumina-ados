'use client';

import { PricingSection } from '@/components/pricing/PricingSection';
import { Header } from '@/components/dashboard/Header';
import { useTranslation } from '@/lib/i18n';
import { GlassCard } from '@/components/ui/glass-card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const faqs = [
    { question: "Can I upgrade anytime?", answer: "Yes, you can upgrade your plan at any time. The difference in cost will be prorated." },
    { question: "What payment methods do you accept?", answer: "We accept all major credit cards (Visa, MasterCard, Amex) and PayPal." },
    { question: "Is there a long-term contract?", answer: "No, you can cancel at any time. If you choose the yearly plan, you save 20% upfront." },
];

export default function SubscriptionPage() {
    const { t } = useTranslation();
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12">
            <Header />

            {/* Reuse the existing Pricing Section */}
            <PricingSection />

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto mt-16">
                <h3 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <GlassCard key={i} className="p-0 overflow-hidden">
                            <button
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition"
                            >
                                <span className="font-bold text-white">{faq.question}</span>
                                {openFaq === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                            </button>
                            {openFaq === i && (
                                <div className="p-6 pt-0 text-gray-400 border-t border-white/5">
                                    {faq.answer}
                                </div>
                            )}
                        </GlassCard>
                    ))}
                </div>
            </div>
        </div>
    );
}
