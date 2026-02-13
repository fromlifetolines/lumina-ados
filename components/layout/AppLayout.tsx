'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login' || pathname === '/auth/callback';

    return (
        <div className="flex min-h-screen">
            {!isLoginPage && <Sidebar />}
            <main className={cn(
                "flex-1 p-8 relative z-10 transition-all duration-300",
                !isLoginPage && "ml-64"
            )}>
                {children}
            </main>
        </div>
    );
}
