import { useThemeSync } from '@/hooks/useTheme'

/** Applies theme class to `document.documentElement` for the whole app. */
export function ThemeProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  useThemeSync()
  return <>{children}</>
}
