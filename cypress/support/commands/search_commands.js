import HomePage from '../../e2e/pages/HomePage';
import SearchResultsPage from '../../e2e/pages/SearchResultsPage';

const homePage = new HomePage();
const searchResultsPage = new SearchResultsPage();

// Search-related custom commands
/**
 * @memberof cy
 * @method searchProduct
 * @description Performs a basic search operation
 * @param {string} searchTerm - The term to search for
 */
Cypress.Commands.add('searchProduct', searchTerm => {
  cy.get(homePage.getSearchBox()).should('be.visible').clear().type(`${searchTerm}`);
});

/**
 * @memberof cy
 * @method verifySearchResults
 * @description Verifies that search results are displayed
 * @param {string} product - The product to search for
 */
Cypress.Commands.add('verifySearchResults', product => {
  cy.url().should('include', product);
  // Verify at least one result appears
  cy.get(searchResultsPage.getSearchResults())
    .should('have.length.greaterThan', 0)
    .and('be.visible');
});

/**
 * @memberof cy
 * @method verifyPagination
 * @description Pagination navigation functionality
 */
Cypress.Commands.add('verifyPagination', () => {
  cy.get(searchResultsPage.getPaginationNext()).click();
  // Wait for next page results to load
  cy.get(searchResultsPage.getSearchResults()).should('have.length.greaterThan', 0);
  // Go back if previous button exists
  cy.get(searchResultsPage.getPaginationPrevious()).click();
  // Wait for previous page results to load
  cy.get(searchResultsPage.getSearchResults()).should('have.length.greaterThan', 0);
});

/**
 * @memberof cy
 * @method verifyNoSearchResults
 * @description Verifies no search results message and that search term is mentioned
 * @param {string} searchTerm - The search term that was not found
 */
Cypress.Commands.add('verifyNoSearchResults', searchTerm => {
  cy.get(searchResultsPage.getNoResultsMessage())
    .should('be.visible')
    .should('contain.text', searchTerm)
    .should('contain.text', 'aramanız için ürün bulunamadı');
});

/**
 * @memberof cy
 * @method verifyNoResultsForSpecialChars
 * @description Verifies no search results message for special characters
 * @param {string} searchTerm - The special character search term that was not found
 */
Cypress.Commands.add('verifyNoResultsForSpecialChars', searchTerm => {
  cy.get(searchResultsPage.getNoResultsForSpecialChars())
    .should('be.visible')
    .should('contain.text', `"${searchTerm}" aramanız için sonuç bulunamadı`);
});

/**
 * @memberof cy
 * @method verifySearchKeywordInDescription
 * @description Verifies search keyword appears in product descriptions
 * @param {string} searchTerm - The search term to verify
 */
Cypress.Commands.add('verifySearchKeywordInDescription', searchTerm => {
  // Check if search term appears in product descriptions
  cy.get(searchResultsPage.getProductDescriptions())
    .should('exist')
    .then($elements => {
      let foundKeyword = false;

      Array.from($elements).forEach(element => {
        const text = element.textContent.trim();
        const containsKeyword = text.toLowerCase().includes(searchTerm.toLowerCase());

        if (containsKeyword) {
          foundKeyword = true;
          cy.log(`Contains "${searchTerm}" in this description: "${text}"`);
        } else {
          cy.log(`Doesn't contain "${searchTerm}" in this description: "${text}"`);
        }
      });

      expect(foundKeyword).to.be.true;
    });
});

/**
 * @memberof cy
 * @method applyPriceFilter
 * @description Applies price filter with min and max values
 * @param {number} minPrice - Minimum price value
 * @param {number} maxPrice - Maximum price value
 */
Cypress.Commands.add('applyPriceFilter', (minPrice, maxPrice) => {
  // Enter minimum price
  cy.get(searchResultsPage.getPriceFilterMinInput())
    .should('be.visible')
    .clear()
    .type(minPrice.toString());

  // Enter maximum price
  cy.get(searchResultsPage.getPriceFilterMaxInput())
    .should('be.visible')
    .clear()
    .type(maxPrice.toString());

  // Click search button
  cy.get(searchResultsPage.getPriceFilterSearchButton()).click();

  // Wait for filtered results to load
  cy.get(searchResultsPage.getSearchResults()).should('have.length.greaterThan', 0);
});

/**
 * @memberof cy
 * @method verifyPriceRange
 * @description Verifies that product prices are within the specified range
 * @param {number} minPrice - Minimum price value
 * @param {number} maxPrice - Maximum price value
 */
Cypress.Commands.add('verifyPriceRange', (minPrice, maxPrice) => {
  cy.get(searchResultsPage.getProductPrices())
    .should('exist')
    .then($priceElements => {
      let pricesInRange = 0;
      let totalPrices = 0;

      Array.from($priceElements).forEach(element => {
        const priceText = element.textContent.trim();
        // Extract price number from text like
        const priceMatch = priceText.match(/[\d.,]+/);

        if (priceMatch) {
          // Convert Turkish price format to number (2.357,91 -> 2357.91)
          const priceNumber = parseFloat(priceMatch[0].replace(/\./g, '').replace(',', '.'));
          totalPrices++;

          if (priceNumber >= minPrice && priceNumber <= maxPrice) {
            pricesInRange++;
            cy.log(
              `Price ${priceNumber} TL is within range ${minPrice}-${maxPrice}: "${priceText}"`
            );
          } else {
            cy.log(
              `Price ${priceNumber} TL is outside range ${minPrice}-${maxPrice}: "${priceText}"`
            );
          }
        }
      });
      expect(pricesInRange).to.be.greaterThan(0);
    });
});
