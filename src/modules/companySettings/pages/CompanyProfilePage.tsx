import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { WorkforcePageShell } from '@/components/workforce/WorkforcePageShell'
import { Button, Input } from '@/ui'
import {
  fetchCompanyProfile,
  updateCompanyProfile,
  markCompanySettingComplete,
  type CompanyProfile,
} from '@/services/api/companySettingsApi'

const EMPTY: CompanyProfile = {
  id: '',
  name: '',
  legalName: '',
  tradingName: '',
  abn: '',
  timezone: 'Australia/Darwin',
  locale: 'en_AU',
}

export function CompanyProfilePage(): React.JSX.Element {
  const [form, setForm] = useState<CompanyProfile>(EMPTY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let cancelled = false
    void fetchCompanyProfile()
      .then((profile) => {
        if (!cancelled && profile) {
          setForm({
            ...EMPTY,
            ...profile,
            legalName: profile.legal_name ?? profile.legalName ?? '',
            tradingName: profile.trading_name ?? profile.tradingName ?? '',
          })
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const set =
    (key: keyof CompanyProfile) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }))
    }

  const onSave = (): void => {
    setSaving(true)
    void updateCompanyProfile({
      name: form.name,
      legal_name: form.legalName,
      trading_name: form.tradingName,
      abn: form.abn,
      timezone: form.timezone,
      locale: form.locale,
    })
      .then(async () => {
        await markCompanySettingComplete('company_profile').catch(() => undefined)
        toast.success('Company profile saved')
      })
      .catch(() => toast.error('Save failed'))
      .finally(() => setSaving(false))
  }

  return (
    <WorkforcePageShell
      title="Company Profile"
      description="Legal identity, trading details, and regional defaults."
      toolbar={
        <Button
          type="button"
          className="bg-[var(--wf-orange)] hover:bg-[var(--wf-orange-dark)]"
          disabled={saving || loading}
          onClick={onSave}
        >
          {saving ? 'Saving…' : 'Save'}
        </Button>
      }
    >
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
          {(
            [
              ['name', 'Company name'],
              ['legalName', 'Legal name'],
              ['tradingName', 'Trading name'],
              ['abn', 'ABN'],
              ['timezone', 'Timezone'],
              ['locale', 'Locale'],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="space-y-1.5 text-sm">
              <span className="font-medium text-[var(--wf-navy)]">{label}</span>
              <Input value={String(form[key] ?? '')} onChange={set(key)} />
            </label>
          ))}
        </div>
      )}
    </WorkforcePageShell>
  )
}
