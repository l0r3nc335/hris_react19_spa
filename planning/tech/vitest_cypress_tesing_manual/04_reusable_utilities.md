# 04 — Reusable test utilities

Shared infrastructure lives in `src/test/`. Import these when adding new tests.

## `renderWithProviders` — `src/test/utils.tsx`

Wraps a component with Redux, TanStack Query, and React Router.

```tsx
import { renderWithProviders } from '@/test/utils'
import { MyPage } from '@/modules/foo/pages/MyPage'
import { mockRootState } from '@/test/fixtures'

const { store } = renderWithProviders(<MyPage />, {
  preloadedState: mockRootState({
    auth: { isAuthenticated: true, status: 'succeeded' },
  }),
  initialEntries: ['/my-route'],
  routePath: '/my-route',
})
```

### Options

| Option | Default | Purpose |
|--------|---------|---------|
| `preloadedState` | — | Partial Redux `RootState` |
| `initialEntries` | `['/']` | Router history |
| `routePath` | `'/'` | Route pattern for `Routes` |
| `queryClient` | Fresh client, no retries | Override QueryClient |

## `renderHookWithProviders`

Same providers for custom hooks:

```tsx
import { renderHookWithProviders } from '@/test/utils'
import { useMyHook } from '@/hooks/useMyHook'

const { result } = renderHookWithProviders(() => useMyHook(), {
  preloadedState: mockRootState(),
})
```

## `createTestStore`

For thunk/slice tests without rendering:

```ts
import { createTestStore } from '@/test/utils'

const store = createTestStore({ auth: { status: 'loading' } })
await store.dispatch(myThunk())
```

## Fixtures — `src/test/fixtures.ts`

| Export | Purpose |
|--------|---------|
| `mockUser` | Standard user with `users:read` |
| `mockAdminUser` | Admin role (all permissions) |
| `mockAuthState(overrides)` | Auth slice defaults |
| `mockUiState(overrides)` | UI slice defaults |
| `mockRootState({ auth, ui })` | Full store preloaded state |

## Route / permission matrices — `src/test/helpers/routeCases.ts`

Data-driven test inputs:

```ts
import { KNOWN_PUBLIC_ROUTES, UNKNOWN_ROUTES, PERMISSION_MATRIX } from '@/test/helpers/routeCases'

it.each(KNOWN_PUBLIC_ROUTES)('is known: %s', (path) => {
  expect(isKnownRoute(path)).toBe(true)
})
```

Extend `PERMISSION_MATRIX` when new permissions are added.

## API mocks

### `src/test/mocks/authApi.ts`

```ts
import '@/test/mocks/authApi'
import { authApiMocks, setupDefaultAuthApiMocks } from '@/test/mocks/authApi'

beforeEach(() => setupDefaultAuthApiMocks())

authApiMocks.login.mockRejectedValueOnce(new Error('fail'))
```

### `src/test/mocks/httpClient.ts`

```ts
import '@/test/mocks/httpClient'
import { httpClientMocks, resetHttpClientMocks } from '@/test/mocks/httpClient'

beforeEach(() => resetHttpClientMocks())
```

Use in slice tests to avoid real HTTP and module-level tenant side effects.

## Integration helpers — `src/test/integration/helpers.ts`

| Function | Purpose |
|----------|---------|
| `canReachApi()` | `fetch` health endpoint; returns boolean |
| `seedAuthFromApi(credentials?)` | CSRF + login via real `httpClient`; sets tenant |

```ts
const apiAvailable = await canReachApi()
describe.skipIf(!apiAvailable)('my integration test', () => { ... })
```

## Cypress commands — `cypress/support/commands.ts`

| Command | Purpose |
|---------|---------|
| `cy.visitRoute(path)` | Visit path, assert body visible |
| `cy.mockUnauthenticated()` | Intercept CSRF + `/auth/me` → 401 |
| `cy.mockAuthSession(user?)` | Intercept CSRF, login, `/auth/me` → user |
| `cy.loginLive(email, password)` | Real login through Vite proxy |

### Example: new smoke spec

```ts
describe('users list', () => {
  beforeEach(() => {
    cy.mockAuthSession()
    cy.visitRoute('/users')
    cy.wait('@me')
  })

  it('shows the page shell', () => {
    cy.contains('Users').should('be.visible')
  })
})
```

## Component test template

```tsx
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/utils'
import { mockRootState } from '@/test/fixtures'

describe('MyComponent', () => {
  it('renders when authenticated', () => {
    renderWithProviders(<MyComponent />, {
      preloadedState: mockRootState({
        auth: { isAuthenticated: true, status: 'succeeded' },
      }),
    })
    expect(screen.getByText('Expected')).toBeInTheDocument()
  })
})
```
