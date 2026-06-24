import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Button } from '@/ui'
import { ROUTES } from '@/constants/routes'
import { PublicPageShell } from './PublicPageShell'
import { cn } from '@/lib/utils'
import { CardEdgeGlow } from '@/components/animations/CardEdgeGlow'

const TIERS = [
  {
    name: 'Starter',
    price: '$49',
    period: '/mo',
    description: 'For growing teams getting started with HR automation.',
    features: ['Up to 50 employees', 'Core HR & attendance', 'Basic reporting', 'Email support'],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$149',
    period: '/mo',
    description: 'For established organizations with advanced HR needs.',
    features: [
      'Up to 500 employees',
      'Payroll & leave management',
      'Recruitment module',
      'Priority support',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large enterprises requiring full platform capabilities.',
    features: [
      'Unlimited employees',
      'Multi-tenant & SSO',
      'Custom integrations',
      'Dedicated account manager',
    ],
    highlighted: false,
  },
] as const

export function PricingPage(): React.JSX.Element {
  return (
    <PublicPageShell
      title="Simple, transparent pricing"
      description="Choose the plan that fits your organization. All plans include a 14-day free trial."
    >
      <div className="grid gap-3 md:grid-cols-3 md:gap-4">
        {TIERS.map((tier) => (
          <CardEdgeGlow> 
            <div
              key={tier.name}
              className={cn(
                'flex flex-col rounded-lg border bg-card p-4',
                tier.highlighted ? 'border-primary shadow-md' : 'border-border',
              )}
            >
              {tier.highlighted ? (
                <span className="mb-2 inline-block w-fit rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                  Most popular
                </span>
              ) : (
                <span className="mb-2 h-5" />
              )}
              <h2 className="text-sm font-semibold">{tier.name}</h2>
              <div className="mt-1 flex items-baseline gap-0.5">
                <span className="text-2xl font-bold">{tier.price}</span>
                {tier.period ? (
                  <span className="text-xs text-muted-foreground">{tier.period}</span>
                ) : null}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{tier.description}</p>
              <ul className="mt-3 flex-1 space-y-1.5">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-4 w-full"
                variant={tier.highlighted ? 'default' : 'outline'}
                size="sm"
                asChild
              >
                <Link to={ROUTES.auth.register}>
                  {tier.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                </Link>
              </Button>
            </div>
          </CardEdgeGlow> 
        ))}
      </div>
    </PublicPageShell>
  )
}
