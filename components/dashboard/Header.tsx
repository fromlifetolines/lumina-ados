'use client';

import { Bell, Search, User } from 'lucide-react';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { useTranslation } from '@/lib/i18n';
import { useCurrency } from '@/lib/currency';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { PlatformId } from '@/lib/mockData';
import { PlatformIcon } from '@/components/ui/platform-icon';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface HeaderProps {
    platformFilter?: PlatformId | 'all';
    setPlatformFilter?: (p: PlatformId | 'all') => void;
    showPlatformFilter?: boolean;
}

export const Header = ({ platformFilter = 'all', setPlatformFilter, showPlatformFilter = false }: HeaderProps) => {
    const { t } = useTranslation();
    const { currency, setCurrency } = useCurrency();

    return (
        <div className="flex flex-col gap-6 mb-8">
            <header className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md sticky top-4 z-40">
                <div className="flex items-center gap-6">
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-wide">{t('welcome_back')}, Admin</h2>
                        <p className="text-sm text-gray-400">{t('dashboard')}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex relative group">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        <input
                            type="text"
                            placeholder={t('search_placeholder') || "Search data..."}
                            className="bg-black/20 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 w-64 transition-all"
                        />
                    </div>

                    <DateRangePicker />

                    {/* Currency Toggle */}
                    <div className="bg-black/20 p-1 rounded-xl flex border border-white/10">
                        {(['TWD', 'USD'] as const).map((curr) => (
                            <button
                                key={curr}
                                onClick={() => setCurrency(curr)}
                                className={cn(
                                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                                    currency === curr ? "bg-blue-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
                                )}
                            >
                                {curr}
                            </button>
                        ))}
                    </div>

                    <LanguageSwitcher />

                    <button className="relative p-2 rounded-xl hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    </button>

                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[2px]">
                        <div className="w-full h-full rounded-full bg-black/90 flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-300" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Platform Filter Bar */}
            {showPlatformFilter && setPlatformFilter && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <button
                        onClick={() => setPlatformFilter('all')}
                        className={cn(
                            "px-4 py-2 rounded-xl border flex items-center gap-2 transition-all whitespace-nowrap",
                            platformFilter === 'all'
                                ? "bg-white/10 border-white/20 text-white shadow-lg shadow-white/5"
                                : "bg-black/20 border-white/5 text-gray-400 hover:bg-white/5"
                        )}
                    >
                        <span className="font-bold">{t('all_platforms') || "All Platforms"}</span>
                    </button>
                    {(['meta', 'google', 'youtube', 'tiktok', 'twitter', 'linkedin', 'line'] as PlatformId[]).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPlatformFilter(p)}
                            className={cn(
                                "px-4 py-2 rounded-xl border flex items-center gap-2 transition-all whitespace-nowrap group",
                                platformFilter === p
                                    ? "bg-blue-500/20 border-blue-500/30 text-white shadow-lg shadow-blue-500/10"
                                    : "bg-black/20 border-white/5 text-gray-400 hover:bg-white/5"
                            )}
                        >
                            <PlatformIcon platform={p} className={cn("w-5 h-5", platformFilter === p ? "bg-transparent text-blue-400" : "text-gray-500 group-hover:text-gray-300")} />
                            <span className="capitalize text-sm font-medium">{t(p)}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
