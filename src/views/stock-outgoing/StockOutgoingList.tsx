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
  recipient: string;
}

interface StockOutgoingListProps {
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
  onEdit?: (entry: any) => void;
}

const StockOutgoingList = ({
  filters,
  onFilterChange,
  onEdit,
}: StockOutgoingListProps) => {
  // Sample data for the table
  const tableData = [
    {
      id: 1,
      outgoingDate: "2024-01-20",
      product: "Paint Can Blue",
      category: "Paint",
      quantity: 10,
      unit: "pcs",
      unitPrice: 25,
      totalAmount: 250,
      transactionType: "sale",
      paymentType: "full",
      amountPaid: 250,
      amountDue: 0,
      dueDate: null,
      paymentStatus: "paid",
      recipient: "Customer - John Doe",
      warehouse: "Main Warehouse",
      branch: "Branch A",
    },
    {
      id: 2,
      outgoingDate: "2024-01-19",
      product: "Paint Brush Set",
      category: "Tools",
      quantity: 5,
      unit: "pcs",
      unitPrice: 20,
      totalAmount: 100,
      transactionType: "sale",
      paymentType: "partial",
      amountPaid: 50,
      amountDue: 50,
      dueDate: "2024-02-19",
      paymentStatus: "partial",
      recipient: "Customer - Jane Smith",
      warehouse: "North Branch",
      branch: "Branch B",
    },
    {
      id: 3,
      outgoingDate: "2024-01-18",
      product: "Roller Brush",
      category: "Tools",
      quantity: 3,
      unit: "pcs",
      unitPrice: 30,
      totalAmount: 90,
      transactionType: "sale",
      paymentType: "no_payment",
      amountPaid: 0,
      amountDue: 90,
      dueDate: "2024-02-18",
      paymentStatus: "pending",
      recipient: "Customer - Bob Wilson",
      warehouse: "South Branch",
      branch: "Branch C",
    },
    {
      id: 4,
      outgoingDate: "2024-01-17",
      product: "Paint Can Red",
      category: "Paint",
      quantity: 2,
      unit: "pcs",
      unitPrice: 25,
      totalAmount: 50,
      transactionType: "borrowing",
      paymentType: null,
      amountPaid: 0,
      amountDue: 0,
      dueDate: null,
      paymentStatus: "returned_with_payment",
      returnStatus: "returned_with_payment",
      returnPayment: 50,
      returnDate: "2024-01-25",
      recipient: "Neighbor - Mike",
      warehouse: "Main Warehouse",
      branch: "Branch A",
    },
    {
      id: 5,
      outgoingDate: "2024-01-16",
      product: "Paint Can Yellow",
      category: "Paint",
      quantity: 1,
      unit: "pcs",
      unitPrice: 25,
      totalAmount: 25,
      transactionType: "other",
      paymentType: null,
      amountPaid: 0,
      amountDue: 0,
      dueDate: null,
      paymentStatus: "other",
      recipient: "Damaged",
      warehouse: "Main Warehouse",
      branch: "Branch A",
    },
  ];

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case "sale":
        return "primary";
      case "borrowing":
        return "info";
      case "other":
        return "default";
      default:
        return "default";
    }
  };

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case "sale":
        return "Sale";
      case "borrowing":
        return "Borrowing";
      case "other":
        return "Other";
      default:
        return type;
    }
  };

  const getPaymentTypeLabel = (type: string | null) => {
    if (!type) return "-";
    switch (type) {
      case "full":
        return "Full Payment";
      case "partial":
        return "Partial Payment";
      case "no_payment":
        return "No Payment";
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
      case "returned_with_payment":
        return "success";
      case "returned_no_payment":
        return "info";
      case "other":
        return "default";
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
      case "returned_with_payment":
        return "Returned (Paid)";
      case "returned_no_payment":
        return "Returned (No Payment)";
      case "other":
        return "Other";
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
      filters?.recipient &&
      !row.recipient.toLowerCase().includes(filters.recipient.toLowerCase())
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
              <MenuItem value="sale">Sale</MenuItem>
              <MenuItem value="borrowing">Borrowing</MenuItem>
              <MenuItem value="other">Other</MenuItem>
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
              <MenuItem value="returned_with_payment">Returned (Paid)</MenuItem>
              <MenuItem value="returned_no_payment">
                Returned (No Payment)
              </MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            label="Recipient"
            value={filters?.recipient || ""}
            onChange={(e) =>
              onFilterChange?.({
                ...filters,
                recipient: e.target.value,
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
                  Outgoing Date
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
                  Recipient
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
                    {row.outgoingDate}
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
                    {row.recipient}
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

export default StockOutgoingList;
