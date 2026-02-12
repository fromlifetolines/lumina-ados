'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { Header } from '@/components/dashboard/Header';
import { useTranslation } from '@/lib/i18n';
import { PlatformIcon } from '@/components/ui/platform-icon';
import { PlatformId, platforms } from '@/lib/mockData';
import { useState } from 'react';
import { User, Key, Bell, Check, Loader2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function SettingsPage() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('api');
    const [connections, setConnections] = useState<Record<string, boolean>>({
        meta: true, // Simulate existing connection
        google: false
    });
    const [loading, setLoading] = useState<string | null>(null);

    const handleConnect = (pid: string) => {
        setLoading(pid);
        // Simulate OAuth delay
        setTimeout(() => {
            setConnections(prev => ({ ...prev, [pid]: !prev[pid] }));
            setLoading(null);
        }, 1500);
    };

    const tabs = [
        { id: 'profile', label: t('profile'), icon: User },
        { id: 'api', label: t('api_integration'), icon: Key },
        { id: 'notifications', label: t('notifications'), icon: Bell },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            <Header />
            <h2 className="text-2xl font-bold text-white mb-6">{t('settings')}</h2>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Tabs Sidebar */}
                <div className="w-full md:w-64 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-6 py-4 rounded-xl transition-all text-left font-medium",
                                activeTab === tab.id
                                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-900/20"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1">
                    <GlassCard className="min-h-[500px]">
                        {activeTab === 'api' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{t('api_integration')}</h3>
                                    <p className="text-gray-400 text-sm">Connect your ad platforms to pull real-time data.</p>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {(Object.keys(platforms) as PlatformId[]).map((pid) => (
                                        <div key={pid} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <PlatformIcon platform={pid} className="w-10 h-10" />
                                                <div>
                                                    <p className="font-bold text-white capitalize">{platforms[pid].name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {connections[pid]
                                                            ? 'Syncing daily • Last sync: 2m ago'
                                                            : 'Not connected'}
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleConnect(pid)}
                                                disabled={loading === pid}
                                                className={cn(
                                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all min-w-[120px]",
                                                    connections[pid]
                                                        ? "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20"
                                                        : "bg-blue-600 text-white hover:bg-blue-500" // Connect
                                                )}
                                            >
                                                {loading === pid ? (
                                                    <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                                                ) : connections[pid] ? (
                                                    <span className="flex items-center justify-center gap-2">
                                                        <Check className="w-4 h-4" /> {t('connected')}
                                                    </span>
                                                ) : (
                                                    t('connect')
                                                )}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'profile' && (
                            <div className="text-center py-20 text-gray-500">
                                <User className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                <p>Profile settings placeholder</p>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="text-center py-20 text-gray-500">
                                <Bell className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                <p>Notification settings placeholder</p>
                            </div>
                        )}
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
