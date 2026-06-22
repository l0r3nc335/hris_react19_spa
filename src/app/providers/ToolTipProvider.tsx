import { TooltipProvider as UiTooltipProvider } from '@/ui'

export function ToolTipProvider({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <UiTooltipProvider>{children}</UiTooltipProvider>
}
