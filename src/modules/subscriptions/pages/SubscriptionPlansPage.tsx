import { CreditCard } from 'lucide-react'
import { PageLoader } from '@/components/PageLoader'
import { PageShell } from '@/components/layout/PageShell'
import { PlanCard } from '@/modules/subscriptions/components/PlanCard'
import { useSubscriptionPlans } from '@/modules/subscriptions/hooks'
import { useAppSelector } from '@/hooks'
import { selectUser } from '@/slices/authSlice'

export function SubscriptionPlansPage(): React.JSX.Element {
  const user = useAppSelector(selectUser)
  const { data: plans, isLoading, isError } = useSubscriptionPlans()
  const currentSlug = user?.userSubscription?.plan?.slug ?? user?.userSubscription?.subscriptionId
  const hasSubscription = Boolean(user?.userSubscription)

  return (
    <PageShell
      title="Subscription Plan"
      description="Choose the plan that fits your organization."
      icon={<CreditCard className="h-5 w-5" />}
      breadcrumbs={[
        { label: 'Subscription' },
        { label: 'Plans' },
      ]}
    >
      {isLoading ? <PageLoader /> : null}
      {isError ? (
        <p className="text-sm text-destructive">
          Unable to load subscription plans. Please try again.
        </p>
      ) : null}
      {!isLoading && !isError && plans?.length ? (
        <div className="grid auto-rows-fr grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => {
            const isCurrent = hasSubscription
              && (plan.slug === currentSlug || plan.id === user?.userSubscription?.subscriptionId)
            const isDisabled = hasSubscription && !isCurrent

            return (
              <div key={plan.id} className="h-full min-h-0">
                <PlanCard
                  plan={plan}
                  isCurrent={isCurrent}
                  isDisabled={isDisabled}
                  hasSubscription={hasSubscription}
                />
              </div>
            )
          })}
        </div>
      ) : null}
      {!isLoading && !isError && plans?.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No subscription plans are available right now.
        </p>
      ) : null}
    </PageShell>
  )
}
