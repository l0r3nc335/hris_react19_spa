import { Suspense } from 'react'
import { PublicNavbar } from '@/components/layout/PublicNavbar'
import { PageLoader } from '@/components/PageLoader'
import { NotFoundPage } from '@/routes/lazyRoutes'

export function PublicNotFoundShell(): React.JSX.Element {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <PublicNavbar />
      <main className="flex min-h-0 flex-1 overflow-hidden">
        <Suspense fallback={<PageLoader />}>
          <NotFoundPage />
        </Suspense>
      </main>
    </div>
  )
}
