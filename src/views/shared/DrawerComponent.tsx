"use client";
import { Drawer, Box, Typography, IconButton, Divider } from "@mui/material";
import { IconX } from "@tabler/icons-react";
import { ReactNode } from "react";

// Import form components
import ProductForm from "@/views/products/ProductForm";
import CategoryForm from "@/views/catagories/CategoryForm";
import SupplierForm from "@/views/suppliers/SupplierForm";
import UnitForm from "@/views/units/UnitForm";
import BranchForm from "@/views/branches/BranchForm";
import WarehouseForm from "@/views/branches/WarehouseForm";
import StockEntryForm from "@/views/stock-entries/StockEntryForm";
import StockOutgoingForm from "@/views/stock-outgoing/StockOutgoingForm";
import AdjustmentEntryForm from "@/views/stock-entries/AdjustmentEntryForm";
import AdjustmentOutgoingForm from "@/views/stock-outgoing/AdjustmentOutgoingForm";

interface AddItemDrawerProps {
  open: boolean;
  onClose: () => void;
  type:
    | "product"
    | "category"
    | "supplier"
    | "unit"
    | "branch"
    | "warehouse"
    | "stock-entry"
    | "stock-outgoing"
    | "adjustment-entry"
    | "adjustment-outgoing";
  onSubmit?: (data: any) => void;
  editData?: any;
  parentBranchId?: number | null;
  adjustmentEntry?: any;
}

const DrawerComponent = ({
  open,
  onClose,
  type,
  onSubmit,
  editData,
  parentBranchId,
  adjustmentEntry,
}: AddItemDrawerProps) => {
  // Set drawer width based on type - wider to avoid scrolling
  const getDrawerWidth = () => {
    if (type === "product") return 700;
    if (type === "supplier") return 1000;
    if (type === "category") return 800;
    if (type === "adjustment-entry" || type === "adjustment-outgoing")
      return 500;
    if (type === "stock-entry" || type === "stock-outgoing") return "60%";
    if (type === "unit" || type === "branch" || type === "warehouse")
      return 700;
    return 800;
  };

  const drawerWidth = getDrawerWidth();

  const getTitle = () => {
    if (type === "adjustment-entry" || type === "adjustment-outgoing") {
      return "Payment Adjustment";
    }
    if (type === "stock-entry") {
      return editData ? "Edit Stock Entry" : "Add Stock Entry";
    }
    if (type === "stock-outgoing") {
      return editData ? "Edit Stock Outgoing" : "Add Stock Outgoing";
    }
    if (editData) {
      return `Edit ${
        type === "product"
          ? "Product"
          : type === "supplier"
            ? "Supplier"
            : type === "unit"
              ? "Unit"
              : type === "branch"
                ? "Branch"
                : type === "warehouse"
                  ? "Warehouse"
                  : "Category"
      }`;
    }
    return `Add ${
      type === "product"
        ? "Product"
        : type === "supplier"
          ? "Supplier"
          : type === "unit"
            ? "Unit"
            : type === "branch"
              ? "Branch"
              : type === "warehouse"
                ? "Warehouse"
                : "Category"
    }`;
  };

  const renderForm = (): ReactNode => {
    switch (type) {
      case "product":
        return (
          <ProductForm
            formData={editData || {}}
            onSubmit={onSubmit || (() => {})}
            onClose={onClose}
          />
        );
      case "category":
        return (
          <CategoryForm
            formData={editData || {}}
            onSubmit={onSubmit || (() => {})}
            onClose={onClose}
          />
        );
      case "supplier":
        return (
          <SupplierForm
            formData={editData || {}}
            onSubmit={onSubmit || (() => {})}
            onClose={onClose}
          />
        );
      case "unit":
        return (
          <UnitForm
            formData={editData || {}}
            onSubmit={onSubmit || (() => {})}
            onClose={onClose}
          />
        );
      case "branch":
        return (
          <BranchForm
            formData={editData || {}}
            onSubmit={onSubmit || (() => {})}
            onClose={onClose}
          />
        );
      case "warehouse":
        return (
          <WarehouseForm
            formData={editData || {}}
            onSubmit={onSubmit || (() => {})}
            onClose={onClose}
            parentBranchId={parentBranchId}
          />
        );
      case "stock-entry":
        return (
          <StockEntryForm
            formData={editData || {}}
            onSubmit={onSubmit || (() => {})}
            onClose={onClose}
          />
        );
      case "stock-outgoing":
        return (
          <StockOutgoingForm
            formData={editData || {}}
            onSubmit={onSubmit || (() => {})}
            onClose={onClose}
          />
        );
      case "adjustment-entry":
        if (!adjustmentEntry) return null;
        return (
          <AdjustmentEntryForm
            formData={editData || {}}
            onSubmit={onSubmit || (() => {})}
            onClose={onClose}
            entry={adjustmentEntry}
          />
        );
      case "adjustment-outgoing":
        if (!adjustmentEntry) return null;
        return (
          <AdjustmentOutgoingForm
            formData={editData || {}}
            onSubmit={onSubmit || (() => {})}
            onClose={onClose}
            entry={adjustmentEntry}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width:
            typeof drawerWidth === "string"
              ? { xs: "100%", sm: drawerWidth }
              : { xs: "100%", sm: `${drawerWidth}px` },
        },
      }}
    >
      <Box
        sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5">{getTitle()}</Typography>
          <IconButton onClick={onClose} size="small">
            <IconX size={20} />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Form Content - Rendered by specific form component */}
        <Box sx={{ flex: 1 }}>{renderForm()}</Box>
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
// kklll
