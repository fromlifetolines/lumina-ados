'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { useTranslation } from '@/lib/i18n';
import { ArrowUpRight, ArrowDownRight, DollarSign, Activity, BarChart2, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mini Sparkline Component
const Sparkline = ({ color, data }: { color: string, data: any[] }) => (
    <div className="h-12 w-24">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
                <defs>
                    <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                        <stop offset="100%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    fill={`url(#gradient-${color})`}
                    strokeWidth={2}
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

// Mock sparkline data (random)
const generateSparkData = () => Array.from({ length: 10 }, () => ({ value: Math.random() * 100 }));

interface MetricsGridProps {
    spend: number;
    revenue: number;
    roas: number;
    traffic: number;
    formatCurrency: (amount: number) => string;
}

export const MetricsGrid = ({ spend, revenue, roas, traffic, formatCurrency }: MetricsGridProps) => {
    const { t } = useTranslation();

    const metrics = [
        {
            title: t('total_spend'),
            value: formatCurrency(spend),
            change: "+12.5%",
            isPositive: true,
            icon: DollarSign,
            color: "#ef4444", // Red
            sparkData: generateSparkData()
        },
        {
            title: t('total_revenue'),
            value: formatCurrency(revenue),
            change: "+8.2%",
            isPositive: true,
            icon: Activity,
            color: "#10b981", // Green
            sparkData: generateSparkData()
        },
        {
            title: t('roas'),
            value: `${roas.toFixed(2)}x`,
            change: "-2.1%",
            isPositive: false,
            icon: BarChart2,
            color: "#f59e0b", // Amber
            sparkData: generateSparkData()
        },
        {
            title: t('traffic_overview'), // Using traffic overview as proxy for "Impressions"
            value: new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(traffic),
            change: "+15.3%",
            isPositive: true,
            icon: TrendingUp,
            color: "#3b82f6", // Blue
            sparkData: generateSparkData()
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
                <GlassCard key={index} className="relative group overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all duration-500"></div>

                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                            <metric.icon className="w-5 h-5 text-gray-300" />
                        </div>
                        <Sparkline color={metric.color} data={metric.sparkData} />
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-sm text-gray-400 font-medium">{metric.title}</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white tracking-tight">
                                {metric.value}
                            </span>
                            <span className={cn(
                                "text-xs font-bold flex items-center",
                                metric.isPositive ? "text-green-400" : "text-red-400"
                            )}>
                                {metric.isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                                {metric.change}
                            </span>
                        </div>
                    </div>

                    {/* Progress Bar (Visual flair) */}
                    <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ width: `${60 + Math.random() * 30}%`, backgroundColor: metric.color }}
                        ></div>
                    </div>
                </GlassCard>
            ))}
        </div>
    );
};
