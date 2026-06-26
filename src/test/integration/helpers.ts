import { bootstrapCsrf, setTenantId } from '@/services/httpClient'
import { login } from '@/services/api/authApi'
import type { User } from '@/types'

const API_HEALTH_URL = 'http://localhost:3000/api/v1/health'

export async function canReachApi(): Promise<boolean> {
  try {
    const response = await fetch(API_HEALTH_URL)
    return response.ok
  } catch {
    return false
  }
}

export async function seedAuthFromApi(
  credentials: { email: string; password: string } = {
    email: 'admin@hris.com',
    password: 'password',
  },
): Promise<User> {
  await bootstrapCsrf()
  const { user } = await login(credentials)
  setTenantId(user.tenantId)
  return user
}
