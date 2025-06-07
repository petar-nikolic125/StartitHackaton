describe('Wizard simulation flow', () => {
  it('runs through wizard and launches simulation', () => {
    cy.visit('/wizard/0');
    cy.get('input[aria-label="Your niche"]').type('ai');
    cy.get('input[aria-label="Product type"]').type('video');
    cy.get('select[aria-label="Target price range"]').select('$');
    cy.contains('Next').click();
    cy.contains('Next').click();
    cy.contains('Next').click();
    cy.contains('Launch').click();
    cy.contains('Launching your AI Simulation').should('be.visible');
  });
});
