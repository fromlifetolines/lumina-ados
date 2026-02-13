'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { Lightbulb, TrendingUp, Activity } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface MarketingAdvisorProps {
    kpis: {
        revenue: number;
        spend: number;
        roas: number;
        churnRate: number;
        aov: number;
    };
    sourcePerformance: {
        seoRoas: number;
        paidRoas: number;
    }
}

export const MarketingAdvisor = ({ kpis, sourcePerformance }: MarketingAdvisorProps) => {
    const { t } = useTranslation();

    // AI Logic Section
    const recommendations = [];

    // 1. SEO vs Paid Check (Real Data Logic)
    // Logic: If SEO ROAS > Paid ROAS (indicating higher efficiency/conversion potential), suggest Programmatic SEO
    // We utilize the passed real-time ROAS metrics.
    const { seoRoas, paidRoas } = sourcePerformance;

    if (seoRoas > paidRoas) {
        recommendations.push({
            type: 'opportunity',
            title: 'AI 決策建議',
            message: '【實測建議】您的 SEO 轉化率高於廣告，建議參考 Howard 的『程式化 SEO』佈局來優化預算。',
            action: 'Action: Shift budget to Content.',
            impact: '預計可降低 15% 的整體 CAC',
            icon: TrendingUp,
            color: 'text-green-400',
            bg: 'bg-green-500/10',
            border: 'border-green-500/20'
        });
    }

    // 2. Low AOV Check (Real Data Logic)
    // Logic: If AOV < 150, suggest Competitor Keywords
    if (kpis.aov < 150) {
        recommendations.push({
            type: 'warning',
            title: 'AI 預算建議',
            message: '目前的客單價偏低。建議暫停 Meta 的廣泛投放，轉向 Google Search 的『競爭對手替代品 (Competitor Alternatives)』關鍵字，捕捉高意圖客群。',
            action: 'Action: Target High-Intent Keywords.',
            impact: '提升客單價 (AOV) 至 $200+',
            icon: Lightbulb,
            color: 'text-yellow-400',
            bg: 'bg-yellow-500/10',
            border: 'border-yellow-500/20'
        });
    }

    // 3. Churn Alert (Real Data Logic)
    if (kpis.churnRate > 10) {
        recommendations.push({
            type: 'alert',
            title: '流失預警',
            message: '【流失預警】客戶流失率過高。建議參考『行銷心學』中的再行銷邏輯，針對 Whale 客戶進行 EDM 觸及。',
            action: 'Action: Activate Win-back Campaign.',
            impact: '降低流失率至 5% 以下',
            icon: Activity,
            color: 'text-red-400',
            bg: 'bg-red-500/10',
            border: 'border-red-500/20'
        });
    }

    // 3. Fallback
    if (recommendations.length === 0) {
        recommendations.push({
            type: 'info',
            title: '平穩增長模式 (Steady Growth)',
            message: '目前各項指標健康。AI 建議您維持現有預算分配，並嘗試新的廣告素材以避免疲勞。',
            action: 'Recommendation: Refresh Creatives.',
            impact: '維持 3.5x ROAS',
            icon: Lightbulb,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20'
        });
    }

    return (
        <GlassCard className="lg:col-span-3 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>

            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg shadow-blue-500/20">
                    <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">Lumina AI Advisor</h3>
                    <p className="text-xs text-blue-200">Real-time Strategic Intelligence</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((rec, idx) => (
                    <div key={idx} className={cn("p-4 rounded-xl border flex gap-4 transition-all hover:bg-white/5", rec.bg, rec.border)}>
                        <div className={cn("mt-1", rec.color)}>
                            <rec.icon className="w-6 h-6" />
                        </div>
                        <div className="space-y-2">
                            <h4 className={cn("font-bold text-lg", rec.color)}>{rec.title}</h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {rec.message}
                            </p>
                            <div className="bg-black/20 p-3 rounded-lg border border-white/5 mt-2">
                                <p className="text-sm font-medium text-white mb-1">{rec.action}</p>
                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    {rec.impact}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
};
