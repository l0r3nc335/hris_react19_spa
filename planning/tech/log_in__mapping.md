# LOGIN PAGE

```tsx
    const dispatch = useAppDispatch()
    const onSubmit = (data: LoginFormData): void => {
        void dispatch(login(data))
        .then((result) => {
            if (login.fulfilled.match(result)) navigate(ROUTES.dashboard.dashboard)
        })
        .catch(() => undefined)
    }
```
-------------------------------------------------------------


## Flow

login page 
    -> hooks 
        -> store 
        -> rootReducer 
            -> authSlice 
-> login page.login(payload) 
            -> authSlice.login
                -> authApi.login
                    -> httpClient.post
```ts 
                const res.data.data = await httpClient.post<ApiResponse<LoginResult>>(endpoints.auth.login, payload)
```
----------------------------------------------------------------


##  1 Login Page(`dispatch`) 
```ts  
        const dispatch = useAppDispatch()
        void dispatch(login(data)); 
```


##  2 Hooks/index(`useDispatch<AppDispatch>`)
```ts
        import type { AppDispatch } from '@/store'
        export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
```


##  3 store/index(`store.dispatch`)
```ts
    import { rootReducer } from './rootReducer'
    export const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    })
    //
    export type AppDispatch = typeof store.dispatch
```


## 4 rootReducer(`// dispatch in store/index execute reducer`)
```ts
    import { authReducer } from '@/slices/authSlice' // use the reducer in authSlice.ts
    export const rootReducer = combineReducers({
        auth: authReducer,
        ui: uiReducer,
    })
```

## 5 authSlice.ts
```ts
    export const authReducer = authSlice.reducer //extract reducer
    const authSlice = createSlice({ //reducer is implemented here
        name: 'auth',
        //... reducer, extraReducer
    })
```

##  6 Login Page(` login(data) in dispatch(login(data)) `)
```ts
    // executes the login in authSlice.ts
    export const login = createAsyncThunk(
        'auth/login',
        async (payload: authApi.LoginPayload, { rejectWithValue }) => {
            try {
                return await authApi.login(payload) //pass param and executes the login in  services/api/authApi.ts
            } catch (e) {
                return rejectWithValue(normalizeApiError(e).message)
            }
        },
    )
```


##  7 authSlice.login
```ts
    export const login = createAsyncThunk(
        'auth/login',
        async (payload: authApi.LoginPayload, { rejectWithValue }) => {
            try {
            return await authApi.login(payload)
            } catch (e) {
            return rejectWithValue(normalizeApiError(e).message)
            }
        },
    )
```


##  8 authApi.login
```ts
    export async function login(payload: LoginPayload): Promise<LoginResult> {
        await ensureCsrfReady()
        const res = await httpClient.post<ApiResponse<LoginResult>>(endpoints.auth.login, payload)
        return res.data.data
    }
```