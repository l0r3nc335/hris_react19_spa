# 06 — Running tests

## Local development

### Unit and component tests

```bash
npm test              # watch mode — re-runs on file change
npm run test:run      # single run (CI-friendly)
npm run test:coverage # with V8 coverage report
```

Run a single file:

```bash
npx vitest run src/slices/authSlice.test.ts
```

### Integration tests (live API)

**Prerequisites:**

1. Backend running on `http://localhost:3000`
2. Database seeded (`admin@hris.com` / `password` per auth manual)

```bash
npm run test:integration
```

Tests skip automatically if `http://localhost:3000/api/v1/health` is unreachable.

### Cypress smoke E2E (mock API)

```bash
npm run test:e2e
```

Starts Vite (or uses existing server on 5173), runs smoke specs with `cy.intercept`.

### Cypress live E2E

**Prerequisites:** Backend + seeded DB (same as integration).

```bash
npm run test:e2e:live
```

### Full suite

```bash
npm run test:all    # unit + smoke E2E
```

## CI recommendations

| Job | Command | Backend required |
|-----|---------|------------------|
| Unit | `npm run test:run` | No |
| Smoke E2E | `npm run test:e2e` | No |
| Integration | `npm run test:integration` | Yes (optional job) |
| Live E2E | `npm run test:e2e:live` | Yes (optional job) |

Default CI pipeline should run `test:run` + `test:e2e` only.

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `ECONNREFUSED` in integration tests | Backend not running | Start API on `:3000` or expect tests to skip |
| Cypress can't connect to `localhost:5173` | Dev server not started | Run `npm run dev` or use `test:e2e` |
| Port 5173 in use | Another Vite instance | Stop extra servers or let `start-server-and-test` use existing |
| `matchMedia` errors in tests | Missing mock | Ensure `src/test/setup.ts` is loaded |
| Auth slice tests leak state | httpClient module state | Import `@/test/mocks/httpClient`; call `resetHttpClientMocks()` |
| 502 on `/api` in live tests | Backend down | See [3_AUTHENTICATION_HTTP_ONLY_SETUP.md](../manual/3_AUTHENTICATION_HTTP_ONLY_SETUP.md) |
| 403 CSRF in browser/live tests | Wrong `VITE_API_BASE_URL` | Use empty value in `.env` for browser dev; proxy via Vite |
| Integration tests pass but live Cypress fails | Credentials / seed | Verify `admin@hris.com` / `password` in `cypress/fixtures/users.json` |

## Environment variables

| Variable | Unit tests | Integration | Browser / Cypress |
|----------|------------|-------------|-------------------|
| `VITE_API_BASE_URL` | Empty (default) | `http://localhost:3000` (via integration config) | Empty — use Vite proxy |

## Coverage

```bash
npm run test:coverage
```

Report output: `coverage/` directory. No thresholds configured yet; add in `vite.config.ts` `test.coverage` when ready for CI gates.
