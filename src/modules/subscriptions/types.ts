import type { BaseEntity } from '@/types'

export interface SubscriptionsEntity extends Omit<BaseEntity, 'tenantId'> {
  tenantId?: string | null
  /** Display label */
  name: string
  status: string
  slug?: string
  billingInterval?: string
  price?: string
  currency?: string
  trialDays?: number
  description?: string
}

export interface SubscriptionPlan {
  id: string
  slug: string
  label: string
  icon?: string
  description?: string
  price?: string
  currency?: string
  billingInterval?: string
  trialDays?: number
  isActive?: boolean
  deletedAt?: string
  createdAt?: string
  updatedAt?: string
  defaultUserCount?: number
  priceAdditionalUsers?: string
}
