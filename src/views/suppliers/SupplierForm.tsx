"use client";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useState, useEffect } from "react";

interface SupplierFormProps {
  formData?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const SupplierForm = ({
  formData: initialData,
  onSubmit,
  onClose,
}: SupplierFormProps) => {
  const [formData, setFormData] = useState<any>({
    name: "",
    contactPerson: "",
    phone: "",
    products: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        contactPerson: "",
        phone: "",
        products: [],
      });
    }
  }, [initialData]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleAddProduct = () => {
    const newProduct = "";
    setFormData((prev: any) => ({
      ...prev,
      products: [...(prev.products || []), newProduct],
    }));
  };

  const handleRemoveProduct = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      products: prev.products.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleProductChange = (index: number, value: string) => {
    setFormData((prev: any) => {
      const newProducts = [...(prev.products || [])];
      newProducts[index] = value;
      return { ...prev, products: newProducts };
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* First Row - Supplier Name, Contact Person, Phone */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Box sx={{ flex: "1 1 calc(40% - 8px)", minWidth: 250 }}>
          <TextField
            fullWidth
            label="Supplier Name"
            value={formData.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        </Box>
        <Box sx={{ flex: "1 1 calc(30% - 8px)", minWidth: 200 }}>
          <TextField
            fullWidth
            label="Contact Person"
            value={formData.contactPerson || ""}
            onChange={(e) => handleChange("contactPerson", e.target.value)}
            placeholder="Contact person name"
          />
        </Box>
        <Box sx={{ flex: "1 1 calc(30% - 8px)", minWidth: 200 }}>
          <TextField
            fullWidth
            label="Phone"
            value={formData.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 234-567-8900"
          />
        </Box>
      </Box>

      {/* Products List */}
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="subtitle2" fontWeight={600}>
            Products Supplied
          </Typography>
          <Button
            size="small"
            startIcon={<IconPlus size={16} />}
            onClick={handleAddProduct}
            variant="outlined"
          >
            Add Product
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {(formData.products || []).map((product: string, index: number) => (
            <Box
              key={index}
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              <TextField
                fullWidth
                size="small"
                label={`Product ${index + 1}`}
                value={product}
                onChange={(e) => handleProductChange(index, e.target.value)}
                placeholder="Enter product name"
              />
              <IconButton
                size="small"
                color="error"
                onClick={() => handleRemoveProduct(index)}
                sx={{ flexShrink: 0 }}
              >
                <IconTrash size={18} />
              </IconButton>
            </Box>
          ))}
          {(!formData.products || formData.products.length === 0) && (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontStyle: "italic", textAlign: "center", py: 2 }}
            >
              No products added. Click "Add Product" to add products.
            </Typography>
          )}
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
        <Button variant="outlined" fullWidth onClick={onClose} sx={{ flex: 1 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{ flex: 1 }}
          disabled={!formData.name}
        >
          {initialData ? "Update" : "Add"} Supplier
        </Button>
      </Box>
    </Box>
  );
};

export default SupplierForm;
