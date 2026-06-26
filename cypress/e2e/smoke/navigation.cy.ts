describe('public navigation', () => {
  beforeEach(() => {
    cy.mockUnauthenticated()
  })

  const publicPages = [
    { path: '/', label: 'landing' },
    { path: '/about', label: 'about' },
    { path: '/pricing', label: 'pricing' },
    { path: '/contact-us', label: 'contact' },
  ]

  it('loads public pages', () => {
    publicPages.forEach(({ path }) => {
      cy.visitRoute(path)
      cy.get('header').should('be.visible')
    })
  })

  it('navigates via navbar links', () => {
    cy.visitRoute('/')
    cy.contains('a', 'About').click()
    cy.url().should('include', '/about')
    cy.contains('a', 'Pricing').click()
    cy.url().should('include', '/pricing')
  })
})
