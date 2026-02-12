'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { mockData, getAggregatedMetrics } from '@/lib/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from '@/lib/i18n';

export const MainChart = () => {
    const { t } = useTranslation();

    const data = getAggregatedMetrics().map(d => ({
        ...d,
        paidTraffic: d.clicks,
        organicTraffic: mockData.seo.metrics.find(m => m.date === d.date)?.clicks || 0,
    }));

    return (
        <GlassCard className="mb-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white">{t('traffic_overview')}</h3>
                    <p className="text-sm text-gray-400">{t('paid_vs_organic')}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        <span className="text-xs text-gray-300">Paid</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                        <span className="text-xs text-gray-300">Organic</span>
                    </div>
                </div>
            </div>

            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorOrg" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="#9ca3af"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => val.slice(5)}
                        />
                        <YAxis
                            stroke="#9ca3af"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => `${val}`}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'rgba(20, 20, 40, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            itemStyle={{ color: '#fff' }}
                            labelStyle={{ color: '#9ca3af', marginBottom: '8px' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="paidTraffic"
                            stroke="#3b82f6"
                            fillOpacity={1}
                            fill="url(#colorPaid)"
                            strokeWidth={3}
                        />
                        <Area
                            type="monotone"
                            dataKey="organicTraffic"
                            stroke="#8b5cf6"
                            fillOpacity={1}
                            fill="url(#colorOrg)"
                            strokeWidth={3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </GlassCard>
    );
};
