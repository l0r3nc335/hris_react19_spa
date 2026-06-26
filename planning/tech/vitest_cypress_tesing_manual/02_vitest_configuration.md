# 02 — Vitest configuration

## Main config — `vite.config.ts`

Vitest extends the Vite config so `@` path aliases, React, and Tailwind behave the same in tests.

```ts
/// <reference types="vitest/config" />

test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: ['./src/test/setup.ts'],
  include: ['src/**/*.{test,spec}.{ts,tsx}'],
  exclude: ['src/test/integration/**'],
  css: true,
}
```

| Option | Purpose |
|--------|---------|
| `globals` | Use `describe`, `it`, `expect`, `vi` without imports |
| `environment: 'jsdom'` | DOM APIs for components |
| `setupFiles` | Runs before every test file |
| `exclude` | Integration tests use a separate config |

## TypeScript — `tsconfig.app.json`

```json
"types": ["vite/client", "vitest/globals", "@testing-library/jest-dom"]
```

Enables Vitest globals and jest-dom matcher types in `src/`.

## Global setup — `src/test/setup.ts`

- Imports `@testing-library/jest-dom/vitest`
- Mocks `window.sessionStorage` and `window.matchMedia`
- Runs `cleanup()` and clears mocks after each test

## Integration config — `vitest.integration.config.ts`

Separate config for live-API tests:

- Sets `VITE_API_BASE_URL` to `http://localhost:3000` via `define`
- Includes only `src/test/integration/**/*.integration.test.{ts,tsx}`
- Uses 30s timeouts for network calls

Run with:

```bash
npm run test:integration
```

## Test file locations

| Pattern | Location | Runner |
|---------|----------|--------|
| `*.test.ts(x)` | Co-located next to source in `src/` | Main Vitest config |
| `*.integration.test.ts(x)` | `src/test/integration/` | Integration config |

## File map

```
vite.config.ts                  # test block
vitest.integration.config.ts    # live API tests
tsconfig.app.json               # vitest + jest-dom types
src/test/setup.ts               # global setup
```
