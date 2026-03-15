"use client";
import { useState } from "react";
import { Paper } from "@mui/material";
import AdjustmentsHeader from "./AdjustmentsHeader";
import AdjustmentsList, { FilterState } from "./AdjustmentsList";
import AdjustmentStat from "./AdjustmentStat";
import AdjustmentsTab from "./AdjustmentsTab";
import DrawerComponent from "@/views/shared/DrawerComponent";

const Adjustments = () => {
  const [filters, setFilters] = useState<FilterState>({
    paymentStatus: "",
    productName: "",
  });

  const [tabValue, setTabValue] = useState(0);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const [adjustmentDrawerOpen, setAdjustmentDrawerOpen] = useState(false);
  const [selectedEntryForAdjustment, setSelectedEntryForAdjustment] =
    useState<any>(null);

  const handleAdjustment = (updatedEntry: any) => {
    // Handle payment adjustment submission
    console.log("Payment adjustment data:", updatedEntry);
    // You can add API call or state update here
    setSelectedEntryForAdjustment(null);
  };

  return (
    <div style={{ width: "100%" }} className="flex flex-col gap-8">
      <AdjustmentsHeader />
      <AdjustmentStat />
      {/* <AdjustmentsTab activeTabValue={tabValue} onTabChange={setTabValue} /> */}
      {/* <Paper sx={{ width: "100%", overflow: "hidden" }}> */}
      <AdjustmentsList
        filters={filters}
        onFilterChange={handleFilterChange}
        tabValue={tabValue}
        onTabChange={setTabValue}
        onAdjust={(entry) => {
          setSelectedEntryForAdjustment(entry);
          setAdjustmentDrawerOpen(true);
        }}
      />
      {/* </Paper> */}

      <DrawerComponent
        open={adjustmentDrawerOpen}
        onClose={() => {
          setAdjustmentDrawerOpen(false);
          setSelectedEntryForAdjustment(null);
        }}
        onSubmit={handleAdjustment}
        type={
          selectedEntryForAdjustment?.type === "entry"
            ? "adjustment-entry"
            : "adjustment-outgoing"
        }
        adjustmentEntry={selectedEntryForAdjustment}
      />
    </div>
  );
};

export default Adjustments;
