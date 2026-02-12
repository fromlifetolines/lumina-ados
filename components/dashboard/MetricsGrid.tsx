'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { getAggregatedMetrics } from '@/lib/mockData';
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, Activity, MousePointer } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export const MetricsGrid = () => {
    const data = getAggregatedMetrics();
    // Get last 7 days for sparkline
    const sparkData = data.slice(-7);

    // Calculate totals
    const totalSpend = data.reduce((acc, curr) => acc + curr.spend, 0);
    const totalRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0);
    const blendedRoas = totalSpend > 0 ? totalRevenue / totalSpend : 0;
    const totalTraffic = data.reduce((acc, curr) => acc + curr.clicks, 0); // simplistic proxy

    const metrics = [
        {
            label: 'Total Spend',
            value: `$${totalSpend.toLocaleString()}`,
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign,
            color: 'text-blue-400',
            dataKey: 'spend'
        },
        {
            label: 'Blended ROAS',
            value: blendedRoas.toFixed(2),
            change: '-2.1%',
            trend: 'down',
            icon: TrendingUp,
            color: blendedRoas > 3 ? 'text-green-400' : 'text-yellow-400',
            dataKey: 'roas'
        },
        {
            label: 'Total Revenue',
            value: `$${totalRevenue.toLocaleString()}`,
            change: '+8.2%',
            trend: 'up',
            icon: Activity,
            color: 'text-purple-400',
            dataKey: 'revenue'
        },
        {
            label: 'SEO Traffic',
            value: totalTraffic.toLocaleString(),
            change: '+5.4%',
            trend: 'up',
            icon: MousePointer, // Proxy for traffic
            color: 'text-pink-400',
            dataKey: 'clicks'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
                <GlassCard key={index} className="relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-400 text-sm font-medium">{metric.label}</p>
                            <h3 className="text-2xl font-bold text-white mt-1">{metric.value}</h3>
                        </div>
                        <div className={`p-2 rounded-lg bg-white/5 ${metric.color}`}>
                            <metric.icon className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <span className={`flex items-center text-xs font-medium ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                            {metric.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                            {metric.change}
                        </span>
                        <span className="text-gray-500 text-xs">vs last month</span>
                    </div>

                    {/* Sparkline */}
                    <div className="h-12 w-full absolute bottom-0 left-0 right-0 opacity-30 group-hover:opacity-50 transition-opacity">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={sparkData}>
                                <Line
                                    type="monotone"
                                    dataKey={metric.dataKey}
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    dot={false}
                                    className={metric.color}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>
            ))}
        </div>
    );
};
