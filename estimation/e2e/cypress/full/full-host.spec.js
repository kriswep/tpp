describe('The host connection', function() {
  it('should host an estimation round', function() {
    cy.visit('/');
    cy.getByPlaceholderText(/channel/)
      .click()
      .type('TestChannel');
    cy.getByPlaceholderText(/name/i)
      .click()
      .type('TestHost');

    // host an estimation
    cy.getByText(/create/i).click();
    cy.getByText(/Explain/i).should('exist');
    cy.writeFile('events/hostconnected', 'connected');

    // start estimation round
    cy.readFile('events/client1connected');
    cy.getByText(/start/i).click();
    cy.getByText(/Wait/i).should('exist');

    // view estimation results
    cy.readFile('events/client1choosen');
    cy.getByText(/finish/i).click();
    cy.getByText(/estimation/i).should('exist');
    cy.getByText(/3/i).should('exist');

    // circle
    cy.getByText(/start/i).click();
    cy.getByText(/Explain/i).should('exist');
    cy.getByText(/start/i).should('exist');
  });
});
