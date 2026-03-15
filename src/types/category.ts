export interface Category {
  id: number;
  name: string;
  description?: string;
  status?: string;
  products_count?: number;
  created_at: string;
}

export interface CreateCategoryPayload {
  name: string;
  description?: string;
  status?: string;
}

export interface UpdateCategoryPayload {
  name?: string;
  description?: string;
  status?: string;
}
