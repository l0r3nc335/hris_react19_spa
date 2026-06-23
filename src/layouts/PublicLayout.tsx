import PublicNavbar from '@/components/layout/PublicNavbar'
import { Outlet } from 'react-router-dom'

export default function PublicLayout(): React.JSX.Element
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