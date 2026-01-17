# Contributing to the Blog

This guide explains the workflow for creating and publishing blog posts.

## Quick Start

```bash
# 1. Create a new draft branch
git checkout -b draft/my-post-title

# 2. Create a new post
npm run new-post "My Post Title"

# 3. Edit the post
# Open src/content/blog/my-post-title.md and start writing

# 4. Preview locally
npm run dev
# Visit http://localhost:4321

# 5. Commit your draft
git add .
git commit -m "Draft: My Post Title"

# 6. Push to get Cloudflare preview
git push -u origin draft/my-post-title

# 7. Review the Cloudflare preview URL (shown in GitHub)

# 8. When ready to publish, set draft: false in frontmatter

# 9. Create a pull request

# 10. Merge to main to publish
```

## Detailed Workflow

### 1. Create a Feature Branch

Always create a new branch for each blog post. This gives you:
- A Cloudflare preview URL for review
- Clean git history
- Easy rollback if needed

```bash
git checkout -b draft/descriptive-post-slug
```

**Branch naming convention**: `draft/post-slug-here`

### 2. Create a New Post

Use the scaffolding script to create a new post with all required frontmatter:

```bash
npm run new-post "Your Post Title Here"
```

This creates `src/content/blog/your-post-title-here.md` with:
- Complete frontmatter template
- AI placeholder sections for guidance
- Today's date as pubDate
- `draft: true` by default

### 3. Write Your Content

Edit the generated markdown file and fill in:

#### Required Fields
- `title`: Post title (appears in card and page header)
- `description`: Short summary for cards and SEO (~160 chars)
- `pubDate`: Publication date (auto-filled)

#### Optional but Recommended
- `excerpt`: First paragraph or hook for social sharing
- `tags`: Array of relevant tags (lowercase, kebab-case)
- `category`: Main topic category
- `heroImage`: Path to header image
- `heroImageAlt`: Alt text for hero image

#### Advanced Fields
- `author`: Defaults to "Sam Hesson"
- `series`: Name of post series (if applicable)
- `seriesOrder`: Number in series (1, 2, 3...)
- `relatedPosts`: Array of related post slugs
- `featured`: Set to true for featured posts
- `metaKeywords`: Additional SEO keywords
- `canonicalUrl`: If post was published elsewhere first
- `lastModified`: Auto-filled on updates
- `estimatedReadingTime`: Manual override (auto-calculated if omitted)

### 4. Preview Your Post

#### Local Development
```bash
npm run dev
```

Visit `http://localhost:4321` to see your draft post with a DRAFT badge.

#### Production Preview
```bash
npm run build
npm run preview
```

This simulates production - draft posts will be **hidden** (404).

### 5. Check Your Drafts

List all current draft posts:

```bash
npm run list-drafts
```

Shows:
- File name
- Title
- Category
- Pub date
- Creation date

### 6. Push for Cloudflare Preview

```bash
git add .
git commit -m "Draft: Your post title"
git push -u origin draft/your-post-slug
```

Cloudflare automatically creates a preview deployment for your branch:
- Preview URL: `draft-your-post-slug.samhesson-blog.pages.dev`
- Check the GitHub "Checks" tab on your branch for the URL

### 7. Review and Iterate

Review your post on the Cloudflare preview URL:
- Test all links
- Check image loading
- Verify formatting
- Review on mobile
- Check dark mode

Make edits and push again to update the preview:

```bash
git add .
git commit -m "Update: Fix formatting"
git push
```

### 8. Publish Your Post

When ready to publish:

1. Open your post file
2. Change `draft: false`
3. Review all frontmatter fields are complete
4. Commit:

```bash
git add .
git commit -m "Publish: Your post title"
git push
```

### 9. Create a Pull Request

On GitHub:
1. Click "Compare & pull request"
2. Fill in the PR template (auto-populated)
3. Review the checklist
4. Add any notes

The PR template reminds you to:
- ✅ Complete frontmatter
- ✅ Test links
- ✅ Optimize images
- ✅ Fill SEO fields
- ✅ Spell check
- ✅ Review preview
- ✅ Set `draft: false`

### 10. Merge to Publish

Once the PR is approved (or self-review is complete):
1. Merge to `main`
2. Post goes live immediately
3. Cloudflare deploys to production

## Draft vs Published Posts

