import { Outlet } from 'react-router-dom'

export function RootLayout(): React.JSX.Element {
  return (
    <>
      <Outlet />
    </>
  )
}
