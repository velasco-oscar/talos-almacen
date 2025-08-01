// Tipos compartidos entre frontend y backend
export interface Product {
  id: string;
  name: string;
  description?: string;
  sku: string;
  price: number;
  cost?: number;
  stock: number;
  minStock: number;
  categoryId?: string;
  category?: Category;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  movements?: InventoryMovement[];
  _count?: {
    movements: number;
  };
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  products?: Product[];
}

export interface InventoryMovement {
  id: string;
  productId: string;
  product?: Product;
  type: MovementType;
  quantity: number;
  reason?: string;
  reference?: string;
  notes?: string;
  createdAt: string;
  createdBy?: string;
}

export enum MovementType {
  IN = 'IN',
  OUT = 'OUT',
  ADJUSTMENT = 'ADJUSTMENT',
  TRANSFER = 'TRANSFER'
}

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

// API Request types
export interface CreateProductRequest {
  name: string;
  description?: string;
  sku: string;
  price: number;
  cost?: number;
  stock?: number;
  minStock?: number;
  categoryId?: string;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  isActive?: boolean;
}