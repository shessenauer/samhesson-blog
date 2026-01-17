# Social Media Preview Generator

Create Open Graph images and optimize social media previews for blog posts.

## Overview

This skill helps create compelling social media preview images and validate Open Graph metadata for maximum engagement when posts are shared.

## Commands

Use `/generate-og-image` or `/social-preview` to invoke this skill.

## Instructions

When this skill is invoked, generate social previews by:

1. **Open Graph Image Requirements**

   **Specifications:**
   - **Facebook/LinkedIn:** 1200x630px (1.91:1 ratio)
   - **Twitter:** 1200x675px (16:9 ratio) or 1200x1200px (1:1)
   - **File format:** JPG or PNG (prefer JPG for smaller size)
   - **File size:** <5MB (ideally <200KB)
   - **Safe zone:** Keep important content in center 1200x600px

2. **Design Guidelines for OG Images**

   **Content to include:**
   - Blog post title (large, readable)
   - Your name/brand
   - Optional: Subtitle or key point
   - Optional: Visual element (icon, photo)
   - Brand colors from design system

   **Design specs:**
   - **Background:** warm-sand-100 (#F9F6F0)
   - **Text:** void-400 (#1A1A1A)
   - **Accent:** living-green-500 (#556B52)
   - **Font:** Inter (same as site)
   - **Border radius:** 24px on containers
   - **Shadow:** Subtle warm shadow

   **Typography:**
   - Title: 72-96px, bold, -0.02em letter-spacing
   - Subtitle: 36-48px, regular
   - Metadata: 24-32px

3. **Generate OG Images**

   **Option 1: Using Figma/Design Tool**
   - Create 1200x630px artboard
   - Apply design system colors
   - Export as JPG at 85% quality
   - Save to `/public/og/post-slug.jpg`

   **Option 2: Programmatic Generation (Vercel OG)**
   ```bash
   npm install @vercel/og
   ```

   ```typescript
   // src/pages/og/[slug].png.ts
   import { ImageResponse } from '@vercel/og';
   import { getCollection } from 'astro:content';

   export async function GET({ params }: { params: { slug: string } }) {
     const posts = await getCollection('blog');
     const post = posts.find(p => p.slug === params.slug);

     if (!post) return new Response('Not found', { status: 404 });

     return new ImageResponse(
       (
         <div
           style={{
             display: 'flex',
             width: '100%',
             height: '100%',
             background: '#F9F6F0',
             padding: '80px',
             fontFamily: 'Inter',
           }}
         >
           <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
             <h1
               style={{
                 fontSize: '72px',
                 fontWeight: 'bold',
                 color: '#1A1A1A',
                 letterSpacing: '-0.02em',
                 lineHeight: 1.2,
               }}
             >
               {post.data.title}
             </h1>
             <p
               style={{
                 fontSize: '32px',
                 color: '#3A3A3A',
                 marginTop: '20px',
               }}
             >
               {post.data.description}
             </p>
             <div
               style={{
                 display: 'flex',
                 marginTop: 'auto',
                 alignItems: 'center',
                 gap: '20px',
               }}
             >
               <div
                 style={{
                   fontSize: '28px',
                   color: '#556B52',
                   fontWeight: 'bold',
                 }}
               >
                 Sam Hesson
               </div>
               <div style={{ fontSize: '24px', color: '#4A4A4A' }}>
                 samhesson.dev
               </div>
             </div>
           </div>
         </div>
       ),
       {
         width: 1200,
         height: 630,
       }
     );
   }

   export async function getStaticPaths() {
     const posts = await getCollection('blog');
     return posts.map((post) => ({
       params: { slug: post.slug },
     }));
   }
   ```

4. **OG Image Optimization**

   **Compress images:**
   ```bash
   # Using sharp
   npx sharp-cli --input og-image.png --output og-image.jpg --quality 85 --width 1200

   # Using ImageMagick
   convert og-image.png -quality 85 -resize 1200x630 og-image.jpg

   # Optimize JPG further
   jpegoptim --max=85 --strip-all og-image.jpg
   ```

   **Image checklist:**
   - [ ] Correct dimensions (1200x630px)
   - [ ] Optimized file size (<200KB)
   - [ ] Text is readable at small sizes
   - [ ] Important content in safe zone
   - [ ] Brand colors used
   - [ ] Looks good in preview

5. **Update Blog Post Frontmatter**

   ```markdown
   ---
   title: "Your Post Title"
   description: "Description for SEO"
   pubDate: 2026-01-16
   heroImage: "/images/hero.jpg"
   ogImage: "/og/your-post-slug.jpg"  # Add this
   tags: ["tag1", "tag2"]
   ---
   ```

6. **Validate Open Graph Tags**

   **Test tools:**
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
   - [OpenGraph.xyz](https://www.opengraph.xyz/)

   **Test URL:**
   ```bash
   # Fetch OG tags from URL
   curl -s https://samhesson.dev/blog/your-post/ | grep -i "og:"
   ```

7. **Social Media Checklist**

   **Required OG tags (already in BlogPost.astro):**
   - [ ] `og:title`
   - [ ] `og:description`
   - [ ] `og:image`
   - [ ] `og:url`
   - [ ] `og:type` (article)
   - [ ] `og:site_name`

   **Twitter-specific:**
   - [ ] `twitter:card` (summary_large_image)
   - [ ] `twitter:title`
   - [ ] `twitter:description`
   - [ ] `twitter:image`
   - [ ] `twitter:creator` (@samhesson)

   **Article-specific:**
   - [ ] `article:published_time`
   - [ ] `article:author`
   - [ ] `article:tag` (for each tag)

8. **Create Default OG Image**

   **For posts without custom image:**
   ```bash
   # Create default template at /public/og-default.png
   # 1200x630px with:
   # - Your name
   # - "Blog" or tagline
   # - Brand colors
   # - Optional: Logo or pattern
   ```

   **Design template:**
   - Background: warm-sand-100
   - Large "Sam Hesson" in void-400
   - Subtitle: "Thoughts on web development and technology"
   - Accent element in living-green-500

9. **Social Sharing Best Practices**

   **Title optimization:**
   - Keep under 60 characters
   - Front-load important keywords
   - Make it compelling and clickable
   - Match blog post title exactly

   **Description optimization:**
   - 150-160 characters (full sentence)
   - Include call-to-action
   - Mention key takeaway
   - Match meta description

   **Image design:**
   - High contrast text
   - Minimal design (don't overcrowd)
   - Recognizable brand elements
   - Test at thumbnail size
   - Works without reading text (visual interest)

10. **Automated OG Image Generation**

    **Create batch script:**
    ```bash
    #!/bin/bash
    # generate-og-images.sh

    # Get all blog posts
    for post in src/content/blog/*.md; do
      slug=$(basename "$post" .md)

      # Extract title and description
      title=$(grep "^title:" "$post" | cut -d'"' -f2)
      description=$(grep "^description:" "$post" | cut -d'"' -f2)

      echo "Generating OG image for: $title"

      # Generate image using Node script
      # node scripts/generate-og-image.js "$title" "$description" "public/og/$slug.jpg"
    done
    ```

## Preview Validation

```bash
# Test Facebook preview
open "https://developers.facebook.com/tools/debug/?q=https://samhesson.dev/blog/your-post/"

# Test Twitter preview
open "https://cards-dev.twitter.com/validator"

# Test LinkedIn preview
open "https://www.linkedin.com/post-inspector/inspect/https://samhesson.dev/blog/your-post/"
```

## Notes

- Generate OG images before publishing
- Validate on all platforms (Facebook, Twitter, LinkedIn)
- Use consistent branding across all images
- Update default OG image when rebranding
- Consider automating OG image generation
- Test how images look at thumbnail size
- Keep important text in "safe zone"
