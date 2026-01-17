# SEO Checker

Validate SEO meta tags, descriptions, titles, and optimize content for search engines.

## Overview

This skill helps ensure your blog posts are optimized for search engines by checking meta tags, content structure, and SEO best practices.

## Commands

Use `/check-seo` to invoke this skill.

## Instructions

When this skill is invoked, validate SEO by:

1. **Meta Tags Validation**
   - Check `<title>` is 50-60 characters
   - Verify `<meta name="description">` is 150-160 characters
   - Ensure canonical URL is set correctly
   - Validate Open Graph tags (og:title, og:description, og:image, og:url)
   - Check Twitter Card tags
   - Verify author and article metadata

2. **Content SEO**

   **Title Optimization:**
   - Include primary keyword
   - Keep under 60 characters
   - Make it compelling and clickable
   - Avoid keyword stuffing

   **Description Optimization:**
   - Include primary and secondary keywords
   - Write compelling call-to-action
   - 150-160 characters (Google's snippet length)
   - Accurately summarize content

   **Content Structure:**
   - One H1 (the post title)
   - Logical heading hierarchy (H2 → H3 → H4)
   - Use headings to structure content
   - Include keywords in first paragraph
   - Aim for 1000+ words for in-depth posts

3. **Technical SEO Checklist**
   - [ ] Title tag present and optimized
   - [ ] Meta description present and optimized
   - [ ] Canonical URL set
   - [ ] Open Graph tags complete
   - [ ] Twitter Card tags present
   - [ ] Images have alt text
   - [ ] Internal links to related posts
   - [ ] External links open in new tab
   - [ ] URL is clean and descriptive
   - [ ] Content is mobile-friendly
   - [ ] Page loads quickly (<3s)

4. **Keyword Optimization**
   - Primary keyword in title
   - Primary keyword in first 100 words
   - Keywords in H2 headings (naturally)
   - Semantic keywords throughout
   - Avoid keyword density >2-3%

5. **Image SEO**
   - All images have descriptive alt text
   - Filenames are descriptive (not IMG_1234.jpg)
   - Images are optimized (<200KB)
   - Use modern formats (WebP)
   - Lazy loading enabled for below-fold images

6. **SEO Audit Commands**

   **Check meta tags in built site:**
   ```bash
   # Build the site
   npm run build

   # Check a specific page's meta tags
   grep -A 20 "<head>" dist/blog/your-post/index.html
   ```

   **Validate structured data:**
   ```bash
   # Check if article schema is present
   grep "application/ld+json" dist/blog/your-post/index.html
   ```

   **Check for common issues:**
   ```bash
   # Find missing alt attributes
   grep -r "<img" dist/ | grep -v "alt="

   # Find long titles
   grep -r "<title>" dist/ | awk -F">" '{print length($2)}' | sort -n
   ```

7. **Content Quality Checks**
   - Readability score (aim for grade 8-10)
   - Sentence length variety
   - Paragraph length (3-5 sentences)
   - Use of bullet points and lists
   - Internal linking to related content
   - External authoritative sources

## SEO Testing Tools

**Online Tools:**
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Meta Tags Preview](https://metatags.io/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

**Automated Checks:**
```bash
# Install SEO checker
npm install --save-dev next-seo

# Or use lighthouse CLI
npm install -g lighthouse
lighthouse https://samhesson.dev/blog/your-post --view
```

## Common SEO Issues to Fix

1. **Missing meta description** - Add to frontmatter and layout
2. **Title too long** - Keep under 60 characters
3. **Duplicate content** - Ensure each post is unique
4. **Broken links** - Run link checker regularly
5. **Missing alt text** - Add to all images
6. **Slow load time** - Optimize images and code
7. **Non-HTTPS** - Ensure Cloudflare SSL is enabled
8. **Missing sitemap** - Already generated automatically
9. **No robots.txt** - Created and configured
10. **Missing canonical** - Added to all blog posts

## Post-Publish SEO Checklist

After publishing a new post:

1. Submit URL to Google Search Console
2. Share on social media to generate backlinks
3. Monitor indexing status
4. Check Google Analytics for performance
5. Update internal links from older posts
6. Monitor for 404 errors
7. Track keyword rankings

## Notes

- SEO is a long-term strategy
- Quality content is more important than keyword density
- Focus on user experience first
- Update old posts with new information
- Build backlinks naturally through quality content
