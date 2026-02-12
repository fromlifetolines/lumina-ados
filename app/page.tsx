import { Header } from '@/components/dashboard/Header';
import { MetricsGrid } from '@/components/dashboard/MetricsGrid';
import { MainChart } from '@/components/dashboard/MainChart';
import { PlatformBreakdown } from '@/components/dashboard/PlatformBreakdown';
import { ScenarioPlanner } from '@/components/dashboard/ScenarioPlanner';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <Header />
      <MetricsGrid />
      <MainChart />
      <PlatformBreakdown />
      <ScenarioPlanner />
    </div>
  );
}
