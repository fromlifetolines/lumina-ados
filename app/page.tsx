'use client';

import { useTranslation } from '@/lib/i18n';
import { useCurrency } from '@/lib/currency';

import { Header } from '@/components/dashboard/Header';
import { MetricsGrid } from '@/components/dashboard/MetricsGrid';
import { MainChart } from '@/components/dashboard/MainChart';
import { PlatformBreakdown } from '@/components/dashboard/PlatformBreakdown';
import { ScenarioPlanner } from '@/components/dashboard/ScenarioPlanner';
import { SmartAlert } from '@/components/dashboard/SmartAlert';
import { getBlendedMetrics, PlatformId } from '@/lib/mockData';
import { useState, useMemo, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { SourceFilter, SourceFilterType } from '@/components/SourceFilter';
import { ExportButton } from '@/components/ExportButton';
import { Loader2 } from 'lucide-react';

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
  }, []);

  // Filter Data based on Source
  const filteredCustomers = useMemo(() => {
    if (sourceFilter === 'All') return customers;
    return customers.filter(c => c.source === sourceFilter);
  }, [customers, sourceFilter]);

  // Calculate Real-Time KPIs from filtered data
  const kpis = useMemo(() => {
    const totalSpend = filteredCustomers.reduce((sum, c) => sum + (c.total_spent || 0), 0); // Using total_spent as proxy for "Spend" (simplified for this demo, in real adtech spend != revenue)
    // In a real scenario, we'd have a separate 'ad_spend' table. For this 'Intelligence Engine' demo, we'll assume a 400% ROAS to derive Revenue from User Spend.
    // Wait, let's reverse it. 'customers.total_spent' is what they paid us (Revenue). 
    // So Revenue = total_spent.
    // Ad Spend (Cost) = Revenue / 3.5 (Approx ROAS).

    const revenue = filteredCustomers.reduce((sum, c) => sum + (c.total_spent || 0), 0);
    const spend = revenue / 3.5; // Simulated Ad Spend based on industry standard ROAS
    const users = filteredCustomers.length;
    const whaleCount = filteredCustomers.filter(c => c.status === 'Whale').length;
    const roas = spend > 0 ? revenue / spend : 0;

    return {
      revenue,
      spend,
      roas,
      users,
      whaleCount
    };
  }, [filteredCustomers]);


  // Memoize the blended data (Mock Chart Data - still widely used for the visual chart as we don't have time-series DB yet)
  const blendedData = useMemo(() => {
    const platformsToInclude = platformFilter === 'all'
      ? ['meta', 'google', 'youtube', 'tiktok', 'twitter', 'linkedin', 'line'] as PlatformId[]
      : [platformFilter];

    return getBlendedMetrics(platformsToInclude);
  }, [platformFilter]);

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

        {/* 1. Smart Alerts */}
        <SmartAlert />

        {/* 2. Top Metrics */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricSkeleton /><MetricSkeleton /><MetricSkeleton /><MetricSkeleton />
          </div>
        ) : (
          <MetricsGrid
            spend={kpis.spend}
            revenue={kpis.revenue}
            roas={kpis.roas}
            traffic={kpis.users * 120} // Simulated Traffic = Users * 120
            formatCurrency={format}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3. Main Chart (Taking 2/3 width) */}
          <div className="lg:col-span-2">
            <MainChart data={blendedData} />
          </div>

          {/* 4. Platform Breakdown / Scenario Planner */}
          <div className="space-y-8">
            <ScenarioPlanner />
            <PlatformBreakdown />
          </div>
        </div>
      </div>
    </div>
  );
}
