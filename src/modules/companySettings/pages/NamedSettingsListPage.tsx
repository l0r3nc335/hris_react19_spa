import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  SettingsCrudShell,
} from '@/components/workforce/SettingsCrudShell'
import type { NamedSettingEntity } from '@/services/api/companySettingsApi'
import { markCompanySettingComplete } from '@/services/api/companySettingsApi'

interface WorkforceResourceApi {
  list: () => Promise<NamedSettingEntity[]>
  create: (body: Record<string, unknown>) => Promise<NamedSettingEntity>
  update: (id: string, body: Record<string, unknown>) => Promise<NamedSettingEntity>
  remove: (id: string) => Promise<void>
}

interface NamedSettingsListPageProps {
  title: string
  description: string
  api: WorkforceResourceApi
  moduleSlug?: string
  nameField?: string
  createDefaults?: Record<string, unknown>
}

export function NamedSettingsListPage({
  title,
  description,
  api,
  moduleSlug,
  nameField = 'name',
  createDefaults = {},
}: NamedSettingsListPageProps): React.JSX.Element {
  const [rows, setRows] = useState<NamedSettingEntity[]>([])
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.list()
      setRows(data)
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
    const name = window.prompt(`Name for new ${title.slice(0, -1) || 'item'}`)
    if (!name?.trim()) return
    try {
      await api.create({ [nameField]: name.trim(), ...createDefaults })
      if (moduleSlug) {
        await markCompanySettingComplete(moduleSlug).catch(() => undefined)
      }
      toast.success('Created')
      await reload()
    } catch {
      toast.error('Create failed')
    }
  }

  const onEdit = async (row: NamedSettingEntity): Promise<void> => {
    const name = window.prompt('Update name', row.name)
    if (!name?.trim()) return
    try {
      await api.update(row.id, { [nameField]: name.trim() })
      toast.success('Updated')
      await reload()
    } catch {
      toast.error('Update failed')
    }
  }

  const onDelete = async (row: NamedSettingEntity): Promise<void> => {
    if (!window.confirm(`Delete "${row.name}"?`)) return
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
      columns={[
        { key: 'name', header: 'Name', render: (r) => r.name },
        {
          key: 'status',
          header: 'Status',
          render: (r) =>
            r.status ?? (r.is_active === false ? 'inactive' : 'active'),
        },
      ]}
      onAdd={() => void onAdd()}
      onEdit={(row) => void onEdit(row)}
      onDelete={(row) => void onDelete(row)}
    />
  )
}
