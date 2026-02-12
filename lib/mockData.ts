export interface DailyMetric {
    date: string;
    spend: number;
    revenue: number;
    roas: number;
    impressions: number;
    clicks: number;
}

export interface PlatformData {
    platform: 'Google' | 'Meta' | 'TikTok' | 'YouTube' | 'SEO';
    metrics: DailyMetric[];
    topCreatives?: { id: string; url: string; ctr: number; spend: number }[];
    topKeywords?: { keyword: string; impressions: number; position: number }[];
}

// Helper to generate random data
const generateDailyData = (days: number, baseSpend: number, roasRange: [number, number]): DailyMetric[] => {
    const data: DailyMetric[] = [];
    const today = new Date();

    for (let i = days; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        const volatility = 0.2; // 20% variance
        const spend = baseSpend * (1 + (Math.random() * volatility - volatility / 2));
        const roas = roasRange[0] + Math.random() * (roasRange[1] - roasRange[0]);
        const revenue = spend * roas;
        const cpc = 0.5 + Math.random() * 1.5;
        const clicks = Math.round(spend / cpc);
        const ctr = 0.01 + Math.random() * 0.04;
        const impressions = Math.round(clicks / ctr);

        data.push({
            date: dateStr,
            spend: Math.round(spend),
            revenue: Math.round(revenue),
            roas: Number(roas.toFixed(2)),
            impressions,
            clicks
        });
    }
    return data;
};

export const mockData = {
    google: {
        platform: 'Google',
        metrics: generateDailyData(30, 500, [3.5, 5.0]), // High ROAS
    },
    meta: {
        platform: 'Meta',
        metrics: generateDailyData(30, 800, [2.0, 3.5]), // Moderate ROAS, higher spend
        topCreatives: [
            { id: 'c1', url: '/images/ad1.jpg', ctr: 2.1, spend: 5000 },
            { id: 'c2', url: '/images/ad2.jpg', ctr: 1.8, spend: 3200 },
            { id: 'c3', url: '/images/ad3.jpg', ctr: 3.5, spend: 1200 },
        ]
    },
    tiktok: {
        platform: 'TikTok',
        metrics: generateDailyData(30, 300, [1.5, 4.0]), // Volatile
    },
    seo: {
        platform: 'SEO',
        metrics: generateDailyData(30, 0, [0, 0]).map(m => ({ ...m, revenue: m.clicks * 1.5, roas: 0 })), // Organic revenue approx
        topKeywords: [
            { keyword: 'luxury dashboard', impressions: 1200, position: 1.2 },
            { keyword: 'ad analytics', impressions: 850, position: 3.4 },
            { keyword: 'marketing crm', impressions: 600, position: 5.1 },
        ]
    }
};

export const getAggregatedMetrics = () => {
    const combined: Record<string, DailyMetric> = {};

    [mockData.google, mockData.meta, mockData.tiktok, mockData.seo].forEach(platform => {
        platform.metrics.forEach(day => {
            if (!combined[day.date]) {
                combined[day.date] = { date: day.date, spend: 0, revenue: 0, roas: 0, impressions: 0, clicks: 0 };
            }
            combined[day.date].spend += day.spend;
            combined[day.date].revenue += day.revenue;
            combined[day.date].impressions += day.impressions;
            combined[day.date].clicks += day.clicks;
        });
    });

    // Recalculate blended ROAS
    Object.values(combined).forEach(day => {
        day.roas = day.spend > 0 ? Number((day.revenue / day.spend).toFixed(2)) : 0;
    });

    return Object.values(combined).sort((a, b) => a.date.localeCompare(b.date));
};
