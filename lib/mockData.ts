import { format, subDays } from 'date-fns';

export type PlatformId = 'meta' | 'google' | 'youtube' | 'tiktok' | 'twitter' | 'linkedin' | 'line';

export interface DailyMetric {
    date: string;
    spend: number;
    revenue: number;
    impressions: number;
    clicks: number;
    conversions: number;
    // Platform specific metrics (optional)
    roas?: number;
    cpa?: number;
    frequency?: number;
    cpc?: number;
    viewRate?: number;
    cpv?: number;
    engagementRate?: number;
    openRate?: number; // LINE
}

export interface PlatformData {
    id: PlatformId;
    name: string;
    color: string;
    metrics: DailyMetric[];
    currentMonth: {
        spend: number;
        revenue: number;
        roas: number;
        // Specifics
        [key: string]: number | string;
    };
}

// Helper to generate random data
const generateData = (days: number, baseSpend: number, roasMean: number): DailyMetric[] => {
    return Array.from({ length: days }).map((_, i) => {
        const date = format(subDays(new Date(), days - 1 - i), 'yyyy-MM-dd');
        const spend = baseSpend * (0.8 + Math.random() * 0.4); // +/- 20% variance
        const roas = roasMean * (0.7 + Math.random() * 0.6);
        const revenue = spend * roas;
        const impressions = spend * (100 + Math.random() * 50);
        const clicks = impressions * (0.01 + Math.random() * 0.02);
        const conversions = clicks * (0.05 + Math.random() * 0.05);

        return {
            date,
            spend: Math.round(spend),
            revenue: Math.round(revenue),
            impressions: Math.round(impressions),
            clicks: Math.round(clicks),
            conversions: Math.round(conversions),
            roas: parseFloat(roas.toFixed(2)),
            cpa: conversions > 0 ? parseFloat((spend / conversions).toFixed(2)) : 0,
        };
    });
};

const DAYS_TO_GENERATE = 30;

// 1. Meta (FB/IG) - High Traffic, Moderate ROAS
const metaMetrics = generateData(DAYS_TO_GENERATE, 15000, 3.5);

// 2. Google (Ads/GA4) - High Intent, High ROAS, High CPC
const googleMetrics = generateData(DAYS_TO_GENERATE, 12000, 4.2);

// 3. YouTube - High Impressions, Low direct ROAS (Awareness)
const youtubeMetrics = generateData(DAYS_TO_GENERATE, 8000, 1.5).map(m => ({
    ...m,
    viewRate: 0.35 + Math.random() * 0.1,
    cpv: 0.5 + Math.random() * 0.5
}));

// 4. TikTok - High Engagement, Volatile ROAS
const tiktokMetrics = generateData(DAYS_TO_GENERATE, 10000, 2.8).map(m => ({
    ...m,
    engagementRate: 0.05 + Math.random() * 0.05
}));

// 5. Twitter (X) - Low Spend, B2B focus
const twitterMetrics = generateData(DAYS_TO_GENERATE, 3000, 1.8);

// 6. LinkedIn - High CPC, High CPL, B2B Quality
const linkedinMetrics = generateData(DAYS_TO_GENERATE, 5000, 2.5).map(m => ({
    ...m,
    cpc: 150 + Math.random() * 50 // High CPC
}));

// 7. LINE OA - High Open Rate, Retention focus
const lineMetrics = generateData(DAYS_TO_GENERATE, 2000, 5.0).map(m => ({
    ...m,
    openRate: 0.4 + Math.random() * 0.2
}));

export const platforms: Record<PlatformId, PlatformData> = {
    meta: {
        id: 'meta',
        name: 'Meta',
        color: '#3b82f6', // Blue
        metrics: metaMetrics,
        currentMonth: {
            spend: metaMetrics.reduce((a, b) => a + b.spend, 0),
            revenue: metaMetrics.reduce((a, b) => a + b.revenue, 0),
            roas: 3.5,
            avgFrequency: 2.1,
        }
    },
    google: {
        id: 'google',
        name: 'Google',
        color: '#ea4335', // Red
        metrics: googleMetrics,
        currentMonth: {
            spend: googleMetrics.reduce((a, b) => a + b.spend, 0),
            revenue: googleMetrics.reduce((a, b) => a + b.revenue, 0),
            roas: 4.2,
            searchImpressionShare: '75%',
        }
    },
    youtube: {
        id: 'youtube',
        name: 'YouTube',
        color: '#ff0000', // Red
        metrics: youtubeMetrics,
        currentMonth: {
            spend: youtubeMetrics.reduce((a, b) => a + b.spend, 0),
            revenue: youtubeMetrics.reduce((a, b) => a + b.revenue, 0),
            roas: 1.5,
            avgCpv: 0.8,
        }
    },
    tiktok: {
        id: 'tiktok',
        name: 'TikTok',
        color: '#000000', // Black/Pink/Cyan (Handling later)
        metrics: tiktokMetrics,
        currentMonth: {
            spend: tiktokMetrics.reduce((a, b) => a + b.spend, 0),
            revenue: tiktokMetrics.reduce((a, b) => a + b.revenue, 0),
            roas: 2.8,
            avgEngagement: '5.2%',
        }
    },
    twitter: {
        id: 'twitter',
        name: 'X (Twitter)',
        color: '#1da1f2', // Sky Blue
        metrics: twitterMetrics,
        currentMonth: {
            spend: twitterMetrics.reduce((a, b) => a + b.spend, 0),
            revenue: twitterMetrics.reduce((a, b) => a + b.revenue, 0),
            roas: 1.8,
            cpm: 80,
        }
    },
    linkedin: {
        id: 'linkedin',
        name: 'LinkedIn',
        color: '#0077b5', // LinkedIn Blue
        metrics: linkedinMetrics,
        currentMonth: {
            spend: linkedinMetrics.reduce((a, b) => a + b.spend, 0),
            revenue: linkedinMetrics.reduce((a, b) => a + b.revenue, 0),
            roas: 2.5,
            leadQualityScore: 8.5,
        }
    },
    line: {
        id: 'line',
        name: 'LINE',
        color: '#00c300', // LINE Green
        metrics: lineMetrics,
        currentMonth: {
            spend: lineMetrics.reduce((a, b) => a + b.spend, 0),
            revenue: lineMetrics.reduce((a, b) => a + b.revenue, 0),
            roas: 5.0,
            blockRate: '1.2%',
        }
    },
};

export const getBlendedMetrics = (activePlatforms: PlatformId[] = Object.keys(platforms) as PlatformId[]) => {
    // Combine daily metrics from all active platforms
    const blendedMap = new Map<string, DailyMetric>();

    activePlatforms.forEach(pid => {
        const pData = platforms[pid];
        pData.metrics.forEach(m => {
            const existing = blendedMap.get(m.date) || {
                date: m.date,
                spend: 0,
                revenue: 0,
                impressions: 0,
                clicks: 0,
                conversions: 0
            };

            blendedMap.set(m.date, {
                date: m.date,
                spend: existing.spend + m.spend,
                revenue: existing.revenue + m.revenue,
                impressions: existing.impressions + m.impressions,
                clicks: existing.clicks + m.clicks,
                conversions: existing.conversions + m.conversions,
                roas: (existing.revenue + m.revenue) / (existing.spend + m.spend || 1), // Recalc blended ROAS
                cpa: (existing.spend + m.spend) / (existing.conversions + m.conversions || 1) // Recalc blended CPA
            });
        });
    });

    return Array.from(blendedMap.values()).sort((a, b) => a.date.localeCompare(b.date));
};
