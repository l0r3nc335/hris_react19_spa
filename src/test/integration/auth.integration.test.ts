import { beforeAll, describe, expect, it } from 'vitest'
import { fetchMe } from '@/services/api/authApi'
import { canReachApi, seedAuthFromApi } from '@/test/integration/helpers'

const apiAvailable = await canReachApi()

describe.skipIf(!apiAvailable)('auth integration', () => {
  let userEmail = ''

  beforeAll(async () => {
    const user = await seedAuthFromApi()
    userEmail = user.email
  })

  it('fetchMe returns the authenticated user', async () => {
    const me = await fetchMe()
    expect(me.email).toBe(userEmail)
  })
})
