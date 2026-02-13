export type PlatformKey = 'meta' | 'google' | 'youtube' | 'tiktok';

export interface PlatformConfig {
    id: PlatformKey;
    name: string;
    roas: number;
    budget: number;
    color: string;
}

export const INITIAL_CONFIGS: Record<PlatformKey, PlatformConfig> = {
    meta: { id: 'meta', name: 'Meta', roas: 3.5, budget: 15000, color: '#3b82f6' },
    google: { id: 'google', name: 'Google', roas: 4.2, budget: 12000, color: '#ea4335' },
    youtube: { id: 'youtube', name: 'YouTube', roas: 1.5, budget: 8000, color: '#ff0000' },
    tiktok: { id: 'tiktok', name: 'TikTok', roas: 2.8, budget: 10000, color: '#000000' },
};

export const calculateProjection = (
    allocations: Record<PlatformKey, number>,
    baseConfigs: Record<PlatformKey, PlatformConfig>
) => {
    let totalRevenue = 0;
    let totalBudget = 0;
    let initialRevenue = 0;

    // Calculate initial revenue based on baseConfigs
    Object.values(baseConfigs).forEach(config => {
        initialRevenue += config.budget * config.roas;
    });

    Object.entries(allocations).forEach(([key, newBudget]) => {
        const platformKey = key as PlatformKey;
        const config = baseConfigs[platformKey];
        const initialBudget = config.budget;

        // Saturation Logic:
        // If budget > 150% of initial, ROAS starts to degrade.
        // Factor = 0.78 (Requested by Intelligence Core Specs)

        let effectiveRoas = config.roas;
        if (newBudget > initialBudget * 1.5) {
            effectiveRoas = config.roas * 0.78;
        }

        const platformRevenue = newBudget * effectiveRoas;
        totalRevenue += platformRevenue;
        totalBudget += newBudget;
    });

    return {
        totalRevenue: Math.round(totalRevenue),
        totalBudget: Math.round(totalBudget),
        revenueLift: Math.round(totalRevenue - initialRevenue),
    };
};
