import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CardEdgeGlow } from '@/components/animations/CardEdgeGlow'
import { formatPrice } from '@/modules/subscriptions/constants'
import type { SubscriptionPlan } from '@/modules/subscriptions/types'
import { subscriptionPlanPaymentMethods } from '@/utils/subscriberOnboarding'
import { cn } from '@/lib/utils'

function parseDescriptionBullets(description?: string): string[] {
  if (!description) return []
  return description
    .split(/[.;]\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
}

export interface PlanCardProps {
  plan: SubscriptionPlan
  isCurrent: boolean
  isDisabled: boolean
  hasSubscription: boolean
}

export function PlanCard({
  plan,
  isCurrent,
  isDisabled,
  hasSubscription,
}: PlanCardProps): React.JSX.Element 
{
  const navigate = useNavigate()
  const isEnterprise = !plan.price || Number(plan.price) <= 0
  const bullets = parseDescriptionBullets(plan.description)

  const priceDisplay = isEnterprise
    ? "LET'S TALK"
    : formatPrice(plan.price, plan.currency)

  const ctaLabel = isEnterprise
    ? 'Contact Sales'
    : isCurrent
      ? 'Current Plan'
      : hasSubscription
        ? 'Switch Plan'
        : 'Get Started'

  const handleCta = (): void => {
    if (isEnterprise || isCurrent || isDisabled) return
    navigate(subscriptionPlanPaymentMethods(plan.slug))
  }

  return (
    <CardEdgeGlow className="h-full">
      <div
        className={cn(
          'flex h-full flex-col p-6',
          isDisabled && 'opacity-50',
        )}
      >
        <div className="mb-4 flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{plan.label}</h3>
            <Badge variant="outline" className="mt-1 uppercase tracking-wider">
              {plan.slug}
            </Badge>
          </div>
          {isCurrent ? <Badge>Current plan</Badge> : null}
        </div>

        <div className="mb-4">
          <p className="text-3xl font-bold tracking-tight">
            {priceDisplay}
            {!isEnterprise ? (
              <span className="text-base font-normal text-muted-foreground">/month</span>
            ) : null}
          </p>
          {!isEnterprise ? (
            <span className="mt-2 inline-block rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 text-xs text-muted-foreground">
              Billed annually
            </span>
          ) : null}
        </div>

        <ul className="mb-6 flex-1 space-y-2 text-sm text-muted-foreground">
          {plan.defaultUserCount != null ? (
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>Up to {plan.defaultUserCount.toLocaleString()} users included</span>
            </li>
          ) : null}
          {plan.priceAdditionalUsers && Number(plan.priceAdditionalUsers) > 0 ? (
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                {formatPrice(plan.priceAdditionalUsers, plan.currency)}/month per additional user
              </span>
            </li>
          ) : null}
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <Button
          className="mt-auto w-full"
          variant="outline"
          disabled={isEnterprise || isCurrent || isDisabled}
          onClick={handleCta}
        >
          {ctaLabel}
        </Button>
      </div>
    </CardEdgeGlow>
  )
}
