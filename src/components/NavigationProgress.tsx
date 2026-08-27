import { useEffect, useRef } from 'react'
import { useLocation, useNavigation } from 'react-router-dom'
import { progressDone, progressForceDone, progressStart } from '@/lib/progress'

function isSameAppNavigation(anchor: HTMLAnchorElement): boolean {
  if (anchor.target && anchor.target !== '_self') return false
  if (anchor.hasAttribute('download')) return false

  const href = anchor.getAttribute('href')
  if (!href || href.startsWith('#')) return false
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return false

  let url: URL
  try {
    url = new URL(anchor.href, window.location.href)
  } catch {
    return false
  }

  if (url.origin !== window.location.origin) return false

  // Hash-only changes are not route navigations.
  if (
    url.pathname === window.location.pathname &&
    url.search === window.location.search
  ) {
    return false
  }

  return true
}

/**
 * Top-of-page progress bar for React Router navigations (Inertia-style).
 * - Link clicks / router loading state start it
 * - {@link PageLoader} keeps it alive during lazy Suspense loads
 */
export function NavigationProgress(): null {
  const navigation = useNavigation()
  const location = useLocation()
  const locationKeyRef = useRef(location.key)
  const clickPendingRef = useRef(false)

  useEffect(() => {
    if (navigation.state === 'loading' || navigation.state === 'submitting') {
      progressStart()
      return () => {
        progressDone()
      }
    }
    return undefined
  }, [navigation.state])

  useEffect(() => {
    const onClick = (event: MouseEvent): void => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest('a')
      if (!(anchor instanceof HTMLAnchorElement)) return
      if (!isSameAppNavigation(anchor)) return

      clickPendingRef.current = true
      progressStart()
    }

    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
    }
  }, [])

  useEffect(() => {
    if (locationKeyRef.current === location.key) return
    locationKeyRef.current = location.key

    if (!clickPendingRef.current) return
    clickPendingRef.current = false

    // Defer so Suspense PageLoader can take a ref-count before we release the click cycle.
    const t = window.setTimeout(() => {
      progressDone()
    }, 0)
    return () => {
      window.clearTimeout(t)
    }
  }, [location.key])

  useEffect(() => {
    return () => {
      progressForceDone()
    }
  }, [])

  return null
}
