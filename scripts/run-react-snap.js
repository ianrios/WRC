const { run } = require("react-snap");
const fs = require('fs');
const path = require('path');

// Read the generated routes
const routesPath = path.join(__dirname, '..', 'routes.json');
const routes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));

console.log(`🚀 Starting react-snap for ${routes.length} routes...`);
console.log(`📝 First 10 routes: ${routes.slice(0, 10).join(', ')}`);

// Update package.json reactSnap config with routes
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const originalPackageJson = JSON.stringify(packageJson, null, 2);

// Keep existing config and add routes
const existingConfig = packageJson.reactSnap || {};
packageJson.reactSnap = {
  ...existingConfig,
  include: routes
};

console.log(`✅ Updated package.json with ${routes.length} routes`);

// Write updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// Remove 200.html if it exists (react-snap creates this and won't run if it's there)
const html200Path = path.join(__dirname, '..', 'build', '200.html');
if (fs.existsSync(html200Path)) {
  fs.unlinkSync(html200Path);
  console.log('🗑️  Removed existing 200.html');
}

// Function to recursively replace localhost URLs in HTML files
function replaceLocalhostUrls(dir) {
  const files = fs.readdirSync(dir);
  let replacedCount = 0;

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      replacedCount += replaceLocalhostUrls(filePath);
    } else if (file === 'index.html') {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      // Replace localhost URLs with production URLs
      content = content.replace(/http:\/\/localhost:\d+/g, 'https://whyrecord.com');
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        replacedCount++;
      }
    }
  });

  return replacedCount;
}

// Run react-snap with explicit options
const options = {
  include: routes,
  ...existingConfig
};

console.log(`🔧 Running react-snap with options:`, JSON.stringify({ includeCount: routes.length }));

run(options)
  .then(() => {
    console.log(`✅ Successfully pre-rendered pages!`);

    // Replace localhost URLs with production URLs
    const buildPath = path.join(__dirname, '..', 'build');
    const replacedCount = replaceLocalhostUrls(buildPath);
    console.log(`🔄 Replaced localhost URLs in ${replacedCount} HTML files`);

    // Restore original package.json
    fs.writeFileSync(packageJsonPath, originalPackageJson);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ react-snap failed:', error);
    // Restore original package.json even on error
    fs.writeFileSync(packageJsonPath, originalPackageJson);
    process.exit(1);
  });
