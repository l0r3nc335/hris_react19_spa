import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { verifyEmail } from '@/services/api/authApi'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent } from '@/components/ui/card'
import { PublicPageShell } from '@/modules/public/pages/PublicPageShell'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/components/ui/button'

type VerifyState = 'waiting' | 'verifying' | 'success' | 'error'

export function VerifyEmailPage(): React.JSX.Element {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token') ?? ''
    const emailFromState = (location.state as { email?: string } | null)?.email
    const [state, setState] = useState<VerifyState>(token ? 'verifying' : 'waiting')
    const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return

    setState('verifying')
    setError(null)
    let cancelled = false
    let timer: number | undefined

    void verifyEmail({ token })
      .then(() => {
        if (cancelled) return
        setState('success')
        timer = window.setTimeout(() => {
          //navigate(ROUTES.auth.login, { replace: true })
        }, 30000)
      })
      .catch(() => {
        if (cancelled) return
        setState('error')
        setError('Verification failed. The link may be invalid or expired.')
      })

    return () => {
      cancelled = true
      if (timer !== undefined) window.clearTimeout(timer)
    }
  }, [token, navigate])

  if (!token) {
    return (
      <PublicPageShell
        title="Verify Email Address"
        description="Please verify your email address to continue the registration."
      >
        {emailFromState ? (
          <p className="text-center text-sm text-muted-foreground">
            We sent a verification link to{' '}
            <span className="font-medium text-foreground">{emailFromState}</span>.
          </p>
        ) : null}
        <p className="mt-4 text-center text-sm text-muted-foreground">
          <Link to={ROUTES.auth.login} className="text-primary hover:underline">
            Back to login
          </Link>
        </p>
      </PublicPageShell>
    )
  }

  const title =
    state === 'success'
      ? 'Email verified'
      : state === 'error'
        ? 'Verification failed'
        : 'Verifying email'

  const description =
    state === 'success'
      ? 'Your email has been verified. Redirecting to login...'
      : state === 'error'
        ? error
        : 'Please wait while we verify your email address.'

  return (
    <PublicPageShell title={title} description={description}>
      <Card className="mx-auto max-w-md">
        <CardContent className="pt-0">
          {state === 'verifying' ? (
            <p className="text-center text-sm text-muted-foreground">Verifying...</p>
          ) : null}
          {state === 'success' ? (
            <div className="flex justify-center">
                <Button 
                    type="button" 
                    className=""
                    onClick={()=> {navigate(ROUTES.auth.login)}}
                >
                    Go to login page.
                </Button>
            </div>
          ) : null}
          {state === 'error' && error ? (
            <Alert className="text-center" variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}
          {state === 'error' ? (
            <div className="flex justify-center">
                <Button 
                    type="button" 
                    className="mt-5"
                    onClick={()=> {navigate(ROUTES.auth.login)}}
                >
                    Go to login page.
                </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </PublicPageShell>
  )
}
