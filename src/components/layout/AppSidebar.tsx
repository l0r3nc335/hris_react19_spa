import { NAV_GROUPS, navGroupContainsPath, type NavItem } from '@/constants/navigation'
import { useAppDispatch, useAppSelector } from "@/hooks"
import { usePermission } from "@/hooks/usePermission"
import { setSidebarSearchQuery, toggleSidebar, toggleNavGroup } from "@/slices/uiSlice"
import { Button, Input, Tooltip } from "@/ui"
import { PanelLeftClose, PanelLeftOpen, Search, Settings } from "lucide-react"
import { ScrollArea } from "../ui/scroll-area"
import { NavLink, useLocation } from 'react-router-dom'
import { ROUTES } from "@/constants/routes"
import { cn } from "@/lib/utils"
import { isNavItemLockedDuringOnboarding, isSubscriberOnboarding } from '@/utils/subscriberOnboarding'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { selectUser } from '@/slices/authSlice'

interface AppSidebarProps {
    onNavigate?: () => void,
    collapsed?: boolean 
}

function navLinkClassName(collapsed: boolean, isActive: boolean): string {
    return cn(
      'flex rounded-md text-sm transition-colors',
      collapsed
        ? 'w-full items-center justify-center rounded-none'
        : 'items-center gap-2 px-3 py-2',
      isActive
        ? 'bg-secondary text-primary-foreground-X'
        : 'text-sidebar-foreground hover:bg-accent',
    )
}

function SidebarNavItem({
    item,
    collapsed,
    onNavigate,
    disabled = false,
  }: {
    item: NavItem
    collapsed: boolean
    onNavigate?: () => void
    disabled?: boolean
  }): React.JSX.Element {
    if (disabled) {
      const content = (
        <span
          className={cn(
            navLinkClassName(collapsed, false),
            'cursor-not-allowed opacity-40',
          )}
          aria-disabled
        >
          <item.icon className={cn('h-4 w-4 shrink-0', collapsed && 'my-2 mx-auto')} />
          {!collapsed ? <span className="text-white">{item.label}</span> : null}
        </span>
      )
      if (collapsed) {
        return (
          <Tooltip content="Complete subscription first" side="right">
            {content}
          </Tooltip>
        )
      }
      return content
    }

    const link = (
      <NavLink
        to={item.path}
        end={item.path === ROUTES.dashboard.dashboard}
        onClick={onNavigate}
        className={({ isActive }) => navLinkClassName(collapsed, isActive)}
      >
        {({ isActive }) => (
          <>
            <div
              className={cn(
                collapsed && 'flex w-full justify-center' ,
                collapsed && isActive && 'bg-secondary text-primary-foreground',
              )}
            >
              <item.icon
                className={cn(
                  'h-4 w-4 shrink-0',
                  collapsed && 'my-1 mx-auto box-content rounded-md bg-neutral-700 p-1.5 text-white opacity-70',
                )}
              />
            </div>
            {!collapsed ? <span className="text-foreground">{item.label}</span> : null}
          </>
        )}
      </NavLink>
    )
  
    if (collapsed) {
      return (
        <Tooltip content={item.label} side="right">
          {link}
        </Tooltip>
      )
    }
  
    return link
  }

