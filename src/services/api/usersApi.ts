import { endpoints } from '@/constants/endpoints'
import { apiPostPaginated, createMutableResourceApi } from './client'
import type { UsersEntity } from '@/modules/users/types'
import type { UserSearchCriteria } from '@/types/searchFields'

export const usersApi = createMutableResourceApi<UsersEntity>({
  list: endpoints.users.list,
  byId: endpoints.users.byId,
  trashed: endpoints.users.trashed,
  softDelete: endpoints.users.softDelete,
  restore: endpoints.users.restore,
  deactivate: endpoints.users.deactivate,
  reactivate: endpoints.users.reactivate,
})

export function searchUsers(
  criteria: UserSearchCriteria,
  options: { trashed?: boolean } = {},
): Promise<import('@/types/api').Paginated<UsersEntity>> {
  const url = options.trashed ? endpoints.users.searchTrashed : endpoints.users.search
  return apiPostPaginated<UsersEntity>(url, criteria)
}

export const listUsers = usersApi.list
export const getUsers = usersApi.getById
export const createUser = usersApi.create
export const updateUser = usersApi.update
export const removeUser = usersApi.remove
