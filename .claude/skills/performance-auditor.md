# Performance Auditor

Check bundle sizes, image optimization, and Core Web Vitals to ensure fast page loads.

## Overview

This skill helps maintain excellent performance by auditing assets, measuring load times, and identifying bottlenecks.

## Commands

Use `/audit-performance` or `/perf` to invoke this skill.

## Instructions

When this skill is invoked, audit performance by:

1. **Run Lighthouse Audit**

   **Install Lighthouse:**
   ```bash
   npm install -g lighthouse
   ```

   **Audit production site:**
   ```bash
   # Full audit
   lighthouse https://samhesson.dev --view

   # Performance only
   lighthouse https://samhesson.dev --only-categories=performance --view

   # Mobile performance
   lighthouse https://samhesson.dev --preset=mobile --view

   # Save report
   lighthouse https://samhesson.dev --output=html --output-path=./lighthouse-report.html
   ```

   **Target scores:**
   - Performance: 90+ (excellent), 70-89 (good)
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 90+

2. **Core Web Vitals**

   **Key metrics:**
   - **LCP (Largest Contentful Paint):** <2.5s (good)
   - **FID (First Input Delay):** <100ms (good)
   - **CLS (Cumulative Layout Shift):** <0.1 (good)
   - **FCP (First Contentful Paint):** <1.8s (good)
   - **TTI (Time to Interactive):** <3.8s (good)

   **Test Core Web Vitals:**
   - [PageSpeed Insights](https://pagespeed.web.dev/)
   - [WebPageTest](https://www.webpagetest.org/)
   - [Chrome DevTools](chrome://inspect)

3. **Bundle Size Analysis**

   **Analyze build output:**
   ```bash
   # Build with stats
   npm run build

   # Astro shows bundle sizes automatically
   # Look for large bundles in output

   # Detailed analysis
   npx vite-bundle-visualizer
   ```

   **Target sizes:**
   - Initial JS bundle: <100KB (gzipped)
   - CSS: <50KB (gzipped)
   - Total page weight: <500KB
   - First load: <1MB

   **Check bundle contents:**
   ```bash
   # List files by size in dist
   find dist -type f -exec du -h {} + | sort -hr | head -20

   # Check gzipped sizes
   find dist -name "*.js" -exec sh -c 'echo "$(gzip -c {} | wc -c) {}"' \; | sort -n
   ```

4. **Image Optimization Audit**

   **Check image sizes:**
   ```bash
   # Find large images
   find public/images -type f -size +500k

   # List all images with sizes
   find public -name "*.jpg" -o -name "*.png" -o -name "*.webp" | xargs ls -lh

   # Check if images are optimized
   identify -verbose public/images/*.jpg | grep Quality
   ```

   **Optimization checklist:**
   - [ ] All images <200KB
   - [ ] Using modern formats (WebP)
   - [ ] Correct dimensions (not scaling down)
   - [ ] Lazy loading for below-fold images
   - [ ] Responsive images with srcset
   - [ ] SVGs optimized with SVGO
   - [ ] Serve from CDN

5. **JavaScript Performance**

   **Check for issues:**
   ```bash
   # Large dependencies
   npx bundle-phobia [package-name]

   # Find unused dependencies
   npx depcheck

   # Analyze why packages are included
   npm ls [package-name]
   ```

   **Optimization strategies:**
   - Code splitting (Astro does this automatically)
   - Lazy load components with `client:visible`
   - Defer non-critical JS
   - Remove unused dependencies
   - Use smaller alternatives:
     - `date-fns` → `date-fns/esm` (tree-shakeable)
     - `lodash` → `lodash-es`
     - `moment` → `dayjs` or native `Intl`

6. **CSS Performance**

   **Check CSS size:**
   ```bash
   # Find large CSS files
   find dist -name "*.css" -exec ls -lh {} \;

   # Check for duplicate CSS
   csscss dist/**/*.css
   ```

   **Optimization:**
   - Remove unused CSS (Tailwind purge handles this)
   - Minimize use of @apply
   - Inline critical CSS
   - Use CSS containment
   - Avoid @import (use build tool)

7. **Network Performance**

   **Test load time:**
   ```bash
   # Time to first byte
   curl -w "@-" -o /dev/null -s "https://samhesson.dev" <<'EOF'
     time_namelookup:  %{time_namelookup}\n
     time_connect:  %{time_connect}\n
     time_appconnect:  %{time_appconnect}\n
     time_pretransfer:  %{time_pretransfer}\n
     time_redirect:  %{time_redirect}\n
     time_starttransfer:  %{time_starttransfer}\n
     ----------\n
     time_total:  %{time_total}\n
   EOF
   ```

   **Cloudflare optimization:**
   - Enable Brotli compression
   - Enable HTTP/3
   - Set cache headers
   - Enable auto-minify
   - Use Cloudflare CDN
   - Enable early hints

8. **Rendering Performance**

   **Check for layout shifts:**
   - Reserve space for images (width/height)
   - Avoid injecting content above existing content
   - Use `font-display: swap` for web fonts
   - Preload critical fonts
   - Avoid invisible text during font load

   **Optimize animations:**
   ```tsx
   // Use transform and opacity (GPU-accelerated)
   // ✅ Good
   transform: translateY(-10px)
   opacity: 0

   // ❌ Bad (causes reflow)
   top: -10px
   display: none
   ```

9. **Performance Budget**

   **Set budgets in package.json:**
   ```json
   {
     "performance": {
       "budgets": [
         {
           "path": "dist/**/*.js",
           "limit": "100KB",
           "gzip": true
         },
         {
           "path": "dist/**/*.css",
           "limit": "50KB",
           "gzip": true
         },
         {
           "path": "dist/images/**/*",
           "limit": "200KB"
         }
       ]
     }
   }
   ```

10. **Monitoring and Alerts**

    **Setup monitoring:**
    - [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/)
    - [Google PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started)
    - [Vercel Analytics](https://vercel.com/analytics)
    - [Sentry Performance Monitoring](https://sentry.io/for/performance/)

    **Create GitHub Action:**
    ```yaml
    # .github/workflows/performance.yml
    name: Performance Audit
    on: [pull_request]
    jobs:
      lighthouse:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v2
          - name: Run Lighthouse
            uses: treosh/lighthouse-ci-action@v9
            with:
              urls: |
                https://preview-url.com
              budgetPath: ./budget.json
              uploadArtifacts: true
    ```

## Performance Checklist

- [ ] Lighthouse score >90
- [ ] LCP <2.5s
- [ ] FID <100ms
- [ ] CLS <0.1
- [ ] Total page weight <500KB
- [ ] Images optimized (<200KB each)
- [ ] Using modern image formats (WebP)
- [ ] Lazy loading images
- [ ] No render-blocking resources
- [ ] Fonts optimized (subset, preload)
- [ ] CSS minified and purged
- [ ] JavaScript code-split
- [ ] Using CDN (Cloudflare)
- [ ] Brotli/Gzip compression enabled
- [ ] Browser caching configured
- [ ] No console errors
- [ ] Mobile performance tested

## Quick Commands

```bash
# Lighthouse audit
lighthouse https://samhesson.dev --view

# Bundle size
npm run build && du -sh dist/

# Find large files
find dist -type f -size +100k -exec ls -lh {} \;

# Check Core Web Vitals
open "https://pagespeed.web.dev/?url=https://samhesson.dev"
```

## Notes

- Performance is a feature, not an afterthought
- Test on real devices, not just simulators
- Monitor performance over time
- Set performance budgets and enforce them
- Optimize for mobile first
- Every 100ms of load time matters
