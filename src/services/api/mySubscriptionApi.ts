/**
 * @deprecated Import billing helpers from `@/services/api/billingApi` instead.
 * Re-exports kept for any lingering imports during migration.
 */
export {
  checkout,
  createStripeIntent,
  createTwoCTwoPToken,
  fetchPaymentConfig,
  fetchPaymentMethods,
  processTwoCTwoPCard,
  usePaymentConfig,
  usePaymentMethods,
  type CheckoutPayload,
  type CheckoutResult,
  type PaymentConfig,
  type PaymentMethod,
  type PreparePaymentPayload,
  type StripeIntentResult,
  type TwoCTwoPProcessPayload,
  type TwoCTwoPTokenResult,
} from './billingApi'
