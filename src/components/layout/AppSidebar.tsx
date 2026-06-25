import { NAV_GROUPS } from "@/constants/navigation"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { usePermission } from "@/hooks/usePermission"

interface AppSidebarProps {
    onNavigate?: () => void,
    collapsed?: boolean 
}

export function AppSidebar({
    onNavigate,
    collapsed = false
}: AppSidebarProps): React.JSX.Element 
{
    const dispatch = useAppDispatch()
    const expandedGroups = useAppSelector((s) => s.ui.expandedNavGroups)
    const searchQuery = useAppSelector((s) => s.ui.sidebarSearchQuery)
    const { can } = usePermission()

    const normalizedQuery = searchQuery.trim().toLowerCase()

    const filteredGroups = NAV_GROUPS.map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          const permitted = !item.permission || can(item.permission)
          if (!permitted) return false
          if (!normalizedQuery) return true
          return item.label.toLowerCase().includes(normalizedQuery)
        }),
    })).filter((group) => group.items.length > 0)

    console.log(filteredGroups)

    return (<></>)
}