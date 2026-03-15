import { apiClient } from "./AuthApi";
import {
  Warehouse,
  CreateWarehousePayload,
  UpdateWarehousePayload,
} from "@/types/branch";

export async function getWarehouses(): Promise<Warehouse[]> {
  const res = await apiClient.get("/warehouses/");
  const data = res.data;
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export async function createWarehouse(
  payload: CreateWarehousePayload,
): Promise<Warehouse> {
  const res = await apiClient.post<Warehouse>("/warehouses/create/", payload);
  return res.data;
}

export async function updateWarehouse(
  warehouseId: number,
  payload: UpdateWarehousePayload,
): Promise<Warehouse> {
  const res = await apiClient.put<Warehouse>(
    `/warehouses/${warehouseId}/update/`,
    payload,
  );
  return res.data;
}

export async function deleteWarehouse(warehouseId: number): Promise<void> {
  await apiClient.delete(`/warehouses/${warehouseId}/delete/`);
}
