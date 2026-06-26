import { configureStore, type PreloadedState } from '@reduxjs/toolkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, renderHook, type RenderOptions as RtlRenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { rootReducer } from '@/store/rootReducer'
import type { AppStore, RootState } from '@/store'

export interface RenderWithProvidersOptions extends Omit<RtlRenderOptions, 'wrapper'> {
  preloadedState?: PreloadedState<RootState>
  initialEntries?: string[]
  routePath?: string
  queryClient?: QueryClient
}

export function createTestStore(preloadedState?: PreloadedState<RootState>): AppStore {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}

function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    initialEntries = ['/'],
    routePath = '/',
    queryClient = createTestQueryClient(),
    ...renderOptions
  }: RenderWithProvidersOptions = {},
) {
  const store = createTestStore(preloadedState)

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={initialEntries}>
            <Routes>
              <Route path={routePath} element={children} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    )
  }

  return {
    store,
    queryClient,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}

export function renderHookWithProviders<Result, Props>(
  hook: (props: Props) => Result,
  {
    preloadedState,
    initialEntries = ['/'],
    queryClient = createTestQueryClient(),
  }: Omit<RenderWithProvidersOptions, 'routePath'> = {},
) {
  const store = createTestStore(preloadedState)

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
        </QueryClientProvider>
      </Provider>
    )
  }

  return {
    store,
    queryClient,
    ...renderHook(hook, { wrapper: Wrapper }),
  }
}

export function createMemoryRouterWrapper(initialEntries: string[] = ['/']) {
  return function MemoryRouterWrapper({ children }: { children: ReactNode }) {
    return <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  }
}
