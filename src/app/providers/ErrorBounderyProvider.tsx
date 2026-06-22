import { ErrorBoundary } from '@/components/ErrorBoundery'

export function ErrorBoundaryProvider({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <ErrorBoundary>{children}</ErrorBoundary>
}
