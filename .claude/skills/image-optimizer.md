# Image Optimizer

Optimize and compress images for blog posts to improve performance and load times.

## Overview

This skill helps optimize hero images, screenshots, and other media assets for your blog by compressing them while maintaining visual quality.

## Commands

Use `/optimize-images` to invoke this skill.

## Instructions

When this skill is invoked, help the user optimize images by:

1. **Find Images to Optimize**
   - Search for image files in `/public/` directory
   - Look for common formats: PNG, JPG, JPEG, WebP, SVG
   - Identify large files (>500KB) that need compression
   - Check images referenced in blog posts

2. **Image Optimization Tools**

   **For PNG/JPG:**
   ```bash
   # Using ImageMagick (if installed)
   convert input.jpg -quality 85 -strip output.jpg

   # Using sharp via npm script
   npx sharp-cli --input input.jpg --output output.jpg --quality 85
   ```

   **For WebP conversion (better compression):**
   ```bash
   # Convert to WebP for better compression
   npx sharp-cli --input input.jpg --output output.webp --quality 80
   ```

   **For SVG optimization:**
   ```bash
   # Using SVGO
   npx svgo input.svg -o output.svg
   ```

3. **Image Optimization Guidelines**
   - **Hero images**: Max 1200px width, 80-85% quality
   - **Thumbnails**: Max 600px width, 75-80% quality
   - **Screenshots**: Max 1600px width, 85% quality
   - **Target file size**: <200KB for hero images, <100KB for thumbnails
   - **Prefer WebP** format for modern browsers with JPG fallback

4. **Responsive Images**
   - Generate multiple sizes for responsive loading
   - Create 1x, 2x versions for retina displays
   - Update markdown/HTML to use `<picture>` element with srcset

5. **Post-Optimization Checklist**
   - Verify visual quality hasn't degraded
   - Check file size reduction (target: 50-70% reduction)
   - Update image references in blog posts if filenames changed
   - Test images in both light and dark modes
   - Verify images load quickly on slow connections

## Setup

Install optimization tools:
```bash
npm install --save-dev sharp-cli svgo
```

Add scripts to `package.json`:
```json
{
  "scripts": {
    "optimize:images": "sharp-cli --input 'public/images/*.{jpg,png}' --output 'public/images/' --quality 85"
  }
}
```

## Usage Examples

**Optimize a single image:**
```bash
npx sharp-cli --input public/hero.jpg --output public/hero-optimized.jpg --quality 85 --width 1200
```

**Batch optimize all blog images:**
```bash
find public/images -name "*.jpg" -exec npx sharp-cli --input {} --output {}-optimized.jpg --quality 85 \;
```

**Convert to modern formats:**
```bash
# Convert to WebP
npx sharp-cli --input public/hero.jpg --output public/hero.webp --quality 80

# Create multiple sizes
npx sharp-cli --input public/hero.jpg --output public/hero-sm.jpg --width 600 --quality 80
npx sharp-cli --input public/hero.jpg --output public/hero-md.jpg --width 1200 --quality 85
```

## Notes

- Always keep original files as backups before optimization
- Test optimized images across different devices and browsers
- Consider using a CDN for serving images (Cloudflare Images)
- Update frontmatter `heroImage` paths if filenames change
