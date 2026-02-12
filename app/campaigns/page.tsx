'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { useTranslation } from '@/lib/i18n';
import { useCurrency } from '@/lib/currency';
import { PlatformIcon } from '@/components/ui/platform-icon';
import { Header } from '@/components/dashboard/Header';
import { PlatformId } from '@/lib/mockData';
import { AlertTriangle, TrendingUp, Zap, PauseCircle, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Expanded Campaign Mock Data for 7 Platforms
const campaignsData = [
    { id: 1, name: 'Summer_Sale_Conversion', platform: 'meta' as PlatformId, status: 'Active', budget: 5000, spent: 2300, roas: 3.8, ctr: 2.1 },
    { id: 2, name: 'Brand_Keywords_Search', platform: 'google' as PlatformId, status: 'Active', budget: 3000, spent: 1200, roas: 5.2, ctr: 4.5 },
    { id: 3, name: 'Viral_Dance_Challenge', platform: 'tiktok' as PlatformId, status: 'Paused', budget: 2000, spent: 800, roas: 1.2, ctr: 0.8 },
    { id: 4, name: 'Retargeting_Catalog', platform: 'meta' as PlatformId, status: 'Active', budget: 1500, spent: 1450, roas: 2.9, ctr: 1.4 },
    { id: 5, name: 'Shorts_Awareness_001', platform: 'youtube' as PlatformId, status: 'Active', budget: 4000, spent: 500, roas: 1.5, ctr: 0.5 },
    { id: 6, name: 'B2B_Lead_Gen_Q3', platform: 'linkedin' as PlatformId, status: 'Active', budget: 6000, spent: 1500, roas: 2.1, ctr: 0.9 },
    { id: 7, name: 'Tech_Trends_Thread', platform: 'twitter' as PlatformId, status: 'Paused', budget: 1000, spent: 300, roas: 1.1, ctr: 1.2 },
    { id: 8, name: 'Official_Account_Promo', platform: 'line' as PlatformId, status: 'Active', budget: 2000, spent: 1800, roas: 6.5, ctr: 3.2 },
    { id: 9, name: 'Competitor_Conquesting', platform: 'google' as PlatformId, status: 'Active', budget: 2500, spent: 2100, roas: 3.1, ctr: 2.8 },
    { id: 10, name: 'Influencer_Spark_Ad', platform: 'tiktok' as PlatformId, status: 'Active', budget: 3500, spent: 1200, roas: 3.2, ctr: 1.8 },
];

export default function CampaignsPage() {
    const { t } = useTranslation();
    const { format } = useCurrency(); // Currency formatting
    const [filter, setFilter] = useState<PlatformId | 'all'>('all');
    const [selectedAction, setSelectedAction] = useState<{ type: 'optimize' | 'scale', id: number } | null>(null);

    const filteredCampaigns = campaignsData.filter(c => filter === 'all' || c.platform === filter);

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            <Header
                showPlatformFilter={true}
                platformFilter={filter}
                setPlatformFilter={setFilter}
            />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-6 lg:mb-0">{t('campaigns')}</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search campaigns..."
                        className="glass-input pl-10 w-64"
                    />
                </div>
            </div>

            <GlassCard className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead className="bg-white/5 border-b border-white/10 text-gray-400 text-sm font-medium">
                            <tr>
                                <th className="p-4 pl-6 ">{t('status')}</th>
                                <th className="p-4">{t('platform')}</th>
                                <th className="p-4">{t('campaign_name')}</th>
                                <th className="p-4 text-right">{t('budget')}</th>
                                <th className="p-4 text-right">{t('spent')}</th>
                                <th className="p-4 text-right">{t('roas')}</th>
                                <th className="p-4 text-right">{t('ctr')}</th>
                                <th className="p-4 text-center">{t('action')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredCampaigns.map((campaign) => (
                                <tr
                                    key={campaign.id}
                                    className={cn(
                                        "hover:bg-white/5 transition-colors group",
                                        campaign.ctr < 1.0 && "bg-red-500/5 hover:bg-red-500/10 italic"
                                    )}
                                >
                                    <td className="p-4 pl-6">
                                        {campaign.status === 'Active' ? (
                                            <span className="inline-flex items-center gap-2 text-green-400 text-sm font-bold bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                                {t('active')}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-2 text-gray-500 text-sm font-bold bg-gray-500/10 px-2 py-1 rounded-full border border-gray-500/20">
                                                <PauseCircle className="w-3 h-3" />
                                                {t('paused')}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <PlatformIcon platform={campaign.platform} className="w-8 h-8" />
                                            <span className="hidden lg:inline capitalize text-sm text-gray-300">{campaign.platform}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-200 font-medium">{campaign.name}</td>
                                    <td className="p-4 text-right text-gray-400">{format(campaign.budget)}</td>
                                    <td className="p-4 text-right text-white font-bold">{format(campaign.spent)}</td>
                                    <td className="p-4 text-right">
                                        <span className={cn("font-bold px-2 py-1 rounded-lg", campaign.roas > 3 ? "text-green-400 bg-green-500/10" : campaign.roas > 2 ? "text-yellow-400 bg-yellow-500/10" : "text-gray-400")}>
                                            {campaign.roas}x
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <span className={cn(campaign.ctr < 1.0 ? "text-red-400 font-bold" : "text-white")}>
                                                {campaign.ctr}%
                                            </span>
                                            {campaign.ctr < 1.0 && <AlertTriangle className="w-4 h-4 text-red-500" />}
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                            {campaign.roas < 2 ? (
                                                <button
                                                    onClick={() => setSelectedAction({ type: 'optimize', id: campaign.id })}
                                                    className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors tooltip"
                                                    title="AI Optimization Recommended"
                                                >
                                                    <Zap className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => setSelectedAction({ type: 'scale', id: campaign.id })}
                                                    className="p-2 bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white rounded-lg transition-colors"
                                                    title="Scale Budget"
                                                >
                                                    <TrendingUp className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </GlassCard>

            {/* Action Logic Modal (Simplified) */}
            <AnimatePresence>
                {selectedAction && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedAction(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0f172a] border border-white/10 p-8 rounded-2xl max-w-md w-full shadow-2xl relative"
                        >
                            <h3 className="text-xl font-bold text-white mb-4">
                                {selectedAction.type === 'optimize' ? '🤖 AI Optimization' : '🚀 Scale Campaign'}
                            </h3>

                            <div className="space-y-4 mb-8">
                                {selectedAction.type === 'optimize' ? (
                                    <p className="text-gray-300">
                                        AI detected high frequency on <span className="text-white font-bold">Creative_A</span>.
                                        Recommendation: <span className="text-red-400">Decrease budget by 20%</span> and refresh creatives.
                                    </p>
                                ) : (
                                    <p className="text-gray-300">
                                        This campaign is performing exceptionally well (ROAS 3.0+).
                                        Recommendation: <span className="text-green-400">Increase budget by $500</span>.
                                        Projected extra revenue: <span className="text-white font-bold">$1,850</span>.
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-4">
                                <button
                                    className={cn(
                                        "flex-1 py-3 rounded-xl font-bold text-white transition-all",
                                        selectedAction.type === 'optimize' ? "bg-red-600 hover:bg-red-500" : "bg-green-600 hover:bg-green-500"
                                    )}
                                    onClick={() => setSelectedAction(null)}
                                >
                                    {selectedAction.type === 'optimize' ? 'Apply Fix' : 'Confirm Increase'}
                                </button>
                                <button
                                    className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-gray-400 font-bold"
                                    onClick={() => setSelectedAction(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
