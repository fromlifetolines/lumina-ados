export type PlatformKey = 'meta' | 'google' | 'youtube' | 'tiktok';

export interface PlatformConfig {
    id: PlatformKey;
    name: string;
    roas: number;
    budget: number;
    color: string;
}

/**
 * Calculates the projected revenue based on budget allocation and ROAS.
 * Includes a "Saturation Factor" where efficiency drops if budget increases significantly.
 */
export const calculateProjection = (allocations: Record<PlatformKey, number>, baseConfigs: Record<PlatformKey, PlatformConfig>) => {
    let totalRevenue = 0;
    let totalBudget = 0;
    const insights: string[] = [];

    // Base total budget to calculate percentage increase
    const initialTotalBudget = Object.values(baseConfigs).reduce((sum, config) => sum + config.budget, 0);

    Object.entries(allocations).forEach(([key, newBudget]) => {
        const platformKey = key as PlatformKey;
        const config = baseConfigs[platformKey];
        const initialBudget = config.budget;

        // Saturation Logic:
        // If budget > 150% of initial, ROAS starts to degrade.
        // Formula: New ROAS = Base ROAS * (1 - decay_factor)

        let effectiveRoas = config.roas;
        if (newBudget > initialBudget * 1.5) {
            const excessRatio = (newBudget - (initialBudget * 1.5)) / initialBudget;
            // Decay 5% for every 100% increase beyond saturation point
            const decay = Math.min(excessRatio * 0.05, 0.4); // Max 40% decay
            effectiveRoas = config.roas * (1 - decay);
        }

        const platformRevenue = newBudget * effectiveRoas;
        totalRevenue += platformRevenue;
        totalBudget += newBudget;

        // Generate Insights
        const revenueDiff = platformRevenue - (initialBudget * config.roas);
        if (newBudget > initialBudget && revenueDiff > 1000) {
            // Positive Shift
            // Note: We return raw numbers/keys here, translation happens in UI
            // insights.push(`Increasing ${config.name} budget by...`) 
            // For now, let's just return the raw calculation data for the UI to format
        }
    });

    return {
        totalRevenue,
        totalBudget,
        // Calculate difference from "Base Case" (all budgets at initial)
        revenueLift: totalRevenue - Object.values(baseConfigs).reduce((sum, c) => sum + (c.budget * c.roas), 0)
    };
};
