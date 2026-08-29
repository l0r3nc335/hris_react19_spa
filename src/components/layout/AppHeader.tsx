import { useNavigate } from 'react-router-dom'
import { Bell, LogOut, Menu, Search } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { logout, selectUser } from '@/slices/authSlice'
import { setCommandPaletteOpen } from '@/slices/uiSlice'
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
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { AppSidebar } from './AppSidebar'
import { Badge } from '@/components/ui/badge'

export function AppHeader(): React.JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)

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

  const firstName = user?.firstName ?? 'there'
  // Placeholder badge count until notifications API is wired
  const unreadCount = 0

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-4">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 border-0 bg-[var(--wf-navy)] p-0">
            <AppSidebar />
          </SheetContent>
        </Sheet>

        <Button
          variant="outline"
          size="sm"
          className="hidden max-w-xs flex-1 justify-start gap-2 text-muted-foreground sm:inline-flex"
          onClick={() => dispatch(setCommandPaletteOpen(true))}
        >
          <Search className="h-4 w-4" />
          <span className="truncate">Search…</span>
          <kbd className="ml-auto hidden rounded border bg-muted px-1.5 text-[10px] lg:inline">
            Ctrl+K
          </kbd>
        </Button>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5 text-[var(--wf-navy)]" />
          {unreadCount > 0 ? (
            <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 rounded-full bg-[var(--wf-orange)] px-1 text-[10px] text-white">
              {unreadCount}
            </Badge>
          ) : (
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[var(--wf-orange)]" />
          )}
        </Button>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2">
              <span className="hidden text-sm text-[var(--wf-navy)] sm:inline">
                Hello {firstName}
              </span>
              <Avatar className="h-8 w-8 border border-[var(--wf-orange)]/40">
                <AvatarFallback className="bg-[var(--wf-navy)] text-xs text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem disabled>{user?.email ?? 'Not signed in'}</DropdownMenuItem>
            {user?.company?.name ? (
              <DropdownMenuItem disabled>{user.company.name}</DropdownMenuItem>
            ) : null}
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => navigate(ROUTES.companySettings.hub)}>
              Company Settings
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
