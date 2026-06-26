# 03 — Cypress configuration

## `cypress.config.ts`

| Setting | Value |
|---------|-------|
| `baseUrl` | `http://localhost:5173` |
| `specPattern` | `cypress/e2e/**/*.cy.ts` |
| `supportFile` | `cypress/support/e2e.ts` |
| `env.apiUrl` | `http://localhost:3000/api/v1` |

### Node task: `checkApiHealth`

Live specs call `cy.task('checkApiHealth')` to probe `http://localhost:3000/api/v1/health`. If the backend is down, live tests skip instead of failing.

## Folder layout

```
cypress/
├── e2e/
│   ├── smoke/           # Mock API — always runnable
│   │   ├── navigation.cy.ts
│   │   ├── auth-guards.cy.ts
│   │   └── not-found.cy.ts
│   └── live/            # Real API — requires backend
│       └── auth.cy.ts
├── fixtures/
│   └── users.json       # Live login credentials
├── support/
│   ├── e2e.ts           # Imports commands
│   └── commands.ts      # Custom commands
└── tsconfig.json
```

## Smoke vs live specs

| Folder | API | npm script | When to use |
|--------|-----|------------|-------------|
| `e2e/smoke/` | `cy.intercept` mocks | `npm run test:e2e` | CI, local without backend |
| `e2e/live/` | Real backend via Vite proxy | `npm run test:e2e:live` | Full auth cookie flow |

## `start-server-and-test`

`test:e2e` runs:

1. `npm run dev` (Vite on port 5173)
2. Waits for HTTP 200 at `http://localhost:5173`
3. Runs `cy:run` (smoke specs only)

If port 5173 is already in use (dev server running), the helper still connects to the existing server.

## Interactive mode

```bash
npm run cy:open
```

Pick a spec from the Cypress UI. Ensure the dev server is running (`npm run dev`) or use `test:e2e` for headless runs.

## `.gitignore` recommendation

Add if not present:

```
cypress/screenshots/
cypress/videos/
cypress/downloads/
```
