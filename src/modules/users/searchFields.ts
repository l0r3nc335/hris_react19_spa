import type { SearchFieldConfig } from '@/types/searchFields'

export const USER_SEARCH_FIELDS: SearchFieldConfig[] = [
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'firstName', label: 'First name', type: 'text' },
  { key: 'lastName', label: 'Last name', type: 'text' },
  { key: 'isActive', label: 'Active', type: 'tri-state' },
  { key: 'emailVerified', label: 'Email verified', type: 'tri-state' },
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
