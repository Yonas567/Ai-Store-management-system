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

interface CategoryFormProps {
  formData?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const CategoryForm = ({
  formData: initialData,
  onSubmit,
  onClose,
}: CategoryFormProps) => {
  const [formData, setFormData] = useState<any>({
    name: "",
    description: "",
    status: "active",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(initialData);
    } else {
      setFormData({ name: "", description: "", status: "active" });
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
        label="Category Name"
        value={formData.name || ""}
        onChange={(e) => handleChange("name", e.target.value)}
        required
        disabled={submitting}
      />

      <TextField
        fullWidth
        label="Description"
        value={formData.description || ""}
        onChange={(e) => handleChange("description", e.target.value)}
        multiline
        rows={4}
        disabled={submitting}
      />

      <FormControl fullWidth disabled={submitting}>
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          value={formData.status || "active"}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
      </FormControl>

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
          Category
        </Button>
      </Box>
    </Box>
  );
};

export default CategoryForm;
