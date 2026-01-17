# Markdown Formatter

Ensure consistent markdown formatting across all blog posts following project standards.

## Overview

This skill validates and formats markdown files to maintain consistency, readability, and proper structure in blog posts.

## Commands

Use `/format-markdown` to invoke this skill.

## Instructions

When this skill is invoked, help the user format markdown by:

1. **Frontmatter Validation**
   - Verify all required fields exist: `title`, `description`, `pubDate`, `tags`
   - Check date format is YYYY-MM-DD
   - Ensure tags are lowercase and hyphenated
   - Validate heroImage path if present
   - Confirm description is 50-160 characters for SEO

2. **Formatting Rules**

   **Headings:**
   - Use ATX-style headers (# Header, not underline style)
   - One H1 per document (the title, automatically added)
   - H2 for main sections, H3 for subsections
   - Add blank line before and after headings
   - No trailing punctuation in headings

   **Lists:**
   - Use `-` for unordered lists (not `*` or `+`)
   - Use `1.` for ordered lists
   - Indent nested lists with 2 spaces
   - Add blank line before and after lists

   **Code Blocks:**
   - Always specify language: \`\`\`typescript, \`\`\`bash, etc.
   - Use consistent indentation (2 spaces)
   - Add filename comments when helpful: `// src/example.ts`

   **Links:**
   - Use reference-style links for repeated URLs
   - Ensure no broken internal links
   - Add titles to external links for accessibility

   **Emphasis:**
   - Use `**bold**` for strong emphasis
   - Use `*italic*` for light emphasis
   - Use `code` for inline code, filenames, commands

3. **Content Guidelines**
   - Maximum line length: 100 characters (for readability in editors)
   - One sentence per line (makes diffs cleaner)
   - No trailing whitespace
   - End file with single newline
   - Use smart quotes: "quoted text" not "quoted text"

4. **Common Fixes**
   ```bash
   # Run prettier on markdown files
   npx prettier --write "src/content/blog/**/*.md"
   ```

5. **Validation Checklist**
   - [ ] Frontmatter is valid YAML
   - [ ] All required fields present
   - [ ] Date is in correct format
   - [ ] Tags are properly formatted
   - [ ] No broken links
   - [ ] Code blocks have language specified
   - [ ] Headings follow hierarchy (no h4 after h2)
   - [ ] Consistent list markers
   - [ ] No trailing whitespace

## Example Markdown Structure

\`\`\`markdown
---
title: "Your Post Title"
description: "A compelling 50-160 character description for SEO and previews."
pubDate: 2026-01-16
tags: ["web-dev", "astro", "typescript"]
heroImage: "/images/post-hero.jpg"
---

## Introduction

Start your post with context. One sentence per line makes git diffs cleaner.

## Main Section

Content goes here with proper formatting.

### Subsection

Use H3 for subsections under H2.

## Code Examples

Always specify the language:

\`\`\`typescript
// src/example.ts
const greeting = "Hello World";
console.log(greeting);
\`\`\`

## Lists

Unordered lists use `-`:

- First item
- Second item
  - Nested item (2 space indent)
  - Another nested item
- Third item

Ordered lists:

1. First step
2. Second step
3. Third step

## Conclusion

Wrap up your thoughts.
\`\`\`

## Automated Formatting

Add to `package.json`:
```json
{
  "scripts": {
    "format:markdown": "prettier --write 'src/content/blog/**/*.md'",
    "lint:markdown": "markdownlint 'src/content/blog/**/*.md'"
  }
}
```

Install tools:
```bash
npm install --save-dev prettier markdownlint-cli
```

## Notes

- Run formatter before committing blog posts
- Maintain consistent voice and tone across posts
- Use spell checker before publishing
- Preview in development mode before deploying
