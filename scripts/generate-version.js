#!/usr/bin/env node
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

try {
  // Get git commit hash
  const commit = execSync('git rev-parse HEAD').toString().trim();
  const shortCommit = execSync('git rev-parse --short HEAD').toString().trim();

  // Get commit date
  const commitDate = execSync('git log -1 --format=%ci').toString().trim();

  // Get current branch
  const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

  // Build timestamp
  const buildTime = new Date().toISOString();

  // Get package version
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));

  const versionInfo = {
    commit: commit,
    shortCommit: shortCommit,
    commitDate: commitDate,
    branch: branch,
    buildTime: buildTime,
    version: packageJson.version
  };

  const content = `// This file is auto-generated during build - do not edit manually
window.BUILD_INFO = ${JSON.stringify(versionInfo, null, 2)};
`;

  fs.writeFileSync(path.join(__dirname, '../public/version.js'), content);
  console.log('✓ Version info generated:', versionInfo);

} catch (error) {
  console.error('Warning: Could not generate version info:', error.message);
  // Write fallback version
  const fallback = `// This file is auto-generated during build - do not edit manually
window.BUILD_INFO = {
  commit: 'unknown',
  shortCommit: 'unknown',
  commitDate: 'unknown',
  branch: 'unknown',
  buildTime: '${new Date().toISOString()}',
  version: 'unknown'
};
`;
  fs.writeFileSync(path.join(__dirname, '../public/version.js'), fallback);
}
