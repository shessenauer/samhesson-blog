# Accessibility Checker

Validate ARIA labels, contrast ratios, semantic HTML, and ensure the blog is accessible to all users.

## Overview

This skill helps ensure your blog meets WCAG 2.1 AA accessibility standards, making content accessible to users with disabilities.

## Commands

Use `/check-accessibility` or `/check-a11y` to invoke this skill.

## Instructions

When this skill is invoked, validate accessibility by:

1. **Semantic HTML Validation**

   **Use proper elements:**
   ```html
   <!-- ✅ Correct -->
   <nav><a href="/">Home</a></nav>
   <main><article>...</article></main>
   <footer>...</footer>

   <!-- ❌ Wrong -->
   <div class="nav"><div class="link">Home</div></div>
   <div class="content">...</div>
   ```

   **Heading hierarchy:**
   ```html
   <!-- ✅ Correct -->
   <h1>Page Title</h1>
   <h2>Section</h2>
   <h3>Subsection</h3>

   <!-- ❌ Wrong - skipping levels -->
   <h1>Title</h1>
   <h3>Section</h3>
   ```

2. **ARIA Labels and Roles**

   **Interactive elements:**
   ```tsx
   // Navigation
   <nav aria-label="Main navigation">

   // Buttons without text
   <button aria-label="Close dialog">
     <XIcon />
   </button>

   // Links that open in new tabs
   <a href="..." target="_blank" rel="noopener noreferrer" aria-label="Opens in new tab">
   ```

   **Landmark roles (if not using semantic HTML):**
   ```html
   <div role="navigation" aria-label="Main">
   <div role="main">
   <div role="complementary" aria-label="Related posts">
   ```

