'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { useTranslation } from '@/lib/i18n';
import { Header } from '@/components/dashboard/Header';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
    AreaChart, Area, ComposedChart, Line
} from 'recharts';

const platformRoiData = [
    { name: 'Meta', roi: 3.5, spend: 5000 },
    { name: 'Google', roi: 4.8, spend: 3000 },
    { name: 'TikTok', roi: 2.1, spend: 2000 },
];

const funnelData = [
    { name: 'Impressions', value: 100000 },
    { name: 'Clicks', value: 2500 },
    { name: 'Add to Cart', value: 400 },
    { name: 'Purchase', value: 120 },
];

const trendData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    cpa: 20 + Math.random() * 15,
    conversions: 10 + Math.random() * 20
}));

export default function AnalyticsPage() {
    const { t } = useTranslation();

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <Header />
            <h2 className="text-2xl font-bold text-white mb-6">{t('analytics')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Chart 1: Platform Battle (ROI) */}
                <GlassCard>
                    <h3 className="text-xl font-bold text-white mb-4">{t('platform_battle')}</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={platformRoiData} layout="vertical" margin={{ left: 20 }}>
                                <XAxis type="number" stroke="#9ca3af" />
                                <YAxis dataKey="name" type="category" stroke="#fff" width={60} />
                                <Tooltip contentStyle={{ backgroundColor: '#0a0a1e', border: '1px solid rgba(255,255,255,0.1)' }} />
                                <Legend />
                                <Bar dataKey="roi" fill="#3b82f6" name="ROI (x)" radius={[0, 4, 4, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Chart 2: Conversion Funnel */}
                <GlassCard>
                    <h3 className="text-xl font-bold text-white mb-4">{t('conversion_funnel')}</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={funnelData}>
                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip contentStyle={{ backgroundColor: '#0a0a1e', border: '1px solid rgba(255,255,255,0.1)' }} />
                                <Bar dataKey="value" fill="#ec4899" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Chart 3: CPA Trend Line */}
                <GlassCard>
                    <h3 className="text-xl font-bold text-white mb-4">{t('cpa_trend')} (30 Days)</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={trendData}>
                                <XAxis dataKey="day" stroke="#9ca3af" />
                                <YAxis yAxisId="left" stroke="#10b981" label={{ value: 'Conv.', angle: -90, position: 'insideLeft' }} />
                                <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" label={{ value: 'CPA ($)', angle: 90, position: 'insideRight' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#0a0a1e', border: '1px solid rgba(255,255,255,0.1)' }} />
                                <Area yAxisId="left" type="monotone" dataKey="conversions" fill="#10b981" fillOpacity={0.2} stroke="#10b981" />
                                <Line yAxisId="right" type="monotone" dataKey="cpa" stroke="#f59e0b" strokeWidth={2} dot={false} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Chart 4: Heatmap Placeholer (Simplistic Table for now) */}
                <GlassCard>
                    <h3 className="text-xl font-bold text-white mb-4">{t('heatmap')}</h3>
                    <div className="h-[300px] flex items-center justify-center bg-white/5 rounded-xl border border-white/5">
                        <div className="text-center">
                            <p className="text-gray-400 mb-2">Peak Purchase Time</p>
                            <p className="text-4xl font-bold text-white">21:00 - 23:00</p>
                            <p className="text-blue-400 mt-2">Wednesdays & Fridays</p>
                        </div>
                    </div>
                </GlassCard>

            </div>
        </div>
    );
}
