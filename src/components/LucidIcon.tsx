import { CircleHelp, icons, type LucideProps } from 'lucide-react'

export interface LucidIconProps extends LucideProps {
  icon?: string | null
}

export function LucidIcon({ icon, ...props }: LucidIconProps): React.JSX.Element | null {
  if (!icon) return null

  const Icon = icons[icon as keyof typeof icons]
  if (!Icon) {
    return <CircleHelp aria-label={`Unknown icon: ${icon}`} {...props} />
  }

  return <Icon {...props} />
}
