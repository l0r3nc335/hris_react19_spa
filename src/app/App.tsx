import TestAllComponents from '@/components/TestComponents/TestAllComponents'

import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes/index'

//import { cn } from './lib/utils'
//import {Button} from '@/components/ui/button'

export default function App(): React.JSX.Element
{

  return (
    <>
      {true && <TestAllComponents />} 
      <RouterProvider router={router} />
    </>
  )
}
