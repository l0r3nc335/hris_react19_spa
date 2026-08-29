import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { SettingsCrudShell } from '@/components/workforce/SettingsCrudShell'

interface NamedRow {
  id: string
  name?: string
  title?: string
  status?: string
  [key: string]: unknown
}

interface ResourceApi {
  list: () => Promise<NamedRow[]>
  create: (body: Record<string, unknown>) => Promise<NamedRow>
  update: (id: string, body: Record<string, unknown>) => Promise<NamedRow>
  remove: (id: string) => Promise<void>
}

export function WorkforceResourcePage({
  title,
  description,
  api,
  createFields,
  nameKey = 'name',
  columns,
}: {
  title: string
  description: string
  api: ResourceApi
  createFields: Array<{ key: string; label: string; required?: boolean }>
  nameKey?: string
  columns?: Array<{ key: string; header: string; render: (row: NamedRow) => React.ReactNode }>
}): React.JSX.Element {
  const [rows, setRows] = useState<NamedRow[]>([])
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    setLoading(true)
    try {
      setRows(await api.list())
    } catch {
      setRows([])
      toast.error(`Failed to load ${title}`)
    } finally {
      setLoading(false)
    }
  }, [api, title])

  useEffect(() => {
    void reload()
  }, [reload])

  const onAdd = async (): Promise<void> => {
    const body: Record<string, unknown> = {}
    for (const field of createFields) {
      const value = window.prompt(field.label)
      if (field.required && !value?.trim()) return
      if (value != null && value !== '') body[field.key] = value.trim()
    }
    try {
      await api.create(body)
      toast.success('Created')
      await reload()
    } catch {
      toast.error('Create failed')
    }
  }

  const onDelete = async (row: NamedRow): Promise<void> => {
    const label = String(row[nameKey] ?? row.title ?? row.id)
    if (!window.confirm(`Delete "${label}"?`)) return
    try {
      await api.remove(row.id)
      toast.success('Deleted')
      await reload()
    } catch {
      toast.error('Delete failed')
    }
  }

  return (
    <SettingsCrudShell
      title={title}
      description={description}
      loading={loading}
      rows={rows}
      columns={
        columns ?? [
          {
            key: 'name',
            header: 'Name',
            render: (r) => String(r[nameKey] ?? r.title ?? r.id),
          },
          {
            key: 'status',
            header: 'Status',
            render: (r) => String(r.status ?? '—'),
          },
        ]
      }
      onAdd={() => void onAdd()}
      onDelete={(row) => void onDelete(row)}
    />
  )
}
