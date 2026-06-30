const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? '0.1.0'

export function AppFooter(): React.JSX.Element {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-border bg-muted/30 px-6 py-3">
      <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {year} HRIS Enterprise. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#" className="hover:text-foreground">
            Help
          </a>
          <a href="#" className="hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground">
            Terms
          </a>
          <span className="text-muted-foreground/70">v{APP_VERSION}</span>
        </div>
      </div>
    </footer>
  )
}
