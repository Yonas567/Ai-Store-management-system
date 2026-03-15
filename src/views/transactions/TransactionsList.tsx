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
  Collapse,
  Button,
  Pagination,
  Tabs,
  Tab,
} from "@mui/material";
import {
  IconSearch,
  IconChevronDown,
  IconChevronUp,
  IconEye,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";

export interface FilterState {
  search: string;
  transactionType: string;
  branch: string;
  category: string;
  dateFrom: string;
  dateTo: string;
}

interface TransactionsListProps {
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
  onViewDetails?: (transaction: any) => void;
  onEdit?: (transaction: any) => void;
  onDelete?: (transaction: any) => void;
}

const TransactionsList = ({
  filters,
  onFilterChange,
  onViewDetails,
  onEdit,
  onDelete,
}: TransactionsListProps) => {
  const [tabValue, setTabValue] = useState(0);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const [localFilters, setLocalFilters] = useState<FilterState>({
    search: "",
    transactionType: "",
    branch: "",
    category: "",
    dateFrom: "",
    dateTo: "",
    ...filters,
  });

  // Sample transactions data
  const allTransactions = [
    {
      id: 1,
      transactionType: "transfer",
      date: "2024-01-20",
      amount: 5000,
      fromBranch: "Branch A",
      toBranch: "Branch B",
      fromAccount: "Cash",
      toAccount: "Bank Account",
      description: "Transfer for inventory purchase",
      reference: "TRX-001",
      category: "operational",
      paymentMethod: "bank_transfer",
    },
    {
      id: 2,
      transactionType: "income",
      date: "2024-01-19",
      amount: 2500,
      branch: "Branch A",
      account: "Cash",
      description: "Sale proceeds",
      reference: "TRX-002",
      category: "operational",
      paymentMethod: "cash",
    },
    {
      id: 3,
      transactionType: "expense",
      date: "2024-01-18",
      amount: 1200,
      branch: "Branch B",
      account: "Bank Account",
      description: "Utility bills payment",
      reference: "TRX-003",
      category: "utilities",
      paymentMethod: "bank_transfer",
    },
    {
      id: 4,
      transactionType: "payment_received",
      date: "2024-01-17",
      amount: 3500,
      branch: "Branch A",
      account: "Cash",
      description: "Payment from customer",
      reference: "TRX-004",
      category: "operational",
      paymentMethod: "cash",
    },
    {
      id: 5,
      transactionType: "payment_made",
      date: "2024-01-16",
      amount: 800,
      branch: "Branch C",
      account: "Petty Cash",
      description: "Payment to supplier",
      reference: "TRX-005",
      category: "supplies",
      paymentMethod: "cash",
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

  // Filter transactions based on active tab and filters
  const getFilteredTransactions = () => {
    let filtered = allTransactions;

    // Filter by tab
    if (tabValue === 1) {
      filtered = filtered.filter((t) => t.transactionType === "transfer");
    } else if (tabValue === 2) {
      filtered = filtered.filter(
        (t) =>
          t.transactionType === "income" ||
          t.transactionType === "payment_received"
      );
    } else if (tabValue === 3) {
      filtered = filtered.filter(
        (t) =>
          t.transactionType === "expense" ||
          t.transactionType === "payment_made"
      );
    }

    // Apply search filter
    if (localFilters.search) {
      const searchLower = localFilters.search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(searchLower) ||
          t.reference.toLowerCase().includes(searchLower) ||
          (t.fromBranch && t.fromBranch.toLowerCase().includes(searchLower)) ||
          (t.toBranch && t.toBranch.toLowerCase().includes(searchLower)) ||
          (t.branch && t.branch.toLowerCase().includes(searchLower))
      );
    }

    // Apply other filters
    if (localFilters.transactionType) {
      filtered = filtered.filter(
        (t) => t.transactionType === localFilters.transactionType
      );
    }
    if (localFilters.category) {
      filtered = filtered.filter((t) => t.category === localFilters.category);
    }

    return filtered;
  };

  const filteredTransactions = getFilteredTransactions();
  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case "transfer":
        return "info";
      case "income":
      case "payment_received":
        return "success";
      case "expense":
      case "payment_made":
        return "error";
      default:
        return "default";
    }
  };

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case "transfer":
        return "Transfer";
      case "income":
        return "Income";
      case "expense":
        return "Expense";
      case "payment_received":
        return "Payment Received";
      case "payment_made":
        return "Payment Made";
      default:
        return type;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Filter Section */}

      {/* Tabs */}
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="All Transactions" />
        <Tab label="Transfers" />
        <Tab label="Income" />
        <Tab label="Expenses" />
      </Tabs>

      {/* Transactions Table */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TextField
          sx={{ p: 1 }}
          fullWidth
          placeholder="Search by reference, description, branch..."
          value={localFilters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          InputProps={{
            startAdornment: <IconSearch size={20} style={{ marginRight: 8 }} />,
          }}
          size="small"
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Reference</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>From/To</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
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
                      label={getTransactionTypeLabel(
                        transaction.transactionType
                      )}
                      color={
                        getTransactionTypeColor(
                          transaction.transactionType
                        ) as any
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{transaction.reference}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    {transaction.transactionType === "transfer" ? (
                      <Typography variant="body2">
                        {transaction.fromBranch} → {transaction.toBranch}
                      </Typography>
                    ) : (
                      <Typography variant="body2">
                        {transaction.branch ||
                          transaction.fromBranch ||
                          transaction.toBranch}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      color={
                        transaction.transactionType === "income" ||
                        transaction.transactionType === "payment_received"
                          ? "success.main"
                          : transaction.transactionType === "expense" ||
                            transaction.transactionType === "payment_made"
                          ? "error.main"
                          : "text.primary"
                      }
                    >
                      {transaction.transactionType === "expense" ||
                      transaction.transactionType === "payment_made"
                        ? "-"
                        : ""}
                      ${transaction.amount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.category}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{transaction.paymentMethod}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <IconButton
                        size="small"
                        onClick={() =>
                          onViewDetails && onViewDetails(transaction)
                        }
                      >
                        <IconEye size={18} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => onEdit && onEdit(transaction)}
                        color="primary"
                      >
                        <IconEdit size={18} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => onDelete && onDelete(transaction)}
                        color="error"
                      >
                        <IconTrash size={18} />
                      </IconButton>
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
            count={Math.ceil(filteredTransactions.length / rowsPerPage)}
            page={page}
            onChange={(e, newPage) => setPage(newPage)}
            color="primary"
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default TransactionsList;
