describe('live auth flow', { tags: ['@live'] }, () => {
  before(function () {
    cy.task('checkApiHealth', null, { timeout: 5000 }).then((healthy) => {
      if (!healthy) {
        this.skip()
      }
    })
  })

  it('logs in with real API and reaches dashboard', () => {
    cy.fixture('users').then((users) => {
      cy.loginLive(users.admin.email, users.admin.password)
    })
    cy.contains(/dashboard/i).should('exist')
  })
})
