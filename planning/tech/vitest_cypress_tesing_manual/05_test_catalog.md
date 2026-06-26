# 05 — Test catalog

Every automated test file and what it asserts.

## Vitest — pure logic (Tier 1)

| File | Tests | Key assertions |
|------|-------|----------------|
| `src/constants/routes.test.ts` | `isKnownRoute` | Known public/auth/dashboard paths; unknown paths; trailing slash normalization |
| `src/constants/routeMeta.test.ts` | `getRouteMeta` | Known dashboard meta; trailing slash; default fallback |
| `src/utils/lastKnownRoute.test.ts` | session + back target | Read/write sessionStorage; `resolveNotFoundBackTarget` branches |
| `src/services/errors.test.ts` | `normalizeApiError` | Axios with body; network error; Error; unknown |
| `src/hooks/useTheme.test.ts` | `resolveTheme` | light, dark, system (matchMedia) |
| `src/modules/auth/schemas.test.ts` | Zod schemas | login, register, forgot, reset password validation |

## Vitest — Redux slices (Tier 2)

| File | Tests | Key assertions |
|------|-------|----------------|
| `src/slices/uiSlice.test.ts` | UI reducers | Sidebar, theme, nav groups, lastKnownRoute |
| `src/slices/authSlice.test.ts` | Auth thunks | login/fetchMe/logout flows; session preserve on fetchMe failure |

## Vitest — hooks & components (Tier 3)

| File | Tests | Key assertions |
|------|-------|----------------|
| `src/hooks/usePermission.test.ts` | `usePermission` | Admin bypass; permission matrix; no user |
| `src/routes/protectedRoute.test.tsx` | `ProtectedRoute` | Loading; login redirect; 404 shell; permission gate |
| `src/modules/auth/AuthGate.test.tsx` | `AuthGate` | Loader during restore; children when ready |
| `src/components/NotFoundPage.test.tsx` | `NotFoundPage` | Back link targets (dashboard, landing, last known) |
| `src/bootstrap/auth.test.ts` | `bootstrapAuth` | Handlers registered; session restore; CSRF bootstrap |

## Vitest — integration (Tier 4, optional)

| File | Prerequisite | Key assertions |
|------|--------------|----------------|
| `src/test/integration/auth.integration.test.ts` | Backend `:3000` | `seedAuthFromApi` + `fetchMe` |
| `src/test/integration/LoginPage.integration.test.tsx` | Backend `:3000` | Form submit sets `isAuthenticated` |

Skipped via `describe.skipIf(!apiAvailable)` when health check fails.

## Cypress — smoke (mock API)

| File | Tests | Key assertions |
|------|-------|----------------|
| `cypress/e2e/smoke/navigation.cy.ts` | Public pages | `/`, `/about`, `/pricing`, `/contact-us`; navbar links |
| `cypress/e2e/smoke/auth-guards.cy.ts` | Auth gates | `/dashboard` → login; login form visible |
| `cypress/e2e/smoke/not-found.cy.ts` | 404 | Mock auth; unknown dashboard route shows 404 UI |

## Cypress — live API

| File | Prerequisite | Key assertions |
|------|--------------|----------------|
| `cypress/e2e/live/auth.cy.ts` | Backend `:3000` + seeded user | Real login → dashboard |

Skipped when `checkApiHealth` task returns false.

## When to extend

| Feature added | Extend |
|---------------|--------|
| New route constant | `routes.test.ts`, `routeCases.ts`, optional Cypress smoke |
| New permission | `PERMISSION_MATRIX`, `usePermission.test.ts` |
| New Redux slice | `fixtures.ts`, `slice.test.ts` |
| New Zod form schema | `schemas.test.ts` pattern |
| New protected page | `protectedRoute.test.tsx` or page component test + Cypress smoke |
| New CRUD module | API mock, query hook test, `cy.mockAuthSession` E2E |
