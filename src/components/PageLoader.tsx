import Skeleton from "@/components/ui/skeleton"

export function PageLoader(): React.JSX.Element
{
    return (
        <div className="flex min-h-[200px] flex-col gap-3 p-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
            <div className="mt-4 space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    )
}