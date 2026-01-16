const fs = require('fs');
const path = require('path');

// Read data files
const artistData = require('../src/constants/artistData.json');
const releaseData = require('../src/constants/releaseData.json');
const productData = require('../src/constants/productData.json');
const collectionData = require('../src/constants/collectionData.json');
const contestData = require('../src/constants/contestData.json');

const BASE_URL = 'https://whyrecord.com';
const currentDate = new Date().toISOString().split('T')[0];

// Static routes from Routes.js
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/artists', priority: '0.9', changefreq: 'weekly' },
  { path: '/releases', priority: '0.9', changefreq: 'weekly' },
  { path: '/releases/grid', priority: '0.8', changefreq: 'weekly' },
  { path: '/products', priority: '0.8', changefreq: 'monthly' },
  { path: '/collections', priority: '0.8', changefreq: 'monthly' },
  { path: '/contests', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'yearly' },
  { path: '/nexus', priority: '0.6', changefreq: 'monthly' },
  { path: '/information', priority: '0.5', changefreq: 'yearly' },
  { path: '/cookie-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/services', priority: '0.6', changefreq: 'yearly' },
  { path: '/merch', priority: '0.7', changefreq: 'monthly' },
  { path: '/software', priority: '0.6', changefreq: 'monthly' },
  { path: '/live', priority: '0.7', changefreq: 'weekly' },
  { path: '/welcome', priority: '0.5', changefreq: 'yearly' },
  { path: '/discord', priority: '0.6', changefreq: 'monthly' },
  { path: '/experiments', priority: '0.4', changefreq: 'monthly' },
];

// Build URL entries
const urls = [];

// Add static routes
staticRoutes.forEach(route => {
  urls.push({
    loc: `${BASE_URL}${route.path}`,
    lastmod: currentDate,
    changefreq: route.changefreq,
    priority: route.priority
  });
});

// Add artist routes
artistData.forEach(artist => {
  if (artist.local_path && artist.show_on_artist_page !== false) {
    urls.push({
      loc: `${BASE_URL}/artist/${artist.local_path}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    });
  }
});

// Add release routes
releaseData.forEach(release => {
  if (release.local_path) {
    urls.push({
      loc: `${BASE_URL}/release/${release.local_path}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    });
  }
});

// Add product routes
productData.forEach(product => {
  if (product.local_path) {
    urls.push({
      loc: `${BASE_URL}/product/${product.local_path}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    });
  }
});

// Add collection routes
collectionData.forEach(collection => {
  if (collection.local_path) {
    urls.push({
      loc: `${BASE_URL}/collection/${collection.local_path}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    });
  }
});

// Add contest routes
contestData.forEach(contest => {
  if (contest.local_path) {
    urls.push({
      loc: `${BASE_URL}/contest/${contest.local_path}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    });
  }
});

// Generate XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// Write sitemap.xml to public folder
const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, xml);

// Also create routes.json for react-snap
const routesList = urls.map(url => url.loc.replace(BASE_URL, ''));
const routesPath = path.join(__dirname, '..', 'routes.json');
fs.writeFileSync(routesPath, JSON.stringify(routesList, null, 2));

console.log(`✓ Generated sitemap.xml with ${urls.length} URLs`);
console.log(`✓ Generated routes.json with ${routesList.length} routes`);
