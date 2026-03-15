"use client";
import { useState } from "react";
import SupplierHeader from "./SupplierHeader";
import SupplierList from "./SupplierList";
import AddItemDrawer from "@/views/shared/DrawerComponent";

interface FilterState {
  supplierName: string;
  status: string;
}

const Suppliers = () => {
  const [filters, setFilters] = useState<FilterState>({
    supplierName: "",
    status: "",
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (filterKey: keyof FilterState) => {
    const defaultValues: Record<string, string> = {
      supplierName: "",
      status: "",
    };
    setFilters((prev) => ({
      ...prev,
      [filterKey]: defaultValues[filterKey],
    }));
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<any>(null);

  const handleAddSupplier = (data: any) => {
    // Handle supplier submission here
    console.log("Supplier data:", data);
    // You can add API call or state update here
    setEditingSupplier(null);
  };

  const handleEditSupplier = (supplier: any) => {
    setEditingSupplier(supplier);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setEditingSupplier(null);
  };

  return (
    <div style={{ width: "100%" }} className="flex flex-col gap-4">
      <SupplierHeader
        onAddClick={() => {
          setEditingSupplier(null);
          setDrawerOpen(true);
        }}
      />
      <SupplierList
        filters={filters}
        onFilterChange={handleFilterChange}
        onEdit={handleEditSupplier}
      />
      <AddItemDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        type="supplier"
        onSubmit={handleAddSupplier}
        editData={editingSupplier}
      />
    </div>
  );
};

export default Suppliers;
