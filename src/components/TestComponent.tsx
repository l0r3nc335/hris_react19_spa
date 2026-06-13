import { cn } from '@/lib/utils'
import {Button} from '@/components/ui/button'

export default function TestComponent() {

  return (
    <>
      <div className={cn('bg-red-100', true && 'p-4', 'p-2')}>
        <h1>This is tailwindcss in action</h1>
      </div>

      <div className="flex gap-2 p-4">
        <Button>Default</Button>
        <Button variant="outline" size="sm">Outline SM</Button>
        <Button variant="destructive" size="lg">Destructive LG</Button>
        <Button className="w-full">Full width override</Button>
      </div>
    </>
  )
}

