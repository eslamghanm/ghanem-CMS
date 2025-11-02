describe('Ghanem Dental app', () => {
  it('loads dashboard and navigates', () => {
    cy.visit('/');
    cy.contains('Dashboard');
    cy.contains('Patients').click();
    cy.url().should('include', '/patients');
  });
});

