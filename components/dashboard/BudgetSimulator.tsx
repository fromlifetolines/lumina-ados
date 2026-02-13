'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { useState, useMemo } from 'react';
import { useTranslation } from '@/lib/i18n';
import { useCurrency } from '@/lib/currency';
import { Calculator, RefreshCw, ArrowRight, TrendingUp, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { calculateProjection, PlatformKey, PlatformConfig } from '@/lib/logic';

const INITIAL_CONFIGS: Record<PlatformKey, PlatformConfig> = {
    meta: { id: 'meta', name: 'Meta', roas: 3.5, budget: 15000, color: '#3b82f6' },
    google: { id: 'google', name: 'Google', roas: 4.2, budget: 12000, color: '#ea4335' },
    youtube: { id: 'youtube', name: 'YouTube', roas: 1.5, budget: 8000, color: '#ff0000' },
    tiktok: { id: 'tiktok', name: 'TikTok', roas: 2.8, budget: 10000, color: '#000000' },
};

import { createClient } from '@/lib/supabase';
import { toast } from 'sonner';

interface BudgetSimulatorProps {
    historicalRevenue?: number;
}

export const BudgetSimulator = ({ historicalRevenue = 0 }: BudgetSimulatorProps) => {
    const { t } = useTranslation();
    const { format } = useCurrency();
    const [allocations, setAllocations] = useState<Record<PlatformKey, number>>({
        meta: 15000,
        google: 12000,
        youtube: 8000,
        tiktok: 10000,
    });
    const [isCalculating, setIsCalculating] = useState(false);
    const [calculatedRoas, setCalculatedRoas] = useState<number | null>(null);
    const supabase = createClient();

    // Calculate real-time projection
    const { totalRevenue, totalBudget, revenueLift } = useMemo(() => {
        return calculateProjection(allocations, INITIAL_CONFIGS);
    }, [allocations]);

    const initialTotalBudget = Object.values(INITIAL_CONFIGS).reduce((sum, c) => sum + c.budget, 0);
    const budgetDiff = totalBudget - initialTotalBudget;

    const handleSliderChange = (key: PlatformKey, value: number) => {
        setAllocations(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleReset = () => {
        setAllocations({
            meta: INITIAL_CONFIGS.meta.budget,
            google: INITIAL_CONFIGS.google.budget,
            youtube: INITIAL_CONFIGS.youtube.budget,
            tiktok: INITIAL_CONFIGS.tiktok.budget,
        });
        setCalculatedRoas(null);
    };

    const handleApplyModel = async () => {
        setIsCalculating(true);
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Logic: Diminishing Returns Algorithm
        // Predicted Revenue = Current Revenue * (New Budget / Current Budget) * 0.85 (Market Saturation Factor)
        const saturationFactor = 0.85;
        const projectedTotalRevenue = (totalRevenue * (totalBudget / initialTotalBudget)) * saturationFactor;

        const roas = projectedTotalRevenue / totalBudget;

        setCalculatedRoas(roas);

        // Save Scenario to Supabase
        const { error } = await supabase.from('budget_scenarios').insert({
            name: `AI Scenario - ${new Date().toLocaleTimeString()}`,
            allocations: allocations,
            projected_revenue: projectedTotalRevenue,
            projected_roas: roas,
            total_budget: totalBudget
        });

        if (!error) {
            toast.success(`AI Analysis: Budget adjusted. Expected ROAS: ${roas.toFixed(2)}x`);
        } else {
            toast.error("Failed to save scenario.");
        }

        setIsCalculating(false);
    };

    return (
        <GlassCard className="relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Calculator className="w-6 h-6 text-blue-400" />
                        {t('budget_allocator')}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">Smart AI Budget Allocation</p>
                </div>
                <button
                    onClick={handleReset}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                    title="Reset to Default"
                >
                    <RefreshCw className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sliders Section */}
                <div className="space-y-6">
                    {(Object.keys(INITIAL_CONFIGS) as PlatformKey[]).map((key) => {
                        const config = INITIAL_CONFIGS[key];
                        return (
                            <div key={key} className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.color }}></div>
                                        <span className="text-sm font-bold text-gray-200">{config.name}</span>
                                        <span className="text-xs text-gray-500 bg-black/20 px-1.5 py-0.5 rounded">ROAS {config.roas}x</span>
                                    </div>
                                    <span className="font-mono font-bold text-blue-300">{format(allocations[key])}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="50000"
                                    step="500"
                                    value={allocations[key]}
                                    onChange={(e) => handleSliderChange(key, Number(e.target.value))}
                                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                                    style={{
                                        background: `linear-gradient(to right, ${config.color} 0%, ${config.color} ${(allocations[key] / 50000) * 100}%, rgba(255,255,255,0.1) ${(allocations[key] / 50000) * 100}%, rgba(255,255,255,0.1) 100%)`
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Results Section */}
                <div className="flex flex-col gap-4">
                    {/* Insight Card */}
                    <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/20 rounded-xl p-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <TrendingUp className="w-24 h-24 text-white" />
                        </div>

                        <div className="relative z-10 space-y-4">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">{t('total_budget')}</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-bold text-white">{format(totalBudget)}</span>
                                    {budgetDiff !== 0 && (
                                        <span className={cn("text-sm font-bold mb-1", budgetDiff > 0 ? "text-yellow-400" : "text-green-400")}>
                                            {budgetDiff > 0 ? '+' : ''}{format(budgetDiff)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <p className="text-gray-400 text-sm mb-1">{t('projected_revenue_sim')}</p>
                                <motion.div
                                    className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500"
                                    key={totalRevenue}
                                    initial={{ scale: 0.95, opacity: 0.8 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                >
                                    {format(totalRevenue)}
                                </motion.div>
                                {revenueLift !== 0 && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className={cn("px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1",
                                            revenueLift > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                                        )}>
                                            {revenueLift > 0 ? <TrendingUp className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                                            {revenueLift > 0 ? '+' : ''}{format(revenueLift)}
                                        </div>
                                        <span className="text-xs text-gray-400">{revenueLift > 0 ? 'Potential Gain' : 'Potential Loss'}</span>
                                    </div>
                                )}
                            </div>

                            {calculatedRoas !== null && (
                                <div className="bg-blue-500/20 rounded-lg p-3 text-sm text-blue-200 border border-blue-500/30 mt-2 animate-in fade-in slide-in-from-top-2">
                                    <div className="flex justify-between items-center">
                                        <span>Expected ROAS (Diminishing Returns):</span>
                                        <span className="font-bold text-white text-lg">{calculatedRoas.toFixed(2)}x</span>
                                    </div>
                                </div>
                            )}

                            <div className="bg-black/30 rounded-lg p-3 text-sm text-gray-300 border border-white/5 mt-2">
                                <div className="flex justify-between items-center">
                                    <span>{t('confidence_score')}:</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 w-[85%]"></div>
                                        </div>
                                        <span className="font-bold text-white">85%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleApplyModel}
                        disabled={isCalculating}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:text-gray-400 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group"
                    >
                        {isCalculating ? (
                            <span className="flex items-center gap-2">
                                <RefreshCw className="w-5 h-5 animate-spin" />
                                Processing AI Model...
                            </span>
                        ) : (
                            <>
                                {t('apply_forecast')}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </GlassCard>
    );
};
