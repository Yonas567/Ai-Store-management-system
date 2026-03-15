"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import ReportsHeader from "./ReportsHeader";
import ReportsList from "./ReportsList";
import ReportViewer from "./ReportViewer";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  const handleSelectReport = (reportId: string) => {
    // Map report IDs to titles
    const reportTitles: Record<string, string> = {
      "stock-level": "Stock Level Report",
      "stock-valuation": "Stock Valuation Report",
      "stock-movement": "Stock Movement Report",
      "low-stock": "Low Stock Alert Report",
      "sales-summary": "Sales Summary Report",
      "sales-by-customer": "Sales by Customer Report",
      "product-performance": "Product Performance Report",
      revenue: "Revenue Report",
      expenses: "Expenses Report",
      "profit-loss": "Profit & Loss Report",
      "accounts-receivable": "Accounts Receivable Report",
      "accounts-payable": "Accounts Payable Report",
      "stock-entries": "Stock Entries Report",
      "stock-outgoing": "Stock Outgoing Report",
      "stock-transfer": "Stock Transfer Report",
      adjustments: "Adjustments Report",
      supplier: "Supplier Report",
      customer: "Customer Report",
      "money-transfers": "Money Transfer Report",
      "payment-transactions": "Payment Transaction Report",
    };

    setSelectedReport({
      id: reportId,
      title: reportTitles[reportId] || "Report",
    });
  };

  const handleCloseReport = () => {
    setSelectedReport(null);
  };

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    setDateFrom(startDate);
    setDateTo(endDate);
  };

  const handlePeriodChange = (period: string) => {
    console.log("Period changed to:", period);
    // Handle period change - could refresh report data
  };

  const handleExport = () => {
    console.log("Exporting all reports...");
    // Implement export functionality
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRefresh = () => {
    console.log("Refreshing reports...");
    // Implement refresh functionality
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <ReportsHeader
        onExport={handleExport}
        onPrint={handlePrint}
        onRefresh={handleRefresh}
        onDateRangeChange={handleDateRangeChange}
        onPeriodChange={handlePeriodChange}
      />

      {selectedReport ? (
        <ReportViewer
          reportId={selectedReport.id}
          reportTitle={selectedReport.title}
          onClose={handleCloseReport}
          dateFrom={dateFrom}
          dateTo={dateTo}
        />
      ) : (
        <ReportsList onSelectReport={handleSelectReport} />
      )}
    </Box>
  );
};

export default Reports;

