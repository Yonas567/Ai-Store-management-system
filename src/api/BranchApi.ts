import { apiClient } from "./AuthApi";
import { Branch, CreateBranchPayload, UpdateBranchPayload } from "@/types/branch";

export async function getBranches(): Promise<Branch[]> {
  const res = await apiClient.get("/branches/");
  const data = res.data;
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export async function createBranch(
  payload: CreateBranchPayload,
): Promise<Branch> {
  const res = await apiClient.post<Branch>("/branches/create/", payload);
  return res.data;
}

export async function updateBranch(
  branchId: number,
  payload: UpdateBranchPayload,
): Promise<Branch> {
  const res = await apiClient.put<Branch>(
    `/branches/${branchId}/update/`,
    payload,
  );
  return res.data;
}
