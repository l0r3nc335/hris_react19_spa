
import type { FormFieldConfig } from '@/components/EntityFormDialog'
import { BILLING_INTERVAL_OPTIONS } from './constants'

export const SUBSCRIPTION_FORM_FIELDS: FormFieldConfig[] = [
  { key: 'slug', label: 'Slug', type: 'text', createOnly: true },
  { key: 'description', label: 'Description', type: 'textarea' },
  {
    key: 'billingInterval',
    label: 'Billing interval',
    type: 'select',
    options: BILLING_INTERVAL_OPTIONS,
  },
  { key: 'price', label: 'Price', type: 'text' },
  { key: 'currency', label: 'Currency', type: 'text' },
  { key: 'trialDays', label: 'Trial days', type: 'text' },
]