"use client";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";

interface BranchFormProps {
  formData?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const BranchForm = ({
  formData: initialData,
  onSubmit,
  onClose,
}: BranchFormProps) => {
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
      // error is handled by the parent
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TextField
        fullWidth
        label="Branch Name"
        value={formData.name || ""}
        onChange={(e) => handleChange("name", e.target.value)}
        required
        disabled={submitting}
      />

      <TextField
        fullWidth
        label="Address"
        value={formData.address || ""}
        onChange={(e) => handleChange("address", e.target.value)}
        multiline
        rows={2}
        placeholder="Branch address"
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
          Branch
        </Button>
      </Box>
    </Box>
  );
};

export default BranchForm;
