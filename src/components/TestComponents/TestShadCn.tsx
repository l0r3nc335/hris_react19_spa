import { Button } from '@/components/ui/button'

export default function TestShadCn() {
    return (
        <div className="p-6 flex flex-col gap-4 items-start border rounded-xl max-w-sm m-4">
            <h3 className="font-semibold text-lg">shadcn/ui Integration Test</h3>
            <p className="text-sm text-muted-foreground">
                If the button below renders with smooth theme styles and custom hover states, your initialization is perfect.
            </p>
            <Button variant="default" onClick={() => alert("shadcn works!")}>
                Click Me
            </Button>
        </div>
    )
}