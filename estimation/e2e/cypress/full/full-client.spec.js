describe('The client connection', function() {
  it('should participate in an estimation round', function() {
    cy.visit('/');
    cy.getByPlaceholderText(/channel/)
      .click()
      .type('TestChannel');
    cy.getByPlaceholderText(/name/i)
      .click()
      .type('TestClient');

    // enter an estimation
    cy.readFile('events/hostconnected');
    cy.getByText(/join/i).click();
    cy.getByText(/Listen/i).should('exist');
    cy.writeFile('events/client1connected', 'connected');

    // wait for estimation cards and click option 3
    // choose
    cy.getByText('3')
      .closest('button')
      .click('topRight', { force: true });
    // select
    cy.getByText('3')
      .closest('button')
      .click('topRight', { force: true });
    cy.writeFile('events/client1choosen', 'choosen');
  });
});
