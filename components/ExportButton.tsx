'use client';

import { Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { cn } from '@/lib/utils';

interface ExportButtonProps {
    data: any[];
    metrics: {
        spend: number;
        revenue: number;
        roas: number;
        users: number;
    };
}

export const ExportButton = ({ data, metrics }: ExportButtonProps) => {

    const handleExport = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(20);
        doc.text('Lumina AdOS - Marketing Performance Report', 14, 22);

        // Date
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 14, 30);

        // Summary Metrics
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text('Performance Summary', 14, 45);

        const summaryData = [
            ['Total Spend', `$${metrics.spend.toLocaleString()}`],
            ['Total Revenue', `$${metrics.revenue.toLocaleString()}`],
            ['ROAS', `${metrics.roas.toFixed(2)}x`],
            ['Active Users', metrics.users.toString()],
        ];

        autoTable(doc, {
            startY: 50,
            head: [['Metric', 'Value']],
            body: summaryData,
            theme: 'striped',
            headStyles: { fillColor: [59, 130, 246] }, // Blue-500
        });

        // Customer Data (Top 20 Whales)
        doc.setFontSize(14);
        doc.text('Top High-Value Customers (Whales)', 14, (doc as any).lastAutoTable.finalY + 15);

        const customerRows = data
            .filter((c: any) => c.status === 'Whale')
            .sort((a: any, b: any) => b.total_spent - a.total_spent)
            .slice(0, 20)
            .map((c: any) => [
                c.name,
                c.email,
                `$${c.total_spent.toLocaleString()}`,
                c.status,
                c.source || 'N/A'
            ]);

        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 20,
            head: [['Name', 'Email', 'Total Spent', 'Status', 'Source']],
            body: customerRows,
            theme: 'grid',
            headStyles: { fillColor: [168, 85, 247] }, // Purple-500
        });

        doc.save(`lumina_report_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    return (
        <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 transition-all text-sm font-medium"
        >
            <Download className="w-4 h-4" />
            Export PDF
        </button>
    );
};
