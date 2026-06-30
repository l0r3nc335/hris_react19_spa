import type { BaseEntity } from '@/types'

export interface UsersEntity extends BaseEntity {
  name: string
  status: string
  firstName?: string
  lastName?: string
  email?: string
  role?: string
  emailVerified?: boolean
}
