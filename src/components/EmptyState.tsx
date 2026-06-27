import { Inbox } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export interface EmptyStateProps {
  title: string
  description?: string
}

export function EmptyState({ title, description }: EmptyStateProps): React.JSX.Element {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <Inbox className="mb-3 h-10 w-10 text-muted-foreground" />
        <h3 className="text-lg font-medium">{title}</h3>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </CardContent>
    </Card>
  )
}
