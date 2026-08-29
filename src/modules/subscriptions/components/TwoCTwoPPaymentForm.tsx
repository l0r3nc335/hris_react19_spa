import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  createTwoCTwoPToken,
  processTwoCTwoPCard,
} from '@/services/api/billingApi'

interface TwoCTwoPPaymentFormProps {
  subscriptionId: string
  additionalUsers: number
  sandboxCards?: Record<string, string>
  disabled?: boolean
  onSuccess: (gatewayReference: string) => Promise<void>
}

export function TwoCTwoPPaymentForm({
  subscriptionId,
  additionalUsers,
  sandboxCards,
  disabled,
  onSuccess,
}: TwoCTwoPPaymentFormProps): React.JSX.Element {
  const [paymentToken, setPaymentToken] = useState<string | null>(null)
  const [cardNumber, setCardNumber] = useState('4123456789012346')
  const [expiryMonth, setExpiryMonth] = useState('12')
  const [expiryYear, setExpiryYear] = useState('30')
  const [cvv, setCvv] = useState('123')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let active = true
    createTwoCTwoPToken({ subscriptionId, additionalUserCount: additionalUsers })
      .then((token) => {
        if (active) setPaymentToken(token.paymentToken)
      })
      .catch((err: unknown) => {
        if (active) {
          setError(err instanceof Error ? err.message : 'Unable to initialize 2C2P sandbox.')
        }
      })
    return () => {
      active = false
    }
  }, [subscriptionId, additionalUsers])

  const handleSubmit = async (): Promise<void> => {
    if (!paymentToken) return
    setError(null)
    setSubmitting(true)
    try {
      const result = await processTwoCTwoPCard({
        paymentToken,
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv,
      })
      await onSuccess(result.gatewayReference)
    } catch (err) {
      setError(err instanceof Error ? err.message : '2C2P payment failed.')
    } finally {
      setSubmitting(false)
    }
  }

  const successCard = Object.entries(sandboxCards ?? {}).find(([, outcome]) => outcome === 'success')?.[0]

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        2C2P sandbox card form. Use test card {successCard ?? '4123456789012346'} for success.
      </p>
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="2c2p-card">Card number</Label>
          <Input
            id="2c2p-card"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="4123456789012346"
            autoComplete="cc-number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="2c2p-exp-month">Expiry month</Label>
          <Input
            id="2c2p-exp-month"
            value={expiryMonth}
            onChange={(e) => setExpiryMonth(e.target.value)}
            placeholder="12"
            autoComplete="cc-exp-month"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="2c2p-exp-year">Expiry year</Label>
          <Input
            id="2c2p-exp-year"
            value={expiryYear}
            onChange={(e) => setExpiryYear(e.target.value)}
            placeholder="30"
            autoComplete="cc-exp-year"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="2c2p-cvv">CVV</Label>
          <Input
            id="2c2p-cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            autoComplete="cc-csc"
          />
        </div>
      </div>
      <Button
        type="button"
        className="w-full"
        disabled={disabled || submitting || !paymentToken}
        onClick={() => void handleSubmit()}
      >
        {submitting ? 'Processing…' : 'Pay with 2C2P Sandbox'}
      </Button>
    </div>
  )
}
