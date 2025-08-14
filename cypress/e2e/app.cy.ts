describe('Dashboard App', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the main page', () => {
    // Wait for Angular to be ready
    cy.waitForAngular()

    // Check if the app loads
    cy.get('app-root').should('exist')

    // Check if the main content is visible
    cy.get('main').should('be.visible')
  })

  it('should have proper page title', () => {
    cy.title().should('contain', 'Dashboard')
  })

  it('should load without console errors', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('consoleError')
    })

    cy.visit('/')
    cy.waitForAngular()

    cy.get('@consoleError').should('not.be.called')
  })
})
