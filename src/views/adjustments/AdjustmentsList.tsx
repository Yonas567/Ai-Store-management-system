"use client";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Chip,
  IconButton,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
} from "@mui/material";
import { IconAdjustments } from "@tabler/icons-react";
import { useState } from "react";

export interface FilterState {
  paymentStatus: string;
  productName: string;
}

interface AdjustmentsListProps {
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
  onAdjust?: (entry: any) => void;
  tabValue?: number;
  onTabChange?: (value: number) => void;
}

const AdjustmentsList = ({
  filters,
  onFilterChange,
  onAdjust,
  tabValue = 0,
  onTabChange,
}: AdjustmentsListProps) => {
  const [localTabValue, setLocalTabValue] = useState(0);

  const activeTabValue = tabValue !== undefined ? tabValue : localTabValue;
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    if (onTabChange) {
      onTabChange(newValue);
    } else {
      setLocalTabValue(newValue);
    }
  };

  // Sample data combining both entry and outgoing adjustments
  const tableData = [
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
      amountPaid: 500,
      amountDue: 500,
      paymentStatus: "partial",
      transactionType: "credit",
      supplier: "Home Depot Supplies",
      warehouse: "Main Warehouse",
      branch: "Branch A",
      dueDate: "2024-02-20",
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
      amountPaid: 0,
      amountDue: 100,
      paymentStatus: "pending",
      transactionType: "sale",
      transactionCategory: "sales",
      paymentType: "no_payment",
      recipient: "Customer - Jane Smith",
      warehouse: "North Branch",
      branch: "Branch B",
      dueDate: "2024-02-19",
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
      amountPaid: 0,
      amountDue: 500,
      paymentStatus: "pending",
      transactionType: "credit",
      supplier: "TechCorp Industries",
      warehouse: "South Branch",
      branch: "Branch C",
      dueDate: "2024-02-18",
    },
    {
      id: 4,
      type: "outgoing",
      date: "2024-01-17",
      product: "Paint Can Red",
      category: "Paint",
      quantity: 2,
      unit: "pcs",
      unitPrice: 25,
      totalAmount: 50,
      amountPaid: 0,
      amountDue: 0,
      paymentStatus: "borrowed",
      transactionType: "borrowing",
      transactionCategory: "other",
      recipient: "Neighbor - Mike",
      warehouse: "Main Warehouse",
      branch: "Branch A",
      returnStatus: "not_returned",
    },
    {
      id: 5,
      type: "entry",
      date: "2024-01-16",
      product: "Paint Can Yellow",
      category: "Paint",
      quantity: 10,
      unit: "pcs",
      unitPrice: 25,
      totalAmount: 250,
      amountPaid: 100,
      amountDue: 150,
      paymentStatus: "partial",
      transactionType: "partial",
      supplier: "Paint Supplies Co",
      warehouse: "East Branch",
      branch: "Branch D",
      dueDate: "2024-02-16",
    },
    {
      id: 6,
      type: "outgoing",
      date: "2024-01-15",
      product: "Brush Cleaner",
      category: "Chemicals",
      quantity: 3,
      unit: "L",
      unitPrice: 10,
      totalAmount: 30,
      amountPaid: 30,
      amountDue: 0,
      paymentStatus: "paid",
      transactionType: "sale",
      transactionCategory: "sales",
      paymentType: "full",
      recipient: "Customer - Alice",
      warehouse: "North Branch",
      branch: "Branch B",
      dueDate: null,
    },
    {
      id: 8,
      type: "entry",
      date: "2024-01-10",
      product: "Paint Can Green",
      category: "Paint",
      quantity: 20,
      unit: "pcs",
      unitPrice: 30,
      totalAmount: 600,
      amountPaid: 600,
      amountDue: 0,
      paymentStatus: "paid",
      transactionType: "credit",
      supplier: "Green Paint Co",
      warehouse: "Main Warehouse",
      branch: "Branch A",
      dueDate: null,
      paymentHistory: [
        {
          id: 1,
          date: "2024-01-10",
          amount: 150,
          method: "full_cash",
          notes: "First payment installment",
        },
        {
          id: 2,
          date: "2024-01-15",
          amount: 200,
          method: "half_product_half_cash",
          notes: "Returned 3 cans + $110 cash",
        },
        {
          id: 3,
          date: "2024-01-20",
          amount: 150,
          method: "full_product_return",
          notes: "Returned 5 paint cans",
        },
        {
          id: 4,
          date: "2024-01-25",
          amount: 100,
          method: "full_cash",
          notes: "Final payment",
        },
      ],
    },
    {
      id: 7,
      type: "entry",
      date: "2024-01-14",
      product: "Paint Can Green",
      category: "Paint",
      quantity: 15,
      unit: "pcs",
      unitPrice: 30,
      totalAmount: 450,
      amountPaid: 450,
      amountDue: 0,
      paymentStatus: "paid",
      transactionType: "cash",
      supplier: "Green Paint Co",
      warehouse: "Main Warehouse",
      branch: "Branch A",
      dueDate: null,
    },
  ];

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
      default:
        return status;
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
      case "sale":
        return "Sale";
      case "half_payment":
        return "Half Payment";
      case "borrowing":
        return "Borrowing";
      case "other":
        return "Other";
      default:
        return type;
    }
  };

  // Filter by tab (entry or outgoing)
  const tabFilteredData = tableData.filter((row) => {
    if (activeTabValue === 0) {
      return row.type === "entry";
    } else {
      return row.type === "outgoing";
    }
  });

  // Apply search filter
  const applySearchFilter = (data: typeof tableData) => {
    return data.filter((row) => {
      if (
        filters?.productName &&
        !row.product.toLowerCase().includes(filters.productName.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  };

  const filteredData = applySearchFilter(tabFilteredData);

  // Group data by type and status - only show partial and borrowed
  const stockEntryAdjustments = filteredData.filter(
    (row) =>
      row.type === "entry" &&
      (row.paymentStatus === "partial" || row.paymentStatus === "borrowed")
  );
  const stockOutgoingAdjustments = filteredData.filter(
    (row) =>
      row.type === "outgoing" &&
      (row.paymentStatus === "partial" || row.paymentStatus === "borrowed")
  );
  const completedAdjustments = filteredData.filter(
    (row) => row.paymentStatus === "paid"
  );

  const renderCard = (row: any) => {
    const isCompleted = row.paymentStatus === "paid";
    const showAction =
      !isCompleted &&
      (row.paymentStatus === "pending" ||
        row.paymentStatus === "partial" ||
        row.paymentStatus === "borrowed");

    // Calculate payment percentage
    const totalAmount = parseFloat(row.totalAmount) || 0;
    const amountPaid = parseFloat(row.amountPaid) || 0;
    const paymentPercentage =
      totalAmount > 0 ? (amountPaid / totalAmount) * 100 : 0;

    // Payment history/transactions (sample data - in real app, this would come from backend)
    const paymentHistory = row.paymentHistory || [
      {
        id: 1,
        date: row.date,
        amount: amountPaid,
        method: row.paymentMethod || "full_cash",
        notes: row.adjustmentNotes || "",
      },
    ];

    const getPaymentMethodLabel = (method: string) => {
      switch (method) {
        case "full_cash":
          return "Full Cash Payment";
        case "full_product_return":
          return "Full Product Return";
        case "half_product_half_cash":
          return "Half Product + Half Cash";
        default:
          return "Payment";
      }
    };

    return (
      <Card
        key={row.id}
        sx={{
          mb: 2,
          border: 1,
          borderColor: "divider",
          "&:hover": {
            boxShadow: 2,
          },
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1.5,
            }}
          >
            <Box sx={{ flex: 1 }}>
              {isCompleted ? (
                <>
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    {row.type === "entry"
                      ? `Paid to ${row.supplier || "Company"}`
                      : `Paid from ${row.recipient || "Company"}`}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 0.5,
                    }}
                  >
                    <Chip
                      label={
                        row.type === "entry"
                          ? "Credits From Others"
                          : "Lent to Others"
                      }
                      size="small"
                      variant="outlined"
                      color={row.type === "entry" ? "primary" : "secondary"}
                    />
                    <Typography variant="caption" color="textSecondary">
                      {row.category} • {row.date}
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    {row.type === "entry"
                      ? row.supplier || "Company"
                      : row.recipient || "Company"}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {row.category} • {row.date}
                  </Typography>
                </>
              )}
            </Box>
            <Chip
              label={getPaymentStatusLabel(row.paymentStatus)}
              color={getPaymentStatusColor(row.paymentStatus) as any}
              size="small"
            />
          </Box>

          <Divider sx={{ my: 1.5 }} />

          {/* Payment Progress */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="caption" color="textSecondary" display="block">
              Payment Progress
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              color={
                paymentPercentage >= 100
                  ? "success.main"
                  : paymentPercentage > 0
                  ? "warning.main"
                  : "error.main"
              }
            >
              Paid ${amountPaid} from ${totalAmount}
            </Typography>
          </Box>

          {/* Compact essential info in 2 columns */}
          <Box sx={{ display: "flex", gap: 3, mb: 1 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="caption"
                color="textSecondary"
                display="block"
              >
                Total Amount
              </Typography>
              <Typography variant="subtitle2" fontWeight={600}>
                ${row.totalAmount}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="caption"
                color="textSecondary"
                display="block"
              >
                {row.amountDue > 0 ? "Amount Due" : "Status"}
              </Typography>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color={row.amountDue > 0 ? "error.main" : "success.main"}
              >
                {row.amountDue > 0 ? `$${row.amountDue}` : "Paid"}
              </Typography>
            </Box>
          </Box>

          {/* Product info */}
          <Box>
            <Typography variant="caption" color="textSecondary">
              Product:{" "}
              <Typography
                variant="caption"
                component="span"
                fontWeight={500}
                color="text.primary"
              >
                {row.product}
              </Typography>
            </Typography>
          </Box>

          {/* Payment History Stepper */}
          <Divider sx={{ my: 1.5 }} />
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" fontWeight={600} gutterBottom>
              Payment History
            </Typography>
            <Stepper orientation="vertical" sx={{ mt: 1 }}>
              {paymentHistory.map((transaction: any, index: number) => {
                // Calculate cumulative amount paid up to this transaction
                const cumulativePaid = paymentHistory
                  .slice(0, index + 1)
                  .reduce(
                    (sum: number, t: any) => sum + (parseFloat(t.amount) || 0),
                    0
                  );
                const remaining = totalAmount - cumulativePaid;

                return (
                  <Step
                    key={transaction.id || index}
                    active={true}
                    completed={index < paymentHistory.length - 1}
                  >
                    <StepLabel>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography variant="caption" fontWeight={600}>
                            {transaction.date}
                          </Typography>
                          <Chip
                            label={`$${transaction.amount}`}
                            size="small"
                            color={
                              transaction.amount >= totalAmount
                                ? "success"
                                : "warning"
                            }
                          />
                        </Box>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          sx={{ ml: "auto" }}
                        >
                          Left: ${remaining.toFixed(2)}
                        </Typography>
                      </Box>
                    </StepLabel>
                    <StepContent>
                      <Paper
                        variant="outlined"
                        sx={{ p: 1.5, mt: 1, bgcolor: "background.default" }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          color="textSecondary"
                        >
                          Method: {getPaymentMethodLabel(transaction.method)}
                        </Typography>
                        {transaction.notes && (
                          <Typography
                            variant="caption"
                            display="block"
                            color="textSecondary"
                            sx={{ mt: 0.5 }}
                          >
                            Notes: {transaction.notes}
                          </Typography>
                        )}
                        <Typography
                          variant="caption"
                          display="block"
                          color="textSecondary"
                          sx={{ mt: 0.5 }}
                        >
                          Paid ${transaction.amount} from ${totalAmount}
                        </Typography>
                      </Paper>
                    </StepContent>
                  </Step>
                );
              })}
            </Stepper>
          </Box>

          {showAction && (
            <>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() =>
                    onAdjust &&
                    onAdjust({
                      ...row,
                      product: row.product,
                      totalAmount: row.totalAmount,
                      amountPaid: row.amountPaid,
                      amountDue: row.amountDue,
                      paymentStatus: row.paymentStatus,
                      transactionType: row.transactionType,
                      paymentHistory: paymentHistory,
                    })
                  }
                  title="Adjust Payment"
                >
                  <IconAdjustments size={18} />
                </IconButton>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      {/* Cards in Columns */}
      <Box>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          {/* Company Credits Column */}
          <Box sx={{ flex: 1, minWidth: { xs: "100%", md: 0 } }}>
            <Typography
              variant="h5"
              fontWeight={700}
              gutterBottom
              sx={{ mb: 0.5 }}
            >
              Credits From Others
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              {stockEntryAdjustments.length} pending adjustment
              {stockEntryAdjustments.length !== 1 ? "s" : ""}
            </Typography>
            <Box sx={{ pr: 1 }}>
              {stockEntryAdjustments.length === 0 ? (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ textAlign: "center", py: 4 }}
                >
                  No stock entry adjustments
                </Typography>
              ) : (
                stockEntryAdjustments.map((row) => renderCard(row))
              )}
            </Box>
          </Box>

          {/* Company Gave Out Stock Column */}
          <Box sx={{ flex: 1, minWidth: { xs: "100%", md: 0 } }}>
            <Typography
              variant="h5"
              fontWeight={700}
              gutterBottom
              sx={{ mb: 0.5 }}
            >
              Lent to Others
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              {stockOutgoingAdjustments.length} pending adjustment
              {stockOutgoingAdjustments.length !== 1 ? "s" : ""}
            </Typography>
            <Box sx={{ pr: 1 }}>
              {stockOutgoingAdjustments.length === 0 ? (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ textAlign: "center", py: 4 }}
                >
                  No adjustments
                </Typography>
              ) : (
                stockOutgoingAdjustments.map((row) => renderCard(row))
              )}
            </Box>
          </Box>

          {/* Completed Adjustments Column */}
          <Box sx={{ flex: 1, minWidth: { xs: "100%", md: 0 } }}>
            <Typography
              variant="h5"
              fontWeight={700}
              gutterBottom
              sx={{ mb: 0.5 }}
            >
              Completed Adjustments
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              {completedAdjustments.length} completed adjustment
              {completedAdjustments.length !== 1 ? "s" : ""}
            </Typography>
            <Box sx={{ pr: 1 }}>
              {completedAdjustments.length === 0 ? (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ textAlign: "center", py: 4 }}
                >
                  No completed adjustments
                </Typography>
              ) : (
                completedAdjustments.map((row) => renderCard(row))
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AdjustmentsList;
