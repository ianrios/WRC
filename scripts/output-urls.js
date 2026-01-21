const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://whyrecord.com';

// Read the generated routes
const routesPath = path.join(__dirname, '..', 'routes.json');
const routes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));

// Convert to full URLs and output as space-delimited string
const fullUrls = routes.map(route => `${BASE_URL}${route}`);
console.log(fullUrls.join(' '));
