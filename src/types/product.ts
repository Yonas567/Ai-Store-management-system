export interface Product {
  id: number;
  name: string;
  category?: number[] | { id: number; name: string }[];
  warehouse?: number | { id: number; name: string };
  branch?: number | { id: number; name: string };
  measurment_unit?: number | { id: number; name: string };
  supplier?: number | { id: number; name: string };
  alert?: number | { id: number; name: string };
  description?: string;
  stock_available?: number;
  status?: string;
  created_at: string;
}

export interface CreateProductPayload {
  name: string;
  category?: number[];
  warehouse?: number;
  branch?: number;
  measurment_unit?: number;
  supplier?: number;
  description?: string;
}

export interface UpdateProductPayload {
  name?: string;
  category?: number[];
  warehouse?: number;
  branch?: number;
  measurment_unit?: number;
  supplier?: number;
  description?: string;
}
