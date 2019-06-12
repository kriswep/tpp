describe('The App should load', function() {
  it('successfully loads', function() {
    cy.visit('/');
    cy.queryByText(/Team Estimation/i).should('exist');
  });
});
