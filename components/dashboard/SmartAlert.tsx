'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { AlertTriangle, TrendingUp, TrendingDown, X } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SmartAlert = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="mb-8"
            >
                <GlassCard className="border-l-4 border-l-red-500 bg-red-500/5 relative">
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-red-500/20 rounded-full animate-pulse">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                {t('smart_alert_title')}
                                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">High Priority</span>
                            </h3>
                            <p className="text-gray-300 mt-1 max-w-3xl">
                                {t('smart_alert_cpa_warning')}
                            </p>
                            <div className="flex gap-3 mt-4">
                                <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2">
                                    {t('optimize')} Campaign
                                </button>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="px-4 py-2 hover:bg-white/10 text-gray-400 text-sm font-medium rounded-lg transition-colors"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </AnimatePresence>
    );
};
