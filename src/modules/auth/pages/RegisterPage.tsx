import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { register as registerApi } from '@/services/api/authApi'
import { Button } from '@/ui'
import { Input } from '@/ui'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent } from '@/components/ui/card'
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
import { registerSchema, type RegisterFormData } from '../schemas'
import { CardEdgeGlow } from '@/components/animations/CardEdgeGlow'
import { normalizeApiError } from '@/services/errors'

export function RegisterPage(): React.JSX.Element {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = (data: RegisterFormData): void => {
    setError(null)
    setIsSubmitting(true)
    const { confirmPassword: _, ...payload } = data
    void registerApi(payload)
      .then(() => {
        navigate(ROUTES.auth.verifyEmail, {
            state: {
                email: payload.email
            }
        })
      })
      .catch((err) => {
        form.reset()
        const apiError = normalizeApiError(err)
        if (apiError.details) {
          const messages = Object.values(apiError.details).flat()
          setError(messages.join(' '))
          return
        }
        setError(apiError.message || 'Registration failed. Please try again.')
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <PublicPageShell>
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <div className="space-y-3">
                {/* VENDOR LOGO HERE? */}
            </div>
            <CardEdgeGlow className="w-full">    
                <Card>
                <CardContent className="pt-6">
                <Form {...form}>
                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                    void form.handleSubmit(onSubmit)(e)
                    }}
                >
                    <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                            <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                            <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    </div>
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
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Retype password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
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
                    {isSubmitting ? 'Creating account...' : 'Create account'}
                    </Button>
                </form>
                </Form>
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
