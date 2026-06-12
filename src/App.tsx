import './App.css'
import { cn } from './lib/utils'

function App() {


  return (
    <>
      <div className={cn('bg-red-100', true && 'p-4', 'p-2')}>
        <h1>This is tailwindcss in action</h1>
      </div>
    </>
  )
}

export default App
