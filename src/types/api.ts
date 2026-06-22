export interface ApiResponse<T> {
    data: T
    message?: string
  }
  
  export interface PaginatedMeta {
    page: number
    limit: number
    total: number
  }
  
  export interface Paginated<T> {
    data: T[]
    meta: PaginatedMeta
  }
  
  export interface ApiErrorBody {
    code: string
    message: string
    status: number
    details?: Record<string, string[]>
  }
  