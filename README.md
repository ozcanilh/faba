# E-commerce Search Testing Framework
A simple testing framework for e-commerce search functionality using Cypress and k6 performance testing.

## 📋 Project Features

### What's Included
- **Cypress E2E Testing Framework** with Page Object Model pattern
- **k6 & JMeter Performance Testing** for load and stress testing
- **Multi-device Testing** (mobile 375x667, tablet 768x1024, desktop 1280x720)
- **Cross-browser Support** (Chrome, Electron, Firefox)
- **Custom Commands** for search, filtering, and validation
- **Test Reporting** with Mochawesome HTML reports
- **CI/CD Ready** with GitHub Actions support

## Quick Start
### Prerequisites
- Node.js 16+ 
- npm 
- Chrome/Firefox browser
- k6 (for performance testing)

### Installation
```bash
# Clone repository
git clone <repository-url>
cd faba

# Install dependencies
npm install

# Verify installation
npm run cypress:open
```

## 🧪 Cypress Testing
### Running Tests
#### Interactive Mode (Development)
```bash
# Open Cypress Test Runner
npm run cypress:open

# Device-specific interactive mode
npm run test:mobile:open     # Mobile viewport (375x667)
npm run test:tablet:open     # Tablet viewport (768x1024)
npm run test:desktop:electron:open  # Desktop with Electron
npm run test:desktop:chrome:open    # Desktop with Chrome
```

#### Headless Mode (CI/CD)
```bash
# Run all tests
npm run cypress:run

# Device-specific tests
npm run test:mobile          # Mobile tests
npm run test:tablet          # Tablet tests  
npm run test:desktop         # Desktop tests

# Browser-specific tests
npm run test:desktop:electron    # Electron browser
npm run test:desktop:chrome      # Chrome browser
npm run test:mobile:chrome       # Mobile Chrome

# Cross-platform testing
npm run test:cross-device    # All devices sequentially
npm run test:cross-browser   # Electron + Chrome
```

### Test Structure
```
cypress/
├── e2e/
│   ├── pages/
│   │   ├── homePage.js              # Home page selectors
│   │   └── searchResultsPage.js     # Search results selectors
│   └── tests/
│       └── search.cy.js             # Search functionality tests
├── fixtures/
│   └── searchData.json              # Test data
├── reports/
│   └── mochawesome/                 # Test reports
└── support/
    ├── commands/
    │   └── search_commands.js       # Custom commands
    └── e2e.js                       # Global configuration
```

### Custom Commands
```javascript
// Available custom commands
cy.searchProduct('nike shoes')       // Perform search
cy.verifySearchResults(product)      // Verify results displayed
cy.verifyNoResultsForSpecialChars(chars)  // Verify no results message
cy.applyPriceFilter(min, max)        // Apply price filters
cy.verifyPriceRange(min, max)        // Verify price filtering
cy.verifyPagination()                // Test pagination
```

## ⚡ k6 Performance Testing

### Installation
```bash
# macOS
brew install k6

# Linux
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6

# Windows
choco install k6
```

### Running Performance Tests

**⚠️ Important: Performance tests require API server to be running**

#### Step 1: Start API Server (Terminal 1)
```bash
# Start dummy API server for testing
npm run api:start
# API will be available at http://localhost:3001
```

#### Step 2: Run k6 Tests (Terminal 2)
```bash
# Basic load test
npm run perf:test

# Or directly with k6
k6 run performance/k6/search-load-test.js
```

#### Custom Load Scenarios
```bash
# Load test (100 users, 5 minutes)
k6 run --vus 100 --duration 5m performance/k6/search-load-test.js

# Stress test (200 users, 10 minutes)
k6 run --vus 200 --duration 10m performance/k6/search-load-test.js
```

### JMeter Integration
```bash
# Run JMeter tests
npm run perf:jmeter

# Or directly
./performance/jmeter/run-test.sh

# Generate HTML report
jmeter -g performance/reports/results.jtl -o performance/reports/html-report/
```

### Performance Monitoring
```bash
# Real-time monitoring during tests
k6 run --out statsd performance/k6/search-load-test.js

# Generate performance report
k6 run --out json=performance/reports/results.json performance/k6/search-load-test.js
```

## 📊 Test Reporting

### Generate Reports
```bash
# Generate Cypress HTML reports
npm run test:report

# Clean old reports
npm run clean:reports

# View reports
open cypress/reports/mochawesome/index.html
```

### Report Locations
- **Cypress Reports**: `cypress/reports/mochawesome/`
- **Screenshots**: `cypress/screenshots/`
- **Videos**: `cypress/videos/`
- **Performance Reports**: `performance/reports/`

## Development & Debugging
### Code Formatting
```bash
# Format all files
npm run format

# Check formatting
npm run format:check

# Format only Cypress files
npm run format:cypress
```

### API Testing & Mocking
```bash
# Start dummy API server for testing (required for k6 tests)
npm run api:start
# API will be available at http://localhost:3001
# Keep this running while performing k6 tests
```
