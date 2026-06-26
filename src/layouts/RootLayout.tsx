import { Outlet } from 'react-router-dom'
import { RouteTracker } from '@/components/RouteTracker'

export function RootLayout(): React.JSX.Element {
  return (
    <>
      <RouteTracker />
      <Outlet />
    </>
  )
}
