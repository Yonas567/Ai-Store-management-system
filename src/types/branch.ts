export interface Warehouse {
  id: number;
  name: string;
  address?: string;
  created_at: string;
}

export interface Branch {
  id: number;
  name: string;
  address?: string;
  warehouses: Warehouse[];
  created_at: string;
}

export interface CreateBranchPayload {
  name: string;
  address?: string;
}

export interface UpdateBranchPayload {
  name?: string;
  address?: string;
}

export interface CreateWarehousePayload {
  name: string;
  address?: string;
  branch: number;
}

export interface UpdateWarehousePayload {
  name?: string;
  address?: string;
  branch?: number;
}
