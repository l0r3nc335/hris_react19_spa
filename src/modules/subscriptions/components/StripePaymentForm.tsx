import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe, type Stripe } from '@stripe/stripe-js'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createStripeIntent } from '@/services/api/mySubscriptionApi'

interface StripePaymentFormProps {
  publishableKey: string
  subscriptionId: string
  additionalUsers: number
  disabled?: boolean
  onSuccess: (paymentIntentId: string) => Promise<void>
}

function StripePaymentFormInner({
  clientSecret,
  disabled,
  onSuccess,
}: {
  clientSecret: string
  disabled?: boolean
  onSuccess: (paymentIntentId: string) => Promise<void>
}): React.JSX.Element {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (): Promise<void> => {
    if (!stripe || !elements) return
    setError(null)
    setSubmitting(true)
    try {
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setError(submitError.message ?? 'Unable to submit card details.')
        return
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        redirect: 'if_required',
      })

      if (confirmError) {
        setError(confirmError.message ?? 'Payment failed.')
        return
      }

      if (paymentIntent?.status === 'succeeded') {
        await onSuccess(paymentIntent.id)
      } else {
        setError('Payment was not completed. Please try again.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <PaymentElement options={{ layout: 'tabs' }} />
      <Button
        type="button"
        className="w-full"
        disabled={disabled || submitting || !stripe || !elements}
        onClick={() => void handleSubmit()}
      >
        {submitting ? 'Processing…' : 'Pay with Stripe'}
      </Button>
    </div>
  )
}

export function StripePaymentForm({
  publishableKey,
  subscriptionId,
  additionalUsers,
  disabled,
  onSuccess,
}: StripePaymentFormProps): React.JSX.Element {
  const stripe = useMemo(
    () => loadStripe(publishableKey),
    [publishableKey],
  )
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    setClientSecret(null)
    createStripeIntent({
      subscriptionId,
      additionalUserCount: additionalUsers,
    })
      .then((intent) => {
        if (active) setClientSecret(intent.clientSecret)
      })
      .catch((err: unknown) => {
        if (active) {
          setLoadError(err instanceof Error ? err.message : 'Unable to initialize Stripe.')
        }
      })
    return () => {
      active = false
    }
  }, [subscriptionId, additionalUsers])

  if (loadError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{loadError}</AlertDescription>
      </Alert>
    )
  }

  if (!clientSecret) {
    return <p className="text-sm text-muted-foreground">Loading Stripe payment form…</p>
  }

  return (
    <Elements stripe={stripe} options={{ clientSecret, appearance: { theme: 'night' } }}>
      <StripePaymentFormInner
        clientSecret={clientSecret}
        disabled={disabled}
        onSuccess={onSuccess}
      />
    </Elements>
  )
}
