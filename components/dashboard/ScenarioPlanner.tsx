'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { useState } from 'react';
import { DollarSign, Wand2 } from 'lucide-react';

export const ScenarioPlanner = () => {
    const [budget, setBudget] = useState(50000);
    const [roas, setRoas] = useState(3.5);

    const projectedRevenue = Math.round(budget * roas);
    const profit = projectedRevenue - budget;

    return (
        <GlassCard className="border-yellow-500/20 shadow-yellow-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Wand2 className="w-32 h-32 text-yellow-400" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400">
                        <Wand2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">The "Consultant" Planner</h3>
                        <p className="text-sm text-gray-400">Adjust budget to see revenue projections</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-gray-300">Monthly Ad Budget</span>
                                <span className="text-lg font-bold text-white">${budget.toLocaleString()}</span>
                            </div>
                            <input
                                type="range"
                                min="10000"
                                max="200000"
                                step="1000"
                                value={budget}
                                onChange={(e) => setBudget(Number(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400 hover:accent-yellow-300"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>$10k</span>
                                <span>$200k</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-gray-300">Target ROAS</span>
                                <span className="text-lg font-bold text-white">{roas}x</span>
                            </div>
                            <input
                                type="range"
                                min="1.0"
                                max="10.0"
                                step="0.1"
                                value={roas}
                                onChange={(e) => setRoas(Number(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-400 hover:accent-blue-300"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center space-y-6">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                            <p className="text-sm text-yellow-200/70 uppercase tracking-wider mb-1">Projected Revenue</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-white">${projectedRevenue.toLocaleString()}</span>
                                <span className="text-green-400 text-sm font-medium">
                                    (+${profit.toLocaleString()} Profit)
                                </span>
                            </div>
                        </div>

                        <button className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-bold text-black hover:opacity-90 transition shadow-lg shadow-orange-500/20">
                            Apply to Forecast
                        </button>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
};
