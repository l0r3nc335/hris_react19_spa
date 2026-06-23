import { Outlet } from 'react-router-dom'
import { useAppSelector } from '@/hooks'
import { cn } from '@/lib/utils'
//import { AppSidebar } from '@/components/layout/AppSidebar'
import { AppHeader } from '@/components/layout/AppHeader'
//import { AppFooter } from '@/components/layout/AppFooter'

export function DashboardLayout(): React.JSX.Element {
  const sidebarOpen = useAppSelector((s) => s.ui.sidebarOpen)

  return (
    <div className="flex min-h-screen">
      <aside
        className={cn(
          'hidden border-r border-sidebar-border bg-sidebar md:block md:transition-all',
          sidebarOpen ? 'md:w-64' : 'md:w-14',
        )}
      >
        {/*<AppSidebar collapsed={!sidebarOpen} />*/}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <main className="flex flex-1 flex-col overflow-auto p-6">
          {/*<Outlet />*/}
        </main>
        {/*<AppFooter />*/}
      </div>
    </div>
  )
}
