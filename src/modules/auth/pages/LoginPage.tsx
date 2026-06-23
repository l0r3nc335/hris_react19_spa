import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { login, selectAuth } from '@/slices/authSlice'
import { Button } from '@/ui'
import { Input } from '@/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ROUTES } from '@/constants/routes'
import { loginSchema, type LoginFormData } from '../schemas'
import { PublicPageShell } from '@/modules/public/pages/PublicPageShell'

export function LoginPage(): React.JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, error } = useAppSelector(selectAuth)
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (data: LoginFormData): void => {
    void dispatch(login(data))
      .then((result) => {
        if (login.fulfilled.match(result)) navigate(ROUTES.dashboard.dashboard)
      })
      .catch(() => undefined)
  }

  return (
    <PublicPageShell>
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <div className="space-y-3">
                Company Logo
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Sign in</CardTitle>
                    <CardDescription>
                        Enterprise HR System — sign in with your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
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
                            {error ? <p className="text-sm text-destructive">{error}</p> : null}
                            <Button type="submit" className="w-full" disabled={status === 'loading'}>
                            {status === 'loading' ? 'Signing in...' : 'Sign in'}
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-4 flex justify-between text-sm">
                    <Link to={ROUTES.auth.forgotPassword} className="text-primary hover:underline">
                        Forgot password?
                    </Link>
                    <Link to={ROUTES.auth.register} className="text-primary hover:underline">
                        Create account
                    </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    </PublicPageShell>
  )
}