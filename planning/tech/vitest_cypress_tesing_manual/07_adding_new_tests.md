# 07 — Adding new tests

Use this checklist when shipping new features.

## New pure utility or constant

1. Add `src/<path>/<module>.test.ts` next to the source file
2. Prefer data-driven tests with arrays in `src/test/helpers/` when multiple cases share logic
3. No mocks needed — keep tests fast

```ts
// src/utils/myUtil.test.ts
import { describe, expect, it } from 'vitest'
import { myUtil } from './myUtil'

describe('myUtil', () => {
  it('handles the happy path', () => {
    expect(myUtil('input')).toBe('output')
  })
})
```

## New Redux slice or reducer

1. Add fixtures to `src/test/fixtures.ts` if new state shape
2. Add `src/slices/mySlice.test.ts`
3. Mock HTTP via `@/test/mocks/authApi` or `@/test/mocks/httpClient` if thunks touch the network
4. Use `createTestStore` for async thunk dispatch tests

## New custom hook

1. Add `src/hooks/useMyHook.test.ts`
2. Use `renderHookWithProviders` with `mockRootState`
3. For permission-like hooks, extend `PERMISSION_MATRIX` in `routeCases.ts`

## New form with Zod schema

1. Add or extend `src/modules/<domain>/schemas.test.ts`
2. Test valid payloads, field errors, and `.refine()` rules

## New page or layout component

1. Add `src/.../MyPage.test.tsx`
2. Use `renderWithProviders` with appropriate `initialEntries` and `routePath`
3. Query by role/label — avoid implementation details
4. Mock heavy children or lazy imports with `vi.mock` when needed

## New protected route

1. Extend `src/routes/protectedRoute.test.tsx` or add route-specific test
2. Add Cypress smoke spec under `cypress/e2e/smoke/` using `cy.mockAuthSession()`

## New API domain (future CRUD modules)

1. Add API mock in `src/test/mocks/<domain>Api.ts` following `authApi.ts` pattern
2. Add slice/query tests with mocked API
3. Add smoke E2E with `cy.intercept` for list/create flows
4. Add live integration test in `src/test/integration/` only if contract testing is needed

## New Cypress E2E spec

1. **Smoke (default):** Place in `cypress/e2e/smoke/`; use `cy.mockAuthSession()` or `cy.mockUnauthenticated()`
2. **Live (optional):** Place in `cypress/e2e/live/`; gate with `cy.task('checkApiHealth')`
3. Reuse commands from `cypress/support/commands.ts` — add new commands there, not inline in specs

## Documentation

When adding a new test area:

1. Add row to [05_test_catalog.md](./05_test_catalog.md)
2. If new reusable helper, document in [04_reusable_utilities.md](./04_reusable_utilities.md)

## Naming conventions

| Type | Pattern | Example |
|------|---------|---------|
| Unit test | `<module>.test.ts(x)` | `routes.test.ts` |
| Integration | `<name>.integration.test.ts(x)` | `auth.integration.test.ts` |
| Cypress | `<feature>.cy.ts` | `navigation.cy.ts` |

## Anti-patterns to avoid

- Do not use `src/store/store.ts` (legacy test store) — use `createTestStore` / production `rootReducer`
- Do not require live API in default CI — use `skipIf` or smoke mocks
- Do not duplicate `renderWithProviders` — extend options in `src/test/utils.tsx`
- Do not test shadcn primitives — test app behavior and business rules
