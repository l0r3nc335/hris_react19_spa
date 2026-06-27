import { Button, Select } from '@/ui'

export interface TablePaginationProps {
  page: number
  limit: number
  total: number
  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
}

const LIMIT_OPTIONS = [
  { value: '10', label: '10 / page' },
  { value: '20', label: '20 / page' },
  { value: '50', label: '50 / page' },
]

export function TablePagination({
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
}: TablePaginationProps): React.JSX.Element | null {
  if (total === 0) return null

  const totalPages = Math.max(1, Math.ceil(total / limit))
  const start = (page - 1) * limit + 1
  const end = Math.min(page * limit, total)

  return (
    <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {start}–{end} of {total}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <div className="w-32">
          <Select
            value={String(limit)}
            onValueChange={(value) => onLimitChange(Number(value))}
            options={LIMIT_OPTIONS}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
