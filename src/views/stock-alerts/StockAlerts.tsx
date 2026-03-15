"use client";
import { useState } from "react";
import StockAlertsHeader from "./StockAlertsHeader";
import StockAlertsList from "./StockAlertsList";

interface FilterState {
  productName: string;
  category: string;
}

interface StockAlertData {
  id: number;
  productName: string;
  category: string;
  lowStockThreshold: number;
  inStockThreshold: number;
}

const StockAlerts = () => {
  const [filters, setFilters] = useState<FilterState>({
    productName: "",
    category: "",
  });

  const [stockAlertsData, setStockAlertsData] = useState<StockAlertData[]>([
    {
      id: 1,
      productName: "Product A",
      category: "Electronics",
      lowStockThreshold: 20,
      inStockThreshold: 50,
    },
    {
      id: 2,
      productName: "Product B",
      category: "Clothing",
      lowStockThreshold: 30,
      inStockThreshold: 100,
    },
    {
      id: 3,
      productName: "Product C",
      category: "Home & Garden",
      lowStockThreshold: 10,
      inStockThreshold: 25,
    },
    {
      id: 4,
      productName: "Product D",
      category: "Sports",
      lowStockThreshold: 25,
      inStockThreshold: 80,
    },
    {
      id: 5,
      productName: "Product E",
      category: "Books",
      lowStockThreshold: 50,
      inStockThreshold: 150,
    },
  ]);

  const [savedItems, setSavedItems] = useState<Set<number>>(new Set());

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (filterKey: keyof FilterState) => {
    const defaultValues: Record<string, string> = {
      productName: "",
      category: "",
    };
    setFilters((prev) => ({
      ...prev,
      [filterKey]: defaultValues[filterKey],
    }));
  };

  const handleThresholdChange = (
    id: number,
    field: string,
    value: number
  ) => {
    setStockAlertsData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
    console.log("Threshold updated:", { id, field, value });
  };

  const handleSave = async (data: StockAlertData) => {
    try {
      // Send data to backend
      const response = await fetch("/api/stock-alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Stock alert saved successfully:", data);
        // Mark as saved
        setSavedItems((prev) => new Set(prev).add(data.id));
        // You can add success notification here
      } else {
        console.error("Failed to save stock alert");
        // You can add error notification here
      }
    } catch (error) {
      console.error("Error saving stock alert:", error);
      // You can add error notification here
    }
  };

  return (
    <div style={{ width: "100%" }} className="flex flex-col gap-4">
      <StockAlertsHeader />
      <StockAlertsList
        filters={filters}
        onFilterChange={handleFilterChange}
        onThresholdChange={handleThresholdChange}
        onSave={handleSave}
        data={stockAlertsData}
        savedItems={savedItems}
      />
    </div>
  );
};

export default StockAlerts;

