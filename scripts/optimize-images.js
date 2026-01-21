const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const MANIFEST_PATH = path.join(IMAGES_DIR, '.optimized-manifest.json');

// Image directories to optimize
const IMAGE_SUBDIRS = ['releases', 'artists', 'products', 'merch', 'landscapes', 'textures', 'icons'];

// Quality settings
const JPEG_QUALITY = 80;
const PNG_QUALITY = '65-80';

// Load or create manifest of already-optimized images
function loadManifest() {
  if (fs.existsSync(MANIFEST_PATH)) {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  }
  return {};
}

function saveManifest(manifest) {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

// Get file hash to detect if image has changed
function getFileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(content).digest('hex');
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

console.log('🖼️  Starting image optimization...\n');

const manifest = loadManifest();
let totalOptimized = 0;
let totalSkipped = 0;
let totalBytesSaved = 0;

for (const subdir of IMAGE_SUBDIRS) {
  const dirPath = path.join(IMAGES_DIR, subdir);

  if (!fs.existsSync(dirPath)) {
    continue;
  }

  const allFiles = fs.readdirSync(dirPath);
  const imageFiles = allFiles.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  if (imageFiles.length === 0) continue;

  // Find files that need optimization (new or changed)
  const filesToOptimize = [];
  const skippedFiles = [];

  for (const file of imageFiles) {
    const filePath = path.join(dirPath, file);
    const relativePath = path.relative(IMAGES_DIR, filePath);
    const currentHash = getFileHash(filePath);

    if (manifest[relativePath] === currentHash) {
      skippedFiles.push(file);
    } else {
      filesToOptimize.push({ file, filePath, relativePath, originalSize: fs.statSync(filePath).size });
    }
  }

  if (filesToOptimize.length === 0) {
    totalSkipped += skippedFiles.length;
    continue;
  }

  console.log(`📁 ${subdir}/: ${filesToOptimize.length} new, ${skippedFiles.length} already optimized`);

  // Optimize each new file individually
  for (const { file, filePath, relativePath, originalSize } of filesToOptimize) {
    const isJpeg = /\.(jpg|jpeg)$/i.test(file);
    const isPng = /\.png$/i.test(file);

    // Save original file content in case optimized version is larger
    const originalContent = fs.readFileSync(filePath);

    try {
      if (isJpeg) {
        execSync(
          `npx imagemin "${filePath}" --out-dir="${dirPath}" --plugin=mozjpeg --plugin.mozjpeg.quality=${JPEG_QUALITY}`,
          { stdio: 'pipe' }
        );
      } else if (isPng) {
        // pngquant can fail on already-optimized PNGs, so allow errors
        try {
          execSync(
            `npx imagemin "${filePath}" --out-dir="${dirPath}" --plugin=pngquant --plugin.pngquant.quality={${PNG_QUALITY}} --plugin.pngquant.strip`,
            { stdio: 'pipe' }
          );
        } catch (pngErr) {
          // pngquant failed - try optipng as fallback (lossless)
          try {
            execSync(
              `npx imagemin "${filePath}" --out-dir="${dirPath}" --plugin=optipng`,
              { stdio: 'pipe' }
            );
          } catch {
            // Both failed - mark as optimized anyway to avoid re-trying
            manifest[relativePath] = getFileHash(filePath);
            totalSkipped++;
            console.log(`   ⏭️  ${file}: already optimized (${formatBytes(originalSize)})`);
            continue;
          }
        }
      }

      const newSize = fs.statSync(filePath).size;

      // If optimized file is larger, restore the original
      if (newSize >= originalSize) {
        fs.writeFileSync(filePath, originalContent);
        manifest[relativePath] = getFileHash(filePath);
        totalSkipped++;
        console.log(`   ⏭️  ${file}: kept original (${formatBytes(originalSize)}, optimized was larger)`);
        continue;
      }

      const saved = originalSize - newSize;
      totalBytesSaved += saved;

      // Update manifest with new hash
      manifest[relativePath] = getFileHash(filePath);
      totalOptimized++;

      console.log(`   ✅ ${file}: ${formatBytes(originalSize)} → ${formatBytes(newSize)} (-${formatBytes(saved)})`);
    } catch (err) {
      // Restore original on error and mark as "optimized" so we don't keep retrying
      fs.writeFileSync(filePath, originalContent);
      manifest[relativePath] = getFileHash(filePath);
      console.log(`   ⏭️  ${file}: skipped (${formatBytes(originalSize)})`);
    }
  }

  totalSkipped += skippedFiles.length;
}

// Save updated manifest
saveManifest(manifest);

console.log('\n' + '━'.repeat(50));
console.log(`\n🎉 Optimization complete!`);
console.log(`   Optimized: ${totalOptimized} images`);
console.log(`   Skipped: ${totalSkipped} already optimized`);
if (totalBytesSaved > 0) {
  console.log(`   Saved: ${formatBytes(totalBytesSaved)}`);
}
