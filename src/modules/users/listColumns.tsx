import { Badge } from '@/components/ui/badge'
import type { EntityListExtraColumn } from '@/components/EntityListPage'
import type { UsersEntity } from './types'

function asUser(item: { id: string; name: string; status: string }): UsersEntity {
  return item as UsersEntity
}

export const USER_LIST_COLUMNS: EntityListExtraColumn[] = [
  {
    header: 'First Name',
    sortKey: 'firstName',
    sortValue: (item) => asUser(item).firstName ?? '',
    cell: (item) => asUser(item).firstName ?? '—',
  },
  {
    header: 'Last Name',
    sortKey: 'lastName',
    sortValue: (item) => asUser(item).lastName ?? '',
    cell: (item) => asUser(item).lastName ?? '—',
  },
  {
    header: 'Email',
    sortKey: 'email',
    sortValue: (item) => asUser(item).email ?? '',
    cell: (item) => asUser(item).email ?? '—',
  },
  {
    header: 'Role',
    sortKey: 'role',
    sortValue: (item) => asUser(item).role ?? '',
    cell: (item) => asUser(item).role ?? '—',
  },
  {
    header: 'Verified',
    sortKey: 'emailVerified',
    sortValue: (item) => asUser(item).emailVerified === true,
    cell: (item) => {
      const verified = asUser(item).emailVerified === true
      return (
        <Badge variant={verified ? 'default' : 'secondary'}>{verified ? 'Yes' : 'No'}</Badge>
      )
    },
  },
]