export function AppSidebar({
    onNavigate,
    collapsed = false
}: AppSidebarProps): React.JSX.Element 
{
    const dispatch = useAppDispatch()
    const { pathname } = useLocation()
    const user = useAppSelector(selectUser)
    const onboardingLocked = isSubscriberOnboarding(user)
    const expandedGroups = useAppSelector((s) => s.ui.expandedNavGroups)
    const searchQuery = useAppSelector((s) => s.ui.sidebarSearchQuery)
    const { can } = usePermission()
    const normalizedQuery = searchQuery.trim().toLowerCase()

    /* NAVIGATION GROUPS - check permisions and filter menu*/
    const filteredGroups = NAV_GROUPS.map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          const permitted = !item.permission || can(item.permission)
          if (!permitted) return false
          if (!normalizedQuery) return true
          return item.label.toLowerCase().includes(normalizedQuery)
        }),
    })).filter((group) => group.items.length > 0)
    const navGroupflatItems = filteredGroups.flatMap((group) => group.items)

    // SIDEBAR - OPEN/CLOSE BUTTON (COLLAPSE)
    const sidebarToggle = (
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:inline-flex text-white"
          onClick={() => dispatch(toggleSidebar())}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </Button>
    )

    /* SIDEBAR - COLLAPSED (CLOSED) */
    if (collapsed) {
        return (
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center justify-center border-b border-sidebar-border">
              {sidebarToggle}
            </div>
            
            <ScrollArea className="flex-1">
              <nav className="space-y-1 py-2">
                {navGroupflatItems.map((item) => (
                  <SidebarNavItem
                    key={item.path}
                    item={item}
                    collapsed
                    onNavigate={onNavigate}
                    disabled={isNavItemLockedDuringOnboarding(item.path, onboardingLocked, pathname)}
                  />
                ))}
              </nav>
            </ScrollArea>
            <div className="border-t border-sidebar-border p-2">
              <Tooltip content="Settings" side="right">
                <NavLink
                  to={ROUTES.system.settings}
                  onClick={onNavigate}
                  className={({ isActive }) => navLinkClassName(true, isActive)}
                >
                  <Settings className="h-4 w-4" />
                </NavLink>
              </Tooltip>
            </div>
          </div>
        )
    }

    /* SETTINGS LINK HERE */

    return (
      <div className="flex h-full flex-col">
        {/* SIDE BAR HEADER */}
        <div
            className={cn(
                'flex h-14 items-center gap-2 border-b border-sidebar-border px-2',
                collapsed ? 'justify-center' : 'justify-between px-4',
            )}
        >
          <span
              className={cn(
              'overflow-hidden whitespace-nowrap font-semibold text-sidebar-foreground',
              'transition-[max-width,opacity] duration-300 ease-in-out',
              collapsed ? 'max-w-0 opacity-0' : 'max-w-[12rem] opacity-100',
              )}
          >
              HRIS Enterprise
          </span>
          {sidebarToggle}
        </div>

        {/* FILTER MENU */}    
        <div className="border-b-X border-sidebar-border p-3">
          <div className="relative">
            {/* Search Icon */}
            <Search className="absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> 
            {/* Search input */}
            <Input
                placeholder="Filter menu..."
                value={searchQuery}
                onChange={(e) => dispatch(setSidebarSearchQuery(e.target.value))}
                className="pl-8 bg-input/5 border-0 "
            />
          </div>
        </div>
      
        {/* SCROLLED NAVIGATION */}      
        <ScrollArea className="flex-1">
          <nav className="space-y-1 p-2 h-5">

              {/* Filtered nav Groups */}
              { filteredGroups.map((group) => {
                const isRouteActive = navGroupContainsPath(group, pathname)
                const isManuallyExpanded = expandedGroups.includes(group.id)
                const isExpanded = normalizedQuery.length > 0 || isRouteActive || isManuallyExpanded
                
                {/* Collapsible Nav Group */}
                return (
                  <Collapsible 
                    key={group.id}
                    open={isExpanded}
                    onOpenChange={(open) => {
                      if (open !== isManuallyExpanded) {
                        dispatch(toggleNavGroup(group.id))
                      }
                    }}
                  >
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase hover:bg-accent/50 hover:text-white">
                      {group.label}
                    </CollapsibleTrigger>

                    {/* Nav Items */}
                    <CollapsibleContent>
                      {group.items.map((item)=>(
                        <SidebarNavItem
                          key={item.path}
                          item={item}
                          collapsed={false}
                          onNavigate={onNavigate}
                          disabled={isNavItemLockedDuringOnboarding(item.path, onboardingLocked, pathname)}
                        >
                        </SidebarNavItem>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )
              })}
          </nav>
        </ScrollArea>
      </div>
    )
}