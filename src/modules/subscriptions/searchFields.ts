import type { SearchFieldConfig } from '@/types/searchFields'
import { BILLING_INTERVAL_OPTIONS } from './constants'

export const SUBSCRIPTION_SEARCH_FIELDS: SearchFieldConfig[] = [
  { key: 'name', label: 'Slug', type: 'text' },
  { key: 'label', label: 'Label', type: 'text' },
  {
    key: 'billingInterval',
    label: 'Billing interval',
    type: 'select',
    options: BILLING_INTERVAL_OPTIONS,
  },
  { key: 'isActive', label: 'Active', type: 'tri-state' },
  {
    key: 'createdAt',
    label: 'Created at',
    type: 'date-range',
    fromKey: 'createdAtFrom',
    toKey: 'createdAtTo',
  },
  {
    key: 'deletedAt',
    label: 'Deleted at',
    type: 'date-range',
    fromKey: 'deletedAtFrom',
    toKey: 'deletedAtTo',
  },
]