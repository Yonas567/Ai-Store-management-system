"use client";
import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Paper,
  IconButton,
} from "@mui/material";
import { IconX } from "@tabler/icons-react";

interface TransactionFormProps {
  formData?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const TransactionForm = ({
  formData: initialData,
  onSubmit,
  onClose,
}: TransactionFormProps) => {
  const [formData, setFormData] = useState<any>({
    transactionType: "transfer",
    amount: "",
    fromBranch: "",
    toBranch: "",
    fromAccount: "",
    toAccount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    reference: "",
    category: "",
    paymentMethod: "cash",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const branches = ["Branch A", "Branch B", "Branch C", "Branch D"];
  const accounts = ["Cash", "Bank Account", "Petty Cash", "Main Account"];

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: "0 auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5">
          {initialData ? "Edit Transaction" : "Add Transaction"}
        </Typography>
        <IconButton onClick={onClose}>
          <IconX size={20} />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Transaction Type */}
        <FormControl fullWidth>
          <FormLabel>Transaction Type</FormLabel>
          <RadioGroup
            value={formData.transactionType}
            onChange={(e) => handleChange("transactionType", e.target.value)}
            row
          >
            <FormControlLabel
              value="transfer"
              control={<Radio />}
              label="Money Transfer"
            />
            <FormControlLabel
              value="income"
              control={<Radio />}
              label="Income"
            />
            <FormControlLabel
              value="expense"
              control={<Radio />}
              label="Expense"
            />
            <FormControlLabel
              value="payment_received"
              control={<Radio />}
              label="Payment Received"
            />
            <FormControlLabel
              value="payment_made"
              control={<Radio />}
              label="Payment Made"
            />
          </RadioGroup>
        </FormControl>

        {/* Date and Reference */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small"
          />
          <TextField
            fullWidth
            label="Reference Number"
            value={formData.reference}
            onChange={(e) => handleChange("reference", e.target.value)}
            placeholder="TRX-001"
            size="small"
          />
        </Box>

        {/* Amount */}
        <TextField
          fullWidth
          label="Amount"
          type="number"
          value={formData.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          placeholder="0.00"
          size="small"
          required
        />

        {/* Transfer Fields */}
        {formData.transactionType === "transfer" && (
          <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
            <Typography variant="subtitle2" gutterBottom>
              Transfer Details
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>From Branch</InputLabel>
                <Select
                  value={formData.fromBranch}
                  label="From Branch"
                  onChange={(e) => handleChange("fromBranch", e.target.value)}
                >
                  {branches.map((branch) => (
                    <MenuItem key={branch} value={branch}>
                      {branch}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>To Branch</InputLabel>
                <Select
                  value={formData.toBranch}
                  label="To Branch"
                  onChange={(e) => handleChange("toBranch", e.target.value)}
                >
                  {branches.map((branch) => (
                    <MenuItem key={branch} value={branch}>
                      {branch}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>From Account</InputLabel>
                <Select
                  value={formData.fromAccount}
                  label="From Account"
                  onChange={(e) => handleChange("fromAccount", e.target.value)}
                >
                  {accounts.map((account) => (
                    <MenuItem key={account} value={account}>
                      {account}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>To Account</InputLabel>
                <Select
                  value={formData.toAccount}
                  label="To Account"
                  onChange={(e) => handleChange("toAccount", e.target.value)}
                >
                  {accounts.map((account) => (
                    <MenuItem key={account} value={account}>
                      {account}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Paper>
        )}

        {/* Income/Expense Fields */}
        {(formData.transactionType === "income" ||
          formData.transactionType === "expense" ||
          formData.transactionType === "payment_received" ||
          formData.transactionType === "payment_made") && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Branch</InputLabel>
              <Select
                value={formData.fromBranch || formData.toBranch}
                label="Branch"
                onChange={(e) => {
                  handleChange("fromBranch", e.target.value);
                  handleChange("toBranch", e.target.value);
                }}
              >
                {branches.map((branch) => (
                  <MenuItem key={branch} value={branch}>
                    {branch}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Account</InputLabel>
              <Select
                value={formData.fromAccount || formData.toAccount}
                label="Account"
                onChange={(e) => {
                  handleChange("fromAccount", e.target.value);
                  handleChange("toAccount", e.target.value);
                }}
              >
                {accounts.map((account) => (
                  <MenuItem key={account} value={account}>
                    {account}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {/* Category */}
        <FormControl fullWidth size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            label="Category"
            onChange={(e) => handleChange("category", e.target.value)}
          >
            <MenuItem value="operational">Operational</MenuItem>
            <MenuItem value="supplies">Supplies</MenuItem>
            <MenuItem value="utilities">Utilities</MenuItem>
            <MenuItem value="salary">Salary</MenuItem>
            <MenuItem value="rent">Rent</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        {/* Payment Method */}
        <FormControl fullWidth size="small">
          <InputLabel>Payment Method</InputLabel>
          <Select
            value={formData.paymentMethod}
            label="Payment Method"
            onChange={(e) => handleChange("paymentMethod", e.target.value)}
          >
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
            <MenuItem value="check">Check</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        {/* Description */}
        <TextField
          fullWidth
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          multiline
          rows={3}
          placeholder="Transaction description or notes..."
        />

        {/* Actions */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {initialData ? "Update" : "Create"} Transaction
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TransactionForm;


