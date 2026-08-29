import { httpClient } from '@/services/httpClient'

export interface WorkforceListMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface WorkforceListResponse<T> {
  data: T[]
  meta?: WorkforceListMeta
}

function asStringId<T extends Record<string, unknown>>(row: T): T & { id: string } {
  return { ...row, id: String(row.id) }
}

/** CRUD client matching BE CompanyScopedController `{ data }` / `{ data, meta }` shape. */
export function createWorkforceResourceApi<T extends Record<string, unknown> = Record<string, unknown>>(
  basePath: string,
) {
  return {
    async list(params?: { q?: string; per_page?: number; page?: number }): Promise<(T & { id: string })[]> {
      const res = await httpClient.get<WorkforceListResponse<T>>(basePath, {
        params: {
          q: params?.q,
          per_page: params?.per_page ?? 100,
          page: params?.page ?? 1,
        },
      })
      return (res.data.data ?? []).map((row) => asStringId(row as T & Record<string, unknown>))
    },
    async get(id: string): Promise<T & { id: string }> {
      const res = await httpClient.get<{ data: T }>(`${basePath}/${id}`)
      return asStringId(res.data.data as T & Record<string, unknown>)
    },
    async create(body: Record<string, unknown>): Promise<T & { id: string }> {
      const res = await httpClient.post<{ data: T }>(basePath, body)
      return asStringId(res.data.data as T & Record<string, unknown>)
    },
    async update(id: string, body: Record<string, unknown>): Promise<T & { id: string }> {
      const res = await httpClient.put<{ data: T }>(`${basePath}/${id}`, body)
      return asStringId(res.data.data as T & Record<string, unknown>)
    },
    async remove(id: string): Promise<void> {
      await httpClient.delete(`${basePath}/${id}`)
    },
  }
}

export async function workforceGetData<T>(url: string): Promise<T> {
  const res = await httpClient.get<{ data: T }>(url)
  return res.data.data
}

export async function workforcePutData<T>(url: string, body: Record<string, unknown>): Promise<T> {
  const res = await httpClient.put<{ data: T }>(url, body)
  return res.data.data
}

export async function workforcePostData<T>(url: string, body?: Record<string, unknown>): Promise<T> {
  const res = await httpClient.post<{ data: T }>(url, body ?? {})
  return res.data.data
}
