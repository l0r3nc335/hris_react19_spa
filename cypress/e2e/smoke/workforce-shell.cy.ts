describe('workforce auth branding', () => {
  beforeEach(() => {
    cy.mockUnauthenticated()
  })

  it('shows Workforce sign-in shell', () => {
    cy.visitRoute('/auth/login')
    cy.contains(/Workforce Management/i).should('be.visible')
    cy.contains('button', /Sign in/i).should('be.visible')
  })
})
