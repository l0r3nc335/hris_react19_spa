import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { API_VERSION } from '@/constants/api'
import { endpoints } from '@/constants/endpoints'

export const CSRF_COOKIE = 'hris_csrf'

let tenantId: string | null = null
let csrfTokenMemory: string | null = null
const nodeCookieJar: Record<string, string> = {}

function parseSetCookie( setCookie: string[] | string | undefined ): Record<string, string> 
{
  const headers = Array.isArray(setCookie)
    ? setCookie
    : setCookie
      ? [setCookie]
      : []
  const jar: Record<string, string> = {}
  for (const header of headers) {
    const [pair] = header.split(';')
    if (!pair) continue
    const eq = pair.indexOf('=')
    if (eq === -1) continue
    const name = pair.slice(0, eq).trim()
    const value = pair.slice(eq + 1).trim()
    jar[name] = value
  }
  return jar
}

function mergeNodeCookies(setCookie: string[] | string | undefined): void {
  const parsed = parseSetCookie(setCookie)
  Object.assign(nodeCookieJar, parsed)
  if (parsed[CSRF_COOKIE]) csrfTokenMemory = parsed[CSRF_COOKIE]
}

function nodeCookieHeader(): string {
  return Object.entries(nodeCookieJar)
    .map(([name, value]) => `${name}=${value}`)
    .join('; ')
}

type RefreshHandler = () => Promise<boolean>
let onRefresh: RefreshHandler | null = null
let onUnauthorized: (() => void) | null = null

export function setAuthHandlers(handlers: {
  refresh: RefreshHandler
  unauthorized: () => void
}): void {
  onRefresh = handlers.refresh
  onUnauthorized = handlers.unauthorized
}

export function setTenantId(id: string | null): void {
  tenantId = id
}

export function getTenantId(): string | null {
  return tenantId
}

export function clearSession(): void {
  tenantId = null
  csrfTokenMemory = null
}

function readCsrfFromDocumentCookie(): string | null {
  const match = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CSRF_COOKIE}=`))
  if (!match) return null
  return decodeURIComponent(match.slice(CSRF_COOKIE.length + 1))
}

export function readCsrfToken(): string | null {
  if (typeof document !== 'undefined') {
    const fromCookie = readCsrfFromDocumentCookie()
    if (fromCookie) return fromCookie
    return csrfTokenMemory
  }
  return nodeCookieJar[CSRF_COOKIE] ?? csrfTokenMemory
}

export function setCsrfToken(token: string | null): void {
  csrfTokenMemory = token
}

const NO_REFRESH_RETRY_PATHS = [
  endpoints.auth.refresh,
  endpoints.auth.login,
  endpoints.auth.csrf,
  endpoints.auth.register,
  endpoints.auth.forgotPassword,
  endpoints.auth.resetPassword,
  endpoints.auth.verifyEmail,
  endpoints.auth.logout,
]

function shouldSkipRefreshRetry(config: InternalAxiosRequestConfig): boolean {
  const url = config.url ?? ''
  return NO_REFRESH_RETRY_PATHS.some((path) => url.includes(path))
}

const baseURL = `${import.meta.env.VITE_API_BASE_URL ?? ''}/api/${API_VERSION}`

export const httpClient: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

httpClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof document === 'undefined' && Object.keys(nodeCookieJar).length > 0) {
    config.headers.Cookie = nodeCookieHeader()
  }
  const method = config.method?.toUpperCase()
  if (method && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    const csrfToken = readCsrfToken()
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken
    }
  }
  if (tenantId) {
    config.headers['X-Tenant-Id'] = tenantId
  }
  return config
})

let isRefreshing = false
let refreshQueue: Array<(success: boolean) => void> = []

httpClient.interceptors.response.use(
  (response) => {
    if (typeof document === 'undefined') {
      mergeNodeCookies(response.headers['set-cookie'])
    } else {
      const fromCookie = readCsrfFromDocumentCookie()
      if (fromCookie) setCsrfToken(fromCookie)
    }
    return response
  },
  async (error) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
    if (
      error.response?.status === 401 &&
      !original._retry &&
      onRefresh &&
      !shouldSkipRefreshRetry(original)
    ) {
      original._retry = true
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push((success) => {
            if (!success) {
              reject(error)
              return
            }
            resolve(httpClient(original))
          })
        })
      }
      isRefreshing = true
      try {
        const success = await onRefresh()
        refreshQueue.forEach((cb) => cb(success))
        refreshQueue = []
        if (!success) {
          onUnauthorized?.()
          return Promise.reject(error)
        }
        return httpClient(original)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  },
)

export async function bootstrapCsrf(): Promise<void> {
  const res = await httpClient.get<{ data: { csrfToken?: string } }>(endpoints.auth.csrf)
  const token = res.data.data?.csrfToken
  if (token) setCsrfToken(token)
}

/** Refresh CSRF before mutating auth calls (clears legacy cookie paths server-side). */
export async function ensureCsrfReady(): Promise<void> {
  await bootstrapCsrf()
}

export async function request<T>(
  url: string,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' = 'get',
  body?: unknown,
): Promise<T> {
  const res = await httpClient.request<{ data: T }>({ url, method, data: body })
  return res.data.data
}
