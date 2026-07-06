import { Badge } from '@/components/ui/badge'
import type { EntityListExtraColumn } from '@/components/EntityListPage'
import { formatBillingInterval, formatPrice } from './constants'
import type { SubscriptionsEntity } from './types'

function asSubscription(item: { id: string; name: string; status: string }): SubscriptionsEntity {
  return item as SubscriptionsEntity
}

export const SUBSCRIPTION_LIST_COLUMNS: EntityListExtraColumn[] = [
  {
    header: 'Label',
    sortKey: 'name',
    sortValue: (item) => asSubscription(item).name ?? '',
    cell: (item) => asSubscription(item).name ?? '—',
  },
  {
    header: 'Slug',
    sortKey: 'slug',
    sortValue: (item) => asSubscription(item).slug ?? '',
    cell: (item) => (
      <span className="font-mono text-xs">{asSubscription(item).slug ?? '—'}</span>
    ),
  },
  {
    header: 'Billing',
    sortKey: 'billingInterval',
    sortValue: (item) => asSubscription(item).billingInterval ?? '',
    cell: (item) => formatBillingInterval(asSubscription(item).billingInterval),
  },
  {
    header: 'Price',
    sortKey: 'price',
    sortValue: (item) => Number(asSubscription(item).price ?? 0),
    cell: (item) =>
      formatPrice(asSubscription(item).price, asSubscription(item).currency),
  },
  {
    header: 'Trial',
    sortKey: 'trialDays',
    sortValue: (item) => asSubscription(item).trialDays ?? 0,
    cell: (item) => {
      const days = asSubscription(item).trialDays ?? 0
      return (
        <Badge variant={days > 0 ? 'default' : 'secondary'}>
          {days > 0 ? `${days} days` : 'None'}
        </Badge>
      )
    },
  },
  {
    header: 'Description',
    sortKey: 'description',
    sortValue: (item) => asSubscription(item).description ?? '',
    cell: (item) => {
      const description = asSubscription(item).description
      if (!description) return '—'
      return description.length > 60 ? `${description.slice(0, 57)}…` : description
    },
  },
]