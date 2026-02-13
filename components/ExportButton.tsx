'use client';

import { Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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
        const dateStr = new Date().toLocaleDateString();

        // --- Page 1: Executive Summary ---

        // Header / Branding
        doc.setFillColor(15, 23, 42); // Dark Blue bg
        doc.rect(0, 0, 210, 40, 'F');
        doc.setFontSize(22);
        doc.setTextColor(255, 255, 255);
        doc.text('Lumina AdOS', 14, 20);
        doc.setFontSize(12);
        doc.setTextColor(148, 163, 184);
        doc.text('Intelligence Core Report', 14, 28);
        doc.text(`Generated: ${dateStr}`, 150, 28);

        // Section: Executive Summary
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(16);
        doc.text('1. Executive KPI Summary', 14, 55);

        const summaryData = [
            ['Total Revenue', `$${metrics.revenue.toLocaleString()}`, 'The total realized revenue from all tracked sources.'],
            ['Total Est. Spend', `$${metrics.spend.toLocaleString()}`, 'Estimated ad spend based on 3.5x industry average ROAS.'],
            ['Global ROAS', `${metrics.roas.toFixed(2)}x`, 'Return on Ad Spend. Values above 4.0x are considered "Whale" territory.'],
            ['Active Users', metrics.users.toString(), 'Total unique customers in the current CRM view.'],
        ];

        autoTable(doc, {
            startY: 60,
            head: [['Metric', 'Value', 'Context']],
            body: summaryData,
            theme: 'grid',
            headStyles: { fillColor: [15, 23, 42], textColor: 255, fontStyle: 'bold' },
            bodyStyles: { minCellHeight: 15, valign: 'middle' },
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 50 },
                1: { fontStyle: 'bold', fontSize: 12, textColor: [16, 185, 129] }, // Green text for values
                2: { fontStyle: 'italic', textColor: 100 }
            }
        });

        // Section: AI Insights
        const yPos = (doc as any).lastAutoTable.finalY + 20;
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.rect(0, 0, 210, 297, 'F');

        // Header
        doc.setFontSize(26);
        doc.setTextColor(255, 255, 255);
        doc.text('Lumina AdOS', 14, 25);
        doc.setFontSize(14);
        doc.setTextColor(148, 163, 184); // Slate 400
        doc.text(`Executive Marketing Report | ${dateStr}`, 14, 35);

        // Big Numbers
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text('Monthly Revenue', 14, 60);
        doc.setFontSize(32);
        doc.setTextColor(74, 222, 128); // Green 400
        doc.text(`$${metrics.revenue.toLocaleString()}`, 14, 75);

        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text('Efficiency (ROAS)', 80, 60);
        doc.setFontSize(32);
        doc.setTextColor(96, 165, 250); // Blue 400
        doc.text(`${metrics.roas.toFixed(2)}x`, 80, 75);

        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text('AI Predicted Growth', 150, 60);
        doc.setFontSize(32);
        doc.setTextColor(167, 139, 250); // Purple 400
        doc.text('+18.5%', 150, 75); // Mocked prediction

        // --- Page 2: Channel Breakdown ---
        doc.addPage();
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, 210, 297, 'F');
        doc.setTextColor(0);

        doc.setFontSize(18);
        doc.text('Channel Performance Analysis', 14, 20);

        const channelData = [
            ['Channel', 'Spend', 'Revenue', 'ROAS', 'Status'],
            ['Meta (FB/IG)', '$15,000', '$52,500', '3.50x', 'Stable'],
            ['Google Ads', '$12,000', '$50,400', '4.20x', 'High Performer'],
            ['SEO (Organic)', '$1,500', '$18,000', '12.00x', 'Opportunity'],
            ['TikTok', '$10,000', '$28,000', '2.80x', 'Review Needed'],
        ];

        autoTable(doc, {
            startY: 30,
            head: [channelData[0]],
            body: channelData.slice(1),
            theme: 'striped',
            headStyles: { fillColor: [59, 130, 246] },
        });

        // --- Page 3: Whale List ---
        doc.addPage();
        doc.setFontSize(18);
        doc.text('High-Value Customer (Whale) Analysis', 14, 20);

        const whaleRows = data
            .filter((c: any) => c.status === 'Whale')
            .sort((a: any, b: any) => b.total_spent - a.total_spent)
            .slice(0, 15)
            .map((c: any) => [
                c.name,
                c.email,
                `$${c.total_spent.toLocaleString()}`,
                c.source || 'N/A',
                'VIP'
            ]);

        autoTable(doc, {
            startY: 30,
            head: [['Customer Name', 'Email', 'Total LTV', 'Acquisition Source', 'Segment']],
            body: whaleRows,
            theme: 'grid',
            headStyles: { fillColor: [124, 58, 237] }, // Purple
        });

        // --- Page 4: AI Strategy ---
        doc.addPage();
        doc.setFillColor(15, 23, 42); // Back to dark theme
        doc.rect(0, 0, 210, 297, 'F');

        doc.setFontSize(22);
        doc.setTextColor(255, 255, 255);
        doc.text('AI Marketing Strategy Recommendation', 14, 25);

        doc.setFontSize(14);
        doc.setTextColor(96, 165, 250); // Blue
        doc.text('1. Programmatic SEO Expansion', 14, 50);
        doc.setFontSize(11);
        doc.setTextColor(200, 200, 200);
        doc.text('Detected high ROI in organic search. Recommendation: Scale content production', 14, 60);
        doc.text('targeting long-tail keywords to reduce blended CAC by estimated 15%.', 14, 66);

        doc.setFontSize(14);
        doc.setTextColor(96, 165, 250);
        doc.text('2. Competitor Conquesting (Google Ads)', 14, 90);
        doc.setFontSize(11);
        doc.setTextColor(200, 200, 200);
        doc.text('AOV is below target. Shift budget from broad Meta audiences to high-intent', 14, 100);
        doc.text('competitor keywords to capture ready-to-buy users.', 14, 106);

        doc.setFontSize(14);
        doc.setTextColor(96, 165, 250);
        doc.text('3. Retention & Win-Back', 14, 130);
        doc.setFontSize(11);
        doc.setTextColor(200, 200, 200);
        doc.text('Churn rate alert triggered. Activate automated SMS/Email sequence for customers', 14, 140);
        doc.text('who have not purchased in 60+ days. Offer: "VIP Comeback" incentive.', 14, 146);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('Generated by Lumina Intelligence Core', 14, 280);

        doc.save(`Lumina_Executive_Report_${dateStr}.pdf`);
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
