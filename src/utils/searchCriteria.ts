import type { SearchFieldConfig } from '@/types/searchFields'

export type SearchFormValues = Record<string, string>

const EMPTY_VALUES = ['', 'any']

function isEmptyValue(value: string | undefined): boolean {
  if (value === undefined) return true
  return EMPTY_VALUES.includes(value.trim().toLowerCase())
}

function triStateToBoolean(value: string | undefined): boolean | undefined {
  if (isEmptyValue(value) || value === 'any') return undefined
  if (value === 'yes' || value === 'true') return true
  if (value === 'no' || value === 'false') return false
  return undefined
}

export function buildSearchPayload(
  values: SearchFormValues,
  fields: SearchFieldConfig[],
): Record<string, string | number | boolean> {
  const payload: Record<string, string | number | boolean> = {}

  for (const field of fields) {
    if (field.type === 'text') {
      const value = values[field.key]?.trim()
      if (value) payload[field.key] = value
      continue
    }

    if (field.type === 'tri-state') {
      const boolValue = triStateToBoolean(values[field.key])
      if (boolValue !== undefined) payload[field.key] = boolValue
      continue
    }

    if (field.type === 'select') {
      const value = values[field.key]?.trim()
      if (value && value !== 'any') payload[field.key] = value
      continue
    }

    if (field.type === 'date-range') {
      const from = values[field.fromKey]?.trim()
      const to = values[field.toKey]?.trim()
      if (from) payload[field.fromKey] = from
      if (to) payload[field.toKey] = to
    }
  }

  return payload
}

export function createEmptySearchValues(fields: SearchFieldConfig[]): SearchFormValues {
  const values: SearchFormValues = {}
  for (const field of fields) {
    if (field.type === 'date-range') {
      values[field.fromKey] = ''
      values[field.toKey] = ''
    } else if (field.type === 'tri-state' || field.type === 'select') {
      values[field.key] = 'any'
    } else {
      values[field.key] = ''
    }
  }
  return values
}
