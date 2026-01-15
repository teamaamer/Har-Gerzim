const fs = require('fs');
const path = require('path');

// Read the wine.json file
const filePath = path.join(__dirname, '../public/wine.json');
const lottieData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Navy/Teal color palette (normalized 0-1)
const NAVY_COLORS = {
  dark: [0.102, 0.165, 0.263],      // #1a2a43 - Dark navy
  medium: [0.2, 0.305, 0.408],      // #334e68 - Medium navy  
  light: [0.286, 0.396, 0.506],     // #496581 - Light navy
  teal: [0.224, 0.467, 0.584],      // #397795 - Teal
  lightTeal: [0.4, 0.6, 0.7]        // #6699b3 - Light teal
};

// Function to determine if a color is pink/purple/magenta
function isPinkish(r, g, b) {
  // Pink/purple colors typically have high red, medium-high blue, low-medium green
  return (r > 0.5 && b > 0.4 && g < r);
}

// Function to map lightness to appropriate navy color
function getNavyColor(lightness) {
  if (lightness < 0.3) return NAVY_COLORS.dark;
  if (lightness < 0.5) return NAVY_COLORS.medium;
  if (lightness < 0.7) return NAVY_COLORS.light;
  if (lightness < 0.85) return NAVY_COLORS.teal;
  return NAVY_COLORS.lightTeal;
}

// Function to convert color to navy/teal
function convertToNavy(color) {
  if (!Array.isArray(color) || color.length < 3) return color;
  
  const [r, g, b, a] = color;
  
  // Calculate lightness
  const lightness = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
  
  // Get appropriate navy color based on lightness
  const navyColor = getNavyColor(lightness);
  
  return [...navyColor, a !== undefined ? a : 1];
}

// Recursively process object
function processObject(obj) {
  if (!obj || typeof obj !== 'object') return;
  
  // Check if this is a color object with "c" property
  if (obj.c && obj.c.k && Array.isArray(obj.c.k)) {
    const color = obj.c.k;
    if (color.length >= 3) {
      obj.c.k = convertToNavy(color);
    }
  }
  
  // Recursively process all properties
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (Array.isArray(obj[key])) {
        obj[key].forEach(item => processObject(item));
      } else if (typeof obj[key] === 'object') {
        processObject(obj[key]);
      }
    }
  }
}

// Process the entire animation
processObject(lottieData);

// Write the modified file back
fs.writeFileSync(filePath, JSON.stringify(lottieData, null, 2));
console.log('✅ Successfully changed all colors to navy/teal palette!');
