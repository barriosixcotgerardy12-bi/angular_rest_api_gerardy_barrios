export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  minStock: number;
  isActive: boolean;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface ApiResponseMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}


export interface ProductApiResponse {
  success: boolean;
  message: string;
  data: Product[];
  meta: ApiResponseMeta;
}
