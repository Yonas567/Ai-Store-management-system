"use client";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import CategoryHeader from "./CategoryHeader";
import CategoryList from "./CategoryList";
import AddItemDrawer from "@/views/shared/DrawerComponent";
import { Category } from "@/types/category";
import {
  useCategoriesQuery,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hook/useCategories";

interface FilterState {
  categoryName: string;
  status: string;
}

const Catagories = () => {
  const { data: categories = [], isLoading: loading } = useCategoriesQuery();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [filters, setFilters] = useState<FilterState>({
    categoryName: "",
    status: "",
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleCategorySubmit = async (data: any) => {
    const isEdit = editingItem && editingItem.id;
    try {
      if (isEdit) {
        await updateMutation.mutateAsync({
          id: editingItem.id,
          payload: {
            name: data.name,
            description: data.description,
            status: data.status,
          },
        });
        setSnackbar({
          open: true,
          message: "Category updated successfully!",
          severity: "success",
        });
      } else {
        await createMutation.mutateAsync({
          name: data.name,
          description: data.description,
          status: data.status,
        });
        setSnackbar({
          open: true,
          message: "Category created successfully!",
          severity: "success",
        });
      }
    } catch (err) {
      console.error(
        `Failed to ${isEdit ? "update" : "create"} category:`,
        err,
      );
      setSnackbar({
        open: true,
        message: `Failed to ${isEdit ? "update" : "create"} category.`,
        severity: "error",
      });
    }
  };

  const handleEdit = (category: Category) => {
    setEditingItem(category);
    setDrawerOpen(true);
  };

  const handleDelete = async (categoryId: number) => {
    try {
      await deleteMutation.mutateAsync(categoryId);
      setSnackbar({
        open: true,
        message: "Category deleted successfully!",
        severity: "success",
      });
    } catch (err) {
      console.error("Failed to delete category:", err);
      setSnackbar({
        open: true,
        message: "Failed to delete category.",
        severity: "error",
      });
    }
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setEditingItem(null);
  };

  return (
    <div style={{ width: "100%" }} className="flex flex-col gap-4">
      <CategoryHeader
        onAddClick={() => {
          setEditingItem(null);
          setDrawerOpen(true);
        }}
      />
      <CategoryList
        categories={categories}
        loading={loading}
        filters={filters}
        onFilterChange={handleFilterChange}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <AddItemDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        type="category"
        onSubmit={handleCategorySubmit}
        editData={editingItem}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Catagories;
