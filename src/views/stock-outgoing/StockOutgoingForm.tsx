"use client";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Paper,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";

interface StockOutgoingFormProps {
  formData?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const StockOutgoingForm = ({
  formData: initialData,
  onSubmit,
  onClose,
}: StockOutgoingFormProps) => {
  const [formData, setFormData] = useState<any>({
    productId: "",
    quantity: "",
    unitPrice: "",
    totalAmount: "",
    transactionCategory: "sales",
    transactionType: "sale",
    paymentType: "full",
    amountPaid: "",
    amountDue: "",
    dueDate: "",
    recipient: "",
    warehouse: "",
    branch: "",
    notes: "",
    returnStatus: "not_returned",
    returnPayment: "",
    returnDate: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        productId: "",
        quantity: "",
        unitPrice: "",
        totalAmount: "",
        transactionCategory: "sales",
        transactionType: "sale",
        paymentType: "full",
        amountPaid: "",
        amountDue: "",
        dueDate: "",
        recipient: "",
        warehouse: "",
        branch: "",
        notes: "",
        returnStatus: "not_returned",
        returnPayment: "",
        returnDate: "",
      });
    }
  }, [initialData]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => {
      const updated = { ...prev, [field]: value };

      // Auto-calculate total amount
      if (field === "quantity" || field === "unitPrice") {
        const qty = field === "quantity" ? value : prev.quantity;
        const price = field === "unitPrice" ? value : prev.unitPrice;
        if (qty && price) {
          updated.totalAmount = (parseFloat(qty) * parseFloat(price)).toFixed(2);
        } else {
          updated.totalAmount = "";
        }
      }

      // Auto-calculate amount due based on payment type (for sales category only)
      if (updated.transactionCategory === "sales") {
        if (
          field === "transactionCategory" ||
          field === "paymentType" ||
          field === "totalAmount" ||
          field === "amountPaid"
        ) {
          const total = parseFloat(updated.totalAmount) || 0;
          const paid = parseFloat(updated.amountPaid) || 0;

          if (updated.paymentType === "full") {
            updated.amountPaid = total.toString();
            updated.amountDue = "0";
          } else if (updated.paymentType === "no_payment") {
            updated.amountPaid = "0";
            updated.amountDue = total.toString();
          } else if (updated.paymentType === "partial") {
            updated.amountDue = (total - paid).toFixed(2);
          }
        }
      } else if (
        updated.transactionCategory === "other" &&
        updated.transactionType === "borrowing"
      ) {
        // For borrowing, handle return status
        if (field === "transactionType" || field === "transactionCategory") {
          if (field === "transactionCategory" && value === "other") {
            // When switching to other, reset transaction type
            updated.transactionType = "";
          }
          if (updated.transactionType === "borrowing") {
            updated.amountPaid = "0";
            updated.amountDue = "0";
            updated.paymentType = null;
            updated.returnStatus = "not_returned";
            updated.returnPayment = "";
            updated.returnDate = "";
          }
        }
        // Update payment status based on return status
        if (field === "returnStatus") {
          if (value === "returned_with_payment") {
            updated.paymentStatus = "returned_with_payment";
          } else if (value === "returned_no_payment") {
            updated.paymentStatus = "returned_no_payment";
          } else {
            updated.paymentStatus = "borrowed";
            updated.returnPayment = "";
            updated.returnDate = "";
          }
        }
      } else if (updated.transactionCategory === "other") {
        // For other cases (partial payment, other), handle payment
        if (
          field === "transactionType" ||
          field === "transactionCategory" ||
          field === "totalAmount" ||
          field === "amountPaid"
        ) {
          if (updated.transactionType === "partial") {
            // Partial payment - allow manual entry and calculate due
            const total = parseFloat(updated.totalAmount) || 0;
            const paid = parseFloat(updated.amountPaid) || 0;
            updated.amountDue = (total - paid).toFixed(2);
          } else {
            updated.amountPaid = "0";
            updated.amountDue = "0";
            updated.paymentType = null;
          }
        }
      }

      return updated;
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  // Sample data
  const existingProducts = [
    { id: 1, name: "Paint Can Blue", category: "Paint", unit: "pcs" },
    { id: 2, name: "Paint Brush Set", category: "Tools", unit: "pcs" },
    { id: 3, name: "Roller Brush", category: "Tools", unit: "pcs" },
    { id: 4, name: "Paint Can Red", category: "Paint", unit: "pcs" },
  ];

  const warehouses = [
    "Main Warehouse",
    "North Branch",
    "South Branch",
    "East Branch",
    "West Branch",
  ];

  const branches = ["Branch A", "Branch B", "Branch C", "Branch D"];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Product Selection */}
      <FormControl fullWidth size="small">
        <InputLabel>Select Product</InputLabel>
        <Select
          label="Select Product"
          value={formData.productId}
          onChange={(e) => handleChange("productId", e.target.value)}
        >
          {existingProducts.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.name} ({product.category})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider />

      {/* Stock Details */}
      <Typography variant="h6">Stock Details</Typography>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Box sx={{ flex: "1 1 calc(33.333% - 11px)", minWidth: 200 }}>
          <TextField
            fullWidth
            size="small"
            label="Quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            required
          />
        </Box>
        <Box sx={{ flex: "1 1 calc(33.333% - 11px)", minWidth: 200 }}>
          <TextField
            fullWidth
            size="small"
            label="Unit Price"
            type="number"
            value={formData.unitPrice}
            onChange={(e) => handleChange("unitPrice", e.target.value)}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
            }}
            required
          />
        </Box>
        <Box sx={{ flex: "1 1 calc(33.333% - 11px)", minWidth: 200 }}>
          <TextField
            fullWidth
            size="small"
            label="Total Amount"
            value={formData.totalAmount}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
              readOnly: true,
            }}
            sx={{ bgcolor: "action.disabledBackground" }}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: 300 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Warehouse</InputLabel>
            <Select
              label="Warehouse"
              value={formData.warehouse}
              onChange={(e) => handleChange("warehouse", e.target.value)}
            >
              {warehouses.map((wh) => (
                <MenuItem key={wh} value={wh}>
                  {wh}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: 300 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Branch</InputLabel>
            <Select
              label="Branch"
              value={formData.branch}
              onChange={(e) => handleChange("branch", e.target.value)}
            >
              {branches.map((branch) => (
                <MenuItem key={branch} value={branch}>
                  {branch}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Divider />

      {/* Transaction Type */}
      <Typography variant="h6">Transaction Category</Typography>
      <FormControl fullWidth>
        <FormLabel>Transaction Category</FormLabel>
        <RadioGroup
          value={formData.transactionCategory || "sales"}
          onChange={(e) => {
            handleChange("transactionCategory", e.target.value);
            if (e.target.value === "sales") {
              handleChange("transactionType", "sale");
            } else {
              handleChange("transactionType", "");
            }
          }}
          row
        >
          <FormControlLabel
            value="sales"
            control={<Radio />}
            label="Sales (Direct Sale by Payment Only)"
          />
          <FormControlLabel
            value="other"
            control={<Radio />}
            label="Other Cases (Half Payment, Borrowing)"
          />
        </RadioGroup>
      </FormControl>

      {/* Transaction Type - Only for Other Cases */}
      {formData.transactionCategory === "other" && (
        <FormControl fullWidth>
          <FormLabel>Transaction Type</FormLabel>
          <RadioGroup
            value={formData.transactionType}
            onChange={(e) => handleChange("transactionType", e.target.value)}
            row
          >
            <FormControlLabel
              value="partial"
              control={<Radio />}
              label="Half Payment"
            />
            <FormControlLabel
              value="borrowing"
              control={<Radio />}
              label="Borrowing"
            />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      )}

      {/* Return Status - Only for Borrowing in Other Cases */}
      {formData.transactionCategory === "other" &&
        formData.transactionType === "borrowing" && (
        <Paper sx={{ p: 2, bgcolor: "action.hover" }}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Return Status
          </Typography>
          <FormControl fullWidth>
            <FormLabel>Return Status</FormLabel>
            <RadioGroup
              value={formData.returnStatus || "not_returned"}
              onChange={(e) => handleChange("returnStatus", e.target.value)}
              row
            >
              <FormControlLabel
                value="not_returned"
                control={<Radio />}
                label="Not Returned"
              />
              <FormControlLabel
                value="returned_with_payment"
                control={<Radio />}
                label="Returned with Payment"
              />
              <FormControlLabel
                value="returned_no_payment"
                control={<Radio />}
                label="Returned (No Payment)"
              />
            </RadioGroup>
          </FormControl>

          {formData.returnStatus === "returned_with_payment" && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: 200 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Return Payment Amount"
                    type="number"
                    value={formData.returnPayment || ""}
                    onChange={(e) => handleChange("returnPayment", e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <Typography sx={{ mr: 1 }}>$</Typography>
                      ),
                    }}
                    required
                  />
                </Box>
                <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: 200 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Return Date"
                    type="date"
                    value={formData.returnDate || ""}
                    onChange={(e) => handleChange("returnDate", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Box>
              </Box>
            </Box>
          )}

          {formData.returnStatus === "returned_no_payment" && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="Return Date"
                type="date"
                value={formData.returnDate || ""}
                onChange={(e) => handleChange("returnDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Box>
          )}
        </Paper>
      )}

      {/* Payment Details for Partial Payment in Other Cases */}
      {formData.transactionCategory === "other" &&
        formData.transactionType === "partial" && (
          <Paper sx={{ p: 2, bgcolor: "action.hover" }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Payment Information
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: 200 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Amount Paid"
                    type="number"
                    value={formData.amountPaid}
                    onChange={(e) => handleChange("amountPaid", e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <Typography sx={{ mr: 1 }}>$</Typography>
                      ),
                    }}
                    required
                  />
                </Box>
                <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: 200 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Amount Due"
                    type="number"
                    value={formData.amountDue}
                    InputProps={{
                      startAdornment: (
                        <Typography sx={{ mr: 1 }}>$</Typography>
                      ),
                      readOnly: true,
                    }}
                    sx={{ bgcolor: "action.disabledBackground" }}
                  />
                </Box>
              </Box>
              <Box sx={{ flex: "1 1 100%" }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Due Date"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Box>
            </Box>
          </Paper>
        )}

      {/* Payment Details - Only for Sales Category */}
      {formData.transactionCategory === "sales" && (
        <Paper sx={{ p: 2, bgcolor: "action.hover" }}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Payment Information
          </Typography>
          <FormControl fullWidth>
            <FormLabel>Payment Type</FormLabel>
            <RadioGroup
              value={formData.paymentType}
              onChange={(e) => handleChange("paymentType", e.target.value)}
              row
            >
              <FormControlLabel
                value="full"
                control={<Radio />}
                label="Full Payment"
              />
              <FormControlLabel
                value="partial"
                control={<Radio />}
                label="Partial Payment"
              />
              <FormControlLabel
                value="no_payment"
                control={<Radio />}
                label="No Payment"
              />
            </RadioGroup>
          </FormControl>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Box sx={{ flex: "1 1 calc(33.333% - 11px)", minWidth: 200 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Amount Paid"
                  type="number"
                  value={formData.amountPaid}
                  onChange={(e) => handleChange("amountPaid", e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <Typography sx={{ mr: 1 }}>$</Typography>
                    ),
                  }}
                  disabled={formData.paymentType === "no_payment"}
                  required={formData.paymentType !== "no_payment"}
                />
              </Box>
              <Box sx={{ flex: "1 1 calc(33.333% - 11px)", minWidth: 200 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Amount Due"
                  type="number"
                  value={formData.amountDue}
                  InputProps={{
                    startAdornment: (
                      <Typography sx={{ mr: 1 }}>$</Typography>
                    ),
                    readOnly: true,
                  }}
                  sx={{ bgcolor: "action.disabledBackground" }}
                />
              </Box>
              {(formData.paymentType === "partial" ||
                formData.paymentType === "no_payment") && (
                <Box sx={{ flex: "1 1 calc(33.333% - 11px)", minWidth: 200 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Due Date"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleChange("dueDate", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Paper>
      )}

      <Divider />

      {/* Recipient and Notes */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: 200 }}>
          <TextField
            fullWidth
            size="small"
            label={
              formData.transactionCategory === "sales"
                ? "Customer"
                : formData.transactionType === "borrowing"
                ? "Borrowed By"
                : "Recipient"
            }
            value={formData.recipient}
            onChange={(e) => handleChange("recipient", e.target.value)}
            placeholder={
              formData.transactionCategory === "sales"
                ? "Customer name"
                : formData.transactionType === "borrowing"
                ? "e.g., Neighbor - John"
                : "Recipient name"
            }
          />
        </Box>
        <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: 200 }}>
          <TextField
            fullWidth
            size="small"
            label="Notes"
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            multiline
            rows={2}
            placeholder="Additional notes..."
          />
        </Box>
      </Box>

      {/* Footer Actions */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 3,
          pt: 3,
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Button
          variant="outlined"
          fullWidth
          onClick={onClose}
          sx={{ flex: 1 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{ flex: 1 }}
          disabled={
            !formData.quantity ||
            !formData.unitPrice ||
            !formData.productId ||
            !formData.recipient
          }
        >
          {initialData ? "Update" : "Add"} Stock Outgoing
        </Button>
      </Box>
    </Box>
  );
};

export default StockOutgoingForm;

