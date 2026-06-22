import type { ReactNode } from "react";

export interface PublicPageShellProps {
    children: ReactNode
    title?: string
    description?: string
}

export function PublicPageShell({children, title, description}: PublicPageShellProps): React.JSX.Element 
{
    return (
        <div className="h-screen flex h-full w-full flex-col items-center justify-center overflow-hidden px-4 py-6 md:px-6">
            <div className="mx-auto w-full max-w-5xl">
                {(title || description) && (
                    <div className="mb-6 text-center md:mb-8">
                        {title ? (
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
                        ) : null}
                        {description ? (
                            <p className="mt-2 text-sm text-muted-foreground md:text-base">{description}</p>
                        ) : null}
                    </div>
                )}
                {children}
            </div>
        </div>
    )
}
