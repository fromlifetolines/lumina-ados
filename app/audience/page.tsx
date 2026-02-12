'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { useTranslation } from '@/lib/i18n';
import { Header } from '@/components/dashboard/Header';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { User, Zap } from 'lucide-react';

const genderData = [
    { name: 'Male', value: 45 },
    { name: 'Female', value: 55 },
];

const ageData = [
    { name: '18-24', value: 15 },
    { name: '25-34', value: 45 },
    { name: '35-44', value: 25 },
    { name: '45+', value: 15 },
];

const COLORS = ['#3b82f6', '#ec4899', '#8b5cf6', '#10b981'];

const interests = [
    "Luxury Goods", "Technology", "Startup", "SaaS", "Design", "Travel", "Fitness", "Investment", "Real Estate", "Fine Dining"
];

export default function AudiencePage() {
    const { t } = useTranslation();

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <Header />
            <h2 className="text-2xl font-bold text-white mb-6">{t('audience')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Demographics: Gender */}
                <GlassCard className="col-span-1">
                    <h3 className="text-lg font-bold text-white mb-4 text-center">{t('gender')}</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={genderData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {genderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : '#ec4899'} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-500 rounded-full"></span><span className="text-gray-300">Male 45%</span></div>
                        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-pink-500 rounded-full"></span><span className="text-gray-300">Female 55%</span></div>
                    </div>
                </GlassCard>

                {/* Demographics: Age */}
                <GlassCard className="col-span-2">
                    <h3 className="text-lg font-bold text-white mb-4">{t('age_group')}</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ageData}>
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#0a0a1e', border: '1px solid rgba(255,255,255,0.1)' }} />
                                <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Interest Cloud */}
                <GlassCard className="col-span-3">
                    <h3 className="text-lg font-bold text-white mb-6">{t('interests')}</h3>
                    <div className="flex flex-wrap gap-4 justify-center p-8">
                        {interests.map((tag, i) => (
                            <span
                                key={i}
                                className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-gray-200 hover:bg-white/20 hover:scale-110 transition-all cursor-default text-lg"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </GlassCard>

                {/* Geo Map Placeholder */}
                <GlassCard className="col-span-3 min-h-[400px] flex items-center justify-center relative overflow-hidden">
                    <div className="text-center z-10">
                        <h3 className="text-2xl font-bold text-white mb-2">{t('geo_distribution')}</h3>
                        <p className="text-gray-400">Map Visualization Coming Soon</p>
                    </div>
                    {/* Abstract Map Background */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center pointer-events-none filter invert"></div>

                    {/* Dots */}
                    <div className="absolute top-[40%] left-[85%] w-4 h-4 rounded-full bg-blue-500 animate-ping"></div> {/* Taipei-ish */}
                    <div className="absolute top-[35%] left-[80%] w-3 h-3 rounded-full bg-purple-500 animate-ping delay-700"></div> {/* Tokyo-ish */}
                </GlassCard>

                {/* Persona Card - High Value Audience */}
                <GlassCard className="col-span-3 border-none bg-gradient-to-r from-blue-900/40 to-purple-900/40 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-20">
                        <User className="w-48 h-48 text-white" />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                                <span className="text-3xl font-bold text-white">VP</span>
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full border border-white/20">
                                TOP 1%
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-2">
                            <h3 className="text-2xl font-bold text-white">{t('high_value_persona')}</h3>
                            <div className="space-y-1">
                                <p className="text-gray-300 text-sm">
                                    <span className="font-bold text-blue-300">{t('traits_label')}:</span> {t('traits_desc')}
                                </p>
                                <p className="text-gray-300 text-sm">
                                    <span className="font-bold text-red-300">{t('pain_points_label')}:</span> {t('pain_points_desc')}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                const toast = document.createElement('div');
                                toast.innerText = t('target_success');
                                toast.className = "fixed top-8 right-8 z-50 px-6 py-4 rounded-xl backdrop-blur-md border border-green-500/50 bg-green-500/20 text-green-200 shadow-2xl font-bold animate-in slide-in-from-top-5 duration-300";
                                document.body.appendChild(toast);
                                setTimeout(() => toast.remove(), 3000);
                            }}
                            className="px-8 py-3 bg-white text-blue-900 font-bold rounded-xl shadow-lg hover:shadow-white/20 hover:scale-105 transition-all flex items-center gap-2"
                        >
                            <Zap className="w-5 h-5 fill-current" />
                            {t('target_persona')}
                        </button>
                    </div>
                </GlassCard>

            </div>
        </div>
    );
}

// Missing function in file context import? I'll assume User, Zap is imported or will be.
// Wait, 'User' is not imported in the original file. I need to add imports.


