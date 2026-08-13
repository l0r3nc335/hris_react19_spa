import { ensureCsrfReady, httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { User } from '@/types'

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResult {
  user: User
}

export async function login(payload: LoginPayload): Promise<LoginResult> {
  await ensureCsrfReady()
  const res = await httpClient.post<ApiResponse<LoginResult>>(endpoints.auth.login, payload)
  return res.data.data
}

export async function logout(): Promise<void> {
  await ensureCsrfReady()
  await httpClient.post(endpoints.auth.logout)
}

export async function fetchMe(): Promise<User> {
  const res = await httpClient.get<ApiResponse<User>>(endpoints.auth.me)
  return res.data.data
}

export async function register(payload: {
  email: string
  password: string
  firstName: string
  lastName: string
}): Promise<User> {
  await ensureCsrfReady()
  const res = await httpClient.post<ApiResponse<User>>(endpoints.auth.register, payload)
  return res.data.data
}

export async function verifyEmail(payload: { token: string }): Promise<void> {
  await ensureCsrfReady()
  await httpClient.post(endpoints.auth.verifyEmail, payload)
}

export async function forgotPassword(email: string): Promise<void> {
  await ensureCsrfReady()
  await httpClient.post(endpoints.auth.forgotPassword, { email })
}

export async function resetPassword(payload: {
  token: string
  password: string
}): Promise<void> {
  await ensureCsrfReady()
  await httpClient.post(endpoints.auth.resetPassword, payload)
}

