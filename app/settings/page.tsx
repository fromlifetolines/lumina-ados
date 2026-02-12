'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { Header } from '@/components/dashboard/Header';
import { useTranslation } from '@/lib/i18n';
import { useState } from 'react';
import { User, Key, Bell, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function SettingsPage() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('api');
    const [testingConnection, setTestingConnection] = useState(false);
    const [connected, setConnected] = useState(false);

    const handleTestConnection = () => {
        setTestingConnection(true);
        setTimeout(() => {
            setTestingConnection(false);
            setConnected(true);
        }, 2000);
    };

    const tabs = [
        { id: 'profile', label: t('profile'), icon: User },
        { id: 'api', label: t('api_integration'), icon: Key },
        { id: 'notifications', label: t('notifications'), icon: Bell },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8">
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

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-300">{t('meta_pixel_id')}</label>
                                        <input type="password" value="1234567890" disabled className="glass-input w-full opacity-50 cursor-not-allowed" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-300">{t('google_ads_id')}</label>
                                        <input type="text" placeholder="XXX-XXX-XXXX" className="glass-input w-full" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-300">{t('ga4_id')}</label>
                                        <input type="text" placeholder="G-XXXXXXXXXX" className="glass-input w-full" />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                                    <button
                                        onClick={handleTestConnection}
                                        disabled={testingConnection || connected}
                                        className={cn(
                                            "px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all",
                                            connected ? "bg-green-500/20 text-green-400 border border-green-500/50" : "bg-blue-600 hover:bg-blue-500 text-white"
                                        )}
                                    >
                                        {testingConnection && <Loader2 className="w-4 h-4 animate-spin" />}
                                        {connected ? (
                                            <><Check className="w-4 h-4" /> {t('connected')}</>
                                        ) : (
                                            t('test_connection')
                                        )}
                                    </button>

                                    {connected && (
                                        <span className="text-sm text-green-400 animate-pulse">
                                            Data sync active.
                                        </span>
                                    )}
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
