import { Building2, Lock, ShieldCheck } from 'lucide-react'
import { PublicPageShell } from './PublicPageShell'

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Security First',
    description: 'Role-based access, audit trails, and enterprise SSO readiness.',
  },
  {
    icon: Building2,
    title: 'Multi-Tenant',
    description: 'Manage multiple organizations with isolated data and billing.',
  },
  {
    icon: Lock,
    title: 'Compliance Ready',
    description: 'Built for GDPR, SOC 2, and regional labor law requirements.',
  },
] as const

const METRICS = [
  { value: '500+', label: 'Enterprises' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '50K+', label: 'Employees managed' },
] as const

export function AboutPage(): React.JSX.Element {
  return (
    <PublicPageShell
    title="About HRIS Enterprise"
    description="Empowering organizations to manage their most valuable asset — people."
    >
    <p className="mx-auto mb-6 max-w-2xl text-center text-sm text-muted-foreground md:mb-8 md:text-base">
        HRIS Enterprise is a unified human resources platform designed for mid-to-large
        organizations. We combine payroll, workforce management, and talent operations into
        a single, secure system your teams can trust.
    </p>

    <div className="mb-6 grid gap-3 md:mb-8 md:grid-cols-3 md:gap-4">
        {VALUES.map((item) => (
        <div
            key={item.title}
            className="rounded-lg border border-border bg-card p-4 text-center"
        >
            <item.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
            <h2 className="text-sm font-semibold">{item.title}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
        </div>
        ))}
    </div>

    <div className="flex items-center justify-center gap-8 md:gap-12">
        {METRICS.map((metric) => (
        <div key={metric.label} className="text-center">
            <p className="text-xl font-bold md:text-2xl">{metric.value}</p>
            <p className="text-xs text-muted-foreground">{metric.label}</p>
        </div>
        ))}
    </div>
    </PublicPageShell>
  )
}
