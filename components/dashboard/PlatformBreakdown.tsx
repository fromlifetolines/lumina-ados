'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { platforms, PlatformId } from '@/lib/mockData';
import { PlatformIcon } from '@/components/ui/platform-icon';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell, YAxis } from 'recharts';
import { useTranslation } from '@/lib/i18n';
import { useCurrency } from '@/lib/currency';

export const PlatformBreakdown = () => {
    const { t } = useTranslation();
    const { format } = useCurrency();

    // Prepare data for "Short Video Wars" (TikTok vs YouTube)
    const videoData = [
        {
            name: 'TikTok',
            engagement: parseFloat(platforms.tiktok.currentMonth.avgEngagement as string || '0'),
            color: '#000000'
        },
        {
            name: 'YouTube',
            engagement: ((platforms.youtube.currentMonth.avgCpv as number) || 0) * 5, // Mock conversion for visualization scaling
            color: '#ff0000'
        },
    ];

    // Prepare data for "Top Platforms ROAS"
    const roasData = (Object.keys(platforms) as PlatformId[]).map(pid => ({
        name: platforms[pid].name,
        roas: platforms[pid].currentMonth.roas,
        color: platforms[pid].color
    })).sort((a, b) => b.roas - a.roas);

    return (
        <GlassCard className="space-y-8">
            <h3 className="text-xl font-bold text-white mb-6">{t('platform_battle')}</h3>

            {/* 1. ROAS Comparison (Bar Chart) */}
            <div>
                <h4 className="text-sm text-gray-400 mb-4 uppercase tracking-wider">ROAS Leaderboard</h4>
                <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={roasData} layout="vertical" margin={{ left: 40 }}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={80} stroke="#fff" fontSize={12} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                                cursor={{ fill: 'transparent' }}
                            />
                            <Bar dataKey="roas" radius={[0, 4, 4, 0]} barSize={20}>
                                {roasData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 2. Short Video Wars */}
            <div className="pt-6 border-t border-white/5">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm text-gray-400 uppercase tracking-wider">{t('short_video_wars')}</h4>
                    <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Engagement Rate</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex-1 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="flex items-center gap-2 text-white"><PlatformIcon platform="tiktok" className="w-4 h-4" /> TikTok</span>
                            <span className="font-bold text-white">5.2%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-400 w-[75%] shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                        </div>
                    </div>
                    <div className="text-gray-500 font-bold">VS</div>
                    <div className="flex-1 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="flex items-center gap-2 text-white"><PlatformIcon platform="youtube" className="w-4 h-4" /> YouTube</span>
                            <span className="font-bold text-white">3.8%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-red-600 w-[55%] shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Meta vs Google Summary */}
            <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-600/10 rounded-xl border border-blue-600/20">
                    <div className="flex items-center gap-2 mb-2">
                        <PlatformIcon platform="meta" className="w-5 h-5" />
                        <span className="text-blue-400 font-bold">Meta</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{format(platforms.meta.currentMonth.revenue)}</p>
                    <p className="text-xs text-gray-400">Total Revenue</p>
                </div>
                <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                    <div className="flex items-center gap-2 mb-2">
                        <PlatformIcon platform="google" className="w-5 h-5" />
                        <span className="text-red-400 font-bold">Google</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{format(platforms.google.currentMonth.revenue)}</p>
                    <p className="text-xs text-gray-400">Total Revenue</p>
                </div>
            </div>
        </GlassCard>
    );
};