### Draft Posts (`draft: true`)
- ✅ Visible in dev mode (`npm run dev`)
- ✅ Show DRAFT badge in dev
- ❌ Hidden in production builds
- ❌ Return 404 if accessed directly in production
- ✅ Visible on Cloudflare preview branches

### Published Posts (`draft: false`)
- ✅ Visible everywhere
- ✅ Indexed by search engines
- ✅ Included in RSS feed
- ✅ Listed on homepage

## Content Guidelines

### Writing Style
- Clear, concise, conversational
- Use headings for structure (H2, H3)
- Code examples with syntax highlighting
- Images with descriptive alt text

### SEO Best Practices
- Title: 50-60 characters
- Description: 150-160 characters
- Use keywords naturally in title and description
- Fill excerpt for social sharing
- Add relevant tags

### Images
- Store in `public/images/blog/`
- Optimize file size (aim for <200KB)
- Use WebP format when possible
- Always include alt text
- Reference as `/images/blog/filename.webp`

### Code Blocks
Use fenced code blocks with language hints:

\`\`\`typescript
const example: string = "Hello World";
\`\`\`

### Links
- Use descriptive anchor text
- External links open in new tab
- Check all links before publishing

## Troubleshooting

### Draft Post Not Showing in Dev
- Check `draft: true` in frontmatter
- Restart dev server (`npm run dev`)

### Published Post Not Appearing
- Check `draft: false` in frontmatter
- Clear build cache: `rm -rf dist && npm run build`
- Check for frontmatter syntax errors

### Cloudflare Preview Not Updating
- Wait 2-3 minutes for deployment
- Check GitHub Actions for build status
- View Cloudflare Pages dashboard

### Frontmatter Validation Errors
- Ensure all required fields are present
- Check YAML syntax (indentation, quotes)
- Dates must be `YYYY-MM-DD` format
- Arrays use `[]` format: `tags: [javascript, web]`

## Content Organization

### Recommended Directory Structure
```
src/content/blog/
├── web-development/
├── javascript/
├── tutorials/
└── opinion/
```

Currently all posts are flat in `src/content/blog/`, but you can organize by category if needed.

### Series Posts

For multi-part posts:

```yaml
series: "Building a Blog"
seriesOrder: 1
relatedPosts:
  - building-a-blog-part-2
  - building-a-blog-part-3
```

### Tags vs Categories

- **Category**: Broad topic area (one per post)
  - Examples: "web-development", "tutorial", "opinion"
- **Tags**: Specific keywords (multiple per post)
  - Examples: "javascript", "react", "typescript", "performance"

## Git Best Practices

### Commit Messages
- Drafts: `Draft: Post title`
- Updates: `Update: Describe changes`
- Publish: `Publish: Post title`
- Fixes: `Fix: Describe issue`

### Branch Cleanup

After merging, delete the draft branch:

```bash
git checkout main
git pull
git branch -d draft/post-slug
git push origin --delete draft/post-slug
```

Or use GitHub's "Delete branch" button after merging PR.

## Advanced Workflows

### Batch Writing

Create multiple drafts at once:

```bash
git checkout -b drafts/january-batch
npm run new-post "Post 1 Title"
npm run new-post "Post 2 Title"
npm run new-post "Post 3 Title"
# Work on all three
git add . && git commit -m "Draft: January batch"
git push
```

### Scheduled Publishing

While there's no automatic scheduler, you can prepare posts in advance:

1. Create draft posts for the week/month
2. Keep `draft: true`
3. When ready to publish, change to `draft: false` and merge

### Content Review Workflow

For team review (or self-review):

1. Create draft on branch
2. Push to get Cloudflare preview
3. Share preview URL for feedback
4. Iterate on feedback
5. Get approval (or self-approve)
6. Set `draft: false`
7. Merge to publish

## Tools and Scripts

### Available Commands

```bash
# Create new post
npm run new-post "Post Title"

# List all drafts
npm run list-drafts

# Development server (shows drafts)
npm run dev

# Production build (hides drafts)
npm run build

# Preview production build
npm run preview
```

## Questions?

If you encounter issues or have questions about the workflow, check:
1. This CONTRIBUTING.md guide
2. Blog post template (`scripts/templates/post-template.md`)
3. Content schema (`src/content/config.ts`)

## Future Enhancements

Planned improvements (see project issues):
- Content validation pre-commit hook
- AI-powered outline generator
- SEO optimization suggestions
- Reading time calculator in build process
- Automated image optimization

---

Happy blogging! 🚀
