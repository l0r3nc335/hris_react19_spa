export type { ApiResponse, Paginated, ApiErrorBody } from './api'

export interface BaseEntity {
  id: string
  tenantId: string
  createdAt: string
  updatedAt: string
}

export interface User extends BaseEntity {
  email: string
  firstName: string
  lastName: string
  role: string
  permissions: string[]
  isActive: boolean
}

export interface Tenant extends BaseEntity {
  name: string
  slug: string
  status: 'active' | 'suspended'
}
