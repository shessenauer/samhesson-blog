# Design Documentation

This directory contains the complete brand aesthetic and design system documentation for the blog.

## Documents

### [Brand Guidelines](./brand-guidelines.md)
Complete brand aesthetic documentation including:
- Core visual philosophy (Organic Modernism meets Eco-Futurism)
- Design elements (form, materiality, lighting)
- Color palette specifications
- Typography system
- Component specifications
- Animation principles
- Implementation guidelines

### [Design Tokens](./design-tokens.css)
CSS custom properties and design tokens ready for implementation:
- Color variables (light and dark modes)
- Typography scale
- Spacing system
- Border radius values
- Shadow definitions
- Transition timing and easing
- Semantic color mappings

## Quick Start

### For Designers
1. Read [brand-guidelines.md](./brand-guidelines.md) thoroughly
2. Reference the color palette and typography sections when creating designs
3. Use the component specifications as a starting point
4. Follow the animation principles for motion design

### For Developers
1. Import [design-tokens.css](./design-tokens.css) into your project
2. Reference the brand guidelines for implementation details
3. Use CSS custom properties for consistent styling:
   ```css
   background: var(--bg-primary);
   color: var(--text-primary);
   border-radius: var(--radius-xl);
   ```
4. See [issue #8](https://github.com/shessenauer/samhesson-blog/issues/8) for implementation tracking

## Key Principles

1. **Warm Technology** - Never cold or sterile
2. **Fluid Geometry** - No sharp corners
3. **Nature-Inspired** - Biophilic design
4. **Serene & Calm** - Generous whitespace
5. **Tactile Feel** - Even in digital

## Related Issues

- [#8 - Implement Brand Aesthetic](https://github.com/shessenauer/samhesson-blog/issues/8) - Tracking implementation

## Updating

These documents should be treated as living documentation. When making updates:

1. Update the version number in brand-guidelines.md
2. Document the changes in git commit message
3. Notify the team of significant changes
4. Update related components/code to match

## Questions?

Open a GitHub issue with the `design` label for questions or suggestions.
