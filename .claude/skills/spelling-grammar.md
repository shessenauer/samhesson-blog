# Spelling & Grammar Checker

Proofread blog content for spelling errors, grammar issues, and writing quality before publishing.

## Overview

This skill helps ensure blog posts are polished, professional, and free of typos and grammatical errors.

## Commands

Use `/proofread` or `/check-writing` to invoke this skill.

## Instructions

When this skill is invoked, proofread content by:

1. **Automated Spell Checking**

   **Install spell checker:**
   ```bash
   npm install -g markdown-spellcheck cspell
   ```

   **Check markdown files:**
   ```bash
   # Using markdown-spellcheck
   mdspell 'src/content/blog/**/*.md' --en-us --report

   # Using cspell
   cspell 'src/content/blog/**/*.md'
   ```

   **Add custom dictionary:**
   ```json
   // cspell.json
   {
     "version": "0.2",
     "language": "en",
     "words": [
       "Astro",
       "Tailwind",
       "Cloudflare",
       "TypeScript",
       "React",
       "WebP",
       "Hesson"
     ],
     "ignorePaths": [
       "node_modules",
       "dist",
       "package-lock.json"
     ]
   }
   ```

2. **Grammar Checking**

   **VS Code extension:**
   - Install "LTeX - LanguageTool" extension
   - Configure for markdown files
   - Real-time grammar checking

   **Online tools:**
   - [Grammarly](https://www.grammarly.com/)
   - [LanguageTool](https://languagetool.org/)
   - [Hemingway Editor](https://hemingwayapp.com/)
   - [ProWritingAid](https://prowritingaid.com/)

   **Command line (LanguageTool):**
   ```bash
   # Install LanguageTool
   brew install languagetool

   # Check file
   languagetool -l en-US src/content/blog/your-post.md
   ```

3. **Common Writing Issues**

   **Spelling errors:**
   - Typos: "teh" → "the", "recieve" → "receive"
   - Technical terms: Ensure consistent spelling
   - Brand names: "TypeScript" not "typescript"
   - Homophone errors: "their/there/they're", "your/you're"

   **Grammar issues:**
   - Subject-verb agreement
   - Sentence fragments
   - Run-on sentences
   - Comma splices
   - Passive voice (minimize usage)
   - Dangling modifiers

   **Style issues:**
   - Wordiness: "in order to" → "to"
   - Redundancy: "absolutely essential" → "essential"
   - Weak verbs: "is able to" → "can"
   - Overuse of adverbs
   - Inconsistent tense

4. **Writing Style Guidelines**

   **Voice and tone:**
   - Use active voice: "I built" not "It was built by me"
   - Write conversationally but professionally
   - Be clear and concise
   - Avoid jargon unless necessary
   - Explain technical concepts simply

   **Readability:**
   - Target grade level: 8-10 (Flesch-Kincaid)
   - Vary sentence length
   - Keep paragraphs 3-5 sentences
   - Use bullet points for lists
   - Break up long blocks of text

   **Technical writing:**
   - Define acronyms on first use
   - Be consistent with terminology
   - Use code examples where helpful
   - Link to documentation
   - Show, don't just tell

5. **Readability Testing**

   **Hemingway Editor:**
   - Paste content into https://hemingwayapp.com/
   - Check readability grade
   - Identify complex sentences
   - Find passive voice
   - Highlight adverbs

   **Readability formulas:**
   - Flesch Reading Ease: 60-70 (standard)
   - Flesch-Kincaid Grade: 8-10
   - SMOG index: 8-10
   - Coleman-Liau: 8-10

   **Command line readability:**
   ```bash
   # Install textstat
   pip install textstat

   # Check readability
   python3 -c "import textstat; print(textstat.flesch_reading_ease(open('post.md').read()))"
   ```

6. **Proofreading Checklist**

   **Before publishing:**
   - [ ] Spell check completed (no errors)
   - [ ] Grammar check completed (issues fixed)
   - [ ] Readability score is acceptable (grade 8-10)
   - [ ] No passive voice (or minimal)
   - [ ] Consistent terminology throughout
   - [ ] Acronyms defined on first use
   - [ ] Code examples tested and working
   - [ ] Links tested and working
   - [ ] Title is compelling and clear
   - [ ] Introduction hooks the reader
   - [ ] Conclusion summarizes key points
   - [ ] Headings are descriptive
   - [ ] Lists use parallel structure
   - [ ] Consistent formatting (bold, italic, code)

7. **Content Quality Checks**

   **Structure:**
   - Clear introduction (what and why)
   - Logical flow between sections
   - Each section has a purpose
   - Strong conclusion
   - Call-to-action if appropriate

   **Clarity:**
   - One main idea per paragraph
   - Topic sentences in paragraphs
   - Transitions between ideas
   - Examples support concepts
   - Jargon is explained

   **Engagement:**
   - Compelling title and description
   - Hook in first paragraph
   - Personal anecdotes where relevant
   - Questions to engage reader
   - Practical takeaways

8. **Common Mistakes to Fix**

   **It's vs Its:**
   - It's = it is (contraction)
   - Its = possessive

   **Their, There, They're:**
   - Their = possessive
   - There = location
   - They're = they are

   **Your vs You're:**
   - Your = possessive
   - You're = you are

   **Effect vs Affect:**
   - Effect = noun (result)
   - Affect = verb (to influence)

   **Then vs Than:**
   - Then = time
   - Than = comparison

9. **Automated Proofreading Scripts**

   **Add to package.json:**
   ```json
   {
     "scripts": {
       "spell:check": "cspell 'src/content/blog/**/*.md'",
       "spell:fix": "cspell 'src/content/blog/**/*.md' --fix",
       "grammar:check": "languagetool -l en-US src/content/blog/*.md"
     }
   }
   ```

   **Pre-commit hook:**
   ```bash
   # .husky/pre-commit
   #!/bin/sh
   npm run spell:check
   ```

10. **AI Writing Assistance**

    **Use AI for:**
    - Suggesting alternative phrasings
    - Improving clarity
    - Checking tone
    - Generating examples
    - Finding better word choices

    **Don't rely on AI for:**
    - Original ideas and insights
    - Technical accuracy
    - Personal voice and style
    - Final proofreading (human review essential)

## Quick Checks

```bash
# Spell check all posts
cspell 'src/content/blog/**/*.md'

# Check specific post
cspell src/content/blog/your-post.md

# Grammar check
languagetool -l en-US src/content/blog/your-post.md

# Find common typos
grep -r "teh\|recieve\|seperate" src/content/blog/
```

## Notes

- Automated tools catch most errors, but human review is essential
- Read content aloud to catch awkward phrasing
- Take breaks between writing and proofreading
- Have someone else review important posts
- Maintain a style guide for consistency
- Build a custom dictionary for technical terms
