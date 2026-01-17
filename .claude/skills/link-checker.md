# Link Checker

Find and fix broken links in blog posts, ensuring all internal and external links work correctly.

## Overview

This skill helps maintain link health by finding broken internal links, dead external links, and redirect chains.

## Commands

Use `/check-links` to invoke this skill.

## Instructions

When this skill is invoked, check links by:

1. **Build Site First**
   ```bash
   # Links can only be checked after building
   npm run build
   ```

2. **Check Internal Links**

   **Find broken internal links:**
   ```bash
   # Install broken-link-checker
   npm install -g broken-link-checker

   # Check local build
   blc http://localhost:4321 -ro --exclude-external
   ```

   **Common internal link issues:**
   - Wrong file paths in markdown
   - Missing `/` at end of URLs
   - Incorrect relative vs absolute paths
   - Renamed or deleted blog posts

3. **Check External Links**

   **Online tools:**
   - [W3C Link Checker](https://validator.w3.org/checklink)
   - [Broken Link Checker](https://www.brokenlinkcheck.com/)
   - [Dead Link Checker](https://www.deadlinkchecker.com/)

   **Command line:**
   ```bash
   # Check all links including external
   blc http://localhost:4321 -ro

   # Check only external links
   blc http://localhost:4321 -ro --exclude-internal

   # Output to file
   blc http://localhost:4321 -ro > link-report.txt
   ```

4. **Check Specific Blog Posts**

   **Extract links from markdown:**
   ```bash
   # Find all links in a specific post
   grep -Eo '\[([^\]]+)\]\(([^\)]+)\)' src/content/blog/your-post.md

   # Find all URLs
   grep -Eo 'https?://[^)]+' src/content/blog/your-post.md
   ```

   **Test specific URL:**
   ```bash
   # Check if URL is reachable
   curl -I -L https://example.com

   # Check status code
   curl -o /dev/null -s -w "%{http_code}\n" https://example.com
   ```

5. **Common Link Problems**

   **404 Not Found:**
   - External site removed content
   - Typo in URL
   - Internal page doesn't exist
   - Wrong slug in blog post link

   **Redirect chains:**
   - Multiple 301/302 redirects
   - Update to final destination URL
   - Performance impact

   **Mixed content (HTTP/HTTPS):**
   - Update HTTP to HTTPS where available
   - Important for security

   **Anchor links:**
   - Check heading IDs exist
   - Case sensitivity matters
   - Special characters in slugs

6. **Fix Broken Links**

   **Update internal links:**
   ```markdown
   <!-- ❌ Broken -->
   [My Post](/posts/old-slug)

   <!-- ✅ Fixed -->
   [My Post](/blog/new-slug/)
   ```

   **Use archived versions for dead external links:**
   ```markdown
   <!-- ❌ Dead link -->
   [Article](https://example.com/article)

   <!-- ✅ Use Wayback Machine -->
   [Article (archived)](https://web.archive.org/web/20220101/https://example.com/article)

   <!-- Or replace with alternative source -->
   [Alternative Article](https://other-site.com/similar-article)
   ```

   **Fix redirects:**
   ```markdown
   <!-- ❌ Redirect chain -->
   [Docs](http://example.com/docs)
   → https://example.com/docs (301)
   → https://example.com/documentation (301)

   <!-- ✅ Direct link -->
   [Docs](https://example.com/documentation)
   ```

7. **Preventive Measures**

   **Use reliable sources:**
   - Link to authoritative sites
   - Prefer documentation over blogs
   - Use permalink URLs when available
   - Archive important external links

   **Internal link patterns:**
   ```markdown
   <!-- Use relative paths for internal links -->
   [About](/about/)
   [Blog Post](/blog/post-slug/)

   <!-- Always end with / for directories -->
   /blog/ not /blog
   ```

   **Archive external links:**
   ```bash
   # Save to Wayback Machine
   curl -i "https://web.archive.org/save/https://example.com/article"
   ```

8. **Automated Link Checking**

   **Add to package.json:**
   ```json
   {
     "scripts": {
       "check:links": "blc http://localhost:4321 -ro --exclude-external",
       "check:links:all": "blc http://localhost:4321 -ro",
       "check:links:external": "blc http://localhost:4321 -ro --exclude-internal"
     }
   }
   ```

   **Create GitHub Action:**
   ```yaml
   # .github/workflows/check-links.yml
   name: Check Links
   on:
     schedule:
       - cron: '0 0 * * 0'  # Weekly
   jobs:
     link-check:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Build site
           run: npm ci && npm run build
         - name: Check links
           uses: lycheeverse/lychee-action@v1
           with:
             args: --verbose --no-progress './dist/**/*.html'
   ```

9. **Link Checklist**

   - [ ] All internal links work
   - [ ] No 404 errors
   - [ ] External links are valid
   - [ ] No redirect chains
   - [ ] HTTPS used where available
   - [ ] Anchor links point to existing headings
   - [ ] Links open in new tab where appropriate
   - [ ] No mixed content warnings
   - [ ] Important external links archived
   - [ ] Dead links replaced or removed

10. **Regular Maintenance**

    **Monthly checks:**
    ```bash
    # Build site
    npm run build

    # Start local server
    npm run preview &

    # Check all links
    blc http://localhost:4321 -ro

    # Kill preview server
    pkill -f "astro preview"
    ```

    **Fix broken links:**
    1. Identify broken links from report
    2. Search for link in markdown files
    3. Update or remove broken link
    4. Re-run check to verify fix
    5. Commit changes

## Quick Commands

```bash
# Check internal links only
npm run build && blc http://localhost:4321 -ro --exclude-external

# Check external links only
npm run build && blc http://localhost:4321 -ro --exclude-internal

# Find all URLs in blog posts
grep -rEo 'https?://[^)]+' src/content/blog/

# Test single URL
curl -I -L https://example.com
```

## Notes

- Run link checker before deploying
- External links will break over time - check regularly
- Consider using URL shorteners for tracking
- Archive important external references
- Update old posts when links break
