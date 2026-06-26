/// <reference types="cypress" />

export interface MockUser {
  id: string
  tenantId: string
  email: string
  firstName: string
  lastName: string
  role: string
  permissions: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const defaultMockUser: MockUser = {
  id: 'user-1',
  tenantId: 'tenant-1',
  email: 'user@example.com',
  firstName: 'Test',
  lastName: 'User',
  role: 'admin',
  permissions: [],
  isActive: true,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
}

Cypress.Commands.add('visitRoute', (path: string) => {
  cy.visit(path, { failOnStatusCode: false })
  cy.get('body').should('be.visible')
})

Cypress.Commands.add('mockUnauthenticated', () => {
  cy.intercept('GET', '**/api/v1/auth/csrf', {
    statusCode: 200,
    body: { data: { csrfToken: 'test-csrf-token' } },
  }).as('csrf')
  cy.intercept('GET', '**/api/v1/auth/me', { statusCode: 401 }).as('meUnauthorized')
})

Cypress.Commands.add('mockAuthSession', (user: MockUser = defaultMockUser) => {
  cy.intercept('GET', '**/api/v1/auth/csrf', {
    statusCode: 200,
    body: { data: { csrfToken: 'test-csrf-token' } },
  }).as('csrf')

  cy.intercept('POST', '**/api/v1/auth/login', {
    statusCode: 201,
    body: { data: { user } },
  }).as('login')

  cy.intercept('GET', '**/api/v1/auth/me', {
    statusCode: 200,
    body: { data: user },
  }).as('me')

  cy.intercept('POST', '**/api/v1/auth/logout', { statusCode: 200, body: {} }).as('logout')
})

Cypress.Commands.add('loginLive', (email: string, password: string) => {
  cy.visit('/auth/login')
  cy.get('input[type="email"]').clear().type(email)
  cy.get('input[type="password"]').clear().type(password)
  cy.contains('button', /sign in/i).click()
  cy.url().should('include', '/dashboard')
})

declare global {
  namespace Cypress {
    interface Chainable {
      visitRoute(path: string): Chainable<void>
      mockUnauthenticated(): Chainable<void>
      mockAuthSession(user?: MockUser): Chainable<void>
      loginLive(email: string, password: string): Chainable<void>
    }
  }
}

export {}
