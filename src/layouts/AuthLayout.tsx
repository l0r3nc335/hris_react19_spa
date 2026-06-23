import PublicNavbar from '@/components/layout/PublicNavbar'
import { Outlet } from 'react-router-dom'

export default function AuthLayout(): React.JSX.Element
{
    return (
        <div className="flex h-screen flex-col overflow-hidden bg-background">
          <PublicNavbar />
          <main className="flex min-h-0 flex-1 overflow-hidden">
            <Outlet />
          </main>
        </div>
    )
}

export function AuthLayout2(): React.JSX.Element
{
    return (
        <div className="flex min-h-screen flex-col bg-muted">
            <header className="border-b border-border bg-card px-6 py-4">
                Header - Auth Layout
            </header>
            <div className="flex flex-1 items-center justify-center p-4">
                <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-sm">
                <Outlet />
                </div>
            </div>
        </div>
    )
}