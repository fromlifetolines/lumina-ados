'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AuthCodeError() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0A0F1C] p-4">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-red-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[100px]" />
            </div>

            <GlassCard className="max-w-md w-full p-8 border-red-500/20 relative z-10 text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>

                <h1 className="text-2xl font-bold text-white mb-2">
                    驗證連結已過期或失效
                </h1>

                <p className="text-gray-400 mb-8">
                    Magic Link 可能已經過期，或者您已經使用該連結登入。為了安全起見，請重新索取登入連結。
                </p>

                <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white font-medium transition-all group"
                >
                    重新登入
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </GlassCard>
        </div>
    );
}
