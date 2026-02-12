'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import type { Session } from '@supabase/supabase-js';

const AuthContext = createContext<{ session: Session | null }>({ session: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        // Check initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);

            if (event === 'SIGNED_OUT') {
                // Clear local storage on logout
                localStorage.removeItem('lumina_user_profile');
                localStorage.removeItem('lumina_api_keys');
                router.push('/login');
            } else if (event === 'SIGNED_IN') {
                router.refresh();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router, supabase]);

    return (
        <AuthContext.Provider value={{ session }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
