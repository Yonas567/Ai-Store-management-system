"use client";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
} from "@mui/material";
import { IconEdit } from "@tabler/icons-react";

interface FilterState {
  productName: string;
  transactionType: string;
  paymentStatus: string;
  supplier: string;
}

interface StockEntriesListProps {
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
  onEdit?: (entry: any) => void;
}

const StockEntriesList = ({
  filters,
  onFilterChange,
  onEdit,
}: StockEntriesListProps) => {
  // Sample data for the table
  const tableData = [
    {
      id: 1,
      entryDate: "2024-01-15",
      product: "Paint Can Blue",
      category: "Paint",
      quantity: 50,
      unit: "pcs",
      unitPrice: 20,
      totalAmount: 1000,
      transactionType: "cash",
      amountPaid: 1000,
      amountDue: 0,
      dueDate: null,
      paymentStatus: "paid",
      supplier: "Home Depot Supplies",
      warehouse: "Main Warehouse",
      branch: "Branch A",
    },
    {
      id: 2,
      entryDate: "2024-01-14",
      product: "Paint Brush Set",
      category: "Tools",
      quantity: 30,
      unit: "pcs",
      unitPrice: 15,
      totalAmount: 450,
      transactionType: "credit",
      amountPaid: 0,
      amountDue: 450,
      dueDate: "2024-02-14",
      paymentStatus: "pending",
      supplier: "TechCorp Industries",
      warehouse: "North Branch",
      branch: "Branch B",
    },
    {
      id: 3,
      entryDate: "2024-01-13",
      product: "Roller Brush",
      category: "Tools",
      quantity: 20,
      unit: "pcs",
      unitPrice: 25,
      totalAmount: 500,
      transactionType: "partial",
      amountPaid: 250,
      amountDue: 250,
      dueDate: "2024-02-13",
      paymentStatus: "partial",
      supplier: "Fashion Inc",
      warehouse: "South Branch",
      branch: "Branch C",
    },
    {
      id: 4,
      entryDate: "2024-01-12",
      product: "Paint Can Red",
      category: "Paint",
      quantity: 10,
      unit: "pcs",
      unitPrice: 20,
      totalAmount: 200,
      transactionType: "borrowed",
      amountPaid: 0,
      amountDue: 0,
      dueDate: null,
      paymentStatus: "borrowed",
      supplier: "Neighbor - John",
      warehouse: "Main Warehouse",
      branch: "Branch A",
    },
  ];

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case "cash":
        return "success";
      case "credit":
        return "error";
      case "partial":
        return "warning";
      case "borrowed":
        return "info";
      default:
        return "default";
    }
  };

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case "cash":
        return "Cash";
      case "credit":
        return "Credit";
      case "partial":
        return "Partial";
      case "borrowed":
        return "Borrowed";
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
      case "borrowed":
        return "info";
      default:
        return "default";
    }
  };

  const getPaymentStatusLabel = (status: string) => {
    switch (status) {
      case "paid":
        return "Paid";
      case "partial":
        return "Partial";
      case "pending":
        return "Pending";
      case "borrowed":
        return "Borrowed";
      default:
        return status;
    }
  };

  const filteredData = tableData.filter((row) => {
    if (
      filters?.productName &&
      !row.product.toLowerCase().includes(filters.productName.toLowerCase())
    ) {
      return false;
    }
    if (
      filters?.transactionType &&
      row.transactionType !== filters.transactionType
    ) {
      return false;
    }
    if (filters?.paymentStatus && row.paymentStatus !== filters.paymentStatus) {
      return false;
    }
    if (
      filters?.supplier &&
      !row.supplier.toLowerCase().includes(filters.supplier.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {/* Filters */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            size="small"
            label="Product Name"
            value={filters?.productName || ""}
            onChange={(e) =>
              onFilterChange?.({
                ...filters,
                productName: e.target.value,
              } as FilterState)
            }
            sx={{ minWidth: 200 }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Transaction Type</InputLabel>
            <Select
              label="Transaction Type"
              value={filters?.transactionType || ""}
              onChange={(e) =>
                onFilterChange?.({
                  ...filters,
                  transactionType: e.target.value,
                } as FilterState)
              }
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="credit">Credit</MenuItem>
              <MenuItem value="partial">Partial</MenuItem>
              <MenuItem value="borrowed">Borrowed</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Payment Status</InputLabel>
            <Select
              label="Payment Status"
              value={filters?.paymentStatus || ""}
              onChange={(e) =>
                onFilterChange?.({
                  ...filters,
                  paymentStatus: e.target.value,
                } as FilterState)
              }
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="partial">Partial</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="borrowed">Borrowed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            label="Supplier"
            value={filters?.supplier || ""}
            onChange={(e) =>
              onFilterChange?.({
                ...filters,
                supplier: e.target.value,
              } as FilterState)
            }
            sx={{ minWidth: 200 }}
          />
        </Box>
      </Box>

      {/* Table */}
      <Box sx={{ overflowX: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ py: 2, px: 3 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Entry Date
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 2, px: 3 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Product
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 2, px: 3 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Total Amount
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 2, px: 3 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Payment Status
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 2, px: 3 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Supplier
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 2, px: 3 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Edit
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell sx={{ py: 2.5, px: 3 }}>
                  <Typography variant="body2" color="textSecondary">
                    {row.entryDate}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2.5, px: 3 }}>
                  <Typography variant="subtitle2" fontWeight={500}>
                    {row.product}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2.5, px: 3 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    ${row.totalAmount}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2.5, px: 3 }}>
                  <Chip
                    label={getPaymentStatusLabel(row.paymentStatus)}
                    color={getPaymentStatusColor(row.paymentStatus) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ py: 2.5, px: 3 }}>
                  <Typography variant="body2" color="textSecondary">
                    {row.supplier}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2.5, px: 3 }}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => onEdit && onEdit(row)}
                  >
                    <IconEdit size={18} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default StockEntriesList;
