# 1. Project Structure

### Before layouts, decide your folders.

Example:

    src/
    ├── app/              # App shell, providers
    ├── assets/
    ├── components/       # Shared app components (EntityListPage, dialogs, etc.)
    │   └── ui/           # Some shadcn-style pieces (e.g. form.tsx)
    ├── constants/
    ├── hooks/
    ├── layouts/          # AuthLayout, DashboardLayout
    ├── lib/              # queryClient, queryKeys
    ├── modules/          # Feature domains (NOT "features/" or top-level "pages/")
    │   ├── auth/pages/
    │   ├── employees/pages/
    │   ├── employees/hooks.ts
    │   └── ...
    ├── queries/          # TanStack Query hooks
    ├── routes/
    ├── services/         # HTTP client + api/* (not top-level "api/")
    │   └── api/
    ├── slices/           # Redux (auth)
    ├── store/
    ├── test/
    ├── types/
    ├── ui/               # Design system (Button, Modal, Dropdown, etc.)
    └── utils/

## Decide:
This prevents refactoring later.

    • Module-based architecture
    • Redux boundaries
    • Query boundaries
    • Layout boundaries
    • API conventions
    • Folder naming conventions
------------------------------------------------------

# 2. LAYOUTS AND COMPONENTS LAYOUT

### Build the application's skeleton.

## LAYOUTS
Create the skeleton:

    layouts/
    ├── AuthLayout.tsx
    ├── DashboardLayout.tsx
    ├── PublicLayout.tsx
Example:

        AuthLayout.tsx
        ├── Header
        ├── Outlet / Content
        └── Footer
    
        DashboardLayout.tsx
        ├── AppSidebar
        ├── AppHeader
        ├── Outlet / Content
        └── AppFooter
    
        PublicLayout.tsx
        ├── Sidebar
        ├── Header
        ├── Content
        └── Footer

## COMPONENTS LAYOUT
Create the skeleton:
    
    components/layout
    ├── AppBreadcrumbs.tsx
    ├── AppFooter.tsx
    ├── AppHeader.tsx
    ├── AppSidebar.tsx
    ├── GlobalSearch.tsx
    ├── MessageInbox.tsx
    ├── NotificationBell.tsx
    ├── PageShell.tsx
    ├── PublicNavbar.tsx

-----------------------------------------------------------------------------------


# 3. Routing FE

Install:
```sh
    npm install react-router-dom
```

Create the skeleton:

    /routes
    ├── index.tsx
    ├── lazyRoutes.ts
    ├── protectedRoutes.tsx

    /constants
    ├── routes.ts

    /modules
    ├── public
    │   ├── pages/LandingPage
    ├── auth
    │   ├── pages/LoginPage
    ├── dashboard
    │   ├── pages/DashboardPage

    /components
    │   ├── ui/skeleton.tsx
    ├── PageLoader.tsx

### /components/ui/skeleton
creates skeleton ui for the Lazy.AnyPage and used in the loader
```tsx
    import { cn } from '@/lib/utils'
    export default function Skeleton({className, ...props}: React.ComponentProps<"div">){
        return(
            <div
                data-slot="skeleton"
                className={cn("animate-pulse rounded-md bg-muted", className)}
                {...props}
            />
        )
    }
```    
### /components/PageLoader.tsx
```tsx
    import Skeleton from "@/components/ui/skeleton"
    export function PageLoader(): React.JSX.Element {
        return (
            <div className="flex min-h-[200px] flex-col gap-3 p-4">
                <Skeleton className="h-8 w-1/3" />
                <div className="mt-4 space-y-3">
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        )
    }
```

### /constants/routes.ts:
```ts
    export const ROUTES = {
       landing: '/',
       login: '/auth/login',
       dashboard: '/dashboard' 
    } as const
```

## Layouts for route - /src/layouts
### AuthLayout
```tsx
    import { Outlet } from 'react-router-dom'
    export default function AuthLayout(): React.JSX.Element {
        return (
            <div className="flex min-h-screen flex-col bg-muted">
                <header className="border-b border-border bg-card px-6 py-4">
                    Header
                </header>
                <div className="flex flex-1 items-center justify-center p-4">
                    <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-sm">
                    <Outlet />
                    </div>
                </div>
            </div>
        )
}
```
### PublicLayout
```tsx
    import { Outlet } from 'react-router-dom'
    export default function PublicLayout(): React.JSX.Element {
        return (<Outlet />)
    }
```
### DashboardPage
```tsx 
    export function DashboardPage(): React.JSX.Element {
        return(<h1>DASHBOARD - this should be protected by ahout</h1>)
    }
```

## ROUTES
### /routes/lazyRoutes.ts
```ts
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
```
### /routes/protectedRoutes.ts
```tsx
    export default function ProtectedRoute(): React.JSX.Element {
        return(<></>)
    }
```    

