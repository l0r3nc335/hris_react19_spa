
import { PublicPageShell } from "./PublicPageShell"

export function LandingPage(): React.JSX.Element
{
    return(
        <PublicPageShell 
            title="Ttitle" 
            description="Description of the current page inside the shell"
        >
            <div className="text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                    Enterprise-grade Scalable MVP
                </div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                    LANDING PAGE
                </h1>
            </div>
        </PublicPageShell>
    )
}