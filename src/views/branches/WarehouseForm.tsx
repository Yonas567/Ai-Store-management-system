"use client";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";

interface WarehouseFormProps {
  formData?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
  parentBranchId?: number | null;
}

const WarehouseForm = ({
  formData: initialData,
  onSubmit,
  onClose,
  parentBranchId,
}: WarehouseFormProps) => {
  const [formData, setFormData] = useState<any>({
    name: "",
    address: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(initialData);
    } else {
      setFormData({ name: "", address: "" });
    }
  }, [initialData, parentBranchId]);

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
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Box sx={{ flex: "1 1 calc(40% - 8px)", minWidth: 250 }}>
          <TextField
            fullWidth
            label="Warehouse Name"
            value={formData.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            required
            disabled={submitting}
          />
        </Box>
        <Box sx={{ flex: "1 1 calc(60% - 8px)", minWidth: 300 }}>
          <TextField
            fullWidth
            label="Address"
            value={formData.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
            multiline
            rows={2}
            placeholder="Warehouse address"
            disabled={submitting}
          />
        </Box>
      </Box>

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
          Warehouse
        </Button>
      </Box>
    </Box>
  );
};

export default WarehouseForm;
