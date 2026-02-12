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
                                        <div key={pid} className="flex flex-col p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                            <div className="flex items-center justify-between mb-4">
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
                                                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                                            : "bg-blue-600 text-white hover:bg-blue-500"
                                                    )}
                                                >
                                                    {loading === pid ? (
                                                        <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> {t('validating')}</span>
                                                    ) : connections[pid] ? (
                                                        <span className="flex items-center justify-center gap-2">
                                                            <Check className="w-4 h-4" /> {t('connected')}
                                                        </span>
                                                    ) : (
                                                        t('connect')
                                                    )}
                                                </button>
                                            </div>

                                            {/* Education Guide for Meta & Google */}
                                            {!connections[pid] && (pid === 'meta' || pid === 'google') && (
                                                <div className="mt-2 p-3 bg-black/30 rounded-lg text-xs text-gray-400">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Key className="w-3 h-3 text-blue-400" />
                                                        <span className="font-bold text-blue-300">{t('how_to_find')}</span>
                                                    </div>
                                                    <ul className="space-y-1 pl-4 list-disc">
                                                        {pid === 'meta' ? (
                                                            <>
                                                                <li>{t('guide_meta_1')}</li>
                                                                <li>{t('guide_meta_2')}</li>
                                                                <li>{t('guide_meta_3')}</li>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <li>{t('guide_ga4_1')}</li>
                                                                <li>{t('guide_ga4_2')}</li>
                                                                <li>{t('guide_ga4_3')}</li>
                                                            </>
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'profile' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 p-4">
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                                        H
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{t('profile')}</h3>
                                        <p className="text-gray-400 text-sm">Manage your personal information.</p>
                                    </div>
                                </div>

                                <div className="space-y-4 max-w-md">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-300">Display Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                            placeholder="Howard"
                                            id="input_name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-300">Job Title</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                            placeholder="Senior Marketing Manager"
                                            id="input_job"
                                        />
                                    </div>

                                    <button
                                        onClick={() => {
                                            const name = (document.getElementById('input_name') as HTMLInputElement).value;
                                            if (name) localStorage.setItem('user_name', name);

                                            // Mock Toast
                                            const toast = document.createElement('div');
                                            toast.innerText = t('saved_success');
                                            toast.className = "fixed top-8 right-8 z-50 px-6 py-4 rounded-xl backdrop-blur-md border border-green-500/50 bg-green-500/20 text-green-200 shadow-2xl font-bold animate-in slide-in-from-top-5 duration-300";
                                            document.body.appendChild(toast);
                                            setTimeout(() => toast.remove(), 3000);
                                        }}
                                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-all"
                                    >
                                        {t('save_changes')}
                                    </button>
                                </div>
                            </motion.div>
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
