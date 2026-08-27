import { beforeEach, describe, expect, it } from 'vitest'
import '@/test/mocks/httpClient'
import '@/test/mocks/authApi'
import {
  authReducer,
  clearAuthError,
  fetchMe,
  login,
  logout,
  startSessionRestore,
} from '@/slices/authSlice'
import {
  authApiMocks,
  setupDefaultAuthApiMocks,
} from '@/test/mocks/authApi'
import { httpClientMocks } from '@/test/mocks/httpClient'
import { mockUser } from '@/test/fixtures'
import { createTestStore } from '@/test/utils'

const getInitialState = () => authReducer(undefined, { type: '@@INIT' })

describe('authSlice', () => {
  beforeEach(() => {
    setupDefaultAuthApiMocks()
  })

  describe('sync reducers', () => {
    it('clears auth error', () => {
      const state = { ...getInitialState(), error: 'Failed' }
      const next = authReducer(state, clearAuthError())
      expect(next.error).toBeNull()
    })

    it('starts session restore', () => {
      const next = authReducer(getInitialState(), startSessionRestore())
      expect(next.status).toBe('loading')
      expect(next.error).toBeNull()
    })
  })

  describe('login thunk', () => {
    it('handles pending state', () => {
      const next = authReducer(getInitialState(), { type: login.pending.type })
      expect(next.status).toBe('loading')
      expect(next.error).toBeNull()
    })

    it('handles fulfilled login', async () => {
      const store = createTestStore()
      await store.dispatch(login({ email: 'user@example.com', password: 'secret1' }))
      const state = store.getState().auth
      expect(state.status).toBe('succeeded')
      expect(state.user).toEqual(mockUser)
      expect(state.isAuthenticated).toBe(true)
      expect(httpClientMocks.setTenantId).toHaveBeenCalledWith(mockUser.tenantId)
    })

    it('handles rejected login', async () => {
      authApiMocks.login.mockRejectedValueOnce(new Error('Invalid credentials'))
      const store = createTestStore()
      await store.dispatch(login({ email: 'bad@example.com', password: 'wrong' }))
      const state = store.getState().auth
      expect(state.status).toBe('failed')
      expect(state.error).toBeTruthy()
      expect(state.isAuthenticated).toBe(false)
    })
  })

  describe('fetchMe thunk', () => {
    it('handles fulfilled fetchMe', async () => {
      const store = createTestStore()
      await store.dispatch(fetchMe())
      const state = store.getState().auth
      expect(state.status).toBe('succeeded')
      expect(state.user).toEqual(mockUser)
      expect(state.isAuthenticated).toBe(true)
    })

    it('clears session when fetchMe fails without existing session', async () => {
      authApiMocks.fetchMe.mockRejectedValueOnce(new Error('Unauthorized'))
      const store = createTestStore()
      await store.dispatch(fetchMe())
      const state = store.getState().auth
      expect(state.status).toBe('failed')
      expect(state.isAuthenticated).toBe(false)
      expect(state.user).toBeNull()
      expect(httpClientMocks.clearSession).toHaveBeenCalled()
    })

    it('preserves session when fetchMe fails but user already authenticated', async () => {
      const existing = {
        ...getInitialState(),
        isAuthenticated: true,
        user: mockUser,
        status: 'succeeded' as const,
      }
      authApiMocks.fetchMe.mockRejectedValueOnce(new Error('Unauthorized'))
      const next = authReducer(existing, {
        type: fetchMe.rejected.type,
        payload: 'Unauthorized',
      })
      expect(next.isAuthenticated).toBe(true)
      expect(next.user).toEqual(mockUser)
    })
  })

  describe('logout thunk', () => {
    it('clears auth state on logout', async () => {
      const store = createTestStore({
        auth: {
          user: mockUser,
          isAuthenticated: true,
          status: 'succeeded',
          error: null,
        },
      })
      await store.dispatch(logout())
      const state = store.getState().auth
      expect(state.user).toBeNull()
      expect(state.isAuthenticated).toBe(false)
      expect(state.status).toBe('idle')
      expect(httpClientMocks.clearSession).toHaveBeenCalled()
    })
  })
})
