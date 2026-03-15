import { apiClient } from "./AuthApi";
import {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
} from "@/types/product";

export async function getProducts(
  page = 1,
  pageSize = 100,
): Promise<Product[]> {
  const res = await apiClient.get("/products/", {
    params: { page, page_size: pageSize },
  });
  const data = res.data;
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export async function createProduct(
  payload: CreateProductPayload,
): Promise<Product> {
  const res = await apiClient.post<Product>("/products/create/", payload);
  return res.data;
}

export async function updateProduct(
  productId: number,
  payload: UpdateProductPayload,
): Promise<Product> {
  const res = await apiClient.put<Product>(
    `/products/${productId}/update/`,
    payload,
  );
  return res.data;
}

export async function deleteProduct(productId: number): Promise<void> {
  await apiClient.delete(`/products/${productId}/delete/`);
}
