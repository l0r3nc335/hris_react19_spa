import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { EmptyState } from '@/components/EmptyState'
import { TableSkeleton } from '@/components/TableSkeleton'
import { StatusBadge } from '@/components/StatusBadge'
import { RequirePermission } from '@/components/RequirePermission'
import { PageShell } from '@/components/layout/PageShell'
import { DataTableToolbar } from '@/components/layout/DataTableToolBar'
import { TablePagination } from '@/components/TablePagination'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button, Dropdown, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui'
import type { DropdownItem } from '@/ui/Dropdown'
import type { Permission } from '@/constants/permissions'

interface EntityListItem {
  id: string
  name: string
  status: string
}

export interface EntityListExtraColumn {
  header: string
  cell: (item: EntityListItem) => React.ReactNode
  /** When clientSideSort is enabled, clicking the header sorts by this field. */
  sortKey?: string
  sortValue?: (item: EntityListItem) => string | number | boolean
}

type SortDirection = 'asc' | 'desc'

interface SortState {
  key: string
  direction: SortDirection
}

export interface EntityListPageProps {
  title: string
  description: string
  emptyTitle: string
  items: EntityListItem[]
  isLoading: boolean
  showDeleted?: boolean
  onShowDeletedChange?: (show: boolean) => void
  onCreate?: () => void
  onEdit?: (item: EntityListItem) => void
  onSoftDelete?: (id: string) => void
  onHardDelete?: (id: string) => void
  onRestore?: (id: string) => void
  showActions?: boolean
  isTrashedView?: boolean
  extraToolbar?: React.ReactNode
  extraRowActions?: (item: EntityListItem) => React.ReactNode
  extraColumns?: EntityListExtraColumn[]
  searchKeys?: string[]
  embedded?: boolean
  createPermission?: Permission
  writePermission?: Permission
  total?: number
  page?: number
  limit?: number
  onPageChange?: (page: number) => void
  onLimitChange?: (limit: number) => void
  searchValue?: string
  onSearchChange?: (value: string) => void
  statusFilter?: string
  onStatusFilterChange?: (value: string) => void
  /** When true, pagination slices filtered rows in the browser (toolbar search is always client-side). */
  clientSideFilter?: boolean
  /** Rendered below the page title and above the list card. */
  headerContent?: React.ReactNode
  /** Hide toolbar search input and status filter. */
  hideToolbarSearch?: boolean
  /** When true, omit the default Name column (use extraColumns for row labels). */
  hideNameColumn?: boolean
  /** When true, sortable column headers sort the current rows in the browser. */
  clientSideSort?: boolean
}

function compareSortValues(a: unknown, b: unknown): number {
  if (typeof a === 'boolean' || typeof b === 'boolean') {
    return Number(Boolean(a)) - Number(Boolean(b))
  }
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b
  }
  return String(a ?? '').localeCompare(String(b ?? ''), undefined, { sensitivity: 'base' })
}

function sortListItems<T extends EntityListItem>(
  items: T[],
  sortState: SortState | null,
  getValue: (item: T, key: string) => unknown,
): T[] {
  if (!sortState) return items
  const sorted = [...items]
  const direction = sortState.direction === 'asc' ? 1 : -1
  sorted.sort(
    (a, b) => compareSortValues(getValue(a, sortState.key), getValue(b, sortState.key)) * direction,
  )
  return sorted
}

