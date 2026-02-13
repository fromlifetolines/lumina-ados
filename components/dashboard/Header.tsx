'use client';

import { Bell, Search, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { useTranslation } from '@/lib/i18n';
import { useCurrency } from '@/lib/currency';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { PlatformId } from '@/lib/mockData';
import { PlatformIcon } from '@/components/ui/platform-icon';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase';

interface HeaderProps {
    platformFilter?: PlatformId | 'all';
    setPlatformFilter?: (p: PlatformId | 'all') => void;
    showPlatformFilter?: boolean;
}

export const Header = ({ platformFilter = 'all', setPlatformFilter, showPlatformFilter = false }: HeaderProps) => {
    const { t } = useTranslation();
    const { currency, setCurrency } = useCurrency();
    const [userName, setUserName] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const getUserName = async () => {
            const isGuest = localStorage.getItem('lumina_guest_mode') === 'true';
            if (isGuest) {
                setUserName('Guest Admin');
                return;
            }

            const { data: { user } } = await supabase.auth.getUser();
            if (user && user.email) {
                setUserName(`Howard | ${user.email}`);
            }
        };
        getUserName();
    }, [supabase.auth]);

    // Search Logic
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<{ type: 'customer' | 'campaign', data: any }[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const delaySearch = setTimeout(async () => {
            if (searchQuery.length < 2) {
                setSearchResults([]);
                return;
            }

            setIsSearching(true);
            try {
                // Parallel search queries
                const [customers, campaigns] = await Promise.all([
                    supabase.from('customers').select('*').ilike('name', `%${searchQuery}%`).limit(3),
                    supabase.from('campaigns').select('*').ilike('name', `%${searchQuery}%`).limit(3)
                ]);

                const results = [
                    ...(customers.data || []).map(c => ({ type: 'customer' as const, data: c })),
                    ...(campaigns.data || []).map(c => ({ type: 'campaign' as const, data: c }))
                ];
                setSearchResults(results);
                setShowResults(true);
            } catch (error) {
                console.error("Search failed:", error);
            } finally {
                setIsSearching(false);
            }
        }, 300);

        return () => clearTimeout(delaySearch);
    }, [searchQuery, supabase]);

    return (
        <div className="flex flex-col gap-6 mb-8">
            <header className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md sticky top-4 z-40">
                <div className="flex items-center gap-6">
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-wide">Lumina AdOS {userName ? `| ${userName}` : ''}</h2>
                        <p className="text-sm text-gray-400">Chief Marketing Consultant</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Global Search Bar */}
                    <div className="hidden md:flex relative group">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
                            onBlur={() => setTimeout(() => setShowResults(false), 200)}
                            placeholder={t('search_placeholder') || "Search data..."}
                            className="bg-black/20 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 w-64 transition-all"
                        />

                        {/* Search Results Dropdown */}
                        {showResults && (searchResults.length > 0 || isSearching) && (
                            <div className="absolute top-full mt-2 w-80 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                                {isSearching ? (
                                    <div className="p-4 text-center text-gray-500 text-sm">Searching...</div>
                                ) : searchResults.length > 0 ? (
                                    <ul className="divide-y divide-white/5">
                                        {searchResults.map((result, idx) => (
                                            <li
                                                key={idx}
                                                className="p-3 hover:bg-white/5 cursor-pointer transition-colors"
                                                onClick={() => {
                                                    console.log("Selected:", result);
                                                    setSearchQuery('');
                                                }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        "p-2 rounded-lg",
                                                        result.type === 'customer' ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"
                                                    )}>
                                                        {result.type === 'customer' ? <User className="w-4 h-4" /> : <PlatformIcon platform={result.data.platform} className="w-4 h-4" />}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white">{result.data.name}</p>
                                                        <p className="text-xs text-gray-400">
                                                            {result.type === 'customer'
                                                                ? result.data.email
                                                                : `${result.data.status} • Budget: $${result.data.budget}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="p-4 text-center text-gray-500 text-sm">No results found</div>
                                )}
                            </div>
                        )}
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

                    <button
                        aria-label="Notifications"
                        className="relative p-2 rounded-xl hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                    >
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
