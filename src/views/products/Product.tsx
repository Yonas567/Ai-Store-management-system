"use client";
import { Card, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import ProductHeader from "./ProductHeader";
import ProductList from "./ProductList";
import SearchArea from "./SearchArea";
import AddItemDrawer from "@/views/shared/DrawerComponent";
import DetailItemDrawer from "@/views/shared/DetailItemDrawer";
import { Product as ProductType } from "@/types/product";
import {
  useProductsQuery,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "@/hook/useProducts";
import { useCategoriesQuery } from "@/hook/useCategories";

interface FilterState {
  category: string;
  productName: string;
  priceRange: string;
  warehouse: string;
  branch: string;
  stock: string;
  supplier: string;
  status: string;
  date: string;
  timeFrom: string;
  timeTo: string;
}

const Product = () => {
  const { data: products = [], isLoading: loading } = useProductsQuery();
  const { data: categories = [] } = useCategoriesQuery();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const [filters, setFilters] = useState<FilterState>({
    category: "All Categories",
    productName: "",
    priceRange: "",
    warehouse: "",
    branch: "",
    stock: "",
    supplier: "",
    status: "",
    date: "",
    timeFrom: "",
    timeTo: "",
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (filterKey: keyof FilterState) => {
    const defaultValues: Record<string, string> = {
      category: "All Categories",
      productName: "",
      priceRange: "",
      warehouse: "",
      branch: "",
      stock: "",
      supplier: "",
      status: "",
      date: "",
      timeFrom: "",
      timeTo: "",
    };
    setFilters((prev) => {
      const updated = { ...prev, [filterKey]: defaultValues[filterKey] };
      if (filterKey === "timeFrom") updated.timeTo = "";
      return updated;
    });
  };

  const handleProductSubmit = async (data: any) => {
    const isEdit = editingItem && editingItem.id;
    try {
      const categoryList = data.category
        ? Array.isArray(data.category)
          ? data.category
          : [data.category]
        : [];

      if (isEdit) {
        await updateMutation.mutateAsync({
          id: editingItem.id,
          payload: {
            name: data.name,
            category: categoryList,
            description: data.description,
          },
        });
        setSnackbar({
          open: true,
          message: "Product updated successfully!",
          severity: "success",
        });
      } else {
        await createMutation.mutateAsync({
          name: data.name,
          category: categoryList,
          description: data.description,
        });
        setSnackbar({
          open: true,
          message: "Product created successfully!",
          severity: "success",
        });
      }
    } catch (err) {
      console.error(`Failed to ${isEdit ? "update" : "create"} product:`, err);
      setSnackbar({
        open: true,
        message: `Failed to ${isEdit ? "update" : "create"} product.`,
        severity: "error",
      });
    }
  };

  const handleEdit = (product: ProductType) => {
    setEditingItem(product);
    setDrawerOpen(true);
  };

  const handleDelete = async (productId: number) => {
    try {
      await deleteMutation.mutateAsync(productId);
      setSnackbar({
        open: true,
        message: "Product deleted successfully!",
        severity: "success",
      });
    } catch (err) {
      console.error("Failed to delete product:", err);
      setSnackbar({
        open: true,
        message: "Failed to delete product.",
        severity: "error",
      });
    }
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setDetailDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setEditingItem(null);
  };

  return (
    <div style={{ width: "100%" }} className="flex flex-col gap-4">
      <ProductHeader
        onAddClick={() => {
          setEditingItem(null);
          setDrawerOpen(true);
        }}
      />
      <Card sx={{ p: 1 }}>
        <SearchArea
          filters={filters}
          onFilterChange={handleFilterChange}
          onRemoveFilter={handleRemoveFilter}
        />
      </Card>

      <ProductList
        products={products}
        categories={categories}
        loading={loading}
        filters={filters}
        onFilterChange={handleFilterChange}
        onProductClick={handleProductClick}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddItemDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        type="product"
        onSubmit={handleProductSubmit}
        editData={editingItem}
      />

      <DetailItemDrawer
        open={detailDrawerOpen}
        onClose={() => setDetailDrawerOpen(false)}
        product={selectedProduct}
        categories={categories}
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

export default Product;
