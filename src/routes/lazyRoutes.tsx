import { lazy } from 'react'

export const LandingPage = lazy(() => 
    import('@/modules/public/pages/LandingPage').then((m) => ({ default: m.LandingPage })),
)

export const LoginPage = lazy(() =>
    import('@/modules/auth/pages/LoginPage').then((m) => ({default: m.LoginPage}))
)

export const Dashboard = lazy (() =>
    import('@/modules/dashboard/pages/DashboardPage').then((m) => ({default: m.DashboardPage}))
)