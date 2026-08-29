import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { login, selectAuth } from '@/slices/authSlice'
import { Button, Input } from '@/ui'
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
import { useState } from 'react'

export function LoginPage(): React.JSX.Element {
  const [urlParam] = useSearchParams()
  const [companyId] = useState(urlParam.get('companyId'))

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
    <div className="grid min-h-full w-full lg:grid-cols-2">
      {/* Branding panel */}
      <div className="relative hidden flex-col justify-between bg-[var(--wf-navy)] p-10 text-white lg:flex">
        <div>
          <p className="text-sm font-medium tracking-wide text-[var(--wf-orange)] uppercase">
            Workforce
          </p>
          <h1 className="mt-4 max-w-md text-4xl font-bold leading-tight tracking-tight">
            Workforce Management System
          </h1>
          <p className="mt-4 max-w-sm text-sm text-white/70">
            People, operations, travel, and company settings — one place for your organisation.
          </p>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(240,100,36,0.25),transparent_55%)]" />
        <p className="relative text-xs text-white/40">© Workforce</p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-[var(--wf-content-bg)] p-6 sm:p-10">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-6 lg:hidden">
            <p className="text-sm font-medium text-[var(--wf-orange)]">Workforce</p>
            <h1 className="mt-1 text-2xl font-bold text-[var(--wf-navy)]">
              Workforce Management System
            </h1>
          </div>

          <h2 className="text-2xl font-bold text-[var(--wf-navy)]">Sign in</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in with your Workforce account
            {(companyId?.length ?? 0) > 0 ? ` · ${companyId}` : ''}
          </p>

          <Form {...form}>
            <form
              className="mt-6 space-y-4"
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
                      <Input type="email" autoComplete="email" {...field} />
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
                      <Input type="password" autoComplete="current-password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              <Button
                type="submit"
                className="w-full bg-[var(--wf-orange)] hover:bg-[var(--wf-orange-dark)]"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </Form>

          <div className="mt-4 flex justify-between text-sm">
            <Link
              to={ROUTES.auth.forgotPassword}
              className="font-medium text-[var(--wf-orange)] hover:underline"
            >
              Forgot Password
            </Link>
            <Link to={ROUTES.auth.register} className="text-muted-foreground hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
