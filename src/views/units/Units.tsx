"use client";
import { useState } from "react";
import UnitHeader from "./UnitHeader";
import UnitList from "./UnitList";
import AddItemDrawer from "@/views/shared/DrawerComponent";

interface FilterState {
  unitName: string;
  status: string;
}

const Units = () => {
  const [filters, setFilters] = useState<FilterState>({
    unitName: "",
    status: "",
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (filterKey: keyof FilterState) => {
    const defaultValues: Record<string, string> = {
      unitName: "",
      status: "",
    };
    setFilters((prev) => ({
      ...prev,
      [filterKey]: defaultValues[filterKey],
    }));
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<any>(null);

  const handleAddUnit = (data: any) => {
    // Handle unit submission here
    console.log("Unit data:", data);
    // You can add API call or state update here
    setEditingUnit(null);
  };

  const handleEditUnit = (unit: any) => {
    setEditingUnit(unit);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setEditingUnit(null);
  };

  return (
    <div style={{ width: "100%" }} className="flex flex-col gap-4">
      <UnitHeader
        onAddClick={() => {
          setEditingUnit(null);
          setDrawerOpen(true);
        }}
      />
      <UnitList
        filters={filters}
        onFilterChange={handleFilterChange}
        onEdit={handleEditUnit}
      />
      <AddItemDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        type="unit"
        onSubmit={handleAddUnit}
        editData={editingUnit}
      />
    </div>
  );
};

export default Units;
