import type { BaseEntity } from '@/types'

export interface SystemEntity extends BaseEntity {
  name: string
  status: string
}
