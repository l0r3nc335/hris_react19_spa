import { NAV_GROUPS, navGroupContainsPath, type NavItem } from '@/constants/navigation'
import { useAppDispatch, useAppSelector } from "@/hooks"
import { usePermission } from "@/hooks/usePermission"
import { setSidebarSearchQuery, toggleSidebar, toggleNavGroup } from "@/slices/uiSlice"
import { Button, Input, Tooltip } from "@/ui"
import { ChevronRight, PanelLeftClose, PanelLeftOpen, Search, Settings, UserRoundCog } from "lucide-react"
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
        : 'items-center gap-2 px-3 py-2 ms-2',
      isActive
        ? 'bg-secondary text-white'
        : 'text-muted-foreground hover:text-white hover:bg-accent/10 font-semibold-X',
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
    /* Disabled items — same layout as active, red bg */
    if (disabled) {
      const content = (
        <span
          className={cn(
            'flex rounded-md text-sm transition-colors cursor-not-allowed opacity-40',
            collapsed
              ? 'w-full items-center justify-center rounded-none'
              : 'items-center gap-2 px-3 py-2 ms-2',
            ' text-primary-foreground',
          )}
          aria-disabled
        >
          <div
            className={cn(
              collapsed && 'flex w-full justify-center',
              collapsed && 'text-primary-foreground text-sidebar-foreground',
            )}
          >
            <item.icon
              className={cn(
                'h-4.5 w-4.5 shrink-0 text-white',
                collapsed && 'my-1 mx-auto box-content rounded-md bg-black/90 p-1.5',
                !collapsed && 'box-content rounded-md bg-black/90 p-1 m-1.5',
              )}
            />
          </div>
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
                collapsed && isActive && 'bg-secondary text-primary-foreground text-sidebar-foreground',
              )}
            >
              <item.icon
                className={cn(
                  'h-4.5 w-4.5 shrink-0 text-white',
                  collapsed && 'my-1 mx-auto box-content rounded-md bg-black/20 p-1.5',
                  !collapsed && 'box-content rounded-md bg-black/20 p-1 ms-2',
                  !isActive && item.iconBoxColor,
                )}
              />
            </div>
            {!collapsed ? <span className="text-foregrounds">{item.label}</span> : null}
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

    /* NAVIGATION GROUPS DATA- check permisions and filter menu*/
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
                'flex h-14 items-center gap-2  px-2',
                collapsed ? 'justify-center' : 'justify-between px-4',
            )}
        >
          <div className="flex min-w-0 items-center gap-2 text-sidebar-foreground">
            <UserRoundCog className="size-8 shrink-0" strokeWidth={2.25} />
            <span
                className={cn(
                'overflow-hidden whitespace-nowrap font-semibold',
                'transition-[max-width,opacity] duration-300 ease-in-out',
                collapsed ? 'max-w-0 opacity-0' : 'max-w-[12rem] opacity-100',
                )}
            >
                HRIS Enterprise
            </span>
          </div>
          {sidebarToggle}
        </div>

        {/* FILTER MENU */}    
        <div className="p-3 mt-4">
          <div className="relative">
            {/* Search Icon */}
            <Search className="absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> 
            {/* Search input */}
            <Input
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => dispatch(setSidebarSearchQuery(e.target.value))}
                className="pl-8 bg-input/5 border-0 text-white placeholder:text-muted-foreground"
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
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase hover:bg-accent/5">
                      {group.label}
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 [[data-state=open]_&]:rotate-90" />
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