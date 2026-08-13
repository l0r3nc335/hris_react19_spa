import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as authApi from '@/services/api/authApi'
import { clearSession, setTenantId } from '@/services/httpClient'
import type { User } from '@/types'
import type { RootState } from '@/store'
import { normalizeApiError } from '@/services/errors'

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
}

export const login = createAsyncThunk(
  'auth/login',
  async (payload: authApi.LoginPayload, { rejectWithValue }) => {
    try {
      const res = await authApi.login(payload)
      console.log(res);
      return res
    } catch (e) {
      return rejectWithValue(normalizeApiError(e).message)
    }
  },
)

export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, { rejectWithValue }) => {
  try {
    return await authApi.fetchMe()
  } catch (e) {
    return rejectWithValue(normalizeApiError(e).message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await authApi.logout()
  } catch {
    // Server logout is best-effort; always sign out locally below.
  } finally {
    clearSession()
    setTenantId(null)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null
    },
    startSessionRestore(state) {
      state.status = 'loading'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.isAuthenticated = true
        setTenantId(action.payload.user.tenantId)
      })
      // LOGIN RELATED ERROR STATE ASSIGNMENT
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = (action.payload as string) ?? 'Login failed'
      })
      .addCase(fetchMe.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.isAuthenticated = true
        setTenantId(action.payload.tenantId)
      })
      .addCase(fetchMe.rejected, (state) => {
        state.status = 'failed'
        if (state.isAuthenticated && state.user) return
        state.isAuthenticated = false
        state.user = null
        clearSession()
        setTenantId(null)
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
        state.status = 'idle'
      })
  },
})

export const { clearAuthError, startSessionRestore } = authSlice.actions
export const authReducer = authSlice.reducer
export const selectAuth = (state: RootState): AuthState => state.auth
export const selectUser = (state: RootState): User | null => state.auth.user
export const selectIsAuthenticated = (state: RootState): boolean => state.auth.isAuthenticated
export const selectAuthStatus = (state: RootState): AuthState['status'] => state.auth.status
