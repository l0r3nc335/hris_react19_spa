import type { BaseEntity } from '@/types'

export interface AuditEntity extends BaseEntity {
  name: string
  status: string
}
