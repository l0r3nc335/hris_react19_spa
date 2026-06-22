import * as Sentry from '@sentry/react'

const sentryDsn = import.meta.env.VITE_SENTRY_DSN as string | undefined
const appEnv = import.meta.env.VITE_APP_ENV as string | undefined

if (typeof sentryDsn === 'string' && sentryDsn.length > 0) {
  Sentry.init({
    dsn: sentryDsn,
    environment: appEnv ?? 'development',
  })
}
