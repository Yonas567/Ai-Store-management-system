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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Pagination,
} from "@mui/material";
import {
  IconSearch,
  IconEye,
  IconEdit,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

export interface FilterState {
  search: string;
  fromBranch: string;
  toBranch: string;
  status: string;
}

interface StockTransferListProps {
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
  onViewDetails?: (transfer: any) => void;
  onEdit?: (transfer: any) => void;
  onApprove?: (transfer: any) => void;
  onReject?: (transfer: any) => void;
}

const StockTransferList = ({
  filters,
  onFilterChange,
  onViewDetails,
  onEdit,
  onApprove,
  onReject,
}: StockTransferListProps) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const [localFilters, setLocalFilters] = useState<FilterState>({
    search: "",
    fromBranch: "",
    toBranch: "",
    status: "",
    ...filters,
  });

  // Sample transfer data
  const allTransfers = [
    {
      id: 1,
      reference: "TRF-001",
      transferDate: "2024-01-20",
      product: "Paint Can Blue",
      quantity: 50,
      unit: "pcs",
      fromBranch: "Branch A",
      fromWarehouse: "Main Warehouse",
      toBranch: "Branch B",
      toWarehouse: "North Warehouse",
      status: "completed",
      notes: "Transfer for inventory rebalancing",
    },
    {
      id: 2,
      reference: "TRF-002",
      transferDate: "2024-01-19",
      product: "Paint Brush Set",
      quantity: 30,
      unit: "pcs",
      fromBranch: "Branch B",
      fromWarehouse: "North Warehouse",
      toBranch: "Branch C",
      toWarehouse: "South Warehouse",
      status: "pending",
      notes: "Urgent transfer request",
    },
    {
      id: 3,
      reference: "TRF-003",
      transferDate: "2024-01-18",
      product: "Roller Brush",
      quantity: 20,
      unit: "pcs",
      fromBranch: "Branch A",
      fromWarehouse: "Warehouse A",
      toBranch: "Branch A",
      toWarehouse: "Warehouse B",
      status: "completed",
      notes: "Internal warehouse transfer",
    },
    {
      id: 4,
      reference: "TRF-004",
      transferDate: "2024-01-17",
      product: "Paint Can Red",
      quantity: 25,
      unit: "pcs",
      fromBranch: "Branch C",
      fromWarehouse: "South Warehouse",
      toBranch: "Branch A",
      toWarehouse: "Main Warehouse",
      status: "rejected",
      notes: "Insufficient stock",
    },
  ];

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  // Filter transfers
  const getFilteredTransfers = () => {
    let filtered = allTransfers;

    if (localFilters.search) {
      const searchLower = localFilters.search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.reference.toLowerCase().includes(searchLower) ||
          t.product.toLowerCase().includes(searchLower) ||
          t.fromBranch.toLowerCase().includes(searchLower) ||
          t.toBranch.toLowerCase().includes(searchLower)
      );
    }

    if (localFilters.fromBranch) {
      filtered = filtered.filter((t) => t.fromBranch === localFilters.fromBranch);
    }

    if (localFilters.toBranch) {
      filtered = filtered.filter((t) => t.toBranch === localFilters.toBranch);
    }

    if (localFilters.status) {
      filtered = filtered.filter((t) => t.status === localFilters.status);
    }

    return filtered;
  };

  const filteredTransfers = getFilteredTransfers();
  const paginatedTransfers = filteredTransfers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "pending":
        return "Pending";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Filter Section */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            fullWidth
            placeholder="Search by reference, product, branch..."
            value={localFilters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            InputProps={{
              startAdornment: <IconSearch size={20} style={{ marginRight: 8 }} />,
            }}
            size="small"
            sx={{ flex: "1 1 300px" }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>From Branch</InputLabel>
            <Select
              value={localFilters.fromBranch}
              label="From Branch"
              onChange={(e) => handleFilterChange("fromBranch", e.target.value)}
            >
              <MenuItem value="">All Branches</MenuItem>
              <MenuItem value="Branch A">Branch A</MenuItem>
              <MenuItem value="Branch B">Branch B</MenuItem>
              <MenuItem value="Branch C">Branch C</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>To Branch</InputLabel>
            <Select
              value={localFilters.toBranch}
              label="To Branch"
              onChange={(e) => handleFilterChange("toBranch", e.target.value)}
            >
              <MenuItem value="">All Branches</MenuItem>
              <MenuItem value="Branch A">Branch A</MenuItem>
              <MenuItem value="Branch B">Branch B</MenuItem>
              <MenuItem value="Branch C">Branch C</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={localFilters.status}
              label="Status"
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Transfers Table */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reference</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransfers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    No transfers found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedTransfers.map((transfer) => (
                <TableRow key={transfer.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {transfer.reference}
                    </Typography>
                  </TableCell>
                  <TableCell>{transfer.transferDate}</TableCell>
                  <TableCell>{transfer.product}</TableCell>
                  <TableCell>
                    {transfer.quantity} {transfer.unit}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {transfer.fromBranch}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {transfer.fromWarehouse}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{transfer.toBranch}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {transfer.toWarehouse}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(transfer.status)}
                      color={getStatusColor(transfer.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <IconButton
                        size="small"
                        onClick={() =>
                          onViewDetails && onViewDetails(transfer)
                        }
                      >
                        <IconEye size={18} />
                      </IconButton>
                      {transfer.status === "pending" && (
                        <>
                          <IconButton
                            size="small"
                            onClick={() => onEdit && onEdit(transfer)}
                            color="primary"
                          >
                            <IconEdit size={18} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => onApprove && onApprove(transfer)}
                            color="success"
                          >
                            <IconCheck size={18} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => onReject && onReject(transfer)}
                            color="error"
                          >
                            <IconX size={18} />
                          </IconButton>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <Pagination
            count={Math.ceil(filteredTransfers.length / rowsPerPage)}
            page={page}
            onChange={(e, newPage) => setPage(newPage)}
            color="primary"
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default StockTransferList;


