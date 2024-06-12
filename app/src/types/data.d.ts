
interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

interface GroceryItem {
  id: string
  name: string
  quantity?: number
  priority?: number
  status?: 'HAVE' | 'RANOUT'
  createdAt?: string
  updatedAt?: string
}

interface GroceryFormItem {
  name: string
  quantity?: number
}

interface GroceryListParams {
  priority?: number;
  status?: string;
  page?: number;
  pageSize?: number;
}
