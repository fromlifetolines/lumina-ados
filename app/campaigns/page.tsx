'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { useTranslation } from '@/lib/i18n';
import { Header } from '@/components/dashboard/Header';
import { Check, Pause, AlertTriangle, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// Mock Data for Campaigns
const campaignsData = [
    { id: 1, name: 'Summer Sale_Conversion_v1', platform: 'Meta', status: 'Active', budget: 5000, spent: 2300, roas: 3.8, ctr: 2.1 },
    { id: 2, name: 'Google Search_Brand_Keywords', platform: 'Google', status: 'Active', budget: 3000, spent: 1200, roas: 5.2, ctr: 4.5 },
    { id: 3, name: 'TikTok_UGC_Viral_Video', platform: 'TikTok', status: 'Paused', budget: 2000, spent: 800, roas: 1.2, ctr: 0.8 }, // Low Performance
    { id: 4, name: 'Retargeting_Catalog_Sales', platform: 'Meta', status: 'Active', budget: 1500, spent: 1450, roas: 2.9, ctr: 1.4 },
    { id: 5, name: 'YouTube Shorts_Awareness', platform: 'Google', status: 'Active', budget: 4000, spent: 500, roas: 1.5, ctr: 0.5 }, // Low Performance Warning
];

export default function CampaignsPage() {
    const { t } = useTranslation();
    const [filter, setFilter] = useState('All');

    const filteredCampaigns = campaignsData.filter(c => filter === 'All' || c.platform === filter);

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <Header />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">{t('campaigns')}</h2>

                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search campaigns..."
                            className="glass-input pl-10 w-64"
                        />
                    </div>

                    <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                        {['All', 'Meta', 'Google', 'TikTok'].map((platform) => (
                            <button
                                key={platform}
                                onClick={() => setFilter(platform)}
                                className={cn(
                                    "px-4 py-1.5 rounded-lg text-sm transition-all",
                                    filter === platform ? "bg-blue-500/20 text-blue-400" : "text-gray-400 hover:text-white"
                                )}
                            >
                                {platform}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <GlassCard className="p-0 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10 text-gray-400 text-sm">
                        <tr>
                            <th className="p-4">{t('status')}</th>
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
                                    "hover:bg-white/5 transition-colors",
                                    campaign.ctr < 1.0 && "bg-red-500/5 hover:bg-red-500/10 italic"
                                )}
                            >
                                <td className="p-4">
                                    {campaign.status === 'Active' ? (
                                        <span className="inline-flex items-center gap-2 text-green-400 text-sm">
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                            {t('active')}
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-2 text-gray-500 text-sm">
                                            <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                                            {t('paused')}
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 font-medium text-white">{campaign.platform}</td>
                                <td className="p-4 text-gray-300">{campaign.name}</td>
                                <td className="p-4 text-right text-gray-300">${campaign.budget.toLocaleString()}</td>
                                <td className="p-4 text-right text-white font-bold">${campaign.spent.toLocaleString()}</td>
                                <td className="p-4 text-right">
                                    <span className={cn("font-bold", campaign.roas > 3 ? "text-green-400" : "text-yellow-400")}>
                                        {campaign.roas}x
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <span className={cn(campaign.ctr < 1.0 ? "text-red-400 font-bold" : "text-white")}>
                                            {campaign.ctr}%
                                        </span>
                                        {campaign.ctr < 1.0 && <AlertTriangle className="w-4 h-4 text-red-500 animate-bounce" />}
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-blue-400">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </GlassCard>
        </div>
    );
}
