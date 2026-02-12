'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { useTranslation } from '@/lib/i18n';
import { useCurrency } from '@/lib/currency';
import { PlatformIcon } from '@/components/ui/platform-icon';
import { platform as osPlatform } from 'os'; // Mistake import, removing
import { platforms, PlatformId } from '@/lib/mockData';
import { useState, useMemo } from 'react';
import { RefreshCcw } from 'lucide-react';

export const BudgetSimulator = () => {
    const { t } = useTranslation();
    const { format } = useCurrency();

    // Initial budget distribution (randomized slightly for realism)
    const initialBudgets: Record<PlatformId, number> = {
        meta: 5000,
        google: 4000,
        youtube: 2000,
        tiktok: 3000,
        twitter: 1000,
        linkedin: 1500,
        line: 800,
    };

    const [budgets, setBudgets] = useState(initialBudgets);

    // Dynamic Revenue Calculation based on "Historical ROAS" from mockData
    const projection = useMemo(() => {
        let totalSpend = 0;
        let totalRevenue = 0;

        Object.keys(budgets).forEach((key) => {
            const pid = key as PlatformId;
            const spend = budgets[pid];
            const platformRoas = platforms[pid].currentMonth.roas || 1.0;

            // Diminishing returns logic: ROAS decreases slightly as spend increases excessively
            const adjustedRoas = spend > 8000 ? platformRoas * 0.9 : platformRoas;

            totalSpend += spend;
            totalRevenue += spend * adjustedRoas;
        });

        return { totalSpend, totalRevenue, roas: totalRevenue / totalSpend };
    }, [budgets]);

    const handleSliderChange = (pid: PlatformId, val: number) => {
        setBudgets(prev => ({ ...prev, [pid]: val }));
    };

    return (
        <GlassCard className="relative overflow-hidden">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        {t('budget_simulator')}
                        <span className="text-xs font-normal bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-md border border-purple-500/30">AI Powered</span>
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">{t('adjust_budget')}</p>
                </div>
                <button
                    onClick={() => setBudgets(initialBudgets)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400"
                    title="Reset Defaults"
                >
                    <RefreshCcw className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Sliders */}
                <div className="space-y-6">
                    {(Object.keys(platforms) as PlatformId[]).map((pid) => (
                        <div key={pid} className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <PlatformIcon platform={pid} className="w-6 h-6 p-1" />
                                    <span className="text-gray-200 capitalize w-20">{pid}</span>
                                </div>
                                <span className="font-mono text-blue-300">{format(budgets[pid])}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10000"
                                step="100"
                                value={budgets[pid]}
                                onChange={(e) => handleSliderChange(pid, parseInt(e.target.value))}
                                className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                            />
                        </div>
                    ))}
                </div>

                {/* Projection Result */}
                <div className="flex flex-col justify-center gap-6 bg-black/20 p-8 rounded-2xl border border-white/5">
                    <div className="text-center space-y-2">
                        <p className="text-gray-400 text-sm uppercase tracking-wider font-bold">Projected Revenue</p>
                        <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500 animate-in fade-in zoom-in duration-300">
                            {format(projection.totalRevenue)}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                        <div className="text-center">
                            <p className="text-gray-500 text-xs mb-1">Total Spend</p>
                            <p className="text-xl font-bold text-white">{format(projection.totalSpend)}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-500 text-xs mb-1">Blended ROAS</p>
                            <p className="text-xl font-bold text-yellow-400">{projection.roas.toFixed(2)}x</p>
                        </div>
                    </div>

                    <button className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-white hover:opacity-90 transition-opacity shadow-lg shadow-blue-900/20">
                        {t('apply_forecast')}
                    </button>
                </div>
            </div>
        </GlassCard>
    );
};
