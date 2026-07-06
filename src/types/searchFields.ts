import type { SelectOption } from '@/ui/Select'

export type SearchFieldConfig =
  | { key: string; label: string; type: 'text' }
  | { key: string; label: string; type: 'tri-state' }
  | { key: string; label: string; type: 'select'; options: SelectOption[] }
  | { key: string; label: string; type: 'date-range'; fromKey: string; toKey: string }

export interface UserSearchCriteria {
  page?: number
  limit?: number
  email?: string
  firstName?: string
  lastName?: string
  isActive?: boolean
  emailVerified?: boolean
  createdAtFrom?: string
  createdAtTo?: string
  deletedAtFrom?: string
  deletedAtTo?: string
}

export interface SubscriptionSearchCriteria {
  page?: number
  limit?: number
  name?: string
  label?: string
  billingInterval?: string
  isActive?: boolean
  createdAtFrom?: string
  createdAtTo?: string
  deletedAtFrom?: string
  deletedAtTo?: string
}

export interface EmployeeSearchCriteria {
  page?: number
  limit?: number
  firstName?: string
  lastName?: string
  status?: string
  hireDateFrom?: string
  hireDateTo?: string
  createdAtFrom?: string
  createdAtTo?: string
  deletedAtFrom?: string
  deletedAtTo?: string
}
