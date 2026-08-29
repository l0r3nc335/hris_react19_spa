import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { WorkforcePageShell } from '@/components/workforce/WorkforcePageShell'
import { Button } from '@/ui'
import { employeesApi } from '@/services/api/companySettingsApi'
import { workforceGetData, workforcePostData, workforcePutData } from '@/services/api/workforceApi'
import { cn } from '@/lib/utils'

const TABS = [
  'Employee Info',
  'Certifications',
  'Pay',
  'Leave',
  'Contract',
  'Professional Development',
  'Notes',
  'Activity Log',
] as const

type Tab = (typeof TABS)[number]

interface EmployeeDetail {
  id: string
  employee_no?: string
  status?: string
  pronouns?: string | null
  work_phone?: string | null
  work_email?: string | null
  start_date?: string | null
  person?: {
    first_name?: string
    last_name?: string
    gender?: string | null
    dob?: string | null
    personal_email?: string | null
    cellphone_number?: string | null
  }
  position?: { title?: string }
  location?: { name?: string }
  division?: { name?: string }
  manager?: { person?: { first_name?: string; last_name?: string } }
  emergencyContacts?: Array<{
    id: number
    full_name: string
    relationship?: string
    phone?: string
    email?: string
    address?: string
  }>
  medicalProfile?: {
    allergies?: string | null
    medications?: string | null
    conditions?: string | null
  } | null
}

