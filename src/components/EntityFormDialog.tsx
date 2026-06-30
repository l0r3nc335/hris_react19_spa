import { useEffect, useRef, useState } from 'react'
import { Button, Input, Label, Modal, Select, Textarea } from '@/ui'
import type { SelectOption } from '@/ui/Select'

export interface EntityFormValues {
  name?: string
  firstName?: string
  lastName?: string
  status: string
  [key: string]: string | undefined
}

export type FormFieldConfig =
  | { key: string; label: string; type: 'text' | 'email'; createOnly?: boolean }
  | { key: string; label: string; type: 'select'; options: SelectOption[]; createOnly?: boolean }
  | { key: string; label: string; type: 'textarea'; createOnly?: boolean }

export interface EntityFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  title: string
  initialValues?: EntityFormValues
  onSubmit: (data: EntityFormValues) => void
  isPending?: boolean
  formFields?: FormFieldConfig[]
  statusOptions?: SelectOption[]
  /** When 'split', show first name and last name fields instead of a single name field. */
  nameFields?: 'single' | 'split'
}

const STATUS_OPTIONS: SelectOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

const EMPTY_FORM_FIELDS: FormFieldConfig[] = []

const defaultValues: EntityFormValues = {
  name: '',
  firstName: '',
  lastName: '',
  status: 'active',
}

function buildInitialState(
  initialValues: EntityFormValues | undefined,
  formFields: FormFieldConfig[],
  defaultStatus: string,
  nameFields: 'single' | 'split',
): EntityFormValues {
  const state: EntityFormValues = {
    name: initialValues?.name ?? defaultValues.name,
    firstName: initialValues?.firstName ?? defaultValues.firstName,
    lastName: initialValues?.lastName ?? defaultValues.lastName,
    status: initialValues?.status ?? defaultStatus,
  }
  for (const field of formFields) {
    state[field.key] = initialValues?.[field.key] ?? ''
  }
  if (nameFields === 'single') {
    delete state.firstName
    delete state.lastName
  } else {
    delete state.name
  }
  return state
}

function isFormValid(values: EntityFormValues, nameFields: 'single' | 'split'): boolean {
  if (nameFields === 'split') {
    return Boolean(values.firstName?.trim() && values.lastName?.trim())
  }
  return Boolean(values.name?.trim())
}

export function EntityFormDialog({
  open,
  onOpenChange,
  mode,
  title,
  initialValues,
  onSubmit,
  isPending = false,
  formFields = EMPTY_FORM_FIELDS,
  statusOptions = STATUS_OPTIONS,
  nameFields = 'single',
}: EntityFormDialogProps): React.JSX.Element {
  const defaultStatus = statusOptions[0]?.value ?? 'active'
  const [values, setValues] = useState<EntityFormValues>(() =>
    buildInitialState(initialValues, formFields, defaultStatus, nameFields),
  )

  const wasOpenRef = useRef(false)
  useEffect(() => {
    if (open && !wasOpenRef.current) {
      setValues(buildInitialState(initialValues, formFields, defaultStatus, nameFields))
    }
    wasOpenRef.current = open
  }, [open, initialValues, formFields, defaultStatus, nameFields])

  const setField = (key: string, value: string): void => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (): void => {
    if (!isFormValid(values, nameFields)) return
    const payload: EntityFormValues = {
      ...values,
      status: values.status,
    }
    if (nameFields === 'split') {
      payload.firstName = values.firstName?.trim() ?? ''
      payload.lastName = values.lastName?.trim() ?? ''
      delete payload.name
    } else {
      payload.name = values.name?.trim() ?? ''
      delete payload.firstName
      delete payload.lastName
    }
    onSubmit(payload)
    if (mode === 'create') {
      setValues(buildInitialState(undefined, formFields, defaultStatus, nameFields))
    }
    onOpenChange(false)
  }

  const visibleFields = formFields.filter((f) => mode === 'create' || !f.createOnly)

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending || !isFormValid(values, nameFields)}>
            {isPending
              ? mode === 'create'
                ? 'Creating...'
                : 'Saving...'
              : mode === 'create'
                ? 'Create'
                : 'Save'}
          </Button>
        </>
      }
    >
      <div className="grid gap-4">
        {nameFields === 'split' ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="entity-first-name">First name</Label>
              <Input
                id="entity-first-name"
                value={values.firstName ?? ''}
                onChange={(e) => setField('firstName', e.target.value)}
                placeholder="First name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="entity-last-name">Last name</Label>
              <Input
                id="entity-last-name"
                value={values.lastName ?? ''}
                onChange={(e) => setField('lastName', e.target.value)}
                placeholder="Last name"
              />
            </div>
          </div>
        ) : (
          <div className="grid gap-2">
            <Label htmlFor="entity-name">Name</Label>
            <Input
              id="entity-name"
              value={values.name ?? ''}
              onChange={(e) => setField('name', e.target.value)}
              placeholder="Enter name"
            />
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="entity-status">Status</Label>
          <Select
            id="entity-status"
            value={values.status ?? 'active'}
            onValueChange={(v) => setField('status', v)}
            placeholder="Select status"
            options={statusOptions}
          />
        </div>
        {visibleFields.map((field) => (
          <div key={field.key} className="grid gap-2">
            <Label htmlFor={`entity-${field.key}`}>{field.label}</Label>
            {field.type === 'textarea' ? (
              <Textarea
                id={`entity-${field.key}`}
                value={values[field.key] ?? ''}
                onChange={(e) => setField(field.key, e.target.value)}
                placeholder={field.label}
                rows={3}
              />
            ) : field.type === 'select' ? (
              <Select
                value={values[field.key] ?? ''}
                onValueChange={(v) => setField(field.key, v)}
                placeholder={`Select ${field.label.toLowerCase()}`}
                options={field.options}
              />
            ) : (
              <Input
                id={`entity-${field.key}`}
                type={field.type}
                value={values[field.key] ?? ''}
                onChange={(e) => setField(field.key, e.target.value)}
                placeholder={field.label}
              />
            )}
          </div>
        ))}
      </div>
    </Modal>
  )
}
