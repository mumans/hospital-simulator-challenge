describe('Simulation Flow', () => {
  it('completes a full simulation cycle', () => {
    cy.visit('/')
    cy.get('[data-test="fetch-patients"]').click()
    cy.get('[data-test="patient-list"]').should('be.visible')
    cy.get('[data-test="simulate"]').click()
    cy.get('[data-test="simulation-results"]').should('be.visible')
  })
}) 