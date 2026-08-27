import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface PayPalPaymentFormProps {
  clientId: string
  currency: string
  amount: number
  disabled?: boolean
  onSuccess: (orderId: string) => Promise<void>
}

export function PayPalPaymentForm({
  clientId,
  currency,
  amount,
  disabled,
  onSuccess,
}: PayPalPaymentFormProps): React.JSX.Element {
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency,
        intent: 'capture',
        components: 'buttons',
      }}
    >
      <div className="space-y-4">
        {error ? (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}
        <PayPalButtons
          disabled={disabled || processing}
          style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'paypal' }}
          createOrder={(_data, actions) =>
            actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount.toFixed(2),
                  },
                  description: 'HRIS annual subscription',
                },
              ],
            })
          }
          onApprove={async (data, actions) => {
            if (!data.orderID) {
              setError('PayPal did not return an order ID.')
              return
            }
            setError(null)
            setProcessing(true)
            try {
              if (actions.order) {
                await actions.order.capture()
              }
              await onSuccess(data.orderID)
            } catch (err) {
              setError(err instanceof Error ? err.message : 'PayPal payment failed.')
            } finally {
              setProcessing(false)
            }
          }}
          onError={() => {
            setError('PayPal encountered an error. Please try again.')
          }}
          onCancel={() => {
            setError('PayPal payment was cancelled.')
          }}
        />
      </div>
    </PayPalScriptProvider>
  )
}
