"use client";
import { useState } from "react";
import { Box, Drawer, Typography, Divider, Chip, Paper } from "@mui/material";
import StockHistoryHeader from "./StockHistoryHeader";
import StockHistoryList, { FilterState } from "./StockHistoryList";
import { IconX } from "@tabler/icons-react";

const StockHistory = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    productName: "",
    category: "",
    transactionType: "",
    branch: "",
    warehouse: "",
    supplier: "",
    customer: "",
  });

  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleViewDetails = (transaction: any) => {
    setSelectedTransaction(transaction);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedTransaction(null);
  };

  const handleExport = () => {
    console.log("Exporting stock history...");
    // Implement export functionality
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRefresh = () => {
    console.log("Refreshing stock history...");
    // Implement refresh functionality
  };

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    console.log("Date range changed:", startDate, endDate);
    // Implement date range filtering
  };

  return (
    <Box sx={{ display: "flex", width: "100%", gap: 3 }}>
      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
        <StockHistoryHeader
          onExport={handleExport}
          onPrint={handlePrint}
          onRefresh={handleRefresh}
          onDateRangeChange={handleDateRangeChange}
        />
        <StockHistoryList
          filters={filters}
          onFilterChange={handleFilterChange}
          onViewDetails={handleViewDetails}
        />
      </Box>

      {/* Side Panel - Product Details */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        PaperProps={{
          sx: { width: { xs: "100%", sm: 400 } },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Transaction Details</Typography>
            <IconX style={{ cursor: "pointer" }} onClick={handleCloseDrawer} />
          </Box>

          {selectedTransaction && (
            <>
              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Transaction Type
                  </Typography>
                  <Chip
                    label={
                      selectedTransaction.type === "entry"
                        ? "Entry"
                        : selectedTransaction.type === "outgoing"
                        ? "Outgoing"
                        : "Adjustment"
                    }
                    color={
                      selectedTransaction.type === "entry"
                        ? "success"
                        : selectedTransaction.type === "outgoing"
                        ? "error"
                        : "warning"
                    }
                    size="small"
                  />
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Date
                  </Typography>
                  <Typography variant="body1">
                    {selectedTransaction.date}
                  </Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Product
                  </Typography>
                  <Typography variant="body1">
                    {selectedTransaction.product}
                  </Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Category
                  </Typography>
                  <Typography variant="body1">
                    {selectedTransaction.category}
                  </Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Quantity
                  </Typography>
                  <Typography variant="body1">
                    {selectedTransaction.quantity} {selectedTransaction.unit}
                  </Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Unit Price
                  </Typography>
                  <Typography variant="body1">
                    ${selectedTransaction.unitPrice}
                  </Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Total Amount
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${selectedTransaction.totalAmount}
                  </Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Payment Status
                  </Typography>
                  <Chip
                    label={selectedTransaction.paymentStatus}
                    color={
                      selectedTransaction.paymentStatus === "paid"
                        ? "success"
                        : selectedTransaction.paymentStatus === "partial"
                        ? "warning"
                        : "error"
                    }
                    size="small"
                  />
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Branch
                  </Typography>
                  <Typography variant="body1">
                    {selectedTransaction.branch}
                  </Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Warehouse
                  </Typography>
                  <Typography variant="body1">
                    {selectedTransaction.warehouse}
                  </Typography>
                </Paper>

                {selectedTransaction.supplier && (
                  <Paper sx={{ p: 2 }}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Supplier
                    </Typography>
                    <Typography variant="body1">
                      {selectedTransaction.supplier}
                    </Typography>
                  </Paper>
                )}

                {selectedTransaction.recipient && (
                  <Paper sx={{ p: 2 }}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Recipient
                    </Typography>
                    <Typography variant="body1">
                      {selectedTransaction.recipient}
                    </Typography>
                  </Paper>
                )}
              </Box>
            </>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default StockHistory;
