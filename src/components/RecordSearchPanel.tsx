import { ChevronDown } from 'lucide-react'
import { Button, Input, Label, Select } from '@/ui'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import type { SearchFieldConfig } from '@/types/searchFields'
import type { SearchFormValues } from '@/utils/searchCriteria'

const TRI_STATE_OPTIONS = [
  { value: 'any', label: 'Any' },
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

export interface RecordSearchPanelProps {
  fields: SearchFieldConfig[]
  values: SearchFormValues
  onChange: (key: string, value: string) => void
  onSearch: () => void
  onClear: () => void
  isSearching?: boolean
}

function SearchField({
  field,
  values,
  onChange,
}: {
  field: SearchFieldConfig
  values: SearchFormValues
  onChange: (key: string, value: string) => void
}): React.JSX.Element {
  if (field.type === 'date-range') {
    return (
      <div className="space-y-2 sm:col-span-2">
        <Label>{field.label}</Label>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor={field.fromKey} className="text-xs text-muted-foreground">
              From
            </Label>
            <Input
              id={field.fromKey}
              type="date"
              value={values[field.fromKey] ?? ''}
              onChange={(e) => onChange(field.fromKey, e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={field.toKey} className="text-xs text-muted-foreground">
              To
            </Label>
            <Input
              id={field.toKey}
              type="date"
              value={values[field.toKey] ?? ''}
              onChange={(e) => onChange(field.toKey, e.target.value)}
            />
          </div>
        </div>
      </div>
    )
  }

  const inputId = field.key

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId}>{field.label}</Label>
      {field.type === 'text' ? (
        <Input
          id={inputId}
          value={values[field.key] ?? ''}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      ) : field.type === 'tri-state' ? (
        <Select
          value={values[field.key] ?? 'any'}
          onValueChange={(value) => onChange(field.key, value)}
          options={TRI_STATE_OPTIONS}
        />
      ) : (
        <Select
          value={values[field.key] ?? 'any'}
          onValueChange={(value) => onChange(field.key, value)}
          options={field.options}
        />
      )}
    </div>
  )
}

export function RecordSearchPanel({
  fields,
  values,
  onChange,
  onSearch,
  onClear,
  isSearching = false,
}: RecordSearchPanelProps): React.JSX.Element {
  return (
    <Collapsible defaultOpen={false}>
      
      <Card className="pt-0 pb-0">
        <CardHeader className="py-3 mb-0 border-b-1 border-gray-700">
          <CollapsibleTrigger className="flex w-full items-center justify-between text-left font-medium text-base">
            Search records
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 [[data-state=open]_&]:rotate-180" />
          </CollapsibleTrigger>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="space-y-4 pt-0 pb-5">
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault()
                onSearch()
              }}
            >
            <div className="grid gap-4 sm:grid-cols-6">
              {fields.map((field) => (
                <SearchField
                  key={field.type === 'date-range' ? field.key : field.key}
                  field={field}
                  values={values}
                  onChange={onChange}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={isSearching}>
                {isSearching ? 'Searching…' : 'Search'}
              </Button>
              <Button type="button" variant="outline" onClick={onClear} disabled={isSearching}>
                Clear
              </Button>
            </div>
            </form>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
