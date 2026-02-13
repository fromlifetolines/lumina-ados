'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { useTranslation } from '@/lib/i18n';
import { Header } from '@/components/dashboard/Header';
import { BudgetSimulator } from '@/components/dashboard/BudgetSimulator';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import {
    ResponsiveContainer, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';
import { createClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useCurrency } from '@/lib/currency';

const radarData = [
    { subject: 'Cost', A: 120, B: 110, fullMark: 150 },
    { subject: 'Reach', A: 98, B: 130, fullMark: 150 },
    { subject: 'Conv.', A: 86, B: 130, fullMark: 150 },
    { subject: 'Retention', A: 99, B: 100, fullMark: 150 },
    { subject: 'Quality', A: 85, B: 90, fullMark: 150 },
    { subject: 'Speed', A: 65, B: 85, fullMark: 150 },
];

interface Customer {
    id: string;
    name: string;
    email: string;
    total_spent: number;
    status: 'Whale' | 'Promising' | 'At Risk';
    last_purchase: string;
    source: string; // Added source property
}

export default function AnalyticsPage() {
    const { t } = useTranslation();
    const { format } = useCurrency();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [sourceFilter, setSourceFilter] = useState('All'); // Added sourceFilter state
    // Filter Data based on Source
    // This logic is already correct, but we need to ensure the source filter component is working
    const filteredCustomers = useMemo(() => {
        if (sourceFilter === 'All') return customers;
        return customers.filter(c => c.source === sourceFilter);
    }, [customers, sourceFilter]);
    const [stats, setStats] = useState({
        totalRevenue: 0,
        aov: 0,
        churnRate: 0,
        totalCustomers: 0,
        ltvCac: 0
    });
    const supabase = createClient();

    useEffect(() => {
        const fetchData = async () => {
            // 1. Fetch Customers
            const { data: customerData } = await supabase
                .from('customers')
                .select('*')
                .order('total_spent', { ascending: false });

            // 2. Fetch Integrations (for Ad Spend)
            const { data: integrationData } = await supabase
                .from('api_integrations')
                .select('*');

            if (customerData) {
                setCustomers(customerData);

                // Calculate KPIs
                const totalRev = customerData.reduce((sum, c) => sum + (c.total_spent || 0), 0);
                const count = customerData.length;
                const atRisk = customerData.filter(c => c.status === 'At Risk').length;

                // Calculate Real CAC
                // Sum of all spend from api_integrations
                const totalSpend = integrationData ? integrationData.reduce((sum, i) => sum + (i.total_spend || 0), 0) : 0;
                // Avoid division by zero
                const avgCac = count > 0 ? totalSpend / count : 0;

                const ltv = count > 0 ? totalRev / count : 0;
                const ltvCac = avgCac > 0 ? ltv / avgCac : 0;

                setStats({
                    totalRevenue: totalRev,
                    aov: count > 0 ? totalRev / count : 0,
                    churnRate: count > 0 ? (atRisk / count) * 100 : 0,
                    totalCustomers: count,
                    ltvCac: ltvCac,
                    // Add extended stats if needed for props, or just use these
                });

                // We might need to store avgCac and ltv in state to pass to component effectively if stats doesn't capture them well enough
                // stats.ltvCac is ratio. We need raw LTV and CAC.
                // Let's rely on calculating them in render or adding to stats.
            }
        };

        fetchData();
    }, []);

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            <Header />
            <h2 className="text-2xl font-bold text-white mb-6">{t('analytics')}</h2>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-500/20 rounded-xl">
                            <DollarSign className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Total Revenue</p>
                            <p className="text-2xl font-bold text-white">{format(stats.totalRevenue)}</p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-xl">
                            <Activity className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
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
                            <BudgetSimulator
                                historicalRevenue={stats.totalRevenue}
                                currentLtv={stats.aov} // AOV is decent proxy for LTV if retention is 1. For now use AOV.
                                currentCac={stats.totalRevenue > 0 && stats.ltvCac > 0 ? stats.aov / stats.ltvCac : 50}
                            />
                        </div>

                    </div>

                    {/* SEO Performance Section */}
                    <GlassCard className="p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <TrendingUp className="w-32 h-32 text-white" />
                        </div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white">SEO Performance (Organic)</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="space-y-1">
                                <p className="text-sm text-gray-400">Avg. Position</p>
                                <p className="text-2xl font-bold text-white">3.2 <span className="text-xs text-green-400 ml-1">▲ 0.4</span></p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-gray-400">Organic Traffic</p>
                                <p className="text-2xl font-bold text-white">12.5k <span className="text-xs text-green-400 ml-1">▲ 15%</span></p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-gray-400">Organic CTR</p>
                                <p className="text-2xl font-bold text-white">4.8% <span className="text-xs text-gray-500 ml-1">-</span></p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-gray-400">High-Intent Keywords</p>
                                <p className="text-2xl font-bold text-white">84 <span className="text-xs text-green-400 ml-1">+12</span></p>
                            </div>
                        </div>
                    </GlassCard>

                    {/* CRM Data Table */}
                    <GlassCard className="overflow-hidden">
                        <div className="p-6 border-b border-white/10">
                            <h3 className="text-xl font-bold text-white">CRM Details</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-white/5 text-gray-400 text-sm uppercase">
                                        <th className="p-4">Customer</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Total Spent</th>
                                        <th className="p-4">Last Purchase</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {customers.map((customer) => (
                                        <tr key={customer.id} className="hover:bg-white/5 transition-colors text-sm text-gray-300">
                                            <td className="p-4">
                                                <div className="font-medium text-white">{customer.name}</div>
                                                <div className="text-xs text-gray-500">{customer.email}</div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${customer.status === 'Whale' ? 'bg-purple-500/20 text-purple-300' :
                                                    customer.status === 'At Risk' ? 'bg-red-500/20 text-red-300' :
                                                        'bg-blue-500/20 text-blue-300'
                                                    }`}>
                                                    {customer.status}
                                                </span>
                                            </td>
                                            <td className="p-4 font-mono text-white">
                                                {format(customer.total_spent)}
                                            </td>
                                            <td className="p-4 text-gray-400">
                                                {new Date(customer.last_purchase).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                    {customers.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-gray-500">
                                                Loading CRM data...
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </GlassCard>
            </div>
            );
}
