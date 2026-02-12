// src/utils/pdfGenerator.js
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";

export const generateReportPDF = async (data, options = {}) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const dateStr = format(new Date(), "PPpp");

    // Header Background
    doc.setFillColor(102, 126, 234); // Brand Color
    doc.rect(0, 0, pageWidth, 40, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("DRUS Performance Report", 20, 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${dateStr}`, 20, 30);

    // User Info Section
    doc.setTextColor(40, 44, 52);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("User Summary", 20, 55);

    const summaryData = [
        ["Name", data.user?.name || "N/A"],
        ["Total Problems Solved", data.stats?.total?.toString() || "0"],
        ["Average Acceptance", `${data.stats?.acceptance || 0}%`],
        ["Global Ranking", data.stats?.rank || "N/A"],
    ];

    doc.autoTable({
        startY: 60,
        head: [],
        body: summaryData,
        theme: 'plain',
        styles: { cellPadding: 2, fontSize: 10 },
        columnStyles: { 0: { fontStyle: 'bold', width: 50 } }
    });

    // Table Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Platform Breakdown", 20, doc.lastAutoTable.finalY + 15);

    const platformData = data.platforms.map(p => [
        p.name,
        p.username,
        p.solved,
        p.rank || "N/A",
        p.rating || "N/A"
    ]);

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 20,
        head: [['Platform', 'Username', 'Solved', 'Rank', 'Rating']],
        body: platformData,
        headStyles: { fillColor: [118, 75, 162], textColor: 255 },
        alternateRowStyles: { fillColor: [245, 247, 251] },
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(8);
    doc.setTextColor(150);
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(`Page ${i} of ${pageCount} | DRUS Analytics Engine`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }

    // Save
    doc.save(`DRUS_Report_${format(new Date(), "yyyy-MM-dd")}.pdf`);
    return true;
};
