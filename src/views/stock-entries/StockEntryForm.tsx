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

interface StockEntryFormProps {
  formData?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const StockEntryForm = ({
  formData: initialData,
  onSubmit,
  onClose,
}: StockEntryFormProps) => {
  const [formData, setFormData] = useState<any>({
    product: "",
    productId: "",
    createNewProduct: false,
    newProductName: "",
    newProductCategory: "",
    newProductUnit: "",
    quantity: "",
    unitPrice: "",
    totalAmount: "",
    transactionType: "cash",
    amountPaid: "",
    amountDue: "",
    dueDate: "",
    supplier: "",
    warehouse: "",
    branch: "",
    notes: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        product: "",
        productId: "",
        createNewProduct: false,
        newProductName: "",
        newProductCategory: "",
        newProductUnit: "",
        quantity: "",
        unitPrice: "",
        totalAmount: "",
        transactionType: "cash",
        amountPaid: "",
        amountDue: "",
        dueDate: "",
        supplier: "",
        warehouse: "",
        branch: "",
        notes: "",
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

      // Auto-calculate amount due based on transaction type
      if (
        field === "transactionType" ||
        field === "totalAmount" ||
        field === "amountPaid"
      ) {
        const total = parseFloat(updated.totalAmount) || 0;
        const paid = parseFloat(updated.amountPaid) || 0;

        if (updated.transactionType === "cash") {
          updated.amountPaid = total.toString();
          updated.amountDue = "0";
        } else if (updated.transactionType === "credit") {
          updated.amountPaid = "0";
          updated.amountDue = total.toString();
        } else if (updated.transactionType === "partial") {
          updated.amountDue = (total - paid).toFixed(2);
        } else if (updated.transactionType === "borrowed") {
          updated.amountPaid = "0";
          updated.amountDue = "0";
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

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
    "Toys",
    "Food & Beverages",
    "Paint",
    "Tools",
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
      <FormControl fullWidth>
        <FormLabel>Product Selection</FormLabel>
        <RadioGroup
          value={formData.createNewProduct ? "new" : "existing"}
          onChange={(e) =>
            handleChange("createNewProduct", e.target.value === "new")
          }
          row
        >
          <FormControlLabel
            value="existing"
            control={<Radio />}
            label="Select Existing Product"
          />
          <FormControlLabel
            value="new"
            control={<Radio />}
            label="Create New Product"
          />
        </RadioGroup>
      </FormControl>

      {formData.createNewProduct ? (
        <>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: 300 }}>
              <TextField
                fullWidth
                size="small"
                label="Product Name"
                value={formData.newProductName}
                onChange={(e) =>
                  handleChange("newProductName", e.target.value)
                }
                required
              />
            </Box>
            <Box sx={{ flex: "1 1 calc(25% - 8px)", minWidth: 200 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={formData.newProductCategory}
                  onChange={(e) =>
                    handleChange("newProductCategory", e.target.value)
                  }
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: "1 1 calc(25% - 8px)", minWidth: 150 }}>
              <TextField
                fullWidth
                size="small"
                label="Unit"
                value={formData.newProductUnit}
                onChange={(e) =>
                  handleChange("newProductUnit", e.target.value)
                }
                placeholder="e.g., pcs, kg, L, m"
              />
            </Box>
          </Box>
        </>
      ) : (
        <FormControl fullWidth size="small">
          <InputLabel>Select Product</InputLabel>
          <Select
            label="Select Product"
            value={formData.productId}
            onChange={(e) => {
              const selectedProduct = existingProducts.find(
                (p) => p.id === e.target.value
              );
              handleChange("productId", e.target.value);
              handleChange("product", selectedProduct?.name || "");
            }}
          >
            {existingProducts.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name} ({product.category})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

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
      <Typography variant="h6">Transaction Type & Payment</Typography>
      <FormControl fullWidth>
        <FormLabel>Transaction Type</FormLabel>
        <RadioGroup
          value={formData.transactionType}
          onChange={(e) => handleChange("transactionType", e.target.value)}
          row
        >
          <FormControlLabel
            value="cash"
            control={<Radio />}
            label="Cash (Full Payment)"
          />
          <FormControlLabel
            value="credit"
            control={<Radio />}
            label="Credit (Pay Later)"
          />
          <FormControlLabel
            value="partial"
            control={<Radio />}
            label="Partial Payment"
          />
          <FormControlLabel
            value="borrowed"
            control={<Radio />}
            label="Borrowed Item"
          />
        </RadioGroup>
      </FormControl>

      {/* Payment Details - Conditional */}
      {formData.transactionType !== "borrowed" && (
        <Paper sx={{ p: 2, bgcolor: "action.hover" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                  disabled={formData.transactionType === "credit"}
                  required={formData.transactionType !== "credit"}
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
              {(formData.transactionType === "credit" ||
                formData.transactionType === "partial") && (
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

      {/* Supplier and Notes - Side by Side */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: 200 }}>
          <TextField
            fullWidth
            size="small"
            label={
              formData.transactionType === "borrowed"
                ? "Borrowed From"
                : "Supplier"
            }
            value={formData.supplier}
            onChange={(e) => handleChange("supplier", e.target.value)}
            placeholder={
              formData.transactionType === "borrowed"
                ? "e.g., Neighbor - John"
                : "Supplier name"
            }
          />
        </Box>
        <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: 200 }}>
          <TextField
            fullWidth
            label="Notes"
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            multiline
            rows={2}
            placeholder="Additional notes..."
            size="small"
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
            (!formData.createNewProduct && !formData.productId) ||
            (formData.createNewProduct && !formData.newProductName)
          }
        >
          {initialData ? "Update" : "Add"} Stock Entry
        </Button>
      </Box>
    </Box>
  );
};

export default StockEntryForm;

