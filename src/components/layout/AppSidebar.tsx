import {
  NAV_GROUPS,
  navGroupContainsPath,
  navItemOrChildrenMatchPath,
  filterNavItemsByQuery,
  type NavItem,
} from '@/constants/navigation'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { usePermission } from '@/hooks/usePermission'
import { setSidebarSearchQuery, toggleSidebar, toggleNavGroup } from '@/slices/uiSlice'
import { Button, Input, Tooltip } from '@/ui'
import { ChevronDown, PanelLeftClose, PanelLeftOpen, Search } from 'lucide-react'
import { ScrollArea } from '../ui/scroll-area'
import { NavLink, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'
import { isNavItemLockedDuringOnboarding, isSubscriberOnboarding } from '@/utils/subscriberOnboarding'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { selectUser } from '@/slices/authSlice'
import { useState } from 'react'

interface AppSidebarProps {
  onNavigate?: () => void
  collapsed?: boolean
}

function navLinkClassName(collapsed: boolean, isActive: boolean, nested = false): string {
  return cn(
    'flex rounded-md text-sm transition-colors',
    collapsed
      ? 'mx-auto size-9 items-center justify-center'
      : cn('items-center gap-2 py-2', nested ? 'px-3 pl-9' : 'px-3'),
    isActive
      ? 'bg-[var(--wf-orange)] text-white'
      : 'text-white/80 hover:bg-white/10 hover:text-white',
  )
}

function SidebarLeafLink({
  item,
  collapsed,
  onNavigate,
  disabled = false,
  nested = false,
}: {
  item: NavItem
  collapsed: boolean
  onNavigate?: () => void
  disabled?: boolean
  nested?: boolean
}): React.JSX.Element {
  if (disabled) {
    const content = (
      <span
        className={cn(navLinkClassName(collapsed, false, nested), 'cursor-not-allowed opacity-40')}
        aria-disabled
      >
        <item.icon className={cn('h-4 w-4 shrink-0', collapsed && 'my-2 mx-auto')} />
        {!collapsed ? item.label : null}
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
      className={({ isActive }) => navLinkClassName(collapsed, isActive, nested)}
    >
      <item.icon className={cn('h-4 w-4 shrink-0', collapsed && 'my-2 mx-auto')} />
      {!collapsed ? item.label : null}
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

function NestedNavItem({
  item,
  collapsed,
  onNavigate,
  onboardingLocked,
  pathname,
}: {
  item: NavItem
  collapsed: boolean
  onNavigate?: () => void
  onboardingLocked: boolean
  pathname: string
}): React.JSX.Element {
  const hasChildren = Boolean(item.children?.length)
  const routeActive = navItemOrChildrenMatchPath(item, pathname)
  const [open, setOpen] = useState(routeActive)

  if (!hasChildren || collapsed) {
    return (
      <SidebarLeafLink
        item={item}
        collapsed={collapsed}
        onNavigate={onNavigate}
        disabled={isNavItemLockedDuringOnboarding(item.path, onboardingLocked, pathname)}
      />
    )
  }

  return (
    <Collapsible open={open || routeActive} onOpenChange={setOpen}>
      <CollapsibleTrigger
        className={cn(
          'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white',
          routeActive && !item.children?.some((c) => navItemOrChildrenMatchPath(c, pathname))
            ? 'bg-[var(--wf-orange)] text-white'
            : '',
        )}
      >
        <item.icon className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left">{item.label}</span>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 transition-transform', open || routeActive ? 'rotate-180' : '')}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-0.5 py-0.5">
        {item.children!.map((child) => (
          <SidebarLeafLink
            key={child.path}
            item={child}
            collapsed={false}
            nested
            onNavigate={onNavigate}
            disabled={isNavItemLockedDuringOnboarding(child.path, onboardingLocked, pathname)}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

function filterItemsByPermission(
  items: NavItem[],
  can: (p: NonNullable<NavItem['permission']>) => boolean,
): NavItem[] {
  const result: NavItem[] = []
  for (const item of items) {
    const permitted = !item.permission || can(item.permission)
    if (!permitted) continue
    const children = item.children
      ? filterItemsByPermission(item.children, can)
      : undefined
    if (children && children.length === 0 && item.children?.length) {
      continue
    }
    result.push({ ...item, children })
  }
  return result
}

export function AppSidebar({
  onNavigate,
  collapsed = false,
}: AppSidebarProps): React.JSX.Element {
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const user = useAppSelector(selectUser)
  const onboardingLocked = isSubscriberOnboarding(user)
  const expandedGroups = useAppSelector((s) => s.ui.expandedNavGroups)
  const searchQuery = useAppSelector((s) => s.ui.sidebarSearchQuery)
  const { can } = usePermission()
  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filteredGroups = NAV_GROUPS.map((group) => {
    let items = filterItemsByPermission(group.items, can)
    if (normalizedQuery) {
      items = filterNavItemsByQuery(items, normalizedQuery)
    }
    return { ...group, items }
  }).filter((group) => group.items.length > 0)

  const flatLeaves = filteredGroups.flatMap((group) =>
    group.items.flatMap((item) => (item.children?.length ? item.children : [item])),
  )

  const sidebarToggle = (
    <Button
      variant="ghost"
      size="icon"
      className="hidden text-white/80 hover:bg-white/10 hover:text-white md:inline-flex"
      onClick={() => dispatch(toggleSidebar())}
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
    </Button>
  )

  if (collapsed) {
    return (
      <div className="flex h-full flex-col bg-[var(--wf-navy)] text-white">
        <div className="flex h-14 items-center justify-center border-b border-white/10">
          {sidebarToggle}
        </div>
        <ScrollArea className="flex-1">
          <nav className="space-y-1 p-2">
            {flatLeaves.map((item) => (
              <SidebarLeafLink
                key={item.path}
                item={item}
                collapsed
                onNavigate={onNavigate}
                disabled={isNavItemLockedDuringOnboarding(item.path, onboardingLocked, pathname)}
              />
            ))}
          </nav>
        </ScrollArea>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-[var(--wf-navy)] text-white">
      <div className="flex h-14 items-center justify-between gap-2 border-b border-white/10 px-4">
        <span className="overflow-hidden whitespace-nowrap font-semibold tracking-tight">
          Workforce
        </span>
        {sidebarToggle}
      </div>

      <div className="border-b border-white/10 p-3">
        <div className="relative">
          <Search className="absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-white/50" />
          <Input
            placeholder="Filter menu..."
            value={searchQuery}
            onChange={(e) => dispatch(setSidebarSearchQuery(e.target.value))}
            className="border-white/15 bg-white/5 pl-8 text-white placeholder:text-white/40 focus-visible:ring-[var(--wf-orange)]"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <nav className="space-y-2 p-2">
          {filteredGroups.map((group) => {
            const isRouteActive = navGroupContainsPath(group, pathname)
            const isManuallyExpanded = expandedGroups.includes(group.id)
            const isExpanded = normalizedQuery.length > 0 || isRouteActive || isManuallyExpanded

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
                {group.id !== 'main' ? (
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-[10px] font-semibold tracking-wider text-[var(--wf-sidebar-muted)] uppercase hover:bg-white/5">
                    {group.label}
                  </CollapsibleTrigger>
                ) : null}

                <CollapsibleContent className="space-y-0.5">
                  {group.items.map((item) => (
                    <NestedNavItem
                      key={`${group.id}-${item.label}-${item.path}`}
                      item={item}
                      collapsed={false}
                      onNavigate={onNavigate}
                      onboardingLocked={onboardingLocked}
                      pathname={pathname}
                    />
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
