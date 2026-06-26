# 01 — Installation

## Packages installed

### Vitest + React Testing Library

```bash
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/coverage-v8
```

| Package | Role |
|---------|------|
| `vitest` | Test runner (Jest-compatible API) |
| `jsdom` | Browser-like DOM for unit/component tests |
| `@testing-library/react` | Render components and hooks |
| `@testing-library/jest-dom` | DOM matchers (`toBeInTheDocument`, etc.) |
| `@testing-library/user-event` | Realistic keyboard/mouse simulation |
| `@vitest/coverage-v8` | Code coverage via V8 |

### Cypress

```bash
npm install -D cypress start-server-and-test
```

| Package | Role |
|---------|------|
| `cypress` | End-to-end browser tests |
| `start-server-and-test` | Starts Vite dev server before headless Cypress |

## npm scripts

Added to [`package.json`](../../../package.json):

| Script | Command |
|--------|---------|
| `test` | `vitest` — watch mode |
| `test:run` | `vitest run` — single run |
| `test:coverage` | `vitest run --coverage` |
| `test:integration` | `vitest run --config vitest.integration.config.ts` |
| `cy:open` | `cypress open` — interactive runner |
| `cy:run` | `cypress run --spec "cypress/e2e/smoke/**/*.cy.ts"` |
| `test:e2e` | `start-server-and-test dev http://localhost:5173 cy:run` |
| `test:e2e:live` | Starts dev server, runs `cypress/e2e/live/**/*.cy.ts` |
| `test:all` | `npm run test:run && npm run test:e2e` |

## Verify installation

```bash
npm run test:run    # expect 77 passing unit/component tests
npm run test:e2e    # expect 5 passing smoke E2E tests
```

Integration and live E2E tests skip automatically when the backend is unreachable.
