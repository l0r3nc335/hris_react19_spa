import { apiGet } from './client'
import { endpoints } from '@/constants/endpoints'
import type { SubscriptionPlan } from '@/modules/subscriptions/types'

interface PlanApiRecord {
  id: string
  name: string
  label: string
  description?: string
  price?: string
  currency?: string
  billingInterval?: string
  trialDays?: number
  isActive?: boolean
  deletedAt?: string | null
  createdAt?: string
  updatedAt?: string
  defaultUserCount?: number
  priceAdditionalUsers?: string
}

function mapPlan(record: PlanApiRecord): SubscriptionPlan {
  return {
    id: record.id,
    slug: record.name,
    label: record.label,
    description: record.description,
    price: record.price,
    currency: record.currency,
    billingInterval: record.billingInterval,
    trialDays: record.trialDays,
    isActive: record.isActive,
    deletedAt: record.deletedAt ?? undefined,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    defaultUserCount: record.defaultUserCount,
    priceAdditionalUsers: record.priceAdditionalUsers,
  }
}

export async function fetchSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  const records = await apiGet<PlanApiRecord[]>(endpoints.billing.plans)
  return records.map(mapPlan)
}
