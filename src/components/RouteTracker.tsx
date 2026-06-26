import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch } from '@/hooks'
import { isKnownRoute } from '@/constants/routes'
import { setLastKnownRoute } from '@/slices/uiSlice'
import { writeLastKnownRoute } from '@/utils/lastKnownRoute'

export function RouteTracker(): null {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const previousPathnameRef = useRef(pathname)

  if (isKnownRoute(pathname)) {
    writeLastKnownRoute(pathname)
  }

  useLayoutEffect(() => {
    if (isKnownRoute(pathname)) {
      dispatch(setLastKnownRoute(pathname))
      previousPathnameRef.current = pathname
      return
    }

    if (isKnownRoute(previousPathnameRef.current)) {
      writeLastKnownRoute(previousPathnameRef.current)
      dispatch(setLastKnownRoute(previousPathnameRef.current))
    }
  }, [pathname, dispatch])

  return null
}
