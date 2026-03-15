"use client";
import { useState } from "react";
import { Box, Drawer, Typography, Divider, Paper } from "@mui/material";
import StockTransferHeader from "./StockTransferHeader";
import StockTransferList, { FilterState } from "./StockTransferList";
import StockTransferForm from "./StockTransferForm";
import { IconX } from "@tabler/icons-react";

const StockTransfer = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    fromBranch: "",
    toBranch: "",
    status: "",
  });

  const [selectedTransfer, setSelectedTransfer] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formDrawerOpen, setFormDrawerOpen] = useState(false);
  const [editingTransfer, setEditingTransfer] = useState<any>(null);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleViewDetails = (transfer: any) => {
    setSelectedTransfer(transfer);
    setDrawerOpen(true);
  };

  const handleEdit = (transfer: any) => {
    setEditingTransfer(transfer);
    setFormDrawerOpen(true);
  };

  const handleAdd = () => {
    setEditingTransfer(null);
    setFormDrawerOpen(true);
  };

  const handleApprove = (transfer: any) => {
    if (window.confirm(`Approve transfer ${transfer.reference}?`)) {
      console.log("Approving transfer:", transfer);
      // Implement approve functionality - update inventory
    }
  };

  const handleReject = (transfer: any) => {
    if (window.confirm(`Reject transfer ${transfer.reference}?`)) {
      console.log("Rejecting transfer:", transfer);
      // Implement reject functionality
    }
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedTransfer(null);
  };

  const handleCloseFormDrawer = () => {
    setFormDrawerOpen(false);
    setEditingTransfer(null);
  };

  const handleSubmitTransfer = (data: any) => {
    console.log("Transfer data:", data);
    // Implement save functionality
    // This should:
    // 1. Create transfer record
    // 2. Update inventory in from warehouse (decrease)
    // 3. Update inventory in to warehouse (increase) - or mark as pending
    setFormDrawerOpen(false);
    setEditingTransfer(null);
  };

  return (
    <Box sx={{ display: "flex", width: "100%", gap: 3 }}>
      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
        <StockTransferHeader onAddClick={handleAdd} />
        <StockTransferList
          filters={filters}
          onFilterChange={handleFilterChange}
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </Box>

      {/* Transfer Details Drawer */}
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
            <Typography variant="h6">Transfer Details</Typography>
            <IconX
              style={{ cursor: "pointer" }}
              onClick={handleCloseDrawer}
            />
          </Box>

          {selectedTransfer && (
            <>
              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Reference
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {selectedTransfer.reference}
                  </Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Date
                  </Typography>
                  <Typography variant="body1">{selectedTransfer.transferDate}</Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Product
                  </Typography>
                  <Typography variant="body1">{selectedTransfer.product}</Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Quantity
                  </Typography>
                  <Typography variant="body1">
                    {selectedTransfer.quantity} {selectedTransfer.unit}
                  </Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    From Location
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {selectedTransfer.fromBranch}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedTransfer.fromWarehouse}
                  </Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    To Location
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {selectedTransfer.toBranch}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedTransfer.toWarehouse}
                  </Typography>
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Status
                  </Typography>
                  <Typography variant="body1">{selectedTransfer.status}</Typography>
                </Paper>

                {selectedTransfer.notes && (
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Notes
                    </Typography>
                    <Typography variant="body1">{selectedTransfer.notes}</Typography>
                  </Paper>
                )}
              </Box>
            </>
          )}
        </Box>
      </Drawer>

      {/* Transfer Form Drawer */}
      <Drawer
        anchor="right"
        open={formDrawerOpen}
        onClose={handleCloseFormDrawer}
        PaperProps={{
          sx: { width: { xs: "100%", sm: 600 }, maxWidth: "90vw" },
        }}
      >
        <StockTransferForm
          formData={editingTransfer}
          onSubmit={handleSubmitTransfer}
          onClose={handleCloseFormDrawer}
        />
      </Drawer>
    </Box>
  );
};

export default StockTransfer;


