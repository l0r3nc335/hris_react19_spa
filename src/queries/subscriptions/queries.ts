import { queryKeys } from '@/lib/queryKeys'
import { searchSubscriptions, subscriptionsApi } from '@/services/api/subscriptionsApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.subscriptions, subscriptionsApi)

export const useSubscriptionsList = hooks.useList
export const useSubscriptionsTrashedList = hooks.useTrashedList
export const useCreateSubscription = hooks.useCreate
export const useUpdateSubscription = hooks.useUpdate
export const useSoftDeleteSubscription = hooks.useSoftDelete
export const useRestoreSubscription = hooks.useRestore
export const useRemoveSubscription = hooks.useRemove

export { searchSubscriptions }