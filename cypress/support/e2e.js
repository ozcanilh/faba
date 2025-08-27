// Import search_commands.js using ES2015 syntax:
import './commands/search_commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

// Global beforeEach
beforeEach(function () {
  cy.visit('https://www.trendyol.com/');
  
  // Handle cookie consent banner if present
  cy.get('#onetrust-reject-all-handler').click();
  
  // Verify page is loaded successfully
  cy.url().should('include', 'trendyol.com');
  cy.get('[data-testid="suggestion"]').should('be.visible');
});
