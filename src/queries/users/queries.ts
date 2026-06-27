import { queryKeys } from '@/lib/queryKeys'
import { usersApi } from '@/services/api/usersApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.users, usersApi)

export const useUsersList = hooks.useList
export const useUsersTrashedList = hooks.useTrashedList
export const useCreateUser = hooks.useCreate
export const useUpdateUser = hooks.useUpdate
export const useSoftDeleteUser = hooks.useSoftDelete
export const useRestoreUser = hooks.useRestore
export const useRemoveUser = hooks.useRemove
