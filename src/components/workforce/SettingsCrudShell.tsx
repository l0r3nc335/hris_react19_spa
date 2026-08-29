import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { WorkforcePageShell } from '@/components/workforce/WorkforcePageShell'
import { Button } from '@/ui'
import { EmptyState } from '@/components/EmptyState'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export interface CrudListColumn<T> {
  key: string
  header: string
  render: (row: T) => React.ReactNode
}

export interface SettingsCrudShellProps<T extends { id: string }> {
  title: string
  description?: string
  columns: CrudListColumn<T>[]
  rows: T[]
  loading?: boolean
  onAdd?: () => void
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  emptyTitle?: string
  emptyDescription?: string
}

/** Simple list CRUD UI shell for Company Settings sub-pages. */
export function SettingsCrudShell<T extends { id: string }>({
  title,
  description,
  columns,
  rows,
  loading = false,
  onAdd,
  onEdit,
  onDelete,
  emptyTitle = 'No records yet',
  emptyDescription = 'Add your first record to get started.',
}: SettingsCrudShellProps<T>): React.JSX.Element {
  return (
    <WorkforcePageShell
      title={title}
      description={description}
      toolbar={
        onAdd ? (
          <Button
            type="button"
            className="bg-[var(--wf-orange)] hover:bg-[var(--wf-orange-dark)]"
            onClick={onAdd}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        ) : undefined
      }
    >
      {loading ? (
        <p className="py-8 text-center text-sm text-muted-foreground">Loading…</p>
      ) : rows.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.header}</TableHead>
              ))}
              {(onEdit || onDelete) && <TableHead className="w-24 text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <TableCell key={col.key}>{col.render(row)}</TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell className="text-right">
                    <div className="inline-flex gap-1">
                      {onEdit ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(row)}
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      ) : null}
                      {onDelete ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(row)}
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      ) : null}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </WorkforcePageShell>
  )
}

/** Hook helper for stub CRUD pages until APIs are wired. */
export function useStubCrudRows<T extends { id: string }>(
  initial: T[] = [],
): {
  rows: T[]
  setRows: React.Dispatch<React.SetStateAction<T[]>>
  addStub: (row: T) => void
  removeStub: (id: string) => void
} {
  const [rows, setRows] = useState<T[]>(initial)
  return {
    rows,
    setRows,
    addStub: (row) => setRows((prev) => [...prev, row]),
    removeStub: (id) => setRows((prev) => prev.filter((r) => r.id !== id)),
  }
}
