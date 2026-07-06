import type { SelectOption } from '@/ui/Select'

export const BILLING_INTERVAL_OPTIONS: SelectOption[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'one_time', label: 'One time' },
]

export const BILLING_INTERVAL_LABELS: Record<string, string> = {
  monthly: 'Monthly',
  yearly: 'Yearly',
  one_time: 'One time',
}

export function formatBillingInterval(value?: string): string {
  if (!value) return '—'
  return BILLING_INTERVAL_LABELS[value] ?? value
}

export function formatPrice(price?: string, currency?: string): string {
  if (!price) return '—'
  const amount = Number(price)
  if (Number.isNaN(amount)) return price
  const code = currency?.trim() || 'USD'
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: code }).format(amount)
  } catch {
    return `${code} ${amount.toFixed(2)}`
  }
}