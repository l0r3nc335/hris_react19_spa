import type { ReactNode } from 'react'
import { Search } from 'lucide-react'
import { Button, Input, Label, Select } from '@/ui'
import { Checkbox } from '@/components/ui/checkbox'

export interface DataTableToolbarProps {
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  showDeleted?: boolean
  onShowDeletedChange?: (show: boolean) => void
  statusFilter?: string
  onStatusFilterChange?: (value: string) => void
  primaryAction?: ReactNode
  extra?: ReactNode
}

const STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

export function DataTableToolbar({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search records...',
  showDeleted,
  onShowDeletedChange,
  statusFilter,
  onStatusFilterChange,
  primaryAction,
  extra,
}: DataTableToolbarProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {onSearchChange ? (
        <div className="relative max-w-sm flex-1">
          <Search className="absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        {extra}
        {onStatusFilterChange ? (
          <div className="w-40">
            <Select
              value={statusFilter ?? 'all'}
              onValueChange={onStatusFilterChange}
              placeholder="Filter status"
              options={STATUS_FILTER_OPTIONS}
            />
          </div>
        ) : null}
        {onShowDeletedChange ? (
          <div className="flex items-center gap-2">
            <Checkbox
              id="show-deleted-toolbar"
              checked={showDeleted}
              onCheckedChange={(checked) => onShowDeletedChange(checked === true)}
            />
            <Label htmlFor="show-deleted-toolbar" className="text-sm font-normal">
              Show deleted
            </Label>
          </div>
        ) : null}
        {primaryAction ?? <Button disabled>Add</Button>}
      </div>
    </div>
  )
}
