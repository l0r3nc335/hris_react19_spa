import { httpClient } from '@/services/httpClient'
import type { ApiResponse, Paginated } from '@/types/api'

export interface ListQueryParams {
  page?: number
  limit?: number
  q?: string
  status?: string
}

async function unwrap<T>(promise: Promise<{ data: ApiResponse<T> }>): Promise<T> {
  const res = await promise
  return res.data.data
}

export function apiGet<T>(url: string): Promise<T> {
  if (import.meta.env.DEV) {
    console.debug('[api] GET', url)
  }
  return unwrap(httpClient.get<ApiResponse<T>>(url))
}

export function apiGetPaginated<T>(url: string, params?: ListQueryParams): Promise<Paginated<T>> {
  if (import.meta.env.DEV) {
    console.debug('[api] GET', url, params)
  }
  return httpClient.get<Paginated<T>>(url, { params }).then((res) => res.data)
}

export function apiPost<T>(url: string, body?: unknown): Promise<T> {
  if (import.meta.env.DEV) {
    console.debug('[api] POST', url)
  }
  return unwrap(httpClient.post<ApiResponse<T>>(url, body))
}

export function apiPut<T>(url: string, body?: unknown): Promise<T> {
  if (import.meta.env.DEV) {
    console.debug('[api] PUT', url)
  }
  return unwrap(httpClient.put<ApiResponse<T>>(url, body))
}

export function apiPatch<T>(url: string, body?: unknown): Promise<T> {
  if (import.meta.env.DEV) {
    console.debug('[api] PATCH', url)
  }
  return unwrap(httpClient.patch<ApiResponse<T>>(url, body))
}

export function apiDelete<T = void>(url: string): Promise<T> {
  if (import.meta.env.DEV) {
    console.debug('[api] DELETE', url)
  }
  return unwrap(httpClient.delete<ApiResponse<T>>(url))
}

export interface ResourceEndpoints {
  list: string
  byId: (id: string) => string
  trashed?: string
  softDelete?: (id: string) => string
  restore?: (id: string) => string
  deactivate?: (id: string) => string
  reactivate?: (id: string) => string
}

export interface CreateBody {
  name?: string
  firstName?: string
  lastName?: string
  status?: string
  [key: string]: string | undefined
}

export interface UpdateBody {
  name?: string
  firstName?: string
  lastName?: string
  status?: string
  [key: string]: string | undefined
}

export type MutableResourceEndpoints = ResourceEndpoints &
  Required<Pick<ResourceEndpoints, 'trashed' | 'softDelete' | 'restore'>>

export interface MutableResourceApi<T extends { id: string }> {
  list: (params?: ListQueryParams) => Promise<Paginated<T>>
  listTrashed: (params?: ListQueryParams) => Promise<Paginated<T>>
  getById: (id: string) => Promise<T>
  create: (body: CreateBody) => Promise<T>
  update: (id: string, body: UpdateBody) => Promise<T>
  remove: (id: string) => Promise<{ id: string; deleted: boolean }>
  softDelete: (id: string) => Promise<T>
  restore: (id: string) => Promise<T>
  deactivate?: (id: string) => Promise<T>
  reactivate?: (id: string) => Promise<T>
}

export function createResourceApi<T extends { id: string }>(paths: ResourceEndpoints) {
  return {
    list: () => apiGet<T[]>(paths.list),
    ...(paths.trashed ? { listTrashed: () => apiGet<T[]>(paths.trashed!) } : {}),
    getById: (id: string) => apiGet<T>(paths.byId(id)),
    create: (body: CreateBody) => apiPost<T>(paths.list, body),
    update: (id: string, body: UpdateBody) => apiPatch<T>(paths.byId(id), body),
    remove: (id: string) => apiDelete<{ id: string; deleted: boolean }>(paths.byId(id)),
    ...(paths.softDelete
      ? { softDelete: (id: string) => apiPatch<T>(paths.softDelete!(id)) }
      : {}),
    ...(paths.restore
      ? { restore: (id: string) => apiPatch<T>(paths.restore!(id)) }
      : {}),
    ...(paths.deactivate
      ? { deactivate: (id: string) => apiPatch<T>(paths.deactivate!(id)) }
      : {}),
    ...(paths.reactivate
      ? { reactivate: (id: string) => apiPatch<T>(paths.reactivate!(id)) }
      : {}),
  }
}

export function createMutableResourceApi<T extends { id: string }>(
  paths: MutableResourceEndpoints,
): MutableResourceApi<T> {
  return {
    list: (params?: ListQueryParams) => apiGetPaginated<T>(paths.list, params),
    listTrashed: (params?: ListQueryParams) => apiGetPaginated<T>(paths.trashed, params),
    getById: (id: string) => apiGet<T>(paths.byId(id)),
    create: (body: CreateBody) => apiPost<T>(paths.list, body),
    update: (id: string, body: UpdateBody) => apiPatch<T>(paths.byId(id), body),
    remove: (id: string) => apiDelete<{ id: string; deleted: boolean }>(paths.byId(id)),
    softDelete: (id: string) => apiPatch<T>(paths.softDelete(id)),
    restore: (id: string) => apiPatch<T>(paths.restore(id)),
    ...(paths.deactivate
      ? { deactivate: (id: string) => apiPatch<T>(paths.deactivate!(id)) }
      : {}),
    ...(paths.reactivate
      ? { reactivate: (id: string) => apiPatch<T>(paths.reactivate!(id)) }
      : {}),
  }
}
