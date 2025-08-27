const express = require('express');
const app = express();
const port = 3001;

// Middleware
app.use(express.json());

// Simple product data
const products = [
  { id: 1, name: 'Nike Shoes', price: 120, brand: 'Nike' },
  { id: 2, name: 'Adidas Shoes', price: 100, brand: 'Adidas' },
  { id: 3, name: 'Puma Shoes', price: 90, brand: 'Puma' }
];

// Single search endpoint
app.get('/api/search', (req, res) => {
  const startTime = Date.now();
  const { q } = req.query;
  
  // Simulate processing delay
  setTimeout(() => {
    if (!q) {
      return res.status(400).json({
        error: 'Search query required',
        timestamp: Date.now()
      });
    }

    const result = products.find(p => 
      p.name.toLowerCase().includes(q.toLowerCase())
    );

    if (!result) {
      return res.status(404).json({
        error: 'Product not found',
        query: q,
        timestamp: Date.now()
      });
    }

    res.json({
      product: result,
      query: q,
      responseTime: Date.now() - startTime,
      timestamp: Date.now()
    });
  }, Math.random() * 200 + 50); // 50-250ms delay
});

app.listen(port, () => {
  console.log(`🚀 API running on http://localhost:${port}`);
  console.log(`🔍 Test: http://localhost:${port}/api/search?q=nike`);
});

module.exports = app;
