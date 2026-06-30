import { endpoints } from '@/constants/endpoints'
import { createResourceApi } from './client'
import type { SystemEntity } from '@/modules/system/types'

const api = createResourceApi<SystemEntity>({
  list: endpoints.system.list,
  byId: endpoints.system.byId,
})

export const listSystem = api.list
export const getSystem = api.getById
export const systemApi = api
