import { useQuery } from '@tanstack/react-query'
import { fetchSubscriptionPlans } from '@/services/api/subscriptionPlansApi'

export {
    useSubscriptionsList,
    useSubscriptionsTrashedList,
    useCreateSubscription,
    useUpdateSubscription,
    useSoftDeleteSubscription,
    useRestoreSubscription,
    useRemoveSubscription,
} from '@/queries/subscriptions/queries'

export function useSubscriptionPlans() {
  return useQuery({
    queryKey: ['billing', 'plans'],
    queryFn: fetchSubscriptionPlans,
  })
}
  