"use client";
import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Tabs,
  Tab,
} from "@mui/material";
import {
  IconPackage,
  IconCurrencyDollar,
  IconTrendingUp,
  IconUsers,
  IconFileText,
  IconChartBar,
  IconArrowDown,
  IconArrowUp,
  IconArrowsExchange,
  IconAdjustments,
  IconDownload,
  IconEye,
} from "@tabler/icons-react";

interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: any;
  color: string;
}

interface ReportsListProps {
  onSelectReport?: (reportId: string) => void;
}

const ReportsList = ({ onSelectReport }: ReportsListProps) => {
  const [tabValue, setTabValue] = useState(0);

  const allReports: Report[] = [
    // Inventory Reports
    {
      id: "stock-level",
      title: "Stock Level Report",
      description: "Current stock levels by product, category, branch, and warehouse",
      category: "inventory",
      icon: IconPackage,
      color: "primary",
    },
    {
      id: "stock-valuation",
      title: "Stock Valuation Report",
      description: "Total inventory value by location, category, and product",
      category: "inventory",
      icon: IconTrendingUp,
      color: "success",
    },
    {
      id: "stock-movement",
      title: "Stock Movement Report",
      description: "Detailed movement history of all stock transactions",
      category: "inventory",
      icon: IconArrowsExchange,
      color: "info",
    },
    {
      id: "low-stock",
      title: "Low Stock Alert Report",
      description: "Products below minimum stock threshold requiring reorder",
      category: "inventory",
      icon: IconFileText,
      color: "warning",
    },
    // Sales Reports
    {
      id: "sales-summary",
      title: "Sales Summary Report",
      description: "Total sales by period, branch, product, and category",
      category: "sales",
      icon: IconCurrencyDollar,
      color: "success",
    },
    {
      id: "sales-by-customer",
      title: "Sales by Customer Report",
      description: "Customer purchase history and top customers analysis",
      category: "sales",
      icon: IconUsers,
      color: "primary",
    },
    {
      id: "product-performance",
      title: "Product Performance Report",
      description: "Best and worst performing products with sales metrics",
      category: "sales",
      icon: IconChartBar,
      color: "info",
    },
    // Financial Reports
    {
      id: "revenue",
      title: "Revenue Report",
      description: "Total revenue breakdown by period, branch, and category",
      category: "financial",
      icon: IconTrendingUp,
      color: "success",
    },
    {
      id: "expenses",
      title: "Expenses Report",
      description: "Total expenses by category, branch, and payment method",
      category: "financial",
      icon: IconArrowDown,
      color: "error",
    },
    {
      id: "profit-loss",
      title: "Profit & Loss Report",
      description: "Comprehensive P&L statement with profit margins",
      category: "financial",
      icon: IconChartBar,
      color: "primary",
    },
    {
      id: "accounts-receivable",
      title: "Accounts Receivable Report",
      description: "Outstanding payments from customers with aging analysis",
      category: "financial",
      icon: IconFileText,
      color: "warning",
    },
    {
      id: "accounts-payable",
      title: "Accounts Payable Report",
      description: "Outstanding payments to suppliers with due dates",
      category: "financial",
      icon: IconFileText,
      color: "error",
    },
    // Stock Operations Reports
    {
      id: "stock-entries",
      title: "Stock Entries Report",
      description: "Detailed report of all stock entries by supplier and date",
      category: "operations",
      icon: IconArrowDown,
      color: "success",
    },
    {
      id: "stock-outgoing",
      title: "Stock Outgoing Report",
      description: "Detailed report of all stock outgoing by customer and date",
      category: "operations",
      icon: IconArrowUp,
      color: "error",
    },
    {
      id: "stock-transfer",
      title: "Stock Transfer Report",
      description: "All internal transfers between branches and warehouses",
      category: "operations",
      icon: IconArrowsExchange,
      color: "info",
    },
    {
      id: "adjustments",
      title: "Adjustments Report",
      description: "Payment adjustments summary with reasons and trends",
      category: "operations",
      icon: IconAdjustments,
      color: "warning",
    },
    // Partner Reports
    {
      id: "supplier",
      title: "Supplier Report",
      description: "Supplier performance, purchase history, and payment status",
      category: "partners",
      icon: IconUsers,
      color: "primary",
    },
    {
      id: "customer",
      title: "Customer Report",
      description: "Customer purchase history, lifetime value, and payment status",
      category: "partners",
      icon: IconUsers,
      color: "info",
    },
    // Transaction Reports
    {
      id: "money-transfers",
      title: "Money Transfer Report",
      description: "All money transfers between branches and accounts",
      category: "transactions",
      icon: IconArrowsExchange,
      color: "info",
    },
    {
      id: "payment-transactions",
      title: "Payment Transaction Report",
      description: "Complete payment transaction history and cash flow",
      category: "transactions",
      icon: IconCurrencyDollar,
      color: "success",
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getCategoryReports = () => {
    const categories = [
      "all",
      "inventory",
      "sales",
      "financial",
      "operations",
      "partners",
      "transactions",
    ];
    const category = categories[tabValue];

    if (category === "all") {
      return allReports;
    }
    return allReports.filter((report) => report.category === category);
  };

  const filteredReports = getCategoryReports();

  const getCategoryLabel = (index: number) => {
    const labels = [
      "All Reports",
      "Inventory",
      "Sales",
      "Financial",
      "Operations",
      "Partners",
      "Transactions",
    ];
    return labels[index];
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Category Tabs */}
      <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
        <Tab label="All Reports" />
        <Tab label="Inventory" />
        <Tab label="Sales" />
        <Tab label="Financial" />
        <Tab label="Operations" />
        <Tab label="Partners" />
        <Tab label="Transactions" />
      </Tabs>

      {/* Reports Grid */}
      <Grid container spacing={3}>
        {filteredReports.map((report) => {
          const IconComponent = report.icon;
          return (
            <Grid
              key={report.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }}
            >
              <Card
                elevation={2}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    elevation: 4,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: `${report.color}.light`,
                        color: `${report.color}.contrastText`,
                      }}
                    >
                      <IconComponent size={24} />
                    </Box>
                    <Typography variant="h6" fontWeight={600}>
                      {report.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {report.description}
                  </Typography>
                  <Chip
                    label={report.category}
                    size="small"
                    sx={{ mt: 2 }}
                    color={report.color as any}
                    variant="outlined"
                  />
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    size="small"
                    startIcon={<IconEye size={18} />}
                    onClick={() => onSelectReport && onSelectReport(report.id)}
                  >
                    View Report
                  </Button>
                  <Button
                    size="small"
                    startIcon={<IconDownload size={18} />}
                    onClick={() => {
                      console.log("Exporting report:", report.id);
                      // Handle export
                    }}
                  >
                    Export
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {filteredReports.length === 0 && (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography color="text.secondary">
            No reports found in this category
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ReportsList;

