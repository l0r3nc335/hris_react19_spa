describe('auth guards', () => {
  beforeEach(() => {
    cy.mockUnauthenticated()
  })

  it('redirects unauthenticated users from dashboard to login', () => {
    cy.visitRoute('/dashboard')
    cy.url().should('include', '/auth/login')
  })

  it('shows login page for auth routes', () => {
    cy.visitRoute('/auth/login')
    cy.contains('Sign in').should('be.visible')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
  })
})
