import AuthLayout from "@/layouts/AuthLayout"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import {PublicLayout} from "@/layouts/PublicLayout"
import { Suspense, type ReactNode } from "react"
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from "./protectedRoute"
import * as Lazy from '@/routes/lazyRoutes'
import { PageLoader } from "@/components/PageLoader"
import { ROUTES } from "@/constants/routes"
import { RootLayout } from '@/layouts/RootLayout'
import { lazyRouteElement } from '@/routes/lazyRouteElement'
import { ROUTE_SEGMENT_PERMISSIONS } from '@/constants/routePermissions'
import { PERMISSIONS } from "@/constants/permissions"

interface SuspenseWrapProps {
    children: ReactNode
}

function SuspenseWrap({children}: SuspenseWrapProps): React.JSX.Element
{
    return<Suspense fallback={<PageLoader />}>{children}</Suspense>
}

function dashboardRoute(
    path: string,
    page: Parameters<typeof lazyRouteElement>[0],
): { path: string; element: ReactNode } {
    return {
      path,
      element: lazyRouteElement(page, ROUTE_SEGMENT_PERMISSIONS[path]),
    }
}

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [    
            {
                element: <PublicLayout />,
                children: [
                    //e.g:
                    //{ index: true, element: <SuspenseWrap><Lazy.LandingPage /></SuspenseWrap> },
                    //{ path: 'about', element: <SuspenseWrap><Lazy.AboutPage /></SuspenseWrap> },
                    { index: true, element: <SuspenseWrap><Lazy.LandingPage /> </SuspenseWrap> },
                    { path: 'about', element: <SuspenseWrap><Lazy.AboutPage /> </SuspenseWrap> },
                    { path: 'pricing', element: <SuspenseWrap><Lazy.PricingPage /> </SuspenseWrap> },
                    { path: 'contact-us', element: <SuspenseWrap><Lazy.ContactPage /> </SuspenseWrap> },
                    //{ path: '*', element: <SuspenseWrap><Lazy.NotFoundPage /></SuspenseWrap> },
                ]
            },
            {
                path: '/auth',
                element: <AuthLayout />,
                children: [
                    { path: 'login', index: true, element: <Suspense> <Lazy.LoginPage /> </Suspense> },
                    { path: 'forgot-password', element: <Suspense> <Lazy.ForgotPasswordPage /> </Suspense> },
                    { path: 'register', element: <Suspense> <Lazy.RegisterPage /> </Suspense> },
                    { path: 'verify-email', element: <Suspense> <Lazy.VerifyEmailPage /> </Suspense> },
                    { path: 'verify', element: <Suspense> <Lazy.VerifyEmailPage /> </Suspense> }
                ]
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        element: <DashboardLayout />,
                        children: [
                            { path: 'dashboard', element: lazyRouteElement(Lazy.DashboardPage)},
                            {
                                path: 'my-subscription/payment/:subscriptionId',
                                element: lazyRouteElement(Lazy.PaymentPage, PERMISSIONS.subscriptionPlansRead),
                            },
                            dashboardRoute('users', Lazy.UsersListPage),
                            dashboardRoute('subscriptions', Lazy.SubscriptionsListPage),
                            dashboardRoute('subscription/plans', Lazy.SubscriptionPlansPage),
                            { path: '*', element: <SuspenseWrap><Lazy.NotFoundPage /></SuspenseWrap> },
                            //{ path: 'users', element: <SuspenseWrap><Lazy.UsersListPage /></SuspenseWrap> },
                        ]
                    },
                ]
            },
            { path: 'logout', element: <Navigate to={ROUTES.auth.login} replace /> },
            { path: '*', element: <Navigate to={ROUTES.public.landing} replace /> }
        ]
    }
])