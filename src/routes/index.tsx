import AuthLayout from "@/layouts/AuthLayout"
import DashboardLayout from "@/layouts/DashboardLayout"
import PublicLayout from "@/layouts/PublicLayout"
import { Suspense, type ReactNode } from "react"
import { createBrowserRouter, Navigate } from 'react-router-dom'
import ProtectedRoute from "./protectedRoute"
import * as Lazy from '@/routes/lazyRoutes'
import { PageLoader } from "@/components/PageLoader"
import { ROUTES } from "@/constants/routes"

interface SuspenseWrapProps {
    children: ReactNode
}

function SuspenseWrap({children}: SuspenseWrapProps): React.JSX.Element
{
    return<Suspense fallback={<PageLoader />}>{children}</Suspense>
}

export const router = createBrowserRouter([
    {
        element: <PublicLayout />,
        children: [
            //e.g:
            //{ index: true, element: <SuspenseWrap><Lazy.LandingPage /></SuspenseWrap> },
            //{ path: 'about', element: <SuspenseWrap><Lazy.AboutPage /></SuspenseWrap> },
            { index: true, element: <SuspenseWrap><Lazy.LandingPage /> </SuspenseWrap> },
            {}
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            { path: 'login', element: <Suspense> <Lazy.LoginPage /> </Suspense> },
            {}
        ]
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    { path: 'dashboard', element: <SuspenseWrap> <Lazy.Dashboard /> </SuspenseWrap>},
                    //{ path: 'users', element: <SuspenseWrap><Lazy.UsersListPage /></SuspenseWrap> },
                ]
            },
        ]
    },
    { path: 'logout', element: <Navigate to={ROUTES.login} replace /> },
    { path: '*', element: <Navigate to={ROUTES.landing} replace /> }
])