export function EmployeeProfilePage(): React.JSX.Element {
  const { id = '' } = useParams()
  const [tab, setTab] = useState<Tab>('Employee Info')
  const [employee, setEmployee] = useState<EmployeeDetail | null>(null)
  const [notes, setNotes] = useState<Array<{ id: string; title?: string; body: string }>>([])
  const [activity, setActivity] = useState<Array<{ id: string; action: string; created_at?: string }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    void (async () => {
      setLoading(true)
      try {
        const data = await employeesApi.get(id)
        if (!cancelled) setEmployee(data as unknown as EmployeeDetail)
        const [n, a] = await Promise.all([
          workforceGetData<Array<{ id: number; title?: string; body: string }>>(`/employees/${id}/notes`),
          workforceGetData<Array<{ id: number; action: string; created_at?: string }>>(
            `/employees/${id}/activity-logs`,
          ),
        ])
        if (!cancelled) {
          setNotes(n.map((x) => ({ ...x, id: String(x.id) })))
          setActivity(a.map((x) => ({ ...x, id: String(x.id) })))
        }
      } catch {
        toast.error('Failed to load employee')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id])

  const name = employee
    ? `${employee.person?.first_name ?? ''} ${employee.person?.last_name ?? ''}`.trim()
    : 'Employee'

  const addNote = async (): Promise<void> => {
    const body = window.prompt('Note')
    if (!body?.trim()) return
    try {
      await workforcePostData(`/employees/${id}/notes`, { body: body.trim() })
      toast.success('Note added')
      const n = await workforceGetData<Array<{ id: number; title?: string; body: string }>>(
        `/employees/${id}/notes`,
      )
      setNotes(n.map((x) => ({ ...x, id: String(x.id) })))
    } catch {
      toast.error('Failed to add note')
    }
  }

  const saveMedical = async (): Promise<void> => {
    const allergies = window.prompt('Allergies', employee?.medicalProfile?.allergies ?? '') ?? ''
    const medications = window.prompt('Medications', employee?.medicalProfile?.medications ?? '') ?? ''
    const conditions = window.prompt('Conditions', employee?.medicalProfile?.conditions ?? '') ?? ''
    try {
      await workforcePutData(`/employees/${id}/medical-profile`, { allergies, medications, conditions })
      toast.success('Medical profile updated')
      const data = await employeesApi.get(id)
      setEmployee(data as unknown as EmployeeDetail)
    } catch {
      toast.error('Update failed')
    }
  }

  return (
    <WorkforcePageShell
      title={name || 'Employee'}
      description={employee ? `Employee #${employee.employee_no ?? employee.id}` : undefined}
      contentClassName="space-y-4"
    >
      {loading || !employee ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border border-border bg-gradient-to-r from-rose-100 via-violet-100 to-indigo-100 p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[var(--wf-navy)]">
                  {name}{' '}
                  {employee.pronouns ? (
                    <span className="text-base font-normal text-muted-foreground">
                      {employee.pronouns}
                    </span>
                  ) : null}
                </h2>
                <p className="mt-2 text-sm text-[var(--wf-navy)]/80">
                  {[employee.position?.title, employee.location?.name, employee.division?.name]
                    .filter(Boolean)
                    .join(' · ') || 'No role details yet'}
                </p>
              </div>
              <span className="rounded-md bg-emerald-600 px-3 py-1 text-sm font-medium text-white">
                {employee.status ?? 'active'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 border-b border-border">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  'px-3 py-2 text-sm font-medium',
                  tab === t
                    ? 'border-b-2 border-[var(--wf-navy)] text-[var(--wf-navy)]'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === 'Employee Info' ? (
            <div className="grid gap-4 lg:grid-cols-3">
              <InfoCard title="Employee">
                <Field label="Full name" value={name} />
                <Field label="Job title" value={employee.position?.title} />
                <Field
                  label="Line manager"
                  value={
                    employee.manager?.person
                      ? `${employee.manager.person.first_name ?? ''} ${employee.manager.person.last_name ?? ''}`.trim()
                      : undefined
                  }
                />
                <Field label="Division" value={employee.division?.name} />
                <Field label="Work phone" value={employee.work_phone} />
                <Field label="Work email" value={employee.work_email} />
                <Field label="Location" value={employee.location?.name} />
              </InfoCard>
              <InfoCard title="Personal details">
                <Field label="Gender" value={employee.person?.gender} />
                <Field label="Pronouns" value={employee.pronouns} />
                <Field label="DOB" value={employee.person?.dob} />
                <Field label="Personal phone" value={employee.person?.cellphone_number} />
                <Field label="Personal email" value={employee.person?.personal_email} />
              </InfoCard>
              <div className="space-y-4">
                <InfoCard title="Emergency contact">
                  {employee.emergencyContacts?.[0] ? (
                    <>
                      <Field label="Full name" value={employee.emergencyContacts[0].full_name} />
                      <Field label="Relationship" value={employee.emergencyContacts[0].relationship} />
                      <Field label="Phone" value={employee.emergencyContacts[0].phone} />
                      <Field label="Email" value={employee.emergencyContacts[0].email} />
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">No emergency contact</p>
                  )}
                </InfoCard>
                <InfoCard
                  title="Medical"
                  action={
                    <Button type="button" size="sm" variant="outline" onClick={() => void saveMedical()}>
                      Edit
                    </Button>
                  }
                >
                  <Field label="Allergies" value={employee.medicalProfile?.allergies} />
                  <Field label="Medications" value={employee.medicalProfile?.medications} />
                  <Field label="Conditions" value={employee.medicalProfile?.conditions} />
                </InfoCard>
              </div>
            </div>
          ) : null}

          {tab === 'Notes' ? (
            <div className="space-y-3">
              <Button type="button" onClick={() => void addNote()}>
                Add note
              </Button>
              {notes.map((n) => (
                <div key={n.id} className="rounded-lg border border-border p-3">
                  <p className="text-sm">{n.body}</p>
                </div>
              ))}
            </div>
          ) : null}

          {tab === 'Activity Log' ? (
            <div className="space-y-2">
              {activity.length === 0 ? (
                <p className="text-sm text-muted-foreground">No activity yet.</p>
              ) : (
                activity.map((a) => (
                  <div key={a.id} className="rounded-lg border border-border px-3 py-2 text-sm">
                    {a.action}
                  </div>
                ))
              )}
            </div>
          ) : null}

          {tab !== 'Employee Info' && tab !== 'Notes' && tab !== 'Activity Log' ? (
            <p className="text-sm text-muted-foreground">
              {tab} records for this employee appear here from related workforce modules.
            </p>
          ) : null}
        </>
      )}
    </WorkforcePageShell>
  )
}

function InfoCard({
  title,
  children,
  action,
}: {
  title: string
  children: React.ReactNode
  action?: React.ReactNode
}): React.JSX.Element {
  return (
    <div className="rounded-xl border border-border bg-[var(--wf-content-bg)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-[var(--wf-navy)]">{title}</h3>
        {action}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function Field({ label, value }: { label: string; value?: string | null }): React.JSX.Element {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-[var(--wf-navy)]">{value || '—'}</p>
    </div>
  )
}
