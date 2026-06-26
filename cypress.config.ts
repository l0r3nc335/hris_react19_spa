import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10_000,
    env: {
      apiUrl: 'http://localhost:3000/api/v1',
    },
    setupNodeEvents(on) {
      on('task', {
        async checkApiHealth() {
          try {
            const response = await fetch('http://localhost:3000/api/v1/health')
            return response.ok
          } catch {
            return false
          }
        },
      })
    },
  },
})
