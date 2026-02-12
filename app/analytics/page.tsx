'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { useTranslation } from '@/lib/i18n';
import { Header } from '@/components/dashboard/Header';
import { BudgetSimulator } from '@/components/dashboard/BudgetSimulator';
import { Badge } from 'lucide-react';
import {
    ResponsiveContainer, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';

const radarData = [
    { subject: 'Cost', A: 120, B: 110, fullMark: 150 },
    { subject: 'Reach', A: 98, B: 130, fullMark: 150 },
    { subject: 'Conv.', A: 86, B: 130, fullMark: 150 },
    { subject: 'Retention', A: 99, B: 100, fullMark: 150 },
    { subject: 'Quality', A: 85, B: 90, fullMark: 150 },
    { subject: 'Speed', A: 65, B: 85, fullMark: 150 },
];

export default function AnalyticsPage() {
    const { t } = useTranslation();

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            <Header />
            <h2 className="text-2xl font-bold text-white mb-6">{t('analytics')}</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Radar Chart: Cross Platform Comparison */}
                <GlassCard className="col-span-1 lg:col-span-1 min-h-[400px]">
                    <h3 className="text-xl font-bold text-white mb-4">Cross-Platform Radar</h3>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                <Radar name="Meta (FB/IG)" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                                <Radar name="Google Ads" dataKey="B" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                                <Legend />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Budget Simulator (Takes 2 columns) */}
                <div className="col-span-1 lg:col-span-2">
                    <BudgetSimulator />
                </div>

            </div>
        </div>
    );
}
