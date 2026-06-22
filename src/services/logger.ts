import * as Sentry from '@sentry/react'

export function logError(error: unknown, context?: Record<string, string>): void {
  console.error('[HRIS]', error, context)
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.captureException(error, { extra: context })
  }
}

export function trackApiFailure(endpoint: string, status: number): void {
  console.warn(`[HRIS API] ${endpoint} failed with ${status}`)
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.captureMessage(`API failure: ${endpoint}`, { level: 'warning', extra: { status } })
  }
}
