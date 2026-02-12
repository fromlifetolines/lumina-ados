'use client';

import { Bell, Search } from 'lucide-react';
import { DateRangePicker } from '@/components/ui/date-range-picker';

export const Header = () => {
    return (
        <header className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">
                    Welcome back, <span className="text-gradient">Howard</span>.
                </h2>
                <p className="text-gray-400 mt-1">
                    Here&apos;s your campaign performance overview.
                </p>
            </div>

            <div className="flex items-center gap-4">
                <DateRangePicker />

                <div className="glass p-2 rounded-xl cursor-pointer hover:bg-white/10 transition">
                    <Search className="w-5 h-5 text-gray-400" />
                </div>

                <div className="glass p-2 rounded-xl cursor-pointer hover:bg-white/10 transition relative">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </div>

                <div className="glass p-2 rounded-xl cursor-pointer hover:bg-white/10 transition flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="font-bold text-xs text-white">H</span>
                    </div>
                </div>
            </div>
        </header>
    );
};
