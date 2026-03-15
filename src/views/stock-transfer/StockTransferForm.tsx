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
  Paper,
  IconButton,
} from "@mui/material";
import { IconX } from "@tabler/icons-react";

interface StockTransferFormProps {
  formData?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const StockTransferForm = ({
  formData: initialData,
  onSubmit,
  onClose,
}: StockTransferFormProps) => {
  const [formData, setFormData] = useState<any>({
    transferDate: new Date().toISOString().split("T")[0],
    fromBranch: "",
    fromWarehouse: "",
    toBranch: "",
    toWarehouse: "",
    product: "",
    quantity: "",
    unit: "",
    notes: "",
    reference: "",
  });

  const [fromWarehouses, setFromWarehouses] = useState<string[]>([]);
  const [toWarehouses, setToWarehouses] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Sample branches and warehouses
  const branches = ["Branch A", "Branch B", "Branch C", "Branch D"];
  const allWarehouses: Record<string, string[]> = {
    "Branch A": ["Main Warehouse", "Warehouse A", "Warehouse B"],
    "Branch B": ["North Warehouse", "Warehouse C"],
    "Branch C": ["South Warehouse", "Warehouse D"],
    "Branch D": ["East Warehouse"],
  };

  const products = [
    { id: 1, name: "Paint Can Blue", category: "Paint", unit: "pcs" },
    { id: 2, name: "Paint Brush Set", category: "Tools", unit: "pcs" },
    { id: 3, name: "Roller Brush", category: "Tools", unit: "pcs" },
    { id: 4, name: "Paint Can Red", category: "Paint", unit: "pcs" },
  ];

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => {
      const updated = { ...prev, [field]: value };

      // Update warehouses when branch changes
      if (field === "fromBranch") {
        updated.fromWarehouse = "";
        setFromWarehouses(allWarehouses[value] || []);
      }
      if (field === "toBranch") {
        updated.toWarehouse = "";
        setToWarehouses(allWarehouses[value] || []);
      }

      // Auto-set unit when product is selected
      if (field === "product") {
        const selectedProduct = products.find((p) => p.id === value);
        if (selectedProduct) {
          updated.unit = selectedProduct.unit;
        }
      }

      return updated;
    });
  };

  const handleSubmit = () => {
    // Generate reference if not provided
    if (!formData.reference) {
      formData.reference = `TRF-${Date.now()}`;
    }
    onSubmit(formData);
    onClose();
  };

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
          {initialData ? "Edit Transfer" : "Create Stock Transfer"}
        </Typography>
        <IconButton onClick={onClose}>
          <IconX size={20} />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Date and Reference */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Transfer Date"
            type="date"
            value={formData.transferDate}
            onChange={(e) => handleChange("transferDate", e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small"
            required
          />
          <TextField
            fullWidth
            label="Reference Number"
            value={formData.reference}
            onChange={(e) => handleChange("reference", e.target.value)}
            placeholder="Auto-generated if empty"
            size="small"
          />
        </Box>

        <Divider />

        {/* From Location */}
        <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            From Location
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>From Branch</InputLabel>
              <Select
                value={formData.fromBranch}
                label="From Branch"
                onChange={(e) => handleChange("fromBranch", e.target.value)}
                required
              >
                {branches.map((branch) => (
                  <MenuItem key={branch} value={branch}>
                    {branch}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>From Warehouse</InputLabel>
              <Select
                value={formData.fromWarehouse}
                label="From Warehouse"
                onChange={(e) => handleChange("fromWarehouse", e.target.value)}
                required
                disabled={!formData.fromBranch}
              >
                {fromWarehouses.map((warehouse) => (
                  <MenuItem key={warehouse} value={warehouse}>
                    {warehouse}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Paper>

        {/* To Location */}
        <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            To Location
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>To Branch</InputLabel>
              <Select
                value={formData.toBranch}
                label="To Branch"
                onChange={(e) => handleChange("toBranch", e.target.value)}
                required
              >
                {branches.map((branch) => (
                  <MenuItem key={branch} value={branch}>
                    {branch}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>To Warehouse</InputLabel>
              <Select
                value={formData.toWarehouse}
                label="To Warehouse"
                onChange={(e) => handleChange("toWarehouse", e.target.value)}
                required
                disabled={!formData.toBranch}
              >
                {toWarehouses.map((warehouse) => (
                  <MenuItem key={warehouse} value={warehouse}>
                    {warehouse}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Paper>

        <Divider />

        {/* Product Selection */}
        <FormControl fullWidth size="small">
          <InputLabel>Product</InputLabel>
          <Select
            value={formData.product}
            label="Product"
            onChange={(e) => handleChange("product", e.target.value)}
            required
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name} ({product.category})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Quantity and Unit */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            placeholder="0"
            size="small"
            required
          />
          <TextField
            fullWidth
            label="Unit"
            value={formData.unit}
            onChange={(e) => handleChange("unit", e.target.value)}
            placeholder="pcs, kg, etc."
            size="small"
            required
            disabled
          />
        </Box>

        {/* Notes */}
        <TextField
          fullWidth
          label="Notes"
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          multiline
          rows={3}
          placeholder="Additional notes about this transfer..."
        />

        {/* Validation Message */}
        {formData.fromBranch === formData.toBranch &&
          formData.fromWarehouse === formData.toWarehouse &&
          formData.fromBranch &&
          formData.fromWarehouse && (
            <Typography color="error" variant="body2">
              From and To locations cannot be the same
            </Typography>
          )}

        {/* Actions */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={
              !formData.fromBranch ||
              !formData.fromWarehouse ||
              !formData.toBranch ||
              !formData.toWarehouse ||
              !formData.product ||
              !formData.quantity ||
              (formData.fromBranch === formData.toBranch &&
                formData.fromWarehouse === formData.toWarehouse)
            }
          >
            {initialData ? "Update" : "Create"} Transfer
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StockTransferForm;

