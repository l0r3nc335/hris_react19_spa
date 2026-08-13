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

httpClient.interceptors.response.use((response) => {
  if (typeof document === 'undefined') {
    mergeNodeCookies(response.headers['set-cookie'])
  } else {
    const fromCookie = readCsrfFromDocumentCookie()
    if (fromCookie) setCsrfToken(fromCookie)
  }
  return response
})

export async function bootstrapCsrf(): Promise<void> {
  const res = await httpClient.get<{ data: { csrfToken?: string } }>(endpoints.auth.csrf)
  const token = res.data.data?.csrfToken
  if (token) setCsrfToken(token)
}

/** Ensure a CSRF token exists before mutating auth calls (skips network if already loaded). */
export async function ensureCsrfReady(): Promise<void> {
  if (readCsrfToken()) {
    return
  }
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
