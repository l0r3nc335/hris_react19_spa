import { useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { progressDone, progressStart } from '@/lib/progress'

/**
 * Route Suspense fallback. Also starts the top navigation progress bar
 * (same role as Inertia's visit progress during page loads).
 */
export function PageLoader(): React.JSX.Element {
  useEffect(() => {
    progressStart()
    return () => {
      progressDone()
    }
  }, [])

  return (
    <div className="flex min-h-[200px] flex-col gap-3 p-4">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-1/2" />
      <div className="mt-4 space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}
