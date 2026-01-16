const fs = require('fs');
const path = require('path');

// Read data files
const artistData = require('../src/constants/artistData.json');
const releaseData = require('../src/constants/releaseData.json');

// Generate routes
const routes = [
  '/',
  '/artists',
  '/releases',
  '/products',
  '/collections',
  '/contests',
  '/contact',
  '/nexus',
];

// Add artist routes
artistData.forEach(artist => {
  if (artist.local_path) {
    routes.push(`/artist/${artist.local_path}`);
  }
});

// Add release routes
releaseData.forEach(release => {
  if (release.local_path) {
    routes.push(`/release/${release.local_path}`);
  }
});

// Write to a JSON file that react-snap can use
const outputPath = path.join(__dirname, '..', 'routes.json');
fs.writeFileSync(outputPath, JSON.stringify(routes, null, 2));

console.log(`✓ Generated ${routes.length} routes for pre-rendering`);
