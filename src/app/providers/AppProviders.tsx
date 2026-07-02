import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'

import type { AppStore } from '@/store'

import { ComposedProviders } from './ComposedProviders'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ErrorBoundaryProvider } from './ErrorBounderyProvider'
import { QueryProvider } from './QueryProvider'
import { ToolTipProvider } from './ToolTipProvider'

import { AuthGate } from '@/modules/auth/AuthGate'

const CoreProviders = ComposedProviders(
  QueryProvider,
  ThemeProvider,
  ToolTipProvider,
  ErrorBoundaryProvider,
)

export interface AppProvidersProps {
  store: AppStore
  children: ReactNode
}

export function AppProviders({ store, children }: AppProvidersProps): React.JSX.Element {
  return (
    <Provider store={store}>
      <CoreProviders>
        <AuthGate>{children}</AuthGate>
        <Toaster richColors position="top-right" closeButton/>
      </CoreProviders>
    </Provider>
  )
}