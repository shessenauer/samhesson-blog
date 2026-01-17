#!/usr/bin/env node

import { readdirSync, readFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse frontmatter from markdown file
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return null;
  }

  const frontmatter = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();

    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Convert boolean strings
    if (value === 'true') value = true;
    if (value === 'false') value = false;

    frontmatter[key] = value;
  }

  return frontmatter;
}

// Main script
const blogDir = join(__dirname, '..', 'src', 'content', 'blog');

try {
  const files = readdirSync(blogDir).filter(file => file.endsWith('.md'));

  if (files.length === 0) {
    console.log('No blog posts found.');
    process.exit(0);
  }

  const drafts = [];

  for (const file of files) {
    const filePath = join(blogDir, file);
    const content = readFileSync(filePath, 'utf-8');
    const frontmatter = parseFrontmatter(content);

    if (frontmatter && frontmatter.draft === true) {
      const stats = statSync(filePath);
      drafts.push({
        file,
        title: frontmatter.title || 'Untitled',
        category: frontmatter.category || 'Uncategorized',
        pubDate: frontmatter.pubDate || 'No date',
        created: stats.birthtime,
      });
    }
  }

  if (drafts.length === 0) {
    console.log('✅ No draft posts found. All posts are published!');
    process.exit(0);
  }

  console.log(`\n📝 Current Drafts (${drafts.length}):\n`);

  drafts.forEach((draft, index) => {
    console.log(`${index + 1}. ${draft.file}`);
    console.log(`   Title: ${draft.title}`);
    console.log(`   Category: ${draft.category}`);
    console.log(`   Pub Date: ${draft.pubDate}`);
    console.log(`   Created: ${draft.created.toLocaleDateString()}`);
    console.log('');
  });

  console.log(`Total: ${drafts.length} draft post${drafts.length === 1 ? '' : 's'}\n`);

} catch (error) {
  console.error('Error reading blog directory:', error.message);
  process.exit(1);
}
