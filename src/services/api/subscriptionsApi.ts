import { endpoints } from '@/constants/endpoints'
import {
  apiPatch,
  apiPost,
  apiPostPaginated,
  createMutableResourceApi,
  type CreateBody,
  type UpdateBody,
} from './client'
import type { SubscriptionsEntity } from '@/modules/subscriptions/types'
import type { SubscriptionSearchCriteria } from '@/types/searchFields'

const baseApi = createMutableResourceApi<SubscriptionsEntity>({
  list: endpoints.subscriptions.list,
  byId: endpoints.subscriptions.byId,
  trashed: endpoints.subscriptions.trashed,
  softDelete: endpoints.subscriptions.softDelete,
  restore: endpoints.subscriptions.restore,
  deactivate: endpoints.subscriptions.deactivate,
  reactivate: endpoints.subscriptions.reactivate,
})

function mapCreateBody(body: CreateBody): Record<string, unknown> {
  return {
    name: body.slug,
    label: body.name,
    description: body.description || undefined,
    billingInterval: body.billingInterval || 'monthly',
    price: body.price ? Number(body.price) : 0,
    currency: body.currency || 'USD',
    trialDays: body.trialDays ? Number(body.trialDays) : 0,
    status: body.status || 'active',
  }
}

function mapUpdateBody(body: UpdateBody): Record<string, unknown> {
  const payload: Record<string, unknown> = {}
  if (body.name) payload.label = body.name
  if (body.description !== undefined) payload.description = body.description
  if (body.billingInterval) payload.billingInterval = body.billingInterval
  if (body.price !== undefined && body.price !== '') payload.price = Number(body.price)
  if (body.currency) payload.currency = body.currency
  if (body.trialDays !== undefined && body.trialDays !== '') {
    payload.trialDays = Number(body.trialDays)
  }
  if (body.status) payload.status = body.status
  return payload
}

export const subscriptionsApi = {
  ...baseApi,
  create: (body: CreateBody) =>
    apiPost<SubscriptionsEntity>(endpoints.subscriptions.list, mapCreateBody(body)),
  update: (id: string, body: UpdateBody) =>
    apiPatch<SubscriptionsEntity>(endpoints.subscriptions.byId(id), mapUpdateBody(body)),
}

export function searchSubscriptions(
  criteria: SubscriptionSearchCriteria,
  options: { trashed?: boolean } = {},
): Promise<import('@/types/api').Paginated<SubscriptionsEntity>> {
  const url = options.trashed
    ? endpoints.subscriptions.searchTrashed
    : endpoints.subscriptions.search
  return apiPostPaginated<SubscriptionsEntity>(url, criteria)
}