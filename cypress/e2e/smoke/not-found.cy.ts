describe('dashboard not found', () => {
  beforeEach(() => {
    cy.mockAuthSession()
    cy.visitRoute('/dashboard')
    cy.wait('@me')
  })

  it('shows 404 UI for unknown dashboard routes', () => {
    cy.visitRoute('/dashboard/does-not-exist')
    cy.contains('Page not found').should('be.visible')
    cy.contains('a', /go back/i).should('be.visible')
  })
})
