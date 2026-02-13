'use client';

import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SourceFilterType = 'All' | 'Google Ads' | 'SEO' | 'Meta' | 'Direct' | 'TikTok' | 'LinkedIn';

interface SourceFilterProps {
    currentFilter: SourceFilterType;
    onFilterChange: (filter: SourceFilterType) => void;
}

export const SourceFilter = ({ currentFilter, onFilterChange }: SourceFilterProps) => {
    const sources: SourceFilterType[] = ['All', 'Google Ads', 'SEO', 'Meta', 'Direct', 'TikTok', 'LinkedIn'];

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-xs font-medium text-gray-400">
                <Filter className="w-3.5 h-3.5" />
                <span>Source</span>
            </div>
            {sources.map((source) => (
                <button
                    key={source}
                    onClick={() => onFilterChange(source)}
                    className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                        currentFilter === source
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : "bg-transparent text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                    )}
                >
                    {source}
                </button>
            ))}
        </div>
    );
};
