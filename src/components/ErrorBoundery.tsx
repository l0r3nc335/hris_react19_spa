import { Component, type ErrorInfo, type ReactNode } from 'react'
import { logError } from '@/services/logger'
import { Button } from '@/ui'

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    logError(error, { componentStack: info.componentStack ?? '' })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 p-8">
            <h2 className="text-xl font-semibold">Something went wrong</h2>
            <p className="text-sm text-muted-foreground">Please refresh or try again later.</p>
            <Button onClick={() => window.location.reload()}>Reload</Button>
          </div>
        )
      )
    }
    return this.props.children
  }
}
