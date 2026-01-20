const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/scroll-frames');
const outputDir = path.join(__dirname, '../public/scroll-frames-webp');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function convertToWebP() {
  try {
    const files = fs.readdirSync(inputDir)
      .filter(file => file.endsWith('.jpg'))
      .sort();

    console.log(`Found ${files.length} JPG files to convert`);

    let converted = 0;
    let failed = 0;

    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file.replace('.jpg', '.webp'));

      try {
        await sharp(inputPath)
          .webp({ 
            quality: 90, // High quality (80-100 recommended, 90 is excellent)
            effort: 6,   // Compression effort (0-6, higher = better compression but slower)
            lossless: false // Use lossy compression for smaller files
          })
          .toFile(outputPath);

        const inputStats = fs.statSync(inputPath);
        const outputStats = fs.statSync(outputPath);
        const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

        converted++;
        console.log(`✓ ${file} → ${file.replace('.jpg', '.webp')} (${savings}% smaller)`);
      } catch (error) {
        failed++;
        console.error(`✗ Failed to convert ${file}:`, error.message);
      }
    }

    console.log('\n=== Conversion Complete ===');
    console.log(`Successfully converted: ${converted} files`);
    console.log(`Failed: ${failed} files`);

    // Calculate total size savings
    const totalOriginalSize = files.reduce((sum, file) => {
      const filePath = path.join(inputDir, file);
      return sum + fs.statSync(filePath).size;
    }, 0);

    const totalWebPSize = fs.readdirSync(outputDir)
      .filter(file => file.endsWith('.webp'))
      .reduce((sum, file) => {
        const filePath = path.join(outputDir, file);
        return sum + fs.statSync(filePath).size;
      }, 0);

    const totalSavings = ((1 - totalWebPSize / totalOriginalSize) * 100).toFixed(1);
    const originalMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
    const webpMB = (totalWebPSize / 1024 / 1024).toFixed(2);

    console.log(`\nOriginal size: ${originalMB} MB`);
    console.log(`WebP size: ${webpMB} MB`);
    console.log(`Total savings: ${totalSavings}%`);

  } catch (error) {
    console.error('Error during conversion:', error);
    process.exit(1);
  }
}

convertToWebP();
