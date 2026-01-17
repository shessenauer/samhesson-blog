#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get title from command line arguments
const args = process.argv.slice(2);
const title = args.join(' ');

if (!title) {
  console.error('Error: Please provide a post title');
  console.log('Usage: npm run new-post "Your Post Title"');
  process.exit(1);
}

// Slugify function: convert title to URL-friendly slug
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Format date as YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Main script
const slug = slugify(title);
const currentDate = formatDate(new Date());
const postPath = join(__dirname, '..', 'src', 'content', 'blog', `${slug}.md`);

// Check if post already exists
if (existsSync(postPath)) {
  console.error(`Error: Post "${slug}.md" already exists`);
  process.exit(1);
}

// Read template
const templatePath = join(__dirname, 'templates', 'post-template.md');
let template;

try {
  template = readFileSync(templatePath, 'utf-8');
} catch (error) {
  console.error(`Error: Could not read template file at ${templatePath}`);
  console.error(error.message);
  process.exit(1);
}

// Replace placeholders
const content = template
  .replace(/{{title}}/g, title)
  .replace(/{{currentDate}}/g, currentDate);

// Write new post file
try {
  writeFileSync(postPath, content, 'utf-8');
  console.log(`✅ Created new post: ${postPath}`);
  console.log(`📝 Title: ${title}`);
  console.log(`🔗 Slug: ${slug}`);
  console.log(`📅 Date: ${currentDate}`);
  console.log(`\nNext steps:`);
  console.log(`1. Edit the post: ${postPath}`);
  console.log(`2. Fill in the description and other frontmatter fields`);
  console.log(`3. Write your content`);
  console.log(`4. When ready to publish, set draft: false`);
} catch (error) {
  console.error(`Error: Could not create post file at ${postPath}`);
  console.error(error.message);
  process.exit(1);
}
