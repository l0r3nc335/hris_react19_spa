export type { ApiResponse, Paginated, ApiErrorBody } from './api'

export interface BaseEntity {
  id: string
  tenantId: string
  createdAt: string
  updatedAt: string
}

export interface CompanySummary {
  id: string
  name: string
  legalName?: string
  tradingName?: string
  abn?: string
  timezone?: string
  locale?: string
}

export interface User extends BaseEntity {
  email: string
  firstName: string
  lastName: string
  role: string
  permissions: string[]
  isActive: boolean
  userSubscription?: UserSubscription | null
  company?: CompanySummary | null
}

export interface UserSubscription {
  id: string
  subscriptionId: string
  status: string
  autoRenew?: boolean
  dateStart?: string
  dateEnd?: string
  plan: {
    slug: string
    label: string
    description?: string
    price: string
    currency: string
    billingInterval: string
    defaultUserCount?: number
    priceAdditionalUsers?: string
  }
}

export interface Tenant extends BaseEntity {
  name: string
  slug: string
  status: 'active' | 'suspended'
}
