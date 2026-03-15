"use client";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";

interface UnitFormProps {
  formData?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const UnitForm = ({ formData: initialData, onSubmit, onClose }: UnitFormProps) => {
  const [formData, setFormData] = useState<any>({
    name: "",
    symbol: "",
    description: "",
    status: "active",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        symbol: "",
        description: "",
        status: "active",
      });
    }
  }, [initialData]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TextField
        fullWidth
        label="Unit Name"
        value={formData.name || ""}
        onChange={(e) => handleChange("name", e.target.value)}
        required
      />

      <TextField
        fullWidth
        label="Symbol"
        value={formData.symbol || ""}
        onChange={(e) => handleChange("symbol", e.target.value)}
        placeholder="e.g., kg, L, m, pcs"
      />

      <TextField
        fullWidth
        label="Description"
        value={formData.description || ""}
        onChange={(e) => handleChange("description", e.target.value)}
        multiline
        rows={3}
        placeholder="Unit description"
      />

      <FormControl fullWidth>
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
          disabled={!formData.name}
        >
          {initialData ? "Update" : "Add"} Unit
        </Button>
      </Box>
    </Box>
  );
};

export default UnitForm;

