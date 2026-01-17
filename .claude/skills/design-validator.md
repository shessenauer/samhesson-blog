# Design System Validator

Ensure code matches the Organic Modernism brand aesthetic defined in design documentation.

## Overview

This skill validates that new code follows the established design system, maintaining visual consistency across the blog.

## Commands

Use `/validate-design` to invoke this skill.

## Instructions

When this skill is invoked, validate design adherence by:

1. **Color Palette Validation**

   **Check for violations:**
   ```bash
   # Find generic Tailwind colors that should use design system
   grep -r "bg-gray-\|text-gray-\|border-gray-" src/
   grep -r "bg-blue-\|text-blue-\|border-blue-" src/
   ```

   **Correct colors to use:**
   - Backgrounds: `warm-sand-50/100/200`, `dark-bg-primary/secondary`
   - Text: `void-100/200/300/400`, `warm-sand-100` (dark mode)
   - Borders: `driftwood-200/300/400`
   - Accents: `living-green-100/200/300/400/500`
   - Secondary: `natural-wood-100/200/300/400/500`

   **Common violations:**
   - ❌ `bg-white` → ✅ `bg-warm-sand-100`
   - ❌ `bg-gray-900` → ✅ `bg-dark-bg-primary`
   - ❌ `text-blue-600` → ✅ `text-living-green-500`
   - ❌ `border-gray-200` → ✅ `border-driftwood-200`

2. **Border Radius Validation**

   **Rules:**
   - Minimum: 16px (`rounded-[16px]`)
   - Preferred: 24px (`rounded-[24px]`)
   - Pills: 9999px (`rounded-full`)
   - **Never use:** `rounded`, `rounded-sm`, `rounded-md`, `rounded-lg`

   **Find violations:**
   ```bash
   # Find non-compliant border radius values
   grep -r "rounded-sm\|rounded-md\|rounded-lg\|rounded\"" src/ --exclude-dir=node_modules
   ```

3. **Shadow Validation**

   **Use CSS variables:**
   ```tsx
   // ✅ Correct
   style={{ boxShadow: 'var(--shadow-md)' }}
   className="shadow-md"  // If defined in Tailwind config

   // ❌ Wrong
   style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
   ```

   **Available shadows:**
   - `--shadow-sm`: Subtle elevation
   - `--shadow-md`: Standard cards
   - `--shadow-lg`: Prominent elements
   - `--shadow-glow`: Special effects

4. **Typography Validation**

   **Heading letter-spacing:**
   ```tsx
   // All headings should have negative letter-spacing
   <h1 style={{ letterSpacing: '-0.02em' }}>Title</h1>
   <h2 style={{ letterSpacing: '-0.02em' }}>Subtitle</h2>
   ```

   **Font usage:**
   - Only use Inter font (already globally set)
   - Body line-height: 1.75 (automatic)
   - Prose max-width: 65ch for readability

5. **Animation Validation**

   **Timing standards:**
   - Fast: 200ms (hover, quick interactions)
   - Normal: 300ms (most transitions)
   - Slow: 500ms (page transitions)

   **Easing functions:**
   ```tsx
   // Use design system easings
   transition={{ ease: [0.4, 0.0, 0.2, 1] }}  // smooth
   transition={{ ease: [0.25, 0.1, 0.25, 1] }} // gentle
   ```

   **Respect reduced motion:**
   ```tsx
   // In global.css
   @media (prefers-reduced-motion: no-preference) {
     // Only add animations here
   }
   ```

6. **Dark Mode Validation**

   **Every color must have dark mode:**
   ```tsx
   // ✅ Correct
   className="bg-warm-sand-100 dark:bg-dark-bg-secondary"
   className="text-void-400 dark:text-warm-sand-100"

   // ❌ Missing dark mode
   className="bg-warm-sand-100"
   className="text-void-400"
   ```

   **Find missing dark mode:**
   ```bash
   # Find classes without dark: variants
   grep -r "className=" src/ | grep -v "dark:" | grep "bg-\|text-\|border-"
   ```

7. **Component Pattern Validation**

   **Cards should follow pattern:**
   ```tsx
   <div className="p-6 bg-warm-sand-100 dark:bg-dark-bg-secondary rounded-[24px] border border-driftwood-300 dark:border-driftwood-300/30 shadow-md">
   ```

   **Buttons should follow pattern:**
   ```tsx
   <button className="px-6 py-3 bg-living-green-500 hover:bg-living-green-400 text-warm-sand-50 rounded-full transition-colors">
   ```

   **Tags/Badges should follow pattern:**
   ```tsx
   <span className="px-3 py-1 bg-living-green-100 dark:bg-living-green-500/20 text-living-green-500 dark:text-living-green-200 rounded-full text-xs">
   ```

## Automated Checks

Create a validation script in `package.json`:

```json
{
  "scripts": {
    "validate:colors": "grep -r 'bg-gray-\\|text-blue-\\|bg-white' src/ || echo 'No violations found'",
    "validate:radius": "grep -r 'rounded-sm\\|rounded-md\\|rounded-lg\\|rounded\"' src/ || echo 'No violations found'",
    "validate:dark-mode": "grep -r 'className=' src/ | grep -v 'dark:' | grep 'bg-\\|text-\\|border-' || echo 'All elements have dark mode'"
  }
}
```

## Design System Reference Files

- **Design tokens**: `/docs/design/design-tokens.css`
- **Brand guide**: `/docs/design/brand-aesthetic.md`
- **Global styles**: `/src/styles/global.css`
- **Tailwind config**: `astro.config.mjs`

## Common Violations to Fix

1. **Using Tailwind defaults instead of custom colors**
   - Replace `gray-*` with `warm-sand-*` / `void-*` / `driftwood-*`
   - Replace `blue-*` with `living-green-*`

2. **Sharp corners (border-radius <16px)**
   - Update to minimum 16px or 24px

3. **Cold, generic shadows**
   - Use warm-toned shadows with natural wood colors

4. **Missing dark mode styles**
   - Add `dark:` variants to all color classes

5. **Hard-coded animation timings**
   - Use CSS variables or standard durations

6. **Missing letter-spacing on headings**
   - Add -0.02em to all heading elements

## Validation Workflow

1. **Before commit:**
   ```bash
   npm run validate:colors
   npm run validate:radius
   npm run validate:dark-mode
   ```

2. **During code review:**
   - Check design system adherence
   - Verify dark mode support
   - Test animations with reduced motion

3. **Visual QA:**
   - Compare with design documentation
   - Test in light and dark modes
   - Verify on mobile and desktop
   - Check color contrast ratios

## Notes

- The design system is in `/docs/design/` - reference it often
- Consistency is more important than perfection
- When in doubt, check existing components for patterns
- Update this skill if design system evolves
