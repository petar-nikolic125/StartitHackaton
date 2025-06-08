describe('AI wizard simulation', () => {
  it('runs through the wizard and starts a simulation', () => {
    cy.intercept('POST', '**/pricing', { tiers: [{ label: 'Starter', price: 10 }] });
    cy.intercept('POST', '**/marketing', {
      captions: ['Great course!'],
      hashtags: ['#launch']
    });
    cy.intercept('POST', '/api/simulation/start', {
      simId: 'sim123',
      weekPlan: { tasks: ['task1'] },
      forecast: { months: [] }
    });
    cy.intercept('POST', '/api/simulation/next-step', {
      updatedPlan: { tasks: ['task2'] },
      forecast: { months: [] },
      advice: 'keep going'
    });

    cy.visit('/');
    cy.contains('Launch with AI').first().click();

    // Fill business info
    cy.contains('Your niche').parent().find('input').type('ai');
    cy.contains('Product type').parent().find('select').select('video');
    cy.contains('Target price range').parent().find('select').select('$0-49');
    cy.contains('Next').click();

    // Pricing step should load tiers
    cy.get('ul li').should('have.length', 1);
    cy.contains('Next').click();

    // Idea step
    cy.contains('Describe your business idea in detail');
    cy.get('textarea').type('My awesome idea.');
    cy.contains('Next').click();

    // Marketing step should show captions/hashtags
    cy.contains('Captions');
    cy.contains('Hashtags');
    cy.contains('Next').click();

    // Review then launch
    cy.contains('Launch').click();

    // Simulation runner appears
    cy.contains('Week 1');
    cy.contains('Next Week').click();
    cy.contains('keep going');
  });
});
