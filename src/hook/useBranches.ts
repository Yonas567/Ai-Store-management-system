import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBranches, createBranch, updateBranch } from "@/api/BranchApi";
import {
  getWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
} from "@/api/WarehouseApi";
import {
  Branch,
  Warehouse,
  CreateBranchPayload,
  UpdateBranchPayload,
  CreateWarehousePayload,
  UpdateWarehousePayload,
} from "@/types/branch";

export const branchKeys = {
  all: ["branches"] as const,
};

export const warehouseKeys = {
  all: ["warehouses"] as const,
};

function mergeBranchesWithWarehouses(
  branchData: Branch[],
  warehouseData: Warehouse[],
): Branch[] {
  const warehousesByBranch = warehouseData.reduce<Record<number, Warehouse[]>>(
    (acc, wh: any) => {
      const branchId = wh.branch;
      if (branchId != null) {
        if (!acc[branchId]) acc[branchId] = [];
        acc[branchId].push(wh);
      }
      return acc;
    },
    {},
  );

  return branchData.map((branch) => ({
    ...branch,
    warehouses: branch.warehouses?.length
      ? branch.warehouses
      : warehousesByBranch[branch.id] ?? [],
  }));
}

export function useBranchesQuery() {
  const branchQuery = useQuery<Branch[]>({
    queryKey: branchKeys.all,
    queryFn: getBranches,
  });

  const warehouseQuery = useQuery<Warehouse[]>({
    queryKey: warehouseKeys.all,
    queryFn: getWarehouses,
  });

  const branches =
    branchQuery.data && warehouseQuery.data
      ? mergeBranchesWithWarehouses(branchQuery.data, warehouseQuery.data)
      : [];

  return {
    data: branches,
    isLoading: branchQuery.isLoading || warehouseQuery.isLoading,
    isError: branchQuery.isError || warehouseQuery.isError,
    error: branchQuery.error || warehouseQuery.error,
  };
}

export function useCreateBranch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateBranchPayload) => createBranch(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: branchKeys.all });
    },
  });
}

export function useUpdateBranch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateBranchPayload;
    }) => updateBranch(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: branchKeys.all });
    },
  });
}

export function useCreateWarehouse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateWarehousePayload) => createWarehouse(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: branchKeys.all });
      queryClient.invalidateQueries({ queryKey: warehouseKeys.all });
    },
  });
}

export function useUpdateWarehouse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateWarehousePayload;
    }) => updateWarehouse(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: branchKeys.all });
      queryClient.invalidateQueries({ queryKey: warehouseKeys.all });
    },
  });
}

export function useDeleteWarehouse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (warehouseId: number) => deleteWarehouse(warehouseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: branchKeys.all });
      queryClient.invalidateQueries({ queryKey: warehouseKeys.all });
    },
  });
}
