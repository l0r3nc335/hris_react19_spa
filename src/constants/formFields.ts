import type { FormFieldConfig } from '@/components/EntityFormDialog'
import type { SelectOption } from '@/ui/Select'

export const EMAIL_FIELD: FormFieldConfig = {
  key: 'email',
  label: 'Email',
  type: 'email',
  createOnly: true,
}

export const NOTES_FIELD: FormFieldConfig = {
  key: 'notes',
  label: 'Notes',
  type: 'textarea',
}

export const departmentSelectField = (options: SelectOption[]): FormFieldConfig => ({
  key: 'departmentId',
  label: 'Department',
  type: 'select',
  options,
})
