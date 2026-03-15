"use client";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import { useState, useEffect } from "react";

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

interface SearchAreaProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onRemoveFilter: (filterKey: keyof FilterState) => void;
}

const SearchArea = ({ filters, onFilterChange }: SearchAreaProps) => {
  // debounce text inputs
  const [nameInput, setNameInput] = useState(filters.productName);
  const [supplierInput, setSupplierInput] = useState(filters.supplier);

  const warehouses = [
    "All Warehouses",
    "Main Warehouse",
    "North Branch",
    "South Branch",
    "East Branch",
  ];

  const branches = [
    "All Branches",
    "Branch A",
    "Branch B",
    "Branch C",
    "Branch D",
  ];

  // sync debounced inputs when external filters change
  useEffect(() => {
    setNameInput(filters.productName);
    setSupplierInput(filters.supplier);
  }, [filters.productName, filters.supplier]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (nameInput !== filters.productName) {
        onFilterChange({ ...filters, productName: nameInput });
      }
    }, 300);
    return () => clearTimeout(t);
  }, [nameInput, filters, onFilterChange]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (supplierInput !== filters.supplier) {
        onFilterChange({ ...filters, supplier: supplierInput });
      }
    }, 300);
    return () => clearTimeout(t);
  }, [supplierInput, filters, onFilterChange]);

  return (
    <div className="flex w-full gap-4 justify-between items-center">
      {/* <Typography variant="h6">Select branch and warehouse</Typography> */}
      <div className="flex gap-4 justify-between w-full">
        <FormControl size="small" sx={{ flex: 1, minWidth: 200 }}>
          <InputLabel>Branch</InputLabel>
          <Select
            label="Branch"
            value={filters.branch}
            onChange={(e) =>
              onFilterChange({ ...filters, branch: e.target.value })
            }
          >
            {branches.map((branch) => (
              <MenuItem key={branch} value={branch}>
                {branch}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ flex: 1, minWidth: 200 }}>
          <InputLabel>Warehouse</InputLabel>
          <Select
            label="Warehouse"
            value={filters.warehouse}
            onChange={(e) =>
              onFilterChange({ ...filters, warehouse: e.target.value })
            }
          >
            {warehouses.map((warehouse) => (
              <MenuItem key={warehouse} value={warehouse}>
                {warehouse}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          size="small"
          placeholder="From: dd/mm/yyyy"
          value={filters.date || ""}
          onChange={(e) => onFilterChange({ ...filters, date: e.target.value })}
          sx={{ maxWidth: 150 }}
        />
        <TextField
          size="small"
          placeholder="To: dd/mm/yyyy"
          value={filters.timeFrom || ""}
          onChange={(e) =>
            onFilterChange({ ...filters, timeFrom: e.target.value })
          }
          sx={{ maxWidth: 150 }}
        />
      </div>
    </div>
  );
};

export default SearchArea;