### /routes/index.tsx
Includes: Suspense wrap, lazy loading and Page Loader
```tsx
    import AuthLayout from "@/layouts/AuthLayout";
    import DashboardLayout from "@/layouts/DashboardLayout";
    import PublicLayout from "@/layouts/PublicLayout";
    import { Suspense, type ReactNode } from "react";
    import { createBrowserRouter, Navigate } from 'react-router-dom'
    interface SuspenseWrapProps {
        children: ReactNode
    }
    function SuspenseWrapProp({children}: SuspenseWrapProps): React.JSX.Element
    {
        return<Suspense fallback="">{children}</Suspense>
    }
    export const router = createBrowserRouter([
        {
            element: <PublicLayout />,
            children: [
                //e.g:
                //{ index: true, element: <SuspenseWrap><Lazy.LandingPage /></SuspenseWrap> },
                //{ path: 'about', element: <SuspenseWrap><Lazy.AboutPage /></SuspenseWrap> },
                {},
                {}
            ]
        },
        {
            path: '/auth',
            element: <AuthLayout />,
            children: [
                {},
                {}
            ]
        },
        {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
                {},
                {}
            ]
        }
    ])
```

### src/App.tsx updates
```tsx
    import { RouterProvider } from 'react-router-dom'
    import { router } from '@/routes/index'
    export default function App(): React.JSX.Element {
        return (<RouterProvider router={router} />)
    }
```

Example:

# 4. Authentication Foundation

    login flow
    logout flow
    token storage
    axios interceptor
    route protection

Example:

    AuthSlice
    AuthService
    AuthAPI

# 5. Reusable UI Components

### Things that will be use in more than one place.

Example:

    Button
    Input
    Select
    Textarea
    Modal
    Dialog
    Drawer
    Table
    Badge
    Card
    LoadingSpinner
    EmptyState
    ErrorState

APP OWN THIS EXAMPLE FILE:

    components/ui/dropdown-menu.tsx

Inside it:

    Radix UI = behavior engine (logic)
    Tailwind classes = styling
    Your project = final authority

# 6. Jest + React Testing Library setup
### Start enforcing quality early before feature code grows.

What this covers:
    
    Unit testing
    Component testing
    Redux logic testing
    UI behavior testing (design system)

What can immediately test:

    Button, 
    Input,
    Modal, 
    etc. (design system) auth logic reducers

### Setup structure:
    test/
    ├── unit/
    │   ├── components/
    │   ├── hooks/
    │   ├── slices/
    │   └── utils/
    ├── setup/
    │   ├── jest.config.ts
    │   ├── setupTests.ts
    │   └── test-utils.tsx
    └── mocks/

Core idea:

    Tests should validate logic + UI behavior in isolation
    NOT full app flows


# 7. Global UI State

### Redux slices for UI only.

Examples:

    uiSlice
    ├── sidebarOpen
    ├── theme
    ├── notifications
    ├── loading
feature slices yet.

# 8. API Layer

Example:

    axios.ts
    
    services/
    ├── auth.service.ts
    ├── user.service.ts
    ├── role.service.ts

Common interceptors:

    Request Interceptor
    Response Interceptor
    401 Handler
    Token Refresh

# 9. TanStack Query Setup
### Create conventions.

Create conventions.

    features/
    └── users/
    ├── api/
    ├── hooks/
    ├── types/

Example:

    useUsersQuery()
    useCreateUserMutation()
    useUpdateUserMutation()

# 10. Feature Module Structure

### Start building actual business modules.

Example:

    features/
    └── users/
        ├── api/
        ├── hooks/
        ├── components/
        ├── pages/
        ├── schemas/
        └── types/

# 11. E2E Testing (Cypress)
### Start after real user flows exist in the application.

What this covers:

    Full login flow
    Protected routes
    CRUD workflows
    Navigation flows
    Form submissions
    API integration behavior (end-to-end)

### Recommended structure:

    cypress/
    ├── e2e/
    │   ├── auth/
    │   │   ├── login.cy.ts
    │   │   └── logout.cy.ts
    │   ├── users/
    │   │   ├── create-user.cy.ts
    │   │   ├── update-user.cy.ts
    │   │   └── delete-user.cy.ts
    │   └── navigation.cy.ts
    ├── fixtures/
    ├── support/
    │   ├── commands.ts
    │   └── e2e.ts
    └── config/

Core idea:

    Cypress tests should behave like real users
    NOT test implementation details


# 12. Forms + Validation

### After the screens exist:

    React Hook Form
    +
    Zod

for:

    Login
    User Create
    User Update
    Settings

# Recommended Order for Enterprise Project

    1. Folder Structure
    2. Layouts
    3. Routing
    4. Authentication Foundation
    5. Reusable UI Components
    6. Jest + React Testing Library setup
    7. Redux UI Slice
    8. Axios + Interceptors
    9. TanStack Query Setup
    10. Feature Modules
    11. E2E Testing (Cypress)
    12. Forms & Validation
    13. Testing
    14. Deployment

For a React + Redux Toolkit + TanStack Query + ShadCN enterprise application, Layouts → Routing → Authentication is usually the next thing after scaffolding. That gives the application a skeleton before you start creating reusable components and business features.   
