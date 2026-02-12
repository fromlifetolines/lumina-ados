'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, Crown, ShieldCheck, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/glass-card';

const pricingTiers = [
    {
        name: "Lite",
        price: 490,
        description: "For Solopreneurs starting out.",
        features: ["2 Platform Integrations", "Basic Reporting", "7-Day Data Retention", "Email Support"],
        notIncluded: ["AI Budget Calculator", "PDF Export", "White-label Reports"],
        visual: "border-white/10 hover:border-white/30",
        buttonStyle: "bg-white/10 hover:bg-white/20",
        icon: Zap,
    },
    {
        name: "Pro",
        price: 1290,
        description: "For Growing Brands scaling up.",
        features: [
            "All Platforms (GA4, Meta, TT)",
            "AI Budget Calculator",
            "PDF Export",
            "30-Day Data Retention",
            "Priority Email Support"
        ],
        notIncluded: ["White-label Reports", "Dedicated Account Manager"],
        visual: "border-cyan-500/50 shadow-cyan-500/20 scale-105 z-10",
        badge: "Best Value",
        buttonStyle: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 animate-pulse-slow shadow-lg shadow-cyan-500/30",
        icon: Crown,
    },
    {
        name: "Agency",
        price: 3990,
        description: "For Marketing Teams & Agencies.",
        features: [
            "Unlimited Accounts",
            "White-label Reports (No Watermark)",
            "Dedicated Account Manager",
            "Unlimited Data Retention",
            "24/7 Phone Support",
            "Custom API Access"
        ],
        notIncluded: [],
        visual: "border-yellow-500/30 bg-yellow-900/10 hover:border-yellow-500/50",
        buttonStyle: "bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90 text-black font-bold",
        icon: ShieldCheck,
    }
];

export const PricingSection = () => {
    const [isYearly, setIsYearly] = useState(false);
    const [loadingTier, setLoadingTier] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const handleSubscribe = (tierName: string) => {
        setLoadingTier(tierName);

        // Simulate API call
        setTimeout(() => {
            setLoadingTier(null);
            setToast({ message: `Successfully subscribed to ${tierName} plan!`, type: 'success' });

            // Auto-dismiss toast
            setTimeout(() => setToast(null), 3000);
        }, 2000);
    };

    return (
        <div className="py-12 relative">
            {/* Toast Notification */}
            {toast && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={cn(
                        "fixed top-8 right-8 z-50 px-6 py-4 rounded-xl backdrop-blur-md border shadow-2xl flex items-center gap-3",
                        toast.type === 'success' ? "bg-green-500/20 border-green-500/50 text-green-200" : "bg-red-500/20 border-red-500/50"
                    )}
                >
                    {toast.type === 'success' && <Check className="w-5 h-5" />}
                    <span className="font-medium">{toast.message}</span>
                </motion.div>
            )}

            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white mb-4">
                    Upgrade your Experience
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                    Unlock the full potential of Lumina AdOS with our premium tiers. Scale your marketing with AI-driven insights.
                </p>

                {/* Toggle Switch */}
                <div className="flex items-center justify-center gap-4">
                    <span className={cn("text-sm font-medium transition-colors", !isYearly ? "text-white" : "text-gray-500")}>
                        Monthly
                    </span>
                    <button
                        onClick={() => setIsYearly(!isYearly)}
                        className="w-16 h-8 rounded-full bg-white/10 border border-white/20 relative transition-colors hover:bg-white/20"
                    >
                        <motion.div
                            className="absolute top-1 left-1 w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 shadow-md"
                            animate={{ x: isYearly ? 32 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    </button>
                    <span className={cn("text-sm font-medium transition-colors", isYearly ? "text-white" : "text-gray-500")}>
                        Yearly
                    </span>
                    <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/30">
                        Save 20%
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
                {pricingTiers.map((tier) => {
                    const displayedPrice = isYearly ? Math.round(tier.price * 12 * 0.8) : tier.price;
                    const isPro = tier.name === "Pro";

                    return (
                        <GlassCard
                            key={tier.name}
                            className={cn(
                                "relative flex flex-col p-8 transition-all duration-300",
                                tier.visual
                            )}
                        >
                            {isPro && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-cyan-500/40">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="flex items-center justify-between mb-6">
                                <div className={cn("p-3 rounded-xl", isPro ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-gray-300")}>
                                    <tier.icon className="w-6 h-6" />
                                </div>
                                {isPro && <Crown className="w-6 h-6 text-yellow-400 animate-pulse" />}
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                            <p className="text-gray-400 text-sm mb-6 h-10">{tier.description}</p>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-sm text-gray-400">NT$</span>
                                    <span className="text-4xl font-bold text-white tracking-tight">
                                        {displayedPrice.toLocaleString()}
                                    </span>
                                    <span className="text-gray-500 text-sm">/{isYearly ? 'yr' : 'mo'}</span>
                                </div>
                                {isYearly && (
                                    <p className="text-green-400 text-xs mt-2">
                                        Billed NT${displayedPrice.toLocaleString()} yearly
                                    </p>
                                )}
                            </div>

                            <div className="flex-1 space-y-4 mb-8">
                                {tier.features.map((feature) => (
                                    <div key={feature} className="flex items-start gap-3">
                                        <div className="mt-1 p-0.5 rounded-full bg-green-500/20">
                                            <Check className="w-3 h-3 text-green-400" />
                                        </div>
                                        <span className="text-sm text-gray-200">{feature}</span>
                                    </div>
                                ))}
                                {tier.notIncluded.map((feature) => (
                                    <div key={feature} className="flex items-start gap-3 opacity-50">
                                        <div className="mt-1 p-0.5 rounded-full bg-white/5">
                                            <X className="w-3 h-3 text-gray-500" />
                                        </div>
                                        <span className="text-sm text-gray-500">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => handleSubscribe(tier.name)}
                                disabled={loadingTier !== null}
                                className={cn(
                                    "w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
                                    tier.buttonStyle,
                                    loadingTier && loadingTier !== tier.name && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                {loadingTier === tier.name ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    "Subscribe Now"
                                )}
                            </button>
                        </GlassCard>
                    );
                })}
            </div>
        </div>
    );
};
