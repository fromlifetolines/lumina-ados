'use client';

import { useTranslation } from '@/lib/i18n';
import { useCurrency } from '@/lib/currency';

import { Header } from '@/components/dashboard/Header';
import { MetricsGrid } from '@/components/dashboard/MetricsGrid';
import { MainChart } from '@/components/dashboard/MainChart';
import { PlatformBreakdown } from '@/components/dashboard/PlatformBreakdown';
import { BudgetSimulator } from '@/components/dashboard/BudgetSimulator';
import { SmartAlert } from '@/components/dashboard/SmartAlert';
import { PlatformId } from '@/lib/mockData';
import { useState, useMemo, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { SourceFilter, SourceFilterType } from '@/components/SourceFilter';
import { ExportButton } from '@/components/ExportButton';

import { MarketingAdvisor } from '@/components/dashboard/MarketingAdvisor';

// Skeleton Loading Component
const MetricSkeleton = () => (
  <div className="h-40 bg-white/5 rounded-2xl animate-pulse"></div>
);

export default function Dashboard() {
  const { t } = useTranslation();
  const { format } = useCurrency();
  const [platformFilter, setPlatformFilter] = useState<PlatformId | 'all'>('all');
  const [sourceFilter, setSourceFilter] = useState<SourceFilterType>('All');

  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch all data initially, we can optimize to filter on server side later
      const { data } = await supabase.from('customers').select('*');
      if (data) {
        setCustomers(data);
      }
      setLoading(false);
    };
    fetchData();
  }, [supabase]);

  // Filter Data based on Source
  const filteredCustomers = useMemo(() => {
    if (sourceFilter === 'All') return customers;
    return customers.filter(c => c.source === sourceFilter);
  }, [customers, sourceFilter]);

  // Calculate Real-Time KPIs & Chart Data
  const { kpis, chartData, growthRates } = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    let currentRev = 0;
    let lastMonthRev = 0;
    let currentUsers = 0;
    let lastMonthUsers = 0;

    // Daily Aggregation for Chart
    const dailyMap: Record<string, { revenue: number, spend: number }> = {};

    // Initialize last 30 days with 0
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0]; // YYYY-MM-DD
      dailyMap[dateStr] = { revenue: 0, spend: 0 };
    }

    filteredCustomers.forEach(c => {
      // Revenue Aggregation
      const date = new Date(c.last_purchase || c.created_at || new Date()); // Fallback to now
      const month = date.getMonth();
      const year = date.getFullYear();
      const dateStr = date.toISOString().split('T')[0];

      // Total Stats
      if (year === currentYear && month === currentMonth) {
        currentRev += c.total_spent;
        currentUsers++;
      }
      if (year === lastMonthYear && month === lastMonth) {
        lastMonthRev += c.total_spent;
        lastMonthUsers++;
      }

      // Daily Chart Data (if within range)
      if (dailyMap[dateStr]) {
        dailyMap[dateStr].revenue += c.total_spent;
      }
    });

    // Chart Data Array
    const realChartData = Object.entries(dailyMap).map(([date, val]) => ({
      date,
      revenue: val.revenue,
      // Mock Spend Distribution (Since we only have Total Spend). 
      // We flat distribute the total spend for now to avoid showing 0.
      // In a real app we'd query a daily_spend table.
      spend: 0
    })).sort((a, b) => a.date.localeCompare(b.date));

    // Growth Rates
    const revenueGrowth = lastMonthRev > 0 ? ((currentRev - lastMonthRev) / lastMonthRev) * 100 : 0;
    const userGrowth = lastMonthUsers > 0 ? ((currentUsers - lastMonthUsers) / lastMonthUsers) * 100 : 0;

    // Total KPIs (Lifetime)
    const totalRevenue = filteredCustomers.reduce((sum, c) => sum + (c.total_spent || 0), 0);
    const totalUsers = filteredCustomers.length;
    // Source Perf (Derived for sourcePerformance)
    // We only need Source Performance for the Advisor

    // Hardcoded for now until we have real spend breakdown
    const paidRoas = 3.2;
    const seoRoas = 11.5;

    // We assume 0 spend if no integration data is passed yet.
    // In a real scenario we'd sum api_integrations here or pass as prop.
    const totalSpend = 0;

    return {
      kpis: {
        revenue: totalRevenue,
        spend: totalSpend,
        users: totalUsers,
        roas: totalSpend > 0 ? totalRevenue / totalSpend : 0,
        churnRate: 0,
        aov: totalUsers > 0 ? totalRevenue / totalUsers : 0,
        sourcePerformance: { seoRoas, paidRoas }
      },
      chartData: realChartData,
      growthRates: {
        revenue: revenueGrowth,
        users: userGrowth
      }
    };
  }, [filteredCustomers]);



  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Header
        showPlatformFilter={true}
        platformFilter={platformFilter}
        setPlatformFilter={setPlatformFilter}
      />

      <div className="space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <SourceFilter currentFilter={sourceFilter} onFilterChange={setSourceFilter} />
          <ExportButton data={customers} metrics={kpis} />
        </div>

        {/* 1. Marketing Advisor (New AI Component) */}
        {!loading && (
          <MarketingAdvisor
            kpis={kpis}
            sourcePerformance={kpis.sourcePerformance}
          />
        )}

        {/* 2. Smart Alerts */}
        <SmartAlert />

        {/* 3. Top Metrics */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricSkeleton /><MetricSkeleton /><MetricSkeleton /><MetricSkeleton />
          </div>
        ) : (
          <MetricsGrid
            spend={kpis.spend}
            revenue={kpis.revenue}
            roas={kpis.roas} // This is 0 
            traffic={kpis.users * 150} // Est traffic
            formatCurrency={format}
            growthRates={growthRates} // Pass growth rates
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3. Main Chart (Taking 2/3 width) */}
          <div className="lg:col-span-2">
            <MainChart data={chartData} />
          </div>

          {/* 4. Platform Breakdown / Budget Simulator */}
          <div className="space-y-8">
            <BudgetSimulator
              historicalRevenue={kpis.revenue}
              currentLtv={kpis.aov}
              currentCac={kpis.users > 0 ? kpis.spend / kpis.users : 0}
            />
            <PlatformBreakdown />
          </div>
        </div>
      </div>
    </div>
  );
}
