import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, UserCheck, UserPlus, UserX } from 'lucide-react'
import { toast } from 'sonner'
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
import { employeeProfilePath } from '@/constants/routes'
import { employeesApi } from '@/services/api/companySettingsApi'
import { workforceGetData } from '@/services/api/workforceApi'

interface EmployeeRow {
  id: string
  employee_no?: string
  status?: string
  work_email?: string | null
  employment_basis?: string | null
  access_role?: string | null
  person?: { first_name?: string; last_name?: string }
  position?: { title?: string }
  location?: { name?: string }
  division?: { name?: string }
}

interface EmployeeStats {
  total: number
  active: number
  terminated: number
  byStatus?: Record<string, number>
}

export function EmployeesListPage(): React.JSX.Element {
  const [rows, setRows] = useState<EmployeeRow[]>([])
  const [stats, setStats] = useState<EmployeeStats | null>(null)
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    setLoading(true)
    try {
      const [list, s] = await Promise.all([
        employeesApi.list() as Promise<EmployeeRow[]>,
        workforceGetData<EmployeeStats>('/employees/stats'),
      ])
      setRows(list)
      setStats(s)
    } catch {
      toast.error('Failed to load employees')
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  const onAdd = async (): Promise<void> => {
    const first = window.prompt('First name')
    if (!first?.trim()) return
    const last = window.prompt('Last name') ?? ''
    try {
      await employeesApi.create({
        first_name: first.trim(),
        last_name: last.trim(),
        status: 'active',
      })
      toast.success('Employee created')
      await reload()
    } catch {
      toast.error('Create failed')
    }
  }

  const onLeave = stats?.byStatus?.['on-leave'] ?? 0
  const cards = [
    { label: 'Active Total Employees', value: stats?.active ?? '—', icon: UserCheck },
    { label: 'Total Employees', value: stats?.total ?? '—', icon: Users },
    { label: 'Terminated', value: stats?.terminated ?? '—', icon: UserX },
    { label: 'On Leave', value: onLeave, icon: UserPlus },
  ] as const

  return (
    <WorkforcePageShell
      title="Employees"
      description="Manage your workforce directory."
      contentClassName="space-y-6"
      toolbar={
        <Button
          type="button"
          className="bg-[var(--wf-orange)] hover:bg-[var(--wf-orange-dark)]"
          onClick={() => void onAdd()}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add new user
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="flex items-center gap-3 rounded-xl border border-border bg-[var(--wf-content-bg)] p-4"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--wf-navy)] text-white">
              <card.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{card.label}</p>
              <p className="text-xl font-semibold text-[var(--wf-navy)]">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {loading ? (
        <p className="py-8 text-center text-sm text-muted-foreground">Loading…</p>
      ) : rows.length === 0 ? (
        <EmptyState
          title="No employees yet"
          description="Add your first employee to build the directory."
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>First name</TableHead>
              <TableHead>Last name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Division</TableHead>
              <TableHead>Job title</TableHead>
              <TableHead>Employment</TableHead>
              <TableHead>Access</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const first = row.person?.first_name ?? '—'
              const last = row.person?.last_name ?? '—'
              return (
                <TableRow key={row.id}>
                  <TableCell>
                    <Link
                      to={employeeProfilePath(row.id)}
                      className="font-medium text-[var(--wf-orange)] hover:underline"
                    >
                      #{row.employee_no ?? row.id}
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium">{first}</TableCell>
                  <TableCell className="font-medium">{last}</TableCell>
                  <TableCell>{row.location?.name ?? '—'}</TableCell>
                  <TableCell>{row.division?.name ?? '—'}</TableCell>
                  <TableCell>{row.position?.title ?? '—'}</TableCell>
                  <TableCell>{row.employment_basis ?? '—'}</TableCell>
                  <TableCell>{row.access_role ?? 'User'}</TableCell>
                  <TableCell>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">
                      {row.status ?? 'active'}
                    </span>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </WorkforcePageShell>
  )
}
