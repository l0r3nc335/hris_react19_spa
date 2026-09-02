import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { LucidIcon } from '@/components/LucidIcon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
    <Card className='gap-0 bg-card py-0 relative overflow-hidden'>
      <div 
        className='border rounded-lg m-4 px-2 py-2 flex items-center justify-between bg-slate-100 relative overflow-hidden'
      >
        <h3 className="text-lg font-semibold font-heading z-10">{plan.label}</h3>
        <LucidIcon
          icon={plan.icon}
          size={45}
          className="absolute -bottom-2 -right-2 text-slate-500 pointer-events-none mr-5"
        />
      </div>

      <CardContent className='pb-4'>
        Content content
      </CardContent>
    </Card>
  )
}
