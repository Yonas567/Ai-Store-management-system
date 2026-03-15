import { apiClient } from "./AuthApi";
import {
  Category,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  const res = await apiClient.get("/categories/");
  const data = res.data;
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export async function createCategory(
  payload: CreateCategoryPayload,
): Promise<Category> {
  const res = await apiClient.post<Category>("/categories/create/", payload);
  return res.data;
}

export async function updateCategory(
  categoryId: number,
  payload: UpdateCategoryPayload,
): Promise<Category> {
  const res = await apiClient.put<Category>(
    `/categories/${categoryId}/update/`,
    payload,
  );
  return res.data;
}

export async function deleteCategory(categoryId: number): Promise<void> {
  await apiClient.delete(`/categories/${categoryId}/delete/`);
}
