import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setTheme, type ThemeMode } from '@/slices/uiSlice'

export type ResolvedTheme = 'light' | 'dark'

export function resolveTheme(theme: ThemeMode): ResolvedTheme {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return theme
}

export function useTheme(): {
  theme: ThemeMode
  resolvedTheme: ResolvedTheme
  setThemeMode: (mode: ThemeMode) => void
  toggleTheme: () => void
} {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((s) => s.ui.theme)
  const resolvedTheme = resolveTheme(theme)

  const setThemeMode = (mode: ThemeMode): void => {
    dispatch(setTheme(mode))
  }

  const toggleTheme = (): void => {
    setThemeMode(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return { theme, resolvedTheme, setThemeMode, toggleTheme }
}

export function useThemeSync(): void {
  const theme = useAppSelector((s) => s.ui.theme)
  const resolvedTheme = resolveTheme(theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark')
  }, [resolvedTheme])

  useEffect(() => {
    if (theme !== 'system') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (): void => {
      document.documentElement.classList.toggle('dark', media.matches)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [theme])
}
