'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { useState } from 'react';
import { platforms } from '@/lib/mockData'; // New import
import { useTranslation } from '@/lib/i18n';
import { useCurrency } from '@/lib/currency';
import { RefreshCw, Calculator, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export const ScenarioPlanner = () => {
    const { t } = useTranslation();
    const { format } = useCurrency();
    const [budget, setBudget] = useState(10000);
    const [targetRoas, setTargetRoas] = useState(3.5);
    const [isCalculating, setIsCalculating] = useState(false);

    // Simple projection logic based on blended ROAS assumption + user input
    // In valid app this would use historical curve
    const projectedRevenue = budget * targetRoas;
    const profit = projectedRevenue - budget;

    const handleApply = () => {
        setIsCalculating(true);
        setTimeout(() => setIsCalculating(false), 800);
    };

    return (
        <GlassCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-50">
                <Calculator className="w-12 h-12 text-white/5" />
            </div>

            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                {t('consultant_planner')}
            </h3>

            <div className="space-y-6">
                {/* Budget Slider */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{t('monthly_budget')}</span>
                        <span className="text-white font-mono font-bold">{format(budget)}</span>
                    </div>
                    <input
                        type="range"
                        min="1000"
                        max="50000"
                        step="1000"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                    />
                </div>

                {/* Target ROAS Slider */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{t('target_roas')}</span>
                        <span className="text-yellow-400 font-mono font-bold">{targetRoas}x</span>
                    </div>
                    <input
                        type="range"
                        min="1.0"
                        max="10.0"
                        step="0.1"
                        value={targetRoas}
                        onChange={(e) => setTargetRoas(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-500 hover:accent-yellow-400 transition-all"
                    />
                </div>

                {/* Results Card */}
                <div className="bg-black/30 rounded-xl p-4 border border-white/5 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">{t('projected_revenue')}</span>
                        <motion.span
                            key={projectedRevenue}
                            initial={{ scale: 1.1, color: '#fff' }}
                            animate={{ scale: 1, color: '#34d399' }}
                            className="text-lg font-bold"
                        >
                            {format(projectedRevenue)}
                        </motion.span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                        <span className="text-gray-400 text-sm">{t('profit')}</span>
                        <span className={cn("text-lg font-bold", profit > 0 ? "text-blue-400" : "text-red-400")}>
                            {profit > 0 ? '+' : ''}{format(profit)}
                        </span>
                    </div>
                </div>

                <button
                    onClick={handleApply}
                    className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2 group-hover:border-blue-500/30"
                >
                    {isCalculating ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            {t('apply_forecast')}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </div>
        </GlassCard>
    );
};
