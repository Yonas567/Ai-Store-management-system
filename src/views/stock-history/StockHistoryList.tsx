"use client";
import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Collapse,
  Button,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Avatar,
} from "@mui/material";
import {
  IconSearch,
  IconFilter,
  IconChevronDown,
  IconChevronUp,
  IconEye,
  IconArrowDown,
  IconArrowUp,
} from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export interface FilterState {
  search: string;
  productName: string;
  category: string;
  transactionType: string;
  branch: string;
  warehouse: string;
  supplier: string;
  customer: string;
}

interface StockHistoryListProps {
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
  onViewDetails?: (transaction: any) => void;
}

const StockHistoryList = ({
  filters,
  onFilterChange,
  onViewDetails,
}: StockHistoryListProps) => {
  const [tabValue, setTabValue] = useState(0);
  const [viewMode, setViewMode] = useState<"table" | "timeline" | "chart">(
    "table"
  );
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const [localFilters, setLocalFilters] = useState<FilterState>({
    search: "",
    productName: "",
    category: "",
    transactionType: "",
    branch: "",
    warehouse: "",
    supplier: "",
    customer: "",
    ...filters,
  });

  // Sample data for stock entries and outgoing transactions
  // Note: Adjustments are actions performed on these transactions, not separate transactions
  const allTransactions = [
    {
      id: 1,
      type: "entry",
      date: "2024-01-20",
      product: "Paint Can Blue",
      category: "Paint",
      quantity: 50,
      unit: "pcs",
      unitPrice: 20,
      totalAmount: 1000,
      transactionType: "credit",
      paymentStatus: "pending",
      supplier: "Home Depot Supplies",
      warehouse: "Main Warehouse",
      branch: "Branch A",
    },
    {
      id: 2,
      type: "outgoing",
      date: "2024-01-19",
      product: "Paint Brush Set",
      category: "Tools",
      quantity: 5,
      unit: "pcs",
      unitPrice: 20,
      totalAmount: 100,
      transactionType: "sale",
      paymentStatus: "paid",
      recipient: "Customer - Jane Smith",
      warehouse: "North Branch",
      branch: "Branch B",
    },
    {
      id: 3,
      type: "entry",
      date: "2024-01-18",
      product: "Roller Brush",
      category: "Tools",
      quantity: 20,
      unit: "pcs",
      unitPrice: 25,
      totalAmount: 500,
      transactionType: "credit",
      paymentStatus: "partial", // This status may have been adjusted
      supplier: "TechCorp Industries",
      warehouse: "South Branch",
      branch: "Branch C",
    },
    {
      id: 4,
      type: "entry",
      date: "2024-01-17",
      product: "Paint Can Red",
      category: "Paint",
      quantity: 10,
      unit: "pcs",
      unitPrice: 20,
      totalAmount: 200,
      transactionType: "cash",
      paymentStatus: "paid",
      supplier: "Fashion Inc",
      warehouse: "Main Warehouse",
      branch: "Branch A",
    },
    {
      id: 5,
      type: "outgoing",
      date: "2024-01-16",
      product: "Paint Can Blue",
      category: "Paint",
      quantity: 15,
      unit: "pcs",
      unitPrice: 25,
      totalAmount: 375,
      transactionType: "sale",
      paymentStatus: "partial", // This status may have been adjusted
      recipient: "Customer - Bob Wilson",
      warehouse: "Main Warehouse",
      branch: "Branch A",
    },
  ];

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: "table" | "timeline" | "chart" | null
  ) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  // Filter transactions based on active tab
  const getFilteredTransactions = () => {
    let filtered = allTransactions;

    if (tabValue === 1) {
      filtered = filtered.filter((t) => t.type === "entry");
    } else if (tabValue === 2) {
      filtered = filtered.filter((t) => t.type === "outgoing");
    }
    // Note: Adjustments are actions on transactions, not separate transactions

    // Apply search filter
    if (localFilters.search) {
      const searchLower = localFilters.search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.product.toLowerCase().includes(searchLower) ||
          t.category.toLowerCase().includes(searchLower) ||
          (t.supplier && t.supplier.toLowerCase().includes(searchLower)) ||
          (t.recipient && t.recipient.toLowerCase().includes(searchLower))
      );
    }

    // Apply other filters
    if (localFilters.productName) {
      filtered = filtered.filter((t) =>
        t.product.toLowerCase().includes(localFilters.productName.toLowerCase())
      );
    }
    if (localFilters.category) {
      filtered = filtered.filter((t) => t.category === localFilters.category);
    }
    if (localFilters.transactionType) {
      filtered = filtered.filter(
        (t) => t.transactionType === localFilters.transactionType
      );
    }
    if (localFilters.branch) {
      filtered = filtered.filter((t) => t.branch === localFilters.branch);
    }

    return filtered;
  };

  const filteredTransactions = getFilteredTransactions();
  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Sort transactions by date for timeline
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Prepare chart data
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const success = theme.palette.success.main;
  const error = theme.palette.error.main;
  const warning = theme.palette.warning.main;

  // Group transactions by date for chart
  const chartData = sortedTransactions.reduce((acc: any, transaction) => {
    const date = transaction.date;
    if (!acc[date]) {
      acc[date] = { entry: 0, outgoing: 0 };
    }
    if (transaction.type === "entry") {
      acc[date].entry += transaction.totalAmount;
    } else if (transaction.type === "outgoing") {
      acc[date].outgoing += transaction.totalAmount;
    }
    return acc;
  }, {});

  const chartDates = Object.keys(chartData).sort();
  const entryData = chartDates.map((date) => chartData[date].entry);
  const outgoingData = chartDates.map((date) => chartData[date].outgoing);

  const chartOptions: any = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
      height: 400,
    },
    colors: [success, error],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: chartDates,
      labels: {
        rotate: -45,
        rotateAlways: false,
      },
    },
    yaxis: {
      title: {
        text: "Amount ($)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return "$ " + val.toLocaleString();
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
    },
  };

  const chartSeries = [
    {
      name: "Entries",
      data: entryData,
    },
    {
      name: "Outgoing",
      data: outgoingData,
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "entry":
        return "success";
      case "outgoing":
        return "error";
      default:
        return "default";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "entry":
        return "Entry";
      case "outgoing":
        return "Outgoing";
      default:
        return type;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "success";
      case "partial":
        return "warning";
      case "pending":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Filter Section */}

      {/* Tabs and View Toggle */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All Transactions" />
          <Tab label="Entries" />
          <Tab label="Outgoing" />
        </Tabs>

        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewModeChange}
          size="small"
        >
          <ToggleButton value="table">Table</ToggleButton>
          <ToggleButton value="timeline">Timeline</ToggleButton>
          <ToggleButton value="chart">Chart</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Main Content - Table View */}
      {viewMode === "table" && (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Branch</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No transactions found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTransactions.map((transaction) => (
                  <TableRow key={transaction.id} hover>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={getTypeLabel(transaction.type)}
                        color={getTypeColor(transaction.type) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{transaction.product}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>
                      {transaction.quantity} {transaction.unit}
                    </TableCell>
                    <TableCell>${transaction.unitPrice}</TableCell>
                    <TableCell>${transaction.totalAmount}</TableCell>
                    <TableCell>
                      <Chip
                        label={transaction.paymentStatus}
                        color={
                          getPaymentStatusColor(
                            transaction.paymentStatus
                          ) as any
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{transaction.branch}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() =>
                          onViewDetails && onViewDetails(transaction)
                        }
                      >
                        <IconEye size={18} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <Pagination
              count={Math.ceil(filteredTransactions.length / rowsPerPage)}
              page={page}
              onChange={(e, newPage) => setPage(newPage)}
              color="primary"
            />
          </Box>
        </Paper>
      )}

      {/* Timeline View */}
      {viewMode === "timeline" && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Transaction Timeline
          </Typography>
          <Box sx={{ position: "relative" }}>
            {sortedTransactions.length === 0 ? (
              <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                No transactions found
              </Typography>
            ) : (
              sortedTransactions.map((transaction, index) => {
                const isLast = index === sortedTransactions.length - 1;
                const getTypeIcon = () => {
                  switch (transaction.type) {
                    case "entry":
                      return <IconArrowDown size={20} />;
                    case "outgoing":
                      return <IconArrowUp size={20} />;
                    default:
                      return null;
                  }
                };

                return (
                  <Box key={transaction.id}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      {/* Timeline Line */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: 40,
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor:
                              transaction.type === "entry"
                                ? "success.main"
                                : "error.main",
                            width: 40,
                            height: 40,
                          }}
                        >
                          {getTypeIcon()}
                        </Avatar>
                        {!isLast && (
                          <Box
                            sx={{
                              width: 2,
                              flex: 1,
                              bgcolor: "divider",
                              my: 1,
                              minHeight: 60,
                            }}
                          />
                        )}
                      </Box>

                      {/* Transaction Content */}
                      <Box sx={{ flex: 1, pb: isLast ? 0 : 3 }}>
                        <Paper
                          elevation={2}
                          sx={{
                            p: 2,
                            borderLeft: "4px solid",
                            borderLeftColor:
                              transaction.type === "entry"
                                ? "success.main"
                                : "error.main",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              mb: 1,
                            }}
                          >
                            <Box>
                              <Typography variant="h6" fontWeight={600}>
                                {transaction.product}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 0.5 }}
                              >
                                {transaction.date} • {transaction.category}
                              </Typography>
                            </Box>
                            <Chip
                              label={getTypeLabel(transaction.type)}
                              color={getTypeColor(transaction.type) as any}
                              size="small"
                            />
                          </Box>

                          <Divider sx={{ my: 1.5 }} />

                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns:
                                "repeat(auto-fit, minmax(150px, 1fr))",
                              gap: 2,
                            }}
                          >
                            <Box>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                display="block"
                              >
                                Quantity
                              </Typography>
                              <Typography variant="body1" fontWeight={600}>
                                {transaction.quantity} {transaction.unit}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                display="block"
                              >
                                Unit Price
                              </Typography>
                              <Typography variant="body1" fontWeight={600}>
                                ${transaction.unitPrice}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                display="block"
                              >
                                Total Amount
                              </Typography>
                              <Typography
                                variant="body1"
                                fontWeight={600}
                                color="primary.main"
                              >
                                ${transaction.totalAmount}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                display="block"
                              >
                                Status
                              </Typography>
                              <Chip
                                label={transaction.paymentStatus}
                                color={
                                  getPaymentStatusColor(
                                    transaction.paymentStatus
                                  ) as any
                                }
                                size="small"
                                sx={{ mt: 0.5 }}
                              />
                            </Box>
                            <Box>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                display="block"
                              >
                                Branch
                              </Typography>
                              <Typography variant="body1" fontWeight={600}>
                                {transaction.branch}
                              </Typography>
                            </Box>
                            {(transaction.supplier ||
                              transaction.recipient) && (
                              <Box>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  display="block"
                                >
                                  {transaction.supplier
                                    ? "Supplier"
                                    : "Recipient"}
                                </Typography>
                                <Typography variant="body1" fontWeight={600}>
                                  {transaction.supplier ||
                                    transaction.recipient}
                                </Typography>
                              </Box>
                            )}
                          </Box>

                          <Box
                            sx={{
                              mt: 2,
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() =>
                                onViewDetails && onViewDetails(transaction)
                              }
                              color="primary"
                            >
                              <IconEye size={18} />
                            </IconButton>
                          </Box>
                        </Paper>
                      </Box>
                    </Box>
                  </Box>
                );
              })
            )}
          </Box>
        </Paper>
      )}

      {/* Chart View */}
      {viewMode === "chart" && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Transaction Analytics
          </Typography>
          {filteredTransactions.length === 0 ? (
            <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
              No transactions found
            </Typography>
          ) : (
            <Box>
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={400}
                width="100%"
              />
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: 2,
                  mt: 4,
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    textAlign: "center",
                    borderLeft: "4px solid",
                    borderLeftColor: "success.main",
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="success.main"
                  >
                    $
                    {filteredTransactions
                      .filter((t) => t.type === "entry")
                      .reduce((sum, t) => sum + t.totalAmount, 0)
                      .toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Entries
                  </Typography>
                </Paper>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: "center",
                    borderLeft: "4px solid",
                    borderLeftColor: "error.main",
                  }}
                >
                  <Typography variant="h4" fontWeight={700} color="error.main">
                    $
                    {filteredTransactions
                      .filter((t) => t.type === "outgoing")
                      .reduce((sum, t) => sum + t.totalAmount, 0)
                      .toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Outgoing
                  </Typography>
                </Paper>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: "center",
                    borderLeft: "4px solid",
                    borderLeftColor: "primary.main",
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="primary.main"
                  >
                    {filteredTransactions.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Transactions
                  </Typography>
                </Paper>
              </Box>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default StockHistoryList;
