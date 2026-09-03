import { useNavigate } from 'react-router-dom'
import { LucidIcon } from '@/components/LucidIcon'
import { Card, CardContent } from '@/components/ui/card'
import { formatPrice } from '@/modules/subscriptions/constants'
import type { SubscriptionPlan } from '@/modules/subscriptions/types'
import { subscriptionPlanPaymentMethods } from '@/utils/subscriberOnboarding'
import { cn } from '@/lib/utils'
import { Check, Users, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
  const isEnterprise = plan.slug == 'enterprise'
  const bullets = parseDescriptionBullets(plan.description)
  const priceDisplay = formatPrice(plan.price, plan.currency)
  
  const planIconHeaderColor: Record<string, string> = {
    1: 'text-green-500',
    2: 'text-blue-500',
    3: 'text-red-500',
  }

  const ctaLabel = isEnterprise
    ? 'Let\'s get started'
    : isCurrent
      ? 'Current Plan'
      : hasSubscription
        ? 'Switch Plan'
        : 'Proceed to payment'

  const handleCta = (): void => {
    if (isEnterprise || isCurrent || isDisabled) return
    navigate(subscriptionPlanPaymentMethods(plan.slug))
  }

  return (
    <>
      {/* to disable a card */}
      <div className={cn( 'flex h-full flex-col', isDisabled && 'opacity-50', )}>
        
        <Card className='gap-0 bg-card py-0 relative overflow-hidden '>
          <div 
            className='border rounded-lg m-4 px-2 py-2 flex items-center justify-between bg-muted relative overflow-hidden'
          >
            <h3 className="text-lg font-semibold font-heading z-10">{plan.label}</h3>
            <LucidIcon
              icon={plan.icon}
              size={70}
              className={cn(
                'absolute -right-2 pointer-events-none mr-5',
                planIconHeaderColor[plan.id] ?? 'text-slate-500',
              )}
            />
          </div>  

          <CardContent className='pb-4'>
            <div className="mb-4">
              <p className="text-3xl font-bold tracking-tight">
                {priceDisplay}
                <span className="text-base font-normal text-muted-foreground">/month</span>
              </p>
              <span className="mt-2 inline-block rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 text-xs text-muted-foreground">
                Billed annually
              </span>
            </div>

            <ul className="mb-6 flex-1 space-y-2 text-sm text-secondary-foreground px-5 mt-10">
              {plan.defaultUserCount != null ? (
                <li className="flex items-start gap-2">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{plan.defaultUserCount.toLocaleString()} user accounts included.</span>
                </li>
              ) : null}
              
              {plan.priceAdditionalUsers && Number(plan.priceAdditionalUsers) > 0 ? (
                <li className="flex items-start gap-2">
                  <UserPlus className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
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
              className={cn("mt-auto w-full", plan.slug == 'professional' && 'bg-primary text-white')}
              variant={ plan.slug == 'professional' ? 'default' : 'outline'}
              type='button'
              disabled={isCurrent || isDisabled}
              onClick={handleCta}
            >
              {ctaLabel}
            </Button>
          </CardContent>
        </Card>
        
      </div>
    </>
  )
}
