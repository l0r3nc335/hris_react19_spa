import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'
import { setupProgress } from '@/lib/progress'

setupProgress({
  color: '#E92100', // any CSS color
  // delay: 250,
  // showSpinner: false,
})

export function App(): React.JSX.Element {
  return (
    <RouterProvider router={router} />
  )
}