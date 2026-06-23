
import {
    BarChart3,
    Clock,
    Shield,
    UserPlus,
    Wallet,
  } from 'lucide-react'
import { PublicPageShell } from "./PublicPageShell"
import { Button } from "@/ui"
import { Link } from "react-router-dom"
import { ROUTES } from '@/constants/routes'

const FEATURES = [
    {
      icon: Wallet,
      title: 'Payroll & Compensation',
      description: 'Automated payroll runs, tax compliance, and compensation planning.',
    },
    {
      icon: Clock,
      title: 'Time & Attendance',
      description: 'Track hours, leave, and attendance with real-time visibility.',
    },
    {
      icon: UserPlus,
      title: 'Talent Acquisition',
      description: 'End-to-end recruitment, onboarding, and performance management.',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Executive dashboards and workforce analytics at a glance.',
    },
  ] as const

export function LandingPage(): React.JSX.Element
{
    return (
      <PublicPageShell>
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Shield className="h-3.5 w-3.5" />
            Enterprise-grade HR platform
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Enterprise HR, unified
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            Streamline people operations across payroll, attendance, recruitment, and
            analytics — built for organizations that demand security, scale, and compliance.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {/*
                <Button size="lg" asChild>
                    <Link to={ROUTES.register}>Get Started</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                    <Link to={ROUTES.login}>Sign In</Link>
                </Button>
            */}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:mt-10 md:grid-cols-4 md:gap-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-border bg-card/80 p-3 text-left backdrop-blur-sm md:p-4"
            >
              <feature.icon className="mb-2 h-5 w-5 text-primary" />
              <h2 className="text-xs font-semibold md:text-sm">{feature.title}</h2>
              <p className="mt-1 hidden text-xs text-muted-foreground sm:block">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </PublicPageShell>
    )
}