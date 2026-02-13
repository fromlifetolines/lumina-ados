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

'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { useTranslation } from '@/lib/i18n';
import { useCurrency } from '@/lib/currency';
import { PlatformIcon } from '@/components/ui/platform-icon';
import { Header } from '@/components/dashboard/Header';
import { PlatformId } from '@/lib/mockData';
import { AlertTriangle, TrendingUp, Zap, PauseCircle, Search, Database, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';

// Type definition for Campaign
interface Campaign {
    id: number;
    name: string;
    platform: PlatformId;
    status: 'Active' | 'Paused' | 'Archived';
    budget: number;
    spent: number;
    roas: number;
    ctr: number;
}

export default function CampaignsPage() {
    const { t } = useTranslation();
    const { format } = useCurrency();
    const supabase = createClient();

    // State
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<PlatformId | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAction, setSelectedAction] = useState<{ type: 'optimize' | 'scale', id: number } | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    // Fetch Data
    const fetchCampaigns = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from('campaigns')
                .select('*')
                .order('id', { ascending: true });

            if (error) throw error;
            setCampaigns(data as Campaign[]);
        } catch (err: any) {
            console.error('Error fetching campaigns:', err);
            // Detect if table likely doesn't exist
            if (err.message?.includes('does not exist') || err.code === '42P01') {
                setError('system_init_required');
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    // Actions
    const handleAction = async () => {
        if (!selectedAction) return;
        setActionLoading(true);

        try {
            if (selectedAction.type === 'optimize') {
                // Logic: "Optimize" -> If ROAS < 2, maybe pause it or reduce budget? 
                // Let's say we reduce budget by 20% to cut waste, OR we just set status to Paused?
                // For this demo, let's "Pause" inefficient campaigns.
                const { error } = await supabase
                    .from('campaigns')
                    .update({ status: 'Paused' })
                    .eq('id', selectedAction.id);
                if (error) throw error;
            } else {
                // Logic: "Scale" -> Increase budget by 20%
                // First get current budget
                const current = campaigns.find(c => c.id === selectedAction.id);
                if (current) {
                    const newBudget = Math.floor(current.budget * 1.2);
                    const { error } = await supabase
                        .from('campaigns')
                        .update({ budget: newBudget })
                        .eq('id', selectedAction.id);
                    if (error) throw error;
                }
            }

            // Refresh data
            await fetchCampaigns();
            setSelectedAction(null);
        } catch (err: any) {
            alert('Action failed: ' + err.message);
        } finally {
            setActionLoading(false);
        }
    };

    // Filtering
    const filteredCampaigns = campaigns.filter(c => {
        const matchesFilter = filter === 'all' || c.platform === filter;
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (error === 'system_init_required') {
        return (
            <div className="min-h-screen flex items-center justify-center p-8">
                <GlassCard className="max-w-2xl w-full p-8 text-center space-y-6">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto">
                        <Database className="w-8 h-8 text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">System Initialization Required</h2>
                    <p className="text-gray-300">
                        The <code>campaigns</code> database table was not found. To enable real campaign management, please execute the setup script in your Supabase SQL Editor.
                    </p>
                    <div className="bg-black/30 p-4 rounded-xl text-left overflow-x-auto">
                        <code className="text-xs text-green-400 font-mono whitespace-pre">
                            -- Copy from supabase/setup_campaigns.sql
                        </code>
                    </div>
                    <button
                        onClick={fetchCampaigns}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all"
                    >
                        <RefreshCw className="w-4 h-4 inline mr-2" />
                        I have run the SQL, Retry
                    </button>
                </GlassCard>
            </div>
        );
    }

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
                        placeholder={t('search_campaigns') || "Search campaigns..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="glass-input pl-10 w-64"
                    />
                </div>
            </div>

            <GlassCard className="p-0 overflow-hidden min-h-[400px]">
                {loading ? (
                    <div className="flex items-center justify-center h-full min-h-[300px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                ) : filteredCampaigns.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-400">
                        <Search className="w-12 h-12 mb-4 opacity-50" />
                        <p>No campaigns found matching your criteria.</p>
                    </div>
                ) : (
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
                                                    {campaign.status}
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
                                                        title={t('ai_opt_recommended')}
                                                    >
                                                        <Zap className="w-4 h-4" />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => setSelectedAction({ type: 'scale', id: campaign.id })}
                                                        className="p-2 bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white rounded-lg transition-colors"
                                                        title={t('scale_budget')}
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
                )}
            </GlassCard>

            {/* Action Logic Modal (Real) */}
            <AnimatePresence>
                {selectedAction && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => !actionLoading && setSelectedAction(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0f172a] border border-white/10 p-8 rounded-2xl max-w-md w-full shadow-2xl relative"
                        >
                            <h3 className="text-xl font-bold text-white mb-4">
                                {selectedAction.type === 'optimize' ? t('ai_optimization') : t('scale_campaign')}
                            </h3>

                            <div className="space-y-4 mb-8">
                                {selectedAction.type === 'optimize' ? (
                                    <p className="text-gray-300">
                                        {t('ai_opt_insight') || "AI detects low performance. Action: Pause this campaign to prevent wasted ad spend?"}
                                    </p>
                                ) : (
                                    <p className="text-gray-300">
                                        {t('scale_insight') || "High performance detected. Action: Increase budget by 20% to maximize scaling?"}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-4">
                                <button
                                    disabled={actionLoading}
                                    className={cn(
                                        "flex-1 py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2",
                                        selectedAction.type === 'optimize' ? "bg-red-600 hover:bg-red-500" : "bg-green-600 hover:bg-green-500",
                                        actionLoading && "opacity-50 cursor-not-allowed"
                                    )}
                                    onClick={handleAction}
                                >
                                    {actionLoading && <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />}
                                    {selectedAction.type === 'optimize' ? t('apply_fix') : t('confirm_increase')}
                                </button>
                                <button
                                    disabled={actionLoading}
                                    className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-gray-400 font-bold"
                                    onClick={() => setSelectedAction(null)}
                                >
                                    {t('cancel')}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
