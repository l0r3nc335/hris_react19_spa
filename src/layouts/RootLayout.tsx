import { Outlet } from 'react-router-dom'
import { NavigationProgress } from '@/components/NavigationProgress'

export function RootLayout(): React.JSX.Element {
  return (
    <>
      <NavigationProgress />
      <Outlet />
    </>
  )
}
