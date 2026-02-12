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
import { useState, useMemo } from 'react';

export default function Dashboard() {
  const { t } = useTranslation();
  const { format } = useCurrency();
  const [platformFilter, setPlatformFilter] = useState<PlatformId | 'all'>('all');

  // Memoize the blended data to avoid recalculations on every render
  const blendedData = useMemo(() => {
    const platformsToInclude = platformFilter === 'all'
      ? ['meta', 'google', 'youtube', 'tiktok', 'twitter', 'linkedin', 'line'] as PlatformId[]
      : [platformFilter];

    return getBlendedMetrics(platformsToInclude);
  }, [platformFilter]);

  // Calculate current totals from the blended data
  const currentTotals = useMemo(() => {
    const last30Days = blendedData.slice(-30);
    const totalSpend = last30Days.reduce((a, b) => a + b.spend, 0);
    const totalRevenue = last30Days.reduce((a, b) => a + b.revenue, 0);
    const totalImpressions = last30Days.reduce((a, b) => a + b.impressions, 0);
    const roas = totalSpend > 0 ? totalRevenue / totalSpend : 0;

    return { totalSpend, totalRevenue, totalImpressions, roas };
  }, [blendedData]);

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Header
        showPlatformFilter={true}
        platformFilter={platformFilter}
        setPlatformFilter={setPlatformFilter}
      />

      <div className="space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
        {/* 1. Smart Alerts */}
        <SmartAlert />

        {/* 2. Top Metrics (Passed as props to avoid prop drilling if possible, but for now assuming Context/Mock) */}
        {/* We need to update MetricsGrid to accept data props or override internal data */}
        <MetricsGrid
          spend={currentTotals.totalSpend}
          revenue={currentTotals.totalRevenue}
          roas={currentTotals.roas}
          traffic={currentTotals.totalImpressions} // Treating impressions as traffic proxy for now
          formatCurrency={format}
        />

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
