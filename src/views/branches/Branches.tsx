"use client";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import BranchHeader from "./BranchHeader";
import BranchList from "./BranchList";
import AddItemDrawer from "@/views/shared/DrawerComponent";
import {
  useBranchesQuery,
  useCreateBranch,
  useUpdateBranch,
  useCreateWarehouse,
  useUpdateWarehouse,
  useDeleteWarehouse,
} from "@/hook/useBranches";

interface FilterState {
  branchName: string;
}

const Branches = () => {
  const { data: branches, isLoading: loading } = useBranchesQuery();
  const createBranchMutation = useCreateBranch();
  const updateBranchMutation = useUpdateBranch();
  const createWarehouseMutation = useCreateWarehouse();
  const updateWarehouseMutation = useUpdateWarehouse();
  const deleteWarehouseMutation = useDeleteWarehouse();

  const [filters, setFilters] = useState<FilterState>({ branchName: "" });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<"branch" | "warehouse">("branch");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [parentBranchId, setParentBranchId] = useState<number | null>(null);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleBranchSubmit = async (data: any) => {
    const isEdit = editingItem && editingItem.id;
    try {
      if (isEdit) {
        await updateBranchMutation.mutateAsync({
          id: editingItem.id,
          payload: { name: data.name, address: data.address },
        });
        setSnackbar({
          open: true,
          message: "Branch updated successfully!",
          severity: "success",
        });
      } else {
        await createBranchMutation.mutateAsync({
          name: data.name,
          address: data.address,
        });
        setSnackbar({
          open: true,
          message: "Branch created successfully!",
          severity: "success",
        });
      }
    } catch (err) {
      console.error(`Failed to ${isEdit ? "update" : "create"} branch:`, err);
      setSnackbar({
        open: true,
        message: `Failed to ${isEdit ? "update" : "create"} branch.`,
        severity: "error",
      });
    }
  };

  const handleEditBranch = (branch: any) => {
    setEditingItem(branch);
    setDrawerType("branch");
    setDrawerOpen(true);
  };

  const handleAddWarehouse = (branchId: number) => {
    setParentBranchId(branchId);
    setEditingItem(null);
    setDrawerType("warehouse");
    setDrawerOpen(true);
  };

  const handleEditWarehouse = (warehouse: any, branchId: number) => {
    setParentBranchId(branchId);
    setEditingItem(warehouse);
    setDrawerType("warehouse");
    setDrawerOpen(true);
  };

  const handleWarehouseSubmit = async (data: any) => {
    const isEdit = editingItem && editingItem.id;
    try {
      if (isEdit) {
        await updateWarehouseMutation.mutateAsync({
          id: editingItem.id,
          payload: {
            name: data.name,
            address: data.address,
            branch: parentBranchId ?? undefined,
          },
        });
        setSnackbar({
          open: true,
          message: "Warehouse updated successfully!",
          severity: "success",
        });
      } else {
        await createWarehouseMutation.mutateAsync({
          name: data.name,
          address: data.address,
          branch: parentBranchId!,
        });
        setSnackbar({
          open: true,
          message: "Warehouse created successfully!",
          severity: "success",
        });
      }
    } catch (err) {
      console.error(
        `Failed to ${isEdit ? "update" : "create"} warehouse:`,
        err,
      );
      setSnackbar({
        open: true,
        message: `Failed to ${isEdit ? "update" : "create"} warehouse.`,
        severity: "error",
      });
    }
  };

  const handleDeleteWarehouse = async (warehouseId: number) => {
    try {
      await deleteWarehouseMutation.mutateAsync(warehouseId);
      setSnackbar({
        open: true,
        message: "Warehouse deleted successfully!",
        severity: "success",
      });
    } catch (err) {
      console.error("Failed to delete warehouse:", err);
      setSnackbar({
        open: true,
        message: "Failed to delete warehouse.",
        severity: "error",
      });
    }
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setEditingItem(null);
    setParentBranchId(null);
  };

  return (
    <div style={{ width: "100%" }} className="flex flex-col gap-4">
      <BranchHeader
        onAddClick={() => {
          setEditingItem(null);
          setDrawerType("branch");
          setDrawerOpen(true);
        }}
      />
      <BranchList
        branches={branches}
        loading={loading}
        filters={filters}
        onFilterChange={handleFilterChange}
        onEdit={handleEditBranch}
        onAddWarehouse={handleAddWarehouse}
        onEditWarehouse={handleEditWarehouse}
        onDeleteWarehouse={handleDeleteWarehouse}
      />
      <AddItemDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        type={drawerType}
        onSubmit={
          drawerType === "warehouse" ? handleWarehouseSubmit : handleBranchSubmit
        }
        editData={editingItem}
        parentBranchId={parentBranchId}
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

export default Branches;