function SortableTableHead({
  label,
  sortKey,
  sortState,
  onSort,
}: {
  label: string
  sortKey: string
  sortState: SortState | null
  onSort: (key: string) => void
}): React.JSX.Element {
  const active = sortState?.key === sortKey
  const direction = active ? sortState.direction : undefined
  const SortIcon = active ? (direction === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown

  return (
    <TableHead>
      <button
        type="button"
        className="inline-flex items-center gap-1 font-medium hover:text-foreground"
        aria-label={`Sort by ${label}`}
        aria-sort={active ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}
        onClick={() => onSort(sortKey)}
      >
        {label}
        <SortIcon className={`h-3.5 w-3.5 ${active ? '' : 'text-muted-foreground'}`} aria-hidden />
      </button>
    </TableHead>
  )
}

function RowActionsDropdown({
  item,
  trashedView,
  onEdit,
  onSoftDelete,
  onHardDelete,
  onRestore,
}: {
  item: EntityListItem
  trashedView: boolean
  onEdit?: (item: EntityListItem) => void
  onSoftDelete?: (id: string) => void
  onHardDelete?: (id: string) => void
  onRestore?: (id: string) => void
}): React.JSX.Element | null {
  const items: DropdownItem[] = []

  if (trashedView) {
    if (onRestore) items.push({ label: 'Restore', onSelect: () => onRestore(item.id) })
    if (onHardDelete) {
      items.push({
        label: 'Hard delete',
        destructive: true,
        onSelect: () => onHardDelete(item.id),
      })
    }
  } else {
    if (onEdit) items.push({ label: 'Edit', onSelect: () => onEdit(item) })
    if (onSoftDelete) items.push({ label: 'Soft delete', onSelect: () => onSoftDelete(item.id) })
    if (onHardDelete) {
      items.push({
        label: 'Hard delete',
        destructive: true,
        onSelect: () => onHardDelete(item.id),
      })
    }
  }

  if (items.length === 0) return null

  return (
    <Dropdown
      trigger={
        <Button variant="ghost" size="icon-sm" aria-label="Row actions">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      }
      items={items}
    />
  )
}

export function EntityListPage({
  title,
  description,
  emptyTitle,
  items,
  isLoading,
  showDeleted = false,
  onShowDeletedChange,
  onCreate,
  onEdit,
  onSoftDelete,
  onHardDelete,
  onRestore,
  showActions = false,
  isTrashedView = false,
  extraToolbar,
  extraRowActions,
  extraColumns = [],
  searchKeys = ['name', 'status'],
  embedded = false,
  createPermission,
  writePermission,
  total,
  page = 1,
  limit = 20,
  onPageChange,
  onLimitChange,
  searchValue,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  clientSideFilter = false,
  headerContent,
  hideToolbarSearch = false,
  hideNameColumn = false,
  clientSideSort = false,
}: EntityListPageProps): React.JSX.Element {
  const trashedView = isTrashedView || showDeleted
  const serverPaginated = total !== undefined && !clientSideFilter
  /** Toolbar search/status always filter in the browser; they never hit the API. */
  const filterOnClient = clientSideFilter || !hideToolbarSearch || !serverPaginated
  const [localSearchQuery, setLocalSearchQuery] = useState('')
  const [localStatusFilter, setLocalStatusFilter] = useState('all')
  const [sortState, setSortState] = useState<SortState | null>(null)

  const searchQuery = clientSideFilter
    ? (searchValue ?? '')
    : serverPaginated
      ? (searchValue ?? '')
      : localSearchQuery
  const activeStatusFilter = clientSideFilter
    ? (statusFilter ?? 'all')
    : serverPaginated
      ? (statusFilter ?? 'all')
      : localStatusFilter

  const handleSearchChange = (value: string): void => {
    if (clientSideFilter || serverPaginated) {
      onSearchChange?.(value)
      return
    }
    setLocalSearchQuery(value)
  }

  const handleStatusFilterChange = (value: string): void => {
    if (clientSideFilter || serverPaginated) {
      onStatusFilterChange?.(value)
      return
    }
    setLocalStatusFilter(value)
  }

  const filteredItems = useMemo(() => {
    if (!filterOnClient) return items
    let result = items
    if (activeStatusFilter !== 'all') {
      result = result.filter((item) => item.status.toLowerCase() === activeStatusFilter)
    }
    const q = searchQuery.trim().toLowerCase()
    if (!q) return result
    return result.filter((item) =>
      searchKeys.some((key) =>
        String((item as unknown as Record<string, unknown>)[key] ?? '')
          .toLowerCase()
          .includes(q),
      ),
    )
  }, [items, searchKeys, searchQuery, activeStatusFilter, filterOnClient])

  const resolveSortValue = (item: EntityListItem, key: string): unknown => {
    if (key === 'name') return item.name
    if (key === 'status') return item.status
    const column = extraColumns.find((col) => col.sortKey === key)
    if (column?.sortValue) return column.sortValue(item)
    if (column) {
      return (item as unknown as Record<string, unknown>)[key]
    }
    return (item as unknown as Record<string, unknown>)[key]
  }

  const handleSort = (key: string): void => {
    setSortState((current) => {
      if (current?.key === key) {
        return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' }
      }
      return { key, direction: 'asc' }
    })
  }

  const sortedItems = useMemo(() => {
    if (!clientSideSort) return filteredItems
    return sortListItems(filteredItems, sortState, resolveSortValue)
  }, [clientSideSort, filteredItems, sortState, extraColumns])

  const displayItems = useMemo(() => {
    if (!clientSideFilter) return sortedItems
    const start = (page - 1) * limit
    return sortedItems.slice(start, start + limit)
  }, [clientSideFilter, sortedItems, page, limit])

  const paginationTotal = clientSideFilter ? filteredItems.length : total
  const showPagination =
    clientSideFilter || serverPaginated
      ? onPageChange !== undefined && onLimitChange !== undefined
      : false

  const addButton =
    onCreate ? (
      <Button onClick={onCreate} disabled={trashedView}>
        Add
      </Button>
    ) : undefined

  const primaryAction =
    createPermission && addButton ? (
      <RequirePermission permission={createPermission}>{addButton}</RequirePermission>
    ) : (
      addButton
    )

  const cardContent = (
    <Card>
      <CardHeader className="space-y-4 pb-0">
        <DataTableToolbar
          searchValue={hideToolbarSearch ? undefined : searchQuery}
          onSearchChange={hideToolbarSearch ? undefined : handleSearchChange}
          showDeleted={showDeleted}
          onShowDeletedChange={onShowDeletedChange}
          statusFilter={hideToolbarSearch ? undefined : activeStatusFilter}
          onStatusFilterChange={hideToolbarSearch ? undefined : handleStatusFilterChange}
          extra={extraToolbar}
          primaryAction={primaryAction}
        />
      </CardHeader>
      <CardContent>
        {isLoading ?  (
          <TableSkeleton />
        ) : filteredItems.length === 0 ? (
          <EmptyState title={emptyTitle} />
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  {!hideNameColumn ? (
                    clientSideSort ? (
                      <SortableTableHead
                        label="Name"
                        sortKey="name"
                        sortState={sortState}
                        onSort={handleSort}
                      />
                    ) : (
                      <TableHead>Name</TableHead>
                    )
                  ) : null}
                  {extraColumns.map((col) =>
                    clientSideSort && col.sortKey ? (
                      <SortableTableHead
                        key={col.header}
                        label={col.header}
                        sortKey={col.sortKey}
                        sortState={sortState}
                        onSort={handleSort}
                      />
                    ) : (
                      <TableHead key={col.header}>{col.header}</TableHead>
                    ),
                  )}
                  {clientSideSort ? (
                    <SortableTableHead
                      label="Status"
                      sortKey="status"
                      sortState={sortState}
                      onSort={handleSort}
                    />
                  ) : (
                    <TableHead>Status</TableHead>
                  )}
                  {showActions ? <TableHead className="w-[120px]">Actions</TableHead> : null}
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayItems.map((item) => (
                  <TableRow key={item.id}>
                    {!hideNameColumn ? <TableCell>{item.name}</TableCell> : null}
                    {extraColumns.map((col) => (
                      <TableCell key={col.header}>{col.cell(item)}</TableCell>
                    ))}
                    <TableCell>
                      <StatusBadge status={item.status} />
                    </TableCell>
                    {showActions ? (
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {extraRowActions?.(item)}
                          {writePermission ? (
                            <RequirePermission permission={writePermission}>
                              <RowActionsDropdown
                                item={item}
                                trashedView={trashedView}
                                onEdit={onEdit}
                                onSoftDelete={onSoftDelete}
                                onHardDelete={onHardDelete}
                                onRestore={onRestore}
                              />
                            </RequirePermission>
                          ) : (
                            <RowActionsDropdown
                              item={item}
                              trashedView={trashedView}
                              onEdit={onEdit}
                              onSoftDelete={onSoftDelete}
                              onHardDelete={onHardDelete}
                              onRestore={onRestore}
                            />
                          )}
                        </div>
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {showPagination ? (
              <TablePagination
                page={page}
                limit={limit}
                total={paginationTotal ?? 0}
                onPageChange={onPageChange!}
                onLimitChange={onLimitChange!}
              />
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  )

  if (embedded) return cardContent

  return (
    <PageShell title={title} description={description}>
      {headerContent}
      {cardContent}
    </PageShell>
  )
}
