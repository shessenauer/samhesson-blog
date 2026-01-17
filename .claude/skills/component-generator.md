# Component Generator

Generate new Astro and React components following the project's design system and patterns.

## Overview

This skill helps create new components that automatically follow your Organic Modernism design aesthetic and established code patterns.

## Commands

Use `/new-component` to invoke this skill.

## Instructions

When this skill is invoked, help create components by:

1. **Understand Requirements**
   - Ask what the component should do
   - Determine if it should be Astro (.astro) or React (.tsx)
   - Identify required props and state
   - Check if similar components exist to follow patterns

2. **Design System Integration**

   **Color Usage:**
   ```tsx
   // Use design system colors, not arbitrary values
   className="bg-warm-sand-100 dark:bg-dark-bg-secondary"
   className="text-void-400 dark:text-warm-sand-100"
   className="border-driftwood-300 dark:border-driftwood-300/30"
   className="hover:text-living-green-500"
   ```

   **Border Radius:**
   ```tsx
   // Minimum 16px, prefer 24px
   className="rounded-[24px]"  // Cards, containers
   className="rounded-full"     // Pills, badges
   ```

   **Shadows:**
   ```tsx
   // Use CSS variables for consistent shadows
   style={{ boxShadow: 'var(--shadow-md)' }}
   // Or use shadow-md, shadow-lg classes
   ```

   **Typography:**
   ```tsx
   // Add letter spacing to headings
   style={{ letterSpacing: '-0.02em' }}
   ```

3. **Component Templates**

   **React Component:**
   ```tsx
   import { motion } from 'framer-motion';

   interface ComponentNameProps {
     title: string;
     description?: string;
     onClick?: () => void;
   }

   export default function ComponentName({
     title,
     description,
     onClick
   }: ComponentNameProps) {
     return (
       <motion.div
         className="p-6 bg-warm-sand-100 dark:bg-dark-bg-secondary rounded-[24px] border border-driftwood-300 dark:border-driftwood-300/30"
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
       >
         <h2
           className="text-2xl font-bold mb-2 text-void-400 dark:text-warm-sand-100"
           style={{ letterSpacing: '-0.02em' }}
         >
           {title}
         </h2>
         {description && (
           <p className="text-void-200 dark:text-driftwood-200">
             {description}
           </p>
         )}
       </motion.div>
     );
   }
   ```

   **Astro Component:**
   ```astro
   ---
   interface Props {
     title: string;
     description?: string;
   }

   const { title, description } = Astro.props;
   ---

   <div class="p-6 bg-warm-sand-100 dark:bg-dark-bg-secondary rounded-[24px] border border-driftwood-300 dark:border-driftwood-300/30 shadow-md">
     <h2 class="text-2xl font-bold mb-2 text-void-400 dark:text-warm-sand-100" style="letter-spacing: -0.02em;">
       {title}
     </h2>
     {description && (
       <p class="text-void-200 dark:text-driftwood-200">
         {description}
       </p>
     )}
     <slot />
   </div>
   ```

4. **Animation Patterns**

   **Fade In:**
   ```tsx
   <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ duration: 0.3 }}
   >
   ```

   **Slide Up:**
   ```tsx
   <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
   >
   ```

   **Hover Scale:**
   ```tsx
   <motion.button
     whileHover={{ scale: 1.05 }}
     whileTap={{ scale: 0.95 }}
     transition={{ duration: 0.2 }}
   >
   ```

5. **Accessibility Requirements**
   - Add proper ARIA labels
   - Ensure keyboard navigation works
   - Include focus states with living-green accent
   - Use semantic HTML elements
   - Test with screen readers
   - Maintain color contrast ratios (WCAG AA minimum)

6. **Component Checklist**
   - [ ] Uses design system colors
   - [ ] Has 24px border radius (or pill shape)
   - [ ] Includes dark mode styles
   - [ ] Has smooth animations (300ms default)
   - [ ] Proper TypeScript types
   - [ ] Accessibility features included
   - [ ] Responsive on mobile
   - [ ] Follows existing component patterns

## File Locations

- React components: `/src/components/*.tsx`
- Astro components: `/src/components/*.astro`
- Layouts: `/src/layouts/*.astro`
- Pages: `/src/pages/*.astro`

## Common Components to Generate

**Button Component:**
```tsx
<motion.button
  className="px-6 py-3 bg-living-green-500 text-warm-sand-50 rounded-full font-semibold shadow-md hover:bg-living-green-400 transition-colors"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>
```

**Card Component:**
```tsx
<div className="p-8 bg-warm-sand-100 dark:bg-dark-bg-secondary rounded-[24px] border border-driftwood-300 dark:border-driftwood-300/30 shadow-md">
  <slot />
</div>
```

**Badge Component:**
```tsx
<span className="px-3 py-1 bg-living-green-100 dark:bg-living-green-500/20 text-living-green-500 dark:text-living-green-200 rounded-full text-sm">
  {label}
</span>
```

## Notes

- Always check `/docs/design/` for the latest design tokens
- Test components in both light and dark modes
- Ensure animations respect `prefers-reduced-motion`
- Keep components small and focused (single responsibility)
- Extract reusable logic into hooks or utilities
