class HomePage {
  constructor() {
    this.elements = {
      searchBox: '.search-box, [data-testid="suggestion"], #search-app input',
    };
  }

  getSearchBox() {
    return this.elements.searchBox;
  }
}

export default HomePage;
