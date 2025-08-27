class SearchResultsPage {
  constructor() {
    this.elements = {
      searchResults: '.p-card-wrppr',
      productDescriptions: '.prdct-desc-cntnr-name, .product-desc-sub-text, .prdct-desc-cntnr-ttl',
      noResultsMessage: '.dscrptn.dscrptn-V2',
      noResultsForSpecialChars: '.no-rslt-text.no-rslt-title',
      paginationNext: 'a[aria-label="Go to next page"]',
      paginationPrevious: 'a[aria-label="Go to previous page"]',
      priceFilterMinInput: '.fltr-srch-prc-rng-input.min',
      priceFilterMaxInput: '.fltr-srch-prc-rng-input.max',
      priceFilterSearchButton: '.fltr-srch-prc-rng-srch',
      productPrices: '.price-information .price-item',
    };
  }

  getSearchResults() {
    return this.elements.searchResults;
  }

  getNoResultsMessage() {
    return this.elements.noResultsMessage;
  }

  getNoResultsForSpecialChars() {
    return this.elements.noResultsForSpecialChars;
  }

  getPaginationNext() {
    return this.elements.paginationNext;
  }

  getPaginationPrevious() {
    return this.elements.paginationPrevious;
  }

  getProductDescriptions() {
    return this.elements.productDescriptions;
  }

  getPriceFilterMinInput() {
    return this.elements.priceFilterMinInput;
  }

  getPriceFilterMaxInput() {
    return this.elements.priceFilterMaxInput;
  }

  getPriceFilterSearchButton() {
    return this.elements.priceFilterSearchButton;
  }

  getProductPrices() {
    return this.elements.productPrices;
  }
}

export default SearchResultsPage;
