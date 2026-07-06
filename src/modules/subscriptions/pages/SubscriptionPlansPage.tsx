import { PageLoader } from '@/components/PageLoader'
import { PageShell } from '@/components/layout/PageShell'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatPrice } from '@/modules/subscriptions/constants'
import { useSubscriptionPlans } from '@/modules/subscriptions/hooks'
import type { SubscriptionPlan } from '@/modules/subscriptions/types'
import { useAppSelector } from '@/hooks'
import { selectUser } from '@/slices/authSlice'
import { cn } from '@/lib/utils'

function PlanCard({
  plan,
  isCurrent,
  isDisabled,
}: {
  plan: SubscriptionPlan
  isCurrent: boolean
  isDisabled: boolean
}): React.JSX.Element {
  const priceLabel = plan.price && Number(plan.price) > 0
    ? `${formatPrice(plan.price, plan.currency)}/month`
    : 'Custom pricing'

  return (
    <Card
      className={cn(
        'transition-opacity',
        isCurrent && 'ring-2 ring-primary',
        isDisabled && 'pointer-events-none opacity-50',
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>{plan.label}</CardTitle>
          {isCurrent ? <Badge>Current plan</Badge> : null}
        </div>
        {plan.description ? <CardDescription>{plan.description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-2xl font-semibold">{priceLabel}</p>
          <p className="text-xs text-muted-foreground">Billed annually</p>
        </div>
        {plan.defaultUserCount != null ? (
          <p className="text-sm text-muted-foreground">
            Includes up to {plan.defaultUserCount.toLocaleString()} users
          </p>
        ) : null}
        {plan.priceAdditionalUsers ? (
          <div>
            <p className="text-sm font-medium">
              {formatPrice(plan.priceAdditionalUsers, plan.currency)}/month per additional user
            </p>
            <p className="text-xs text-muted-foreground">Billed annually</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

export function SubscriptionPlansPage(): React.JSX.Element {
  const user = useAppSelector(selectUser)
  const { data: plans, isLoading, isError } = useSubscriptionPlans()
  const currentSlug = user?.userSubscription?.plan?.slug ?? user?.userSubscription?.subscriptionId
  const hasSubscription = Boolean(user?.userSubscription)

  return (
    <PageShell
      title="My Subscription"
      description="Choose the plan that fits your organization."
    >
      {isLoading ? <PageLoader /> : null}
      {isError ? (
        <p className="text-sm text-destructive">Unable to load subscription plans. Please try again.</p>
      ) : null}
      {!isLoading && !isError && plans?.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => {
            const isCurrent = hasSubscription
              && (plan.slug === currentSlug || plan.id === user?.userSubscription?.subscriptionId)
            const isDisabled = hasSubscription && !isCurrent

            return (
              <PlanCard
                key={plan.id}
                plan={plan}
                isCurrent={isCurrent}
                isDisabled={isDisabled}
              />
            )
          })}
        </div>
      ) : null}
      {!isLoading && !isError && plans?.length === 0 ? (
        <p className="text-sm text-muted-foreground">No subscription plans are available right now.</p>
      ) : null}
    </PageShell>
  )
}
