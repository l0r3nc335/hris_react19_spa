import { useAppDispatch, useAppSelector, toggleSidebar } from '@/store/store'
import { Button } from '@/components/ui/button'

export default function TestRedux() {
    const isSidebarOpen = useAppSelector((state) => state.ui.sidebarOpen)
    const dispatch = useAppDispatch()

    return(
        <div className="p-4 border flex flex-col gap-2 max-w-xs">
            <h1 className='text-2xl'>Redux Test</h1>
            <p>Sidebar Status: {isSidebarOpen ? "OPEN" : "CLOSED"}</p>
            <Button
                variant="default"
                onClick={() => dispatch( toggleSidebar() )}            
            >
                Toggle Local UI State
            </Button>
        </div>
    )
}