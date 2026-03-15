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
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";

interface AdjustmentOutgoingFormProps {
  formData?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
  entry: any;
}

const AdjustmentOutgoingForm = ({
  formData: initialData,
  onSubmit,
  onClose,
  entry,
}: AdjustmentOutgoingFormProps) => {
  const [formData, setFormData] = useState<any>({
    paymentMethod: "full_cash", // full_cash, full_product_return, half_product_half_cash
    amountPaid: "",
    amountDue: "",
    paymentStatus: "",
    notes: "",
    // For product return
    returnQuantity: "",
    returnProduct: "",
    // For half product + half cash
    productReturnAmount: "",
    cashAmount: "",
  });

  useEffect(() => {
    if (entry) {
      setFormData({
        paymentMethod: entry.paymentMethod || "full_cash",
        amountPaid: entry.amountPaid || 0,
        amountDue: entry.amountDue || 0,
        paymentStatus: entry.paymentStatus || "",
        notes: entry.adjustmentNotes || "",
        returnQuantity: entry.returnQuantity || "",
        returnProduct: entry.returnProduct || "",
        productReturnAmount: entry.productReturnAmount || "",
        cashAmount: entry.cashAmount || "",
      });
    }
  }, [entry]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => {
      const updated = { ...prev, [field]: value };
      const total = parseFloat(entry.totalAmount) || 0;

      // Auto-calculate based on payment method
      if (field === "paymentMethod") {
        // Reset all payment fields when method changes
        updated.amountPaid = "";
        updated.amountDue = total;
        updated.productReturnAmount = "";
        updated.cashAmount = "";
        updated.returnQuantity = "";
        updated.paymentStatus = entry.transactionType === "borrowing" ? "borrowed" : "pending";
      } else if (field === "amountPaid" && updated.paymentMethod === "full_cash") {
        // Full cash payment
        const paid = parseFloat(value) || 0;
        updated.amountDue = (total - paid).toFixed(2);
        if (paid >= total) {
          updated.paymentStatus = "paid";
        } else if (paid > 0) {
          updated.paymentStatus = "partial";
        } else {
          updated.paymentStatus = entry.transactionType === "borrowing" ? "borrowed" : "pending";
        }
      } else if (field === "productReturnAmount" && updated.paymentMethod === "half_product_half_cash") {
        // Half product + half cash
        const productValue = parseFloat(value) || 0;
        const cash = parseFloat(updated.cashAmount) || 0;
        const totalPaid = productValue + cash;
        updated.amountDue = (total - totalPaid).toFixed(2);
        updated.amountPaid = totalPaid.toFixed(2);
        if (totalPaid >= total) {
          updated.paymentStatus = "paid";
        } else if (totalPaid > 0) {
          updated.paymentStatus = "partial";
        } else {
          updated.paymentStatus = entry.transactionType === "borrowing" ? "borrowed" : "pending";
        }
      } else if (field === "cashAmount" && updated.paymentMethod === "half_product_half_cash") {
        // Half product + half cash
        const productValue = parseFloat(updated.productReturnAmount) || 0;
        const cash = parseFloat(value) || 0;
        const totalPaid = productValue + cash;
        updated.amountDue = (total - totalPaid).toFixed(2);
        updated.amountPaid = totalPaid.toFixed(2);
        if (totalPaid >= total) {
          updated.paymentStatus = "paid";
        } else if (totalPaid > 0) {
          updated.paymentStatus = "partial";
        } else {
          updated.paymentStatus = entry.transactionType === "borrowing" ? "borrowed" : "pending";
        }
      } else if (field === "returnQuantity" && updated.paymentMethod === "full_product_return") {
        // Full product return - calculate value based on quantity
        const quantity = parseFloat(value) || 0;
        const unitPrice = parseFloat(entry.unitPrice) || 0;
        const returnValue = quantity * unitPrice;
        updated.amountPaid = returnValue.toFixed(2);
        updated.amountDue = (total - returnValue).toFixed(2);
        if (returnValue >= total) {
          updated.paymentStatus = "paid";
        } else if (returnValue > 0) {
          updated.paymentStatus = "partial";
        } else {
          updated.paymentStatus = entry.transactionType === "borrowing" ? "borrowed" : "pending";
        }
      }

      return updated;
    });
  };

  const handleSubmit = () => {
    // Create new payment transaction
    const newTransaction = {
      id: Date.now(), // In real app, use proper ID from backend
      date: new Date().toISOString().split("T")[0],
      amount: parseFloat(formData.amountPaid) || 0,
      method: formData.paymentMethod,
      notes: formData.notes || "",
    };

    // Append to existing payment history
    const existingHistory = entry.paymentHistory || [];
    const updatedHistory = [...existingHistory, newTransaction];

    const updatedEntry = {
      ...entry,
      paymentMethod: formData.paymentMethod,
      amountPaid: parseFloat(formData.amountPaid) || 0,
      amountDue: parseFloat(formData.amountDue) || 0,
      paymentStatus: formData.paymentStatus,
      adjustmentNotes: formData.notes,
      returnQuantity: formData.returnQuantity || null,
      returnProduct: formData.returnProduct || null,
      productReturnAmount: formData.productReturnAmount || null,
      cashAmount: formData.cashAmount || null,
      paymentHistory: updatedHistory,
    };
    onSubmit(updatedEntry);
    onClose();
  };

  if (!entry) return null;

  const totalAmount = parseFloat(entry.totalAmount) || 0;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Entry Info */}
      <Paper sx={{ p: 2, bgcolor: "action.hover" }}>
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          {entry.product || "Product"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Total Amount: ${totalAmount}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Quantity: {entry.quantity} {entry.unit}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Unit Price: ${entry.unitPrice}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Transaction Type: {entry.transactionType === "sale" ? "Sale" : "Borrowing"}
        </Typography>
      </Paper>

      {/* Payment Method Selection */}
      <FormControl component="fieldset">
        <FormLabel component="legend">Payment Method</FormLabel>
        <RadioGroup
          value={formData.paymentMethod}
          onChange={(e) => handleChange("paymentMethod", e.target.value)}
        >
          <FormControlLabel
            value="full_cash"
            control={<Radio />}
            label="Full Payment in Cash (Birr)"
          />
          <FormControlLabel
            value="full_product_return"
            control={<Radio />}
            label="Full Product Return"
          />
          <FormControlLabel
            value="half_product_half_cash"
            control={<Radio />}
            label="Half Product Return + Half Cash (Birr)"
          />
        </RadioGroup>
      </FormControl>

      <Divider />

      {/* Full Cash Payment Fields */}
      {formData.paymentMethod === "full_cash" && (
        <>
          <TextField
            fullWidth
            label="Amount Paid (Birr)"
            type="number"
            value={formData.amountPaid}
            onChange={(e) => handleChange("amountPaid", e.target.value)}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
            }}
            required
          />
          <TextField
            fullWidth
            label="Amount Due"
            type="number"
            value={formData.amountDue}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
              readOnly: true,
            }}
            sx={{ bgcolor: "action.disabledBackground" }}
          />
        </>
      )}

      {/* Full Product Return Fields */}
      {formData.paymentMethod === "full_product_return" && (
        <>
          <TextField
            fullWidth
            label="Return Product"
            value={formData.returnProduct || entry.product}
            onChange={(e) => handleChange("returnProduct", e.target.value)}
            required
            helperText="Product being returned"
          />
          <TextField
            fullWidth
            label="Return Quantity"
            type="number"
            value={formData.returnQuantity}
            onChange={(e) => handleChange("returnQuantity", e.target.value)}
            InputProps={{
              endAdornment: <Typography sx={{ ml: 1 }}>{entry.unit}</Typography>,
            }}
            required
            helperText={`Unit Price: $${entry.unitPrice} per ${entry.unit}`}
          />
          <TextField
            fullWidth
            label="Product Return Value"
            type="number"
            value={
              formData.returnQuantity
                ? (parseFloat(formData.returnQuantity) * parseFloat(entry.unitPrice)).toFixed(2)
                : ""
            }
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
              readOnly: true,
            }}
            sx={{ bgcolor: "action.disabledBackground" }}
          />
          <TextField
            fullWidth
            label="Amount Due"
            type="number"
            value={formData.amountDue}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
              readOnly: true,
            }}
            sx={{ bgcolor: "action.disabledBackground" }}
          />
        </>
      )}

      {/* Half Product + Half Cash Fields */}
      {formData.paymentMethod === "half_product_half_cash" && (
        <>
          <TextField
            fullWidth
            label="Return Product"
            value={formData.returnProduct || entry.product}
            onChange={(e) => handleChange("returnProduct", e.target.value)}
            required
            helperText="Product being returned"
          />
          <TextField
            fullWidth
            label="Product Return Value (Birr)"
            type="number"
            value={formData.productReturnAmount}
            onChange={(e) => handleChange("productReturnAmount", e.target.value)}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
            }}
            required
            helperText="Value of returned products"
          />
          <TextField
            fullWidth
            label="Cash Amount (Birr)"
            type="number"
            value={formData.cashAmount}
            onChange={(e) => handleChange("cashAmount", e.target.value)}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
            }}
            required
          />
          <TextField
            fullWidth
            label="Total Amount Paid"
            type="number"
            value={formData.amountPaid}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
              readOnly: true,
            }}
            sx={{ bgcolor: "action.disabledBackground" }}
          />
          <TextField
            fullWidth
            label="Amount Due"
            type="number"
            value={formData.amountDue}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
              readOnly: true,
            }}
            sx={{ bgcolor: "action.disabledBackground" }}
          />
        </>
      )}

      {/* Payment Status - Auto-calculated, display only */}
      <TextField
        fullWidth
        label="Payment Status"
        value={
          formData.paymentStatus === "paid"
            ? "Paid"
            : formData.paymentStatus === "partial"
            ? "Partial"
            : formData.paymentStatus === "borrowed"
            ? "Borrowed"
            : formData.paymentStatus === "returned_with_payment"
            ? "Returned (Paid)"
            : formData.paymentStatus === "returned_no_payment"
            ? "Returned (No Payment)"
            : "Pending"
        }
        InputProps={{
          readOnly: true,
        }}
        sx={{ bgcolor: "action.disabledBackground" }}
        helperText={
          formData.amountPaid && entry.totalAmount
            ? `${((parseFloat(formData.amountPaid) / parseFloat(entry.totalAmount)) * 100).toFixed(1)}% paid`
            : "Status is automatically calculated"
        }
      />

      <TextField
        fullWidth
        label="Adjustment Notes"
        value={formData.notes}
        onChange={(e) => handleChange("notes", e.target.value)}
        multiline
        rows={3}
        placeholder="Notes about this payment adjustment..."
      />

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
        <Button variant="outlined" fullWidth onClick={onClose} sx={{ flex: 1 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{ flex: 1 }}
        >
          Save Adjustment
        </Button>
      </Box>
    </Box>
  );
};

export default AdjustmentOutgoingForm;
