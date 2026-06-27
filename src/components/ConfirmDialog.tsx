import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from '@/components/ui/alert-dialog'
  import { buttonVariants } from '@/ui'
  import { cn } from '@/lib/utils'
  
  export interface ConfirmDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description: string
    confirmLabel?: string
    onConfirm: () => void
    isPending?: boolean
    destructive?: boolean
  }
  
  export function ConfirmDialog({
    open,
    onOpenChange,
    title,
    description,
    confirmLabel = 'Confirm',
    onConfirm,
    isPending = false,
    destructive = false,
  }: ConfirmDialogProps): React.JSX.Element {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              className={cn(destructive && buttonVariants({ variant: 'destructive' }))}
              onClick={(e) => {
                e.preventDefault()
                onConfirm()
              }}
            >
              {isPending ? 'Processing...' : confirmLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  