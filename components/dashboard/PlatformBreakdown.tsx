'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { mockData } from '@/lib/mockData';
import { Instagram, Search, Video } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';

export const PlatformBreakdown = () => {
    // Video comparison data
    const videoData = [
        { name: 'TikTok', views: mockData.tiktok.metrics.reduce((a, b) => a + b.impressions, 0), color: '#000000' }, // TikTok black/neon
        { name: 'Shorts', views: mockData.google.metrics.reduce((a, b) => a + b.impressions, 0) * 0.4, color: '#FF0000' } // YouTube red
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Meta/IG Creative Performance */}
            <GlassCard className="col-span-1">
                <div className="flex items-center gap-2 mb-4">
                    <Instagram className="w-5 h-5 text-pink-500" />
                    <h3 className="font-bold text-white">Top Creatives</h3>
                </div>
                <div className="space-y-4">
                    {mockData.meta.topCreatives?.map((creative, i) => (
                        <div key={creative.id} className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-12 h-12 rounded-lg bg-gray-700 overflow-hidden border border-white/10 group-hover:border-pink-500/50 transition">
                                {/* Placeholder for image - using gradient */}
                                <div className={`w-full h-full bg-gradient-to-br ${i === 0 ? 'from-purple-500 to-pink-500' : 'from-blue-500 to-teal-500'}`}></div>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-300">Creative #{creative.id}</span>
                                    <span className="text-pink-400 font-bold">{creative.ctr}% CTR</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full mt-2 overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                                        style={{ width: `${(creative.ctr / 4) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </GlassCard>

            {/* SEO/GSC Performance */}
            <GlassCard className="col-span-1">
                <div className="flex items-center gap-2 mb-4">
                    <Search className="w-5 h-5 text-blue-400" />
                    <h3 className="font-bold text-white">Top Keywords</h3>
                </div>
                <div className="space-y-3">
                    {mockData.seo.topKeywords?.map((kw, i) => (
                        <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-white">{kw.keyword}</span>
                                <span className="text-xs text-green-400">#{kw.position}</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>{kw.impressions} Impr.</span>
                                <span className="text-blue-400">High Intent</span>
                            </div>
                        </div>
                    ))}
                </div>
            </GlassCard>

            {/* Video Analytics */}
            <GlassCard className="col-span-1">
                <div className="flex items-center gap-2 mb-4">
                    <Video className="w-5 h-5 text-purple-400" />
                    <h3 className="font-bold text-white">Short Video Wars</h3>
                </div>

                <div className="h-[200px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={videoData} layout="vertical" margin={{ left: 0 }}>
                            <XAxis type="number" hide />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ backgroundColor: 'rgba(20, 20, 40, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Bar dataKey="views" radius={[0, 4, 4, 0]} barSize={40}>
                                {videoData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? '#00f2ea' : '#ff0050'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-between px-4 text-sm mt-2">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#00f2ea]"></span>
                        <span className="text-gray-300">TikTok</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#ff0050]"></span>
                        <span className="text-gray-300">Shorts</span>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
};
