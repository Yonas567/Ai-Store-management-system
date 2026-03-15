"use client";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useCategoriesQuery } from "@/hook/useCategories";

interface ProductFormProps {
  formData?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const ProductForm = ({
  formData: initialData,
  onSubmit,
  onClose,
}: ProductFormProps) => {
  const [formData, setFormData] = useState<any>({
    name: "",
    category: "",
    unit: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const { data: categories = [] } = useCategoriesQuery();

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(initialData);
    } else {
      setFormData({ name: "", category: "", unit: "", description: "" });
    }
  }, [initialData]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      await onSubmit(formData);
      onClose();
    } catch {
      // error handled by parent
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TextField
        fullWidth
        label="Product Name"
        value={formData.name || ""}
        onChange={(e) => handleChange("name", e.target.value)}
        required
        disabled={submitting}
      />

      <FormControl fullWidth disabled={submitting}>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          value={formData.category || ""}
          onChange={(e) => handleChange("category", e.target.value)}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Unit"
        value={formData.unit || ""}
        onChange={(e) => handleChange("unit", e.target.value)}
        placeholder="e.g., pcs, kg, L, m"
        disabled={submitting}
      />

      <TextField
        fullWidth
        label="Description"
        value={formData.description || ""}
        onChange={(e) => handleChange("description", e.target.value)}
        multiline
        rows={4}
        placeholder="Product description..."
        disabled={submitting}
      />

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
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{ flex: 1 }}
          disabled={!formData.name || submitting}
          startIcon={
            submitting ? <CircularProgress size={18} color="inherit" /> : null
          }
        >
          {initialData && Object.keys(initialData).length > 0
            ? "Update"
            : "Add"}{" "}
          Product
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
