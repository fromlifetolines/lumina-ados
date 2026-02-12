'use client';

import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { getBlendedMetrics, platforms } from '@/lib/mockData';

export default function ReportPage() {
    const blendedData = getBlendedMetrics();
    // We can default format to USD or TWD string for static report
    const format = (val: number) => `$${val.toLocaleString()}`;

    // Calculate Aggregates
    const totalSpend = blendedData.reduce((a, b) => a + b.spend, 0);
    const totalRevenue = blendedData.reduce((a, b) => a + b.revenue, 0);
    const totalRoas = totalRevenue / (totalSpend || 1);

    return (
        <div className="bg-white text-black min-h-screen p-8">
            {/* Printable Header */}
            <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Lumina AdOS Executive Report</h1>
                    <p className="text-gray-600 mt-2">Generated on {new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                    <p className="font-bold text-xl">Monthly Overview</p>
                    <p className="text-sm text-gray-500">All Platforms (Blended)</p>
                </div>
            </div>

            {/* High Level Metrics Grid */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-500 uppercase font-bold">Total Spend</p>
                    <p className="text-2xl font-bold">{format(totalSpend)}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-500 uppercase font-bold">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">{format(totalRevenue)}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-500 uppercase font-bold">Blended ROAS</p>
                    <p className="text-2xl font-bold text-blue-600">{totalRoas.toFixed(2)}x</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-500 uppercase font-bold">Platforms Active</p>
                    <p className="text-2xl font-bold">{Object.keys(platforms).length}</p>
                </div>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-bold mb-4">Daily Performance Breakdown</h2>
                <div className="border rounded-lg">
                    <Table>
                        <TableCaption>Detailed daily data for the last 30 days.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[150px]">Date</TableHead>
                                <TableHead>Spend</TableHead>
                                <TableHead>Revenue</TableHead>
                                <TableHead>Impressions</TableHead>
                                <TableHead>Clicks</TableHead>
                                <TableHead className="text-right">ROAS</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blendedData.slice(0, 30).map((d) => (
                                <TableRow key={d.date}>
                                    <TableCell className="font-medium">{d.date}</TableCell>
                                    <TableCell>{format(d.spend)}</TableCell>
                                    <TableCell className="text-green-600 font-bold">{format(d.revenue)}</TableCell>
                                    <TableCell>{d.impressions.toLocaleString()}</TableCell>
                                    <TableCell>{d.clicks.toLocaleString()}</TableCell>
                                    <TableCell className="text-right">
                                        {(d.roas || 0).toFixed(2)}x
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-center text-sm text-gray-400">
                    End of Report • Lumina AdOS Analytics System
                </p>
            </div>
        </div>
    );
}
