import { useQuery } from '@tanstack/react-query'
import { apiGet, apiPost } from './client'
import { endpoints } from '@/constants/endpoints'
import type { User } from '@/types'

export interface PaymentMethod {
  id: string
  name: string
  label: string
  provider: string
}

export interface PaymentConfig {
  stripePublishableKey?: string | null
  paypalClientId?: string | null
  paypalEnabled: boolean
  stripeEnabled: boolean
  twoCTwoPEnabled: boolean
  twoCTwoPWebPaymentUrl?: string | null
  twoCTwoPSandboxCards?: Record<string, string>
}

export interface PreparePaymentPayload {
  subscriptionId: string
  additionalUserCount: number
}

export interface CheckoutPayload {
  subscriptionId: string
  paymentMethodName: string
  additionalUserCount: number
  simulateSuccess?: boolean
  gatewayReference?: string
}

export interface CheckoutResult {
  user: User
  paymentId: string
  transactionReference: string
  amount: string
  status: string
}

export interface StripeIntentResult {
  clientSecret: string
  paymentIntentId: string
  amount: string
  currency: string
}

export interface TwoCTwoPTokenResult {
  paymentToken: string
  webPaymentUrl?: string | null
  invoiceNo: string
  amount: string
  currency: string
}

export interface TwoCTwoPProcessPayload {
  paymentToken: string
  cardNumber: string
  expiryMonth?: string
  expiryYear?: string
  cvv?: string
}

export async function fetchPaymentMethods(): Promise<PaymentMethod[]> {
  return apiGet<PaymentMethod[]>(endpoints.billing.paymentMethods)
}

export async function fetchPaymentConfig(): Promise<PaymentConfig> {
  return apiGet<PaymentConfig>(endpoints.billing.paymentConfig)
}

export async function createStripeIntent(payload: PreparePaymentPayload): Promise<StripeIntentResult> {
  return apiPost<StripeIntentResult>(endpoints.billing.stripeCreateIntent, payload)
}

export async function createTwoCTwoPToken(payload: PreparePaymentPayload): Promise<TwoCTwoPTokenResult> {
  return apiPost<TwoCTwoPTokenResult>(endpoints.billing.twoCTwoPToken, payload)
}

export async function processTwoCTwoPCard(
  payload: TwoCTwoPProcessPayload,
): Promise<{ gatewayReference: string }> {
  return apiPost<{ gatewayReference: string }>(endpoints.billing.twoCTwoPProcess, payload)
}

export async function checkout(payload: CheckoutPayload): Promise<CheckoutResult> {
  return apiPost<CheckoutResult>(endpoints.billing.checkout, payload)
}

export function usePaymentMethods() {
  return useQuery({
    queryKey: ['billing', 'payment-methods'],
    queryFn: fetchPaymentMethods,
  })
}

export function usePaymentConfig() {
  return useQuery({
    queryKey: ['billing', 'payment-config'],
    queryFn: fetchPaymentConfig,
  })
}
