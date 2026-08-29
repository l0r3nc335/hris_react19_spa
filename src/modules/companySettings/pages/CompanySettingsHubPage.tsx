import { Link } from 'react-router-dom'
import {
  Shield,
  Building2,
  Wallet,
  Settings2,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react'
import { WorkforcePageShell } from '@/components/workforce/WorkforcePageShell'
import { GettingStartedBanner } from '@/modules/companySettings/components/GettingStartedBanner'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

interface SettingsCard {
  title: string
  description: string
  path: string
  icon: LucideIcon
}

interface SettingsGroup {
  title: string
  cards: SettingsCard[]
}

const GROUPS: SettingsGroup[] = [
  {
    title: 'Roles & Permissions',
    cards: [
      {
        title: 'Roles & Permissions',
        description: 'Manage roles and access controls for your workforce.',
        path: ROUTES.companySettings.roles,
        icon: Shield,
      },
    ],
  },
  {
    title: 'Organisational Structure',
    cards: [
      {
        title: 'Company Profile',
        description: 'Legal name, trading name, ABN, timezone and locale.',
        path: ROUTES.companySettings.profile,
        icon: Building2,
      },
      {
        title: 'Divisions',
        description: 'Define organisational divisions.',
        path: ROUTES.companySettings.divisions,
        icon: Building2,
      },
      {
        title: 'Groups',
        description: 'Group teams and business units.',
        path: ROUTES.companySettings.groups,
        icon: Building2,
      },
      {
        title: 'Locations',
        description: 'Worksites and office locations.',
        path: ROUTES.companySettings.locations,
        icon: Building2,
      },
    ],
  },
  {
    title: 'Payroll Information',
    cards: [
      {
        title: 'Employment Basis',
        description: 'Full-time, part-time, casual and other bases.',
        path: ROUTES.companySettings.employmentBasis,
        icon: Wallet,
      },
      {
        title: 'Classifications',
        description: 'Award classifications and levels.',
        path: ROUTES.companySettings.classifications,
        icon: Wallet,
      },
      {
        title: 'Pay Rates',
        description: 'Base rates and pay schedules.',
        path: ROUTES.companySettings.payRates,
        icon: Wallet,
      },
      {
        title: 'Allowances',
        description: 'Allowances and loadings.',
        path: ROUTES.companySettings.allowances,
        icon: Wallet,
      },
    ],
  },
  {
    title: 'Other Settings',
    cards: [
      {
        title: 'Vaccination Types',
        description: 'Configure required vaccination types.',
        path: ROUTES.companySettings.vaccinationTypes,
        icon: Settings2,
      },
      {
        title: 'Certification Types',
        description: 'Licences and certification catalogues.',
        path: ROUTES.companySettings.certificationTypes,
        icon: Settings2,
      },
    ],
  },
]

export function CompanySettingsHubPage(): React.JSX.Element {
  return (
    <WorkforcePageShell
      title="Company Settings"
      description="Configure your organisation, payroll references, and compliance catalogues."
      contentClassName="space-y-8 bg-transparent border-0 shadow-none p-0"
    >
      <GettingStartedBanner />

      {GROUPS.map((group) => (
        <section key={group.title} className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {group.title}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {group.cards.map((card) => (
              <Link
                key={card.path}
                to={card.path}
                className={cn(
                  'group flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm',
                  'transition-colors hover:border-[var(--wf-orange)] hover:bg-[var(--wf-orange-soft)]',
                )}
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--wf-navy)] text-white">
                  <card.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-[var(--wf-navy)]">{card.title}</h3>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--wf-orange)]" />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{card.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </WorkforcePageShell>
  )
}
