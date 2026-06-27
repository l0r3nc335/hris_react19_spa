import { endpoints } from '@/constants/endpoints'
import { apiGet, apiGetPaginated, type ListQueryParams } from './client'
import type { AuditEntity } from '@/modules/audit/types'
import type { Paginated } from '@/types/api'

export function listAudit(params?: ListQueryParams): Promise<Paginated<AuditEntity>> {
  return apiGetPaginated<AuditEntity>(endpoints.audit.list, params)
}

export const getAudit = (id: string) => apiGet<AuditEntity>(endpoints.audit.byId(id))

export const auditApi = {
  list: listAudit,
  getById: getAudit,
}
