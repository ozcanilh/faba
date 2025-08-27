describe('E-commerce Search Functionality Tests', () => {
  const product = 'shoes';
  beforeEach(() => {});

  it('Searches for product successfully and verifies results', () => {
    // Search for product
    cy.searchProduct(product);

    // Verify search results include at least one result
    cy.verifySearchResults(product);

    // Verify search product appears in results or product descriptions
    cy.verifySearchKeywordInDescription(product);
  });

  it('Verifies price filters apply correctly', () => {
    const minPrice = 0;
    const maxPrice = 600;
    cy.searchProduct(product);

    // Wait for results to load
    cy.verifySearchResults(product);

    // Apply Price filter
    cy.applyPriceFilter(minPrice, maxPrice);

    cy.verifyPriceRange(minPrice, maxPrice);
  });

  // There is no pagination on trendyol.com for searched products. This scenario is invalid for now.
  it.skip('Verifies pagination works correctly', () => {
    cy.searchProduct(product);

    // Pagination functionality
    cy.verifyPagination();
  });

  it('Verify nonsense query and shows "no results found" message', () => {
    // Search for nonsense term
    const nonsenseQuery = 'invalidproduct';
    cy.searchProduct(nonsenseQuery);

    // Verify no results message appears
    cy.verifyNoSearchResults(nonsenseQuery);
  });

  it('Verify empty search query', () => {
    cy.searchProduct(' '); // Empty/space search

    // Verify suggestion container appears
    cy.get('data-testid="suggestions-container"').should('be.visible')
  });

  it('Verify special characters in search', () => {
    const specialChars = ['!@#$%^&*()'];

    specialChars.forEach(chars => {
      cy.searchProduct(chars);
      
      // Verify no results message appears for special characters
      cy.verifyNoResultsForSpecialChars(chars);
    });
  });

  it('Handles Unicode and international characters', () => {
    const unicodeQueries = ['测试'];

    unicodeQueries.forEach(query => {
      cy.searchProduct(query);

      // Verify no results message appears
      cy.verifyNoSearchResults(query);
    });
  });

  it('Handles SQL injection attempts', () => {
    const sqlInjections = [
      "'; DROP TABLE products; --",
      "' OR '1'='1",
      "1' UNION SELECT * FROM users--"
    ];
    sqlInjections.forEach(injection => {
      cy.searchProduct(injection);
    });
  });
});
