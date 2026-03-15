"use client";
import { useState } from "react";
import { Box, Drawer, Typography, Divider, Paper } from "@mui/material";
import TransactionsHeader from "./TransactionsHeader";
import TransactionsList, { FilterState } from "./TransactionsList";
import TransactionForm from "./TransactionForm";
import { IconX } from "@tabler/icons-react";

const Transactions = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    transactionType: "",
    branch: "",
    category: "",
    dateFrom: "",
    dateTo: "",
  });

  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formDrawerOpen, setFormDrawerOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleViewDetails = (transaction: any) => {
    setSelectedTransaction(transaction);
    setDrawerOpen(true);
  };

  const handleEdit = (transaction: any) => {
    setEditingTransaction(transaction);
    setFormDrawerOpen(true);
  };

  const handleAdd = () => {
    setEditingTransaction(null);
    setFormDrawerOpen(true);
  };

  const handleDelete = (transaction: any) => {
    if (window.confirm(`Are you sure you want to delete transaction ${transaction.reference}?`)) {
      console.log("Deleting transaction:", transaction);
      // Implement delete functionality
    }
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedTransaction(null);
  };

  const handleCloseFormDrawer = () => {
    setFormDrawerOpen(false);
    setEditingTransaction(null);
  };

  const handleSubmitTransaction = (data: any) => {
    console.log("Transaction data:", data);
    // Implement save functionality
    setFormDrawerOpen(false);
    setEditingTransaction(null);
  };

  const handleExport = () => {
    console.log("Exporting transactions...");
    // Implement export functionality
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRefresh = () => {
    console.log("Refreshing transactions...");
    // Implement refresh functionality
  };

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    setFilters({ ...filters, dateFrom: startDate, dateTo: endDate });
  };

  return (
    <Box sx={{ display: "flex", width: "100%", gap: 3 }}>
      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
        <TransactionsHeader
          onAddClick={handleAdd}
          onExport={handleExport}
          onPrint={handlePrint}
          onRefresh={handleRefresh}
          onDateRangeChange={handleDateRangeChange}
        />
        <TransactionsList
          filters={filters}
          onFilterChange={handleFilterChange}
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>

      {/* Transaction Details Drawer */}
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
            <IconX
              style={{ cursor: "pointer" }}
              onClick={handleCloseDrawer}
            />
          </Box>

          {selectedTransaction && (
            <>
              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Reference
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {selectedTransaction.reference}
                  </Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Transaction Type
                  </Typography>
                  <Typography variant="body1">
                    {selectedTransaction.transactionType}
                  </Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Date
                  </Typography>
                  <Typography variant="body1">{selectedTransaction.date}</Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Amount
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${selectedTransaction.amount.toLocaleString()}
                  </Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body1">
                    {selectedTransaction.description}
                  </Typography>
                </Paper>

                {selectedTransaction.transactionType === "transfer" && (
                  <>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        From Branch
                      </Typography>
                      <Typography variant="body1">
                        {selectedTransaction.fromBranch}
                      </Typography>
                    </Paper>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        To Branch
                      </Typography>
                      <Typography variant="body1">
                        {selectedTransaction.toBranch}
                      </Typography>
                    </Paper>
                  </>
                )}

                {(selectedTransaction.branch ||
                  selectedTransaction.fromBranch ||
                  selectedTransaction.toBranch) && (
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Branch
                    </Typography>
                    <Typography variant="body1">
                      {selectedTransaction.branch ||
                        selectedTransaction.fromBranch ||
                        selectedTransaction.toBranch}
                    </Typography>
                  </Paper>
                )}

                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Category
                  </Typography>
                  <Typography variant="body1">{selectedTransaction.category}</Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Payment Method
                  </Typography>
                  <Typography variant="body1">
                    {selectedTransaction.paymentMethod}
                  </Typography>
                </Paper>
              </Box>
            </>
          )}
        </Box>
      </Drawer>

      {/* Transaction Form Drawer */}
      <Drawer
        anchor="right"
        open={formDrawerOpen}
        onClose={handleCloseFormDrawer}
        PaperProps={{
          sx: { width: { xs: "100%", sm: 600 }, maxWidth: "90vw" },
        }}
      >
        <TransactionForm
          formData={editingTransaction}
          onSubmit={handleSubmitTransaction}
          onClose={handleCloseFormDrawer}
        />
      </Drawer>
    </Box>
  );
};

export default Transactions;


