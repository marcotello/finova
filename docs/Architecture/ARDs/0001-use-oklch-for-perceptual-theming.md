# ADR 001: Use OKLCH for Perceptual Theming and Design Tokens

## Status

Accepted

## Context

The **Finova** platform requires a design system that is both professional and highly accessible. In a financial application, semantic colors (Success, Warning, Destructive) carry significant meaning. Using traditional color spaces like RGB, Hex, or HSL often leads to "perceptual inconsistency," where a green (Success) might appear significantly brighter or more vibrant to the human eye than a red (Destructive), even if their lightness values are mathematically identical in HSL.

Furthermore, we are adopting **Tailwind CSS v4** patterns (via `@theme inline`) and **Angular v21**, which allows us to leverage modern browser features for better developer experience and user outcomes.

## Decision

We will use the **OKLCH** color space for all primary, secondary, and semantic color tokens in Finova.

### Rationale

- **Perceptual Uniformity:** OKLCH is designed to match how the human eye perceives color. Adjusting the "L" (Lightness) in OKLCH results in a predictable change in brightness across the entire color spectrum, which is nearly impossible with HSL or RGB.
    
- **Accessibility (A11y):** By using OKLCH, we can mathematically guarantee high-contrast ratios between backgrounds and foregrounds across both Light and Dark modes without manual "eyeballing."
    
- **Theming Efficiency:** Generating a Dark Mode palette becomes a matter of adjusting the Lightness and Chroma values while keeping the Hue constant, ensuring the "Indigo" brand remains recognizable but appropriately adjusted for low-light environments.
    
- **Modern Tooling:** Our CSS architecture (as seen in the `Design System` document) utilizes the Tailwind `@theme` block. OKLCH variables are now natively supported in all major modern browsers, which aligns with our Angular v21 target.
    

## Implementation Details

Colors will be defined in the global `styles.scss` (or equivalent theme file) using the following structure:

```
:root {
  --primary: oklch(0.4441 0.2464 271.0415); /* Finova Deep Indigo */
  --destructive: oklch(0.5771 0.2152 27.3250); /* Semantic Red */
  /* ... other tokens ... */
}
```

## Consequences

- **Positive:** Guaranteed visual consistency and superior accessibility for financial charts and ledgers.
    
- **Positive:** Simplified theme maintenance; dark mode is a predictable transformation of the light mode tokens.
    
- **Neutral:** Requires developers to be familiar with OKLCH syntax (Lightness, Chroma, Hue) rather than traditional Hex codes.
    
- **Negative:** Older browsers (pre-2023) may not support OKLCH, but this is acceptable given Finova's target of modern evergreen browsers.
    

## References

- [OKLCH Color Picker & Converter](https://oklch.com/ "null")
    
- [W3C Color Level 4 Specification](https://www.w3.org/TR/css-color-4/ "null")
    
- [Design System Document](https://www.google.com/search?q=design_system_finova.md "null")
    
- [Architecture Document v2.0](https://www.google.com/search?q=architecture_finova.md "null")
