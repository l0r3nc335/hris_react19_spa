import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CreditCard, Wallet } from 'lucide-react'
import { toast } from 'sonner'
import { PageLoader } from '@/components/PageLoader'
import { PageShell } from '@/components/layout/PageShell'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ROUTES } from '@/constants/routes'
import { useAppDispatch } from '@/hooks'
import { PayPalPaymentForm } from '@/modules/subscriptions/components/PayPalPaymentForm'
import { StripePaymentForm } from '@/modules/subscriptions/components/StripePaymentForm'
import { TwoCTwoPPaymentForm } from '@/modules/subscriptions/components/TwoCTwoPPaymentForm'
import { useSubscriptionPlans } from '@/modules/subscriptions/hooks'
import { formatPrice } from '@/modules/subscriptions/constants'
import {
  checkout,
  usePaymentConfig,
  usePaymentMethods,
} from '@/services/api/billingApi'
import { normalizeApiError } from '@/services/errors'
import { fetchMe } from '@/slices/authSlice'
import { cn } from '@/lib/utils'

const PROVIDER_LABELS: Record<string, string> = {
  paypal: 'PayPal',
  stripe: 'Stripe',
  '2c2p': '2C2P',
}

export function PaymentMethodsPage(): React.JSX.Element {
  const { slug = '' } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { data: plans, isLoading: plansLoading } = useSubscriptionPlans()
  const {
    data: paymentMethods,
    isLoading: methodsLoading,
    isError: methodsError,
    error: methodsQueryError,
  } = usePaymentMethods()
  const { data: paymentConfig, isLoading: configLoading, isError: configError } = usePaymentConfig()
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [additionalUsers, setAdditionalUsers] = useState(0)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const plan = useMemo(
    () => plans?.find((item) => item.slug === slug),
    [plans, slug],
  )

  const monthlyBase = plan?.price ? Number(plan.price) : 0
  const monthlyAdditional = plan?.priceAdditionalUsers ? Number(plan.priceAdditionalUsers) : 0
  const annualBase = monthlyBase * 12
  const annualAdditional = additionalUsers * monthlyAdditional * 12
  const annualTotal = annualBase + annualAdditional
  const currency = plan?.currency ?? 'USD'
  const hasProviders = Boolean(paymentMethods?.length)
  const methodsLoadError = methodsError
    ? normalizeApiError(methodsQueryError).message
    : null

  useEffect(() => {
    if (selectedMethod || !paymentMethods?.length) return

    const preferred =
      paymentMethods.find((method) => {
        if (method.name === '2c2p') return paymentConfig?.twoCTwoPEnabled
        if (method.name === 'stripe') return paymentConfig?.stripeEnabled
        if (method.name === 'paypal') return paymentConfig?.paypalEnabled
        return false
      }) ?? paymentMethods[0]

    setSelectedMethod(preferred.name)
  }, [paymentMethods, paymentConfig, selectedMethod])

  const completeCheckout = async (paymentMethodName: string, gatewayReference: string): Promise<void> => {
    if (!plan) return
    setCheckoutError(null)
    setIsSubmitting(true)
    try {
      await checkout({
        subscriptionId: plan.id,
        paymentMethodName,
        additionalUserCount: additionalUsers,
        gatewayReference,
      })
      await dispatch(fetchMe()).unwrap()
      toast.success('Payment successful. Welcome aboard!')
      navigate(ROUTES.dashboard.dashboard)
    } catch (error) {
      const normalized = normalizeApiError(error)
      setCheckoutError(normalized.message)
      toast.error(normalized.message)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  if (plansLoading || methodsLoading || configLoading) {
    return <PageLoader />
  }

  if (!plan) {
    return (
      <PageShell
        title="Payment Methods"
        description="Complete your subscription using PayPal, Stripe, or 2C2P sandbox."
        icon={<Wallet className="h-5 w-5" />}
        breadcrumbs={[
          { label: "Subscription Plan" },
          { label: "Payment Method"}
        ]}
      >
        <p className="text-sm text-destructive">Plan not found.</p>
        <Button className="mt-4" variant="outline" onClick={() => navigate(ROUTES.subscription.plans)}>
          Back to plans
        </Button>
      </PageShell>
    )
  }

  const activeMethod = selectedMethod ?? paymentMethods?.[0]?.name ?? null

  return (
    <PageShell
      title="Payment Methods"
      description="Complete your subscription using PayPal, Stripe, or 2C2P sandbox."
      icon={<Wallet className="h-5 w-5" />}
      breadcrumbs={[
        { label: "Subscription Plan", path: ROUTES.subscription.plans },
        { label: "Payment Method" }
      ]}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {checkoutError ? (
            <Alert variant="destructive">
              <AlertDescription>{checkoutError}</AlertDescription>
            </Alert>
          ) : null}

          {methodsLoadError || configError || !hasProviders ? (
            <Alert variant="destructive">
              <AlertDescription>
                {methodsLoadError
                  ?? (configError
                    ? 'Unable to load payment configuration. Please try again.'
                    : 'No payment methods are available right now. Please try again later.')}
              </AlertDescription>
            </Alert>
          ) : null}

          <section className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground">Select a provider</h2>
            {hasProviders ? (
              <div className="flex flex-wrap gap-2">
                {paymentMethods?.map((method) => (
                  <Button
                    key={method.id}
                    type="button"
                    variant={activeMethod === method.name ? 'default' : 'outline'}
                    onClick={() => setSelectedMethod(method.name)}
                  >
                    {PROVIDER_LABELS[method.name] ?? method.label}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Providers will appear once billing is available.</p>
            )}
          </section>

          <section className="rounded-xl border border-border/60 bg-card p-6">
            <h2 className="mb-4 flex items-center gap-2 text-base font-semibold">
              <CreditCard className="h-4 w-4" />
              {activeMethod ? `${PROVIDER_LABELS[activeMethod] ?? activeMethod} payment` : 'Payment form'}
            </h2>

            {activeMethod === 'stripe' && paymentConfig?.stripeEnabled && paymentConfig.stripePublishableKey ? (
              <StripePaymentForm
                publishableKey={paymentConfig.stripePublishableKey}
                subscriptionId={plan.id}
                additionalUsers={additionalUsers}
                disabled={isSubmitting}
                onSuccess={(paymentIntentId) =>
                  completeCheckout('stripe', paymentIntentId)
                }
              />
            ) : null}

            {activeMethod === 'paypal' && paymentConfig?.paypalEnabled && paymentConfig.paypalClientId ? (
              <PayPalPaymentForm
                clientId={paymentConfig.paypalClientId}
                currency={currency}
                amount={annualTotal}
                disabled={isSubmitting}
                onSuccess={(orderId) => completeCheckout('paypal', orderId)}
              />
            ) : null}

            {activeMethod === '2c2p' && paymentConfig?.twoCTwoPEnabled ? (
              <TwoCTwoPPaymentForm
                subscriptionId={plan.id}
                additionalUsers={additionalUsers}
                sandboxCards={paymentConfig.twoCTwoPSandboxCards}
                disabled={isSubmitting}
                onSuccess={(gatewayReference) => completeCheckout('2c2p', gatewayReference)}
              />
            ) : null}

            {activeMethod === 'stripe' && !paymentConfig?.stripeEnabled ? (
              <Alert>
                <AlertDescription>
                  Add STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY to the backend environment to enable Stripe.
                </AlertDescription>
              </Alert>
            ) : null}

            {activeMethod === 'paypal' && !paymentConfig?.paypalEnabled ? (
              <Alert>
                <AlertDescription>
                  Add PAYPAL_CLIENT_ID to the backend environment to enable PayPal sandbox buttons.
                </AlertDescription>
              </Alert>
            ) : null}

            {!activeMethod && hasProviders ? (
              <Alert>
                <AlertDescription>Select a payment provider to continue.</AlertDescription>
              </Alert>
            ) : null}
          </section>
        </div>

        <aside className="space-y-4">
          <div className={cn('rounded-xl border border-border/60 bg-card p-6')}>
            <h2 className="mb-4 text-base font-semibold">Order summary</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium">{plan.label}</p>
                <p className="text-sm text-muted-foreground">
                  {formatPrice(plan.price, plan.currency)}/month · billed annually
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-users">Additional users</Label>
                <Input
                  id="additional-users"
                  type="number"
                  min={0}
                  value={additionalUsers}
                  onChange={(event) => {
                    const value = Math.max(0, Number(event.target.value) || 0)
                    setAdditionalUsers(value)
                  }}
                />
              </div>

              <div className="space-y-2 border-t border-border/60 pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Annual base</span>
                  <span>{formatPrice(String(annualBase), plan.currency)}</span>
                </div>
                {additionalUsers > 0 ? (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Additional users ({additionalUsers} × 12 mo)
                    </span>
                    <span>{formatPrice(String(annualAdditional), plan.currency)}</span>
                  </div>
                ) : null}
                <div className="flex justify-between border-t border-border/60 pt-2 text-base font-semibold">
                  <span>Total due today</span>
                  <span>{formatPrice(String(annualTotal), plan.currency)}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  )
}
