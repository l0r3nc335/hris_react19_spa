import { ROUTES } from '@/constants/routes'
import type { User } from '@/types'

export function isSubscriberOnboarding(user: User | null | undefined): boolean {
  return user?.role === 'subscriber' && !user.userSubscription
}

export function isSubscriberOnboardingPath(pathname: string): boolean {
  if (pathname === ROUTES.subscription.plans) return true
  const plansPrefix = `${ROUTES.subscription.plans}/`
  if (!pathname.startsWith(plansPrefix)) return false
  return pathname.endsWith('/payment-methods') || pathname.includes('/payment/')
}

export function subscriptionPlanPaymentMethods(slug: string): string {
  return `${ROUTES.subscription.plans}/${slug}/payment-methods`
}

const ONBOARDING_NAV_PATHS = [ROUTES.subscription.plans] as const

/** During onboarding, only subscription funnel nav items stay clickable. */
export function isNavItemLockedDuringOnboarding(
  itemPath: string,
  onboardingLocked: boolean,
  pathname?: string,
): boolean {
  if (!onboardingLocked) return false
  if (ONBOARDING_NAV_PATHS.includes(itemPath as typeof ONBOARDING_NAV_PATHS[number])) {
    return false
  }
  if (pathname && isSubscriberOnboardingPath(pathname) && itemPath === ROUTES.subscription.plans) {
    return false
  }
  return true
}
