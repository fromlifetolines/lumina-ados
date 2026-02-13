'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, BarChart3, PieChart, Settings, Users, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n';
import { createClient } from '@/lib/supabase';

export const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { t } = useTranslation();
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) {
                router.push('/login');
            } else {
                setUser(user);
            }
        };
        getUser();
    }, [supabase.auth, router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
        router.push('/login');
    };

    const navItems = [
        { name: t('dashboard'), href: '/', icon: LayoutDashboard },
        { name: t('campaigns'), href: '/campaigns', icon: BarChart3 },
        { name: t('analytics'), href: '/analytics', icon: PieChart },
        { name: t('audience'), href: '/audience', icon: Users },
        { name: t('subscription'), href: '/subscription', icon: BarChart3 },
        { name: t('settings'), href: '/settings', icon: Settings },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 glass border-r border-white/10 flex flex-col z-50">
            {/* ... header ... */}

            <nav className="flex-1 px-4 space-y-2">
                {/* ... nav items ... */}
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group',
                                isActive
                                    ? 'bg-blue-600/20 text-blue-400 shadow-lg shadow-blue-500/10'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-blue-400" : "group-hover:text-white")} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5 space-y-4">
                {user && (
                    <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Signed in as</p>
                        <p className="text-sm font-medium text-white truncate" title={user.email}>Howard | {user.email}</p>
                    </div>
                )}

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">{t('logout')}</span>
                </button>
            </div>
        </aside>
    );
};
