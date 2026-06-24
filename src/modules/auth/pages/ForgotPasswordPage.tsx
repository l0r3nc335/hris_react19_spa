import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { forgotPassword } from '@/services/api/authApi'
import { Button } from '@/ui'
import { Input } from '@/ui'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card'
import { PublicPageShell } from '@/modules/public/pages/PublicPageShell'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ROUTES } from '@/constants/routes'
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../schemas'
import { CardEdgeGlow } from '@/components/animations/CardEdgeGlow'

export function ForgotPasswordPage(): React.JSX.Element {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = (data: ForgotPasswordFormData): void => {
    setError(null)
    setSuccess(false)
    setIsSubmitting(true)
    void forgotPassword(data.email)
      .then(() => {
        setSuccess(true)
      })
      .catch(() => {
        setError('Failed to send reset email. Please try again.')
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <PublicPageShell>
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <div className="space-y-3">
                sdasdasd
            </div>
            
            <CardEdgeGlow className="w-full">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Forgot  password</CardTitle>
                        <CardDescription>
                            Enter your email to receive a password reset link
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                    {success ? (
                    <Alert>
                        <AlertDescription>
                        If an account exists for that email, a reset link has been sent.
                        </AlertDescription>
                    </Alert>
                    ) : (
                    <Form {...form}>
                        <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            void form.handleSubmit(onSubmit)(e)
                        }}
                        >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                <Input type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        {error ? (
                            <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        ) : null}
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send reset link'}
                        </Button>
                        </form>
                    </Form>
                    )}
                    <Link to={ROUTES.auth.login} className="mt-4 inline-block text-sm text-primary hover:underline">
                    Back to login
                    </Link>
                    </CardContent>
                </Card>
            </CardEdgeGlow>
        </div>
        
    </PublicPageShell>
  )
}
