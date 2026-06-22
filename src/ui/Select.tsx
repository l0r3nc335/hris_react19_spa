import {
    Select as SelectRoot,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'
  
  export interface SelectOption {
    value: string
    label: string
  }
  
  export interface SelectProps {
    value?: string
    onValueChange?: (value: string) => void
    placeholder?: string
    options: SelectOption[]
  }
  
  export function Select({
    value,
    onValueChange,
    placeholder,
    options,
  }: SelectProps): React.JSX.Element {
    return (
      <SelectRoot value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    )
  }
  