3. **Color Contrast Validation**

   **WCAG AA Requirements:**
   - Normal text (< 18px): 4.5:1 contrast ratio
   - Large text (≥ 18px or ≥ 14px bold): 3:1 contrast ratio
   - UI components and graphics: 3:1

   **Check current colors:**
   ```bash
   # Install contrast checker
   npm install -g color-contrast-checker

   # Check specific combinations
   contrast-checker "#1A1A1A" "#FDFCFA"  # void-400 on warm-sand-50
   contrast-checker "#556B52" "#FDFCFA"  # living-green-500 on warm-sand-50
   ```

   **Design system contrasts:**
   - `void-400` (#1A1A1A) on `warm-sand-50` (#FDFCFA): **17.5:1** ✅
   - `void-200` (#3A3A3A) on `warm-sand-100` (#F9F6F0): **12.8:1** ✅
   - `living-green-500` (#556B52) on `warm-sand-100`: **5.2:1** ✅
   - `living-green-500` (#556B52) on `warm-sand-50`: **5.9:1** ✅

4. **Image Accessibility**

   **Alt text rules:**
   ```html
   <!-- ✅ Descriptive alt text -->
   <img src="/hero.jpg" alt="Developer working on laptop with coffee" />

   <!-- ✅ Decorative images -->
   <img src="/pattern.svg" alt="" role="presentation" />

   <!-- ❌ Missing or poor alt text -->
   <img src="/image.jpg" alt="image" />
   <img src="/photo.jpg" />
   ```

   **Complex images:**
   ```html
   <figure>
     <img src="/chart.png" alt="Bar chart showing traffic growth" />
     <figcaption>
       Website traffic increased 50% from January (10k) to June (15k visitors).
     </figcaption>
   </figure>
   ```

5. **Keyboard Navigation**

   **Requirements:**
   - All interactive elements must be keyboard accessible
   - Logical tab order (use tabindex="0" sparingly, never positive values)
   - Visible focus indicators
   - Skip to main content link

   **Focus styles:**
   ```css
   /* Add visible focus states */
   a:focus, button:focus {
     outline: 2px solid var(--color-living-green-500);
     outline-offset: 2px;
   }

   /* For custom elements */
   .custom-button:focus-visible {
     ring: 2px solid var(--color-living-green-500);
   }
   ```

   **Skip link (add to layouts):**
   ```html
   <a href="#main-content" class="skip-to-main">
     Skip to main content
   </a>

   <style>
   .skip-to-main {
     position: absolute;
     top: -40px;
     left: 0;
     background: var(--color-living-green-500);
     color: white;
     padding: 8px;
     z-index: 100;
   }
   .skip-to-main:focus {
     top: 0;
   }
   </style>
   ```

6. **Forms Accessibility**

   **Label all inputs:**
   ```html
   <!-- ✅ Correct -->
   <label for="email">Email address</label>
   <input type="email" id="email" name="email" required aria-required="true" />

   <!-- ✅ Alternative with aria-label -->
   <input type="search" aria-label="Search blog posts" />

   <!-- ❌ Missing label -->
   <input type="text" placeholder="Enter name" />
   ```

   **Error messages:**
   ```html
   <input
     type="email"
     id="email"
     aria-invalid="true"
     aria-describedby="email-error"
   />
   <span id="email-error" role="alert">
     Please enter a valid email address
   </span>
   ```

7. **Screen Reader Testing**

   **Test with screen readers:**
   - **macOS**: VoiceOver (Cmd + F5)
   - **Windows**: NVDA (free) or JAWS
   - **Linux**: Orca
   - **Mobile**: TalkBack (Android), VoiceOver (iOS)

   **Common issues:**
   - Images announced without alt text
   - "Click here" links without context
   - Form fields without labels
   - Headings in wrong order
   - Interactive elements not keyboard accessible

8. **Automated Testing Tools**

   **Install axe-core:**
   ```bash
   npm install --save-dev @axe-core/cli
   ```

   **Run accessibility tests:**
   ```bash
   # Test built site
   npm run build
   npx axe dist/index.html --tags wcag2a,wcag2aa

   # Test specific page
   npx axe dist/blog/your-post/index.html
   ```

   **Browser extensions:**
   - [axe DevTools](https://www.deque.com/axe/devtools/)
   - [WAVE](https://wave.webaim.org/extension/)
   - [Lighthouse](https://developers.google.com/web/tools/lighthouse)

9. **Accessibility Checklist**

   - [ ] All images have descriptive alt text
   - [ ] Heading hierarchy is logical (h1 → h2 → h3)
   - [ ] Color contrast meets WCAG AA (4.5:1 for normal text)
   - [ ] All interactive elements keyboard accessible
   - [ ] Focus indicators are visible
   - [ ] Forms have proper labels
   - [ ] Links have descriptive text (not "click here")
   - [ ] Video/audio has captions or transcripts
   - [ ] Page can be navigated with keyboard only
   - [ ] Works with screen readers
   - [ ] Skip to main content link present
   - [ ] Semantic HTML used throughout
   - [ ] ARIA labels on icon buttons
   - [ ] No auto-playing media
   - [ ] Animations respect prefers-reduced-motion

10. **Common Violations to Fix**

    **Missing alt text:**
    ```bash
    # Find images without alt
    grep -r "<img" src/ | grep -v "alt="
    ```

    **Poor link text:**
    ```html
    <!-- ❌ Bad -->
    <a href="/about">Click here</a>
    <a href="/post">Read more</a>

    <!-- ✅ Good -->
    <a href="/about">About Sam Hesson</a>
    <a href="/post">Read full article: Getting Started with Astro</a>
    ```

    **Missing form labels:**
    ```bash
    # Find inputs without labels
    grep -r "<input" src/ | grep -v "aria-label\|id="
    ```

## Accessibility Testing Workflow

**Pre-deployment:**
```bash
# Run automated tests
npm run build
npx axe dist/ --tags wcag2a,wcag2aa

# Run Lighthouse
npx lighthouse https://localhost:4321 --view
```

**Manual testing:**
1. Navigate entire site with keyboard only (no mouse)
2. Test with screen reader
3. Zoom to 200% and verify layout
4. Test with different color blindness filters
5. Verify focus indicators are visible

**Post-deployment:**
1. Run accessibility scan on production URL
2. Monitor analytics for accessibility issues
3. Collect feedback from users with disabilities

## Notes

- Accessibility is not optional - it's a legal requirement
- Test with real assistive technologies
- Design with accessibility in mind from the start
- Update skills regularly as standards evolve
- Consider hiring accessibility consultants for audits
