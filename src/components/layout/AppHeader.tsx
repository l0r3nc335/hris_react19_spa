import { useNavigate } from 'react-router-dom'
import { LogOut, Menu, Moon, Search, Sun } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { logout, selectUser } from '@/slices/authSlice'
import { setCommandPaletteOpen } from '@/slices/uiSlice'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/ui'
import { ROUTES } from '@/constants/routes'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
//import { AppSidebar } from './AppSidebar'
//import { NotificationBell } from './NotificationBell'
//import { MessageInbox } from './MessageInbox'
//import { GlobalSearch } from './GlobalSearch'
//import { AppBreadcrumbs } from './AppBreadcrumbs'
//import { getRouteMeta } from '@/constants/routeMeta'
import { useLocation } from 'react-router-dom'
import { getRouteMeta } from '@/constants/routeMeta'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { AppSidebar } from './AppSidebar'

export function AppHeader(): React.JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAppSelector(selectUser)
  const { resolvedTheme, toggleTheme } = useTheme()
  const meta =  getRouteMeta(location.pathname)

  const handleLogout = (): void => {
    void dispatch(logout()).then((result) => {
      if (logout.fulfilled.match(result)) {
        navigate(ROUTES.auth.login, { replace: true })
      }
    })
  }

  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : 'G'

  return (
    <>
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <AppSidebar />
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            className="hidden gap-2 text-muted-foreground sm:inline-flex"
            onClick={() => dispatch(setCommandPaletteOpen(true))}
          >
            <Search className="h-4 w-4" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="hidden rounded border bg-muted px-1.5 text-[10px] lg:inline">
              Ctrl+K
            </kbd>
          </Button>
          {/*<MessageInbox />*/}
          {/*<NotificationBell />*/}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {resolvedTheme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span className="hidden text-sm text-muted-foreground sm:inline">
                  {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>
                {user?.email ?? 'Not signed in'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => navigate(ROUTES.settings)}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      {/*<GlobalSearch />*/}
    </>
  )
}