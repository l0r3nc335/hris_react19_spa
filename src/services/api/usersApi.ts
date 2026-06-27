import { endpoints } from '@/constants/endpoints'
import { createMutableResourceApi } from './client'
import type { UsersEntity } from '@/modules/users/types'

export const usersApi = createMutableResourceApi<UsersEntity>({
  list: endpoints.users.list,
  byId: endpoints.users.byId,
  trashed: endpoints.users.trashed,
  softDelete: endpoints.users.softDelete,
  restore: endpoints.users.restore,
  deactivate: endpoints.users.deactivate,
  reactivate: endpoints.users.reactivate,
})

export const listUsers = usersApi.list
export const getUsers = usersApi.getById
export const createUser = usersApi.create
export const updateUser = usersApi.update
export const removeUser = usersApi.remove
