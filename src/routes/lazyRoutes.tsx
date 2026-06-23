import { lazy } from 'react'

export const LandingPage = lazy(() => 
    import('@/modules/public/pages/LandingPage').then((m) => ({ default: m.LandingPage })),
)

export const AboutPage = lazy(() =>
    import('@/modules/public/pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
export const PricingPage = lazy(() =>
    import('@/modules/public/pages/PricingPage').then((m) => ({ default: m.PricingPage })),
)
export const ContactPage = lazy(() =>
    import('@/modules/public/pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)

export const LoginPage = lazy(() =>
    import('@/modules/auth/pages/LoginPage').then((m) => ({default: m.LoginPage}))
)

export const Dashboard = lazy (() =>
    import('@/modules/dashboard/pages/DashboardPage').then((m) => ({default: m.DashboardPage}))
)
