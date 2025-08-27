import http from 'k6/http';
import { check, sleep } from 'k6';

// Simple load test - 1000 requests
export const options = {
  vus: 50,          // 50 virtual users
  duration: '2m',   // Run for 2 minutes (will generate ~1000+ requests)
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% requests under 500ms
    http_req_failed: ['rate<0.1'],     // Less than 10% errors
  },
};

const BASE_URL = 'http://localhost:3001';
const searchTerms = ['nike', 'adidas', 'puma'];

export default function () {
  const searchTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
  const url = `${BASE_URL}/api/search?q=${searchTerm}`;
  
  const response = http.get(url);
  
  // Check response
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'has product': (r) => {
      try {
        const json = JSON.parse(r.body);
        return json.hasOwnProperty('product');
      } catch (e) {
        return false;
      }
    },
    'query parameter matches': (r) => {
      try {
        const json = JSON.parse(r.body);
        return json.query === searchTerm;
      } catch (e) {
        return false;
      }
    },
    'product has name': (r) => {
      try {
        const json = JSON.parse(r.body);
        return json.product && json.product.hasOwnProperty('name') && json.product.name.length > 0;
      } catch (e) {
        return false;
      }
    },
    'product has price': (r) => {
      try {
        const json = JSON.parse(r.body);
        return json.product && json.product.hasOwnProperty('price') && typeof json.product.price === 'number';
      } catch (e) {
        return false;
      }
    },
    'product has brand': (r) => {
      try {
        const json = JSON.parse(r.body);
        return json.product && json.product.hasOwnProperty('brand') && json.product.brand.length > 0;
      } catch (e) {
        return false;
      }
    },
    'response has timestamp': (r) => {
      try {
        const json = JSON.parse(r.body);
        return json.hasOwnProperty('timestamp') && typeof json.timestamp === 'number';
      } catch (e) {
        return false;
      }
    },
  });
  
  sleep(1); // 1 second think time
}
