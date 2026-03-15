"use client";
import { useState } from "react";
import StockEntriesHeader from "./StockEntriesHeader";
import StockEntriesList from "./StockEntriesList";
import DrawerComponent from "@/views/shared/DrawerComponent";

interface FilterState {
  productName: string;
  transactionType: string;
  paymentStatus: string;
  supplier: string;
}

const StockEntries = () => {
  const [filters, setFilters] = useState<FilterState>({
    productName: "",
    transactionType: "",
    paymentStatus: "",
    supplier: "",
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<any>(null);

  const handleAddStockEntry = (data: any) => {
    // Handle stock entry submission here
    console.log("Stock Entry data:", data);
    // You can add API call or state update here
    setEditingEntry(null);
  };

  const handleEditStockEntry = (entry: any) => {
    setEditingEntry(entry);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setEditingEntry(null);
  };

  const [adjustmentDrawerOpen, setAdjustmentDrawerOpen] = useState(false);
  const [selectedEntryForAdjustment, setSelectedEntryForAdjustment] =
    useState<any>(null);

  const handleAction = (entry: any, action: string) => {
    if (action === "adjust_payment") {
      setSelectedEntryForAdjustment(entry);
      setAdjustmentDrawerOpen(true);
    }
  };

  const handleAdjustment = (updatedEntry: any) => {
    console.log("Payment adjustment data:", updatedEntry);
    handleAddStockEntry(updatedEntry);
    setSelectedEntryForAdjustment(null);
  };

  return (
    <div style={{ width: "100%" }} className="flex flex-col gap-4">
      <StockEntriesHeader
        onAddClick={() => {
          setEditingEntry(null);
          setDrawerOpen(true);
        }}
      />
      <StockEntriesList
        filters={filters}
        onFilterChange={handleFilterChange}
        onEdit={handleEditStockEntry}
      />
      <DrawerComponent
        open={drawerOpen}
        onClose={handleCloseDrawer}
        onSubmit={handleAddStockEntry}
        editData={editingEntry}
        type="stock-entry"
      />
    </div>
  );
};

export default StockEntries;

