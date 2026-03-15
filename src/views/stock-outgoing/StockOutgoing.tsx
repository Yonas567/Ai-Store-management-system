"use client";
import { useState } from "react";
import StockOutgoingHeader from "./StockOutgoingHeader";
import StockOutgoingList from "./StockOutgoingList";
import DrawerComponent from "@/views/shared/DrawerComponent";

interface FilterState {
  productName: string;
  transactionType: string;
  paymentStatus: string;
  recipient: string;
}

const StockOutgoing = () => {
  const [filters, setFilters] = useState<FilterState>({
    productName: "",
    transactionType: "",
    paymentStatus: "",
    recipient: "",
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<any>(null);

  const handleAddStockOutgoing = (data: any) => {
    // Handle stock outgoing submission here
    console.log("Stock Outgoing data:", data);
    // You can add API call or state update here
    setEditingEntry(null);
  };

  const handleEditStockOutgoing = (entry: any) => {
    setEditingEntry(entry);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setEditingEntry(null);
  };


  return (
    <div style={{ width: "100%" }} className="flex flex-col gap-4">
      <StockOutgoingHeader
        onAddClick={() => {
          setEditingEntry(null);
          setDrawerOpen(true);
        }}
      />
      <StockOutgoingList
        filters={filters}
        onFilterChange={handleFilterChange}
        onEdit={handleEditStockOutgoing}
      />
      <DrawerComponent
        open={drawerOpen}
        onClose={handleCloseDrawer}
        onSubmit={handleAddStockOutgoing}
        editData={editingEntry}
        type="stock-outgoing"
      />
    </div>
  );
};

export default StockOutgoing;

