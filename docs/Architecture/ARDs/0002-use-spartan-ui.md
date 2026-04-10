# ADR 002: Selection of Spartan UI for Frontend Development

## Status

Accepted

## Context

The **Finova** web application requires a user interface that is both high-performance and capable of handling dense financial data (ledgers, transaction feeds, and budget visualizations). As the project transitioned to **Angular v21**, the architectural focus shifted heavily toward **Angular Signals** for state management and reactivity.

Initial candidates for the UI framework included:

1. **ng-zorro-antd:** An enterprise-grade library with a comprehensive component set but a monolithic structure and limited Signal-native support.
    
2. **Taiga UI:** A powerhouse for banking/fintech with robust input masks, but featuring a steep learning curve and proprietary internal logic.
    
3. **Spartan UI:** A modern, headless UI library based on Radix UI primitives and styled with Tailwind CSS.
    

## Decision

We will use **Spartan UI** (specifically the `@spartan/ui` Brain and HLM packages) as the primary UI foundation for Finova.

### Rationale

- **Signal-Native Alignment:** Spartan UI is built for the "Modern Angular" era, natively utilizing `input()`, `output()`, and `model()` signals. This aligns perfectly with our use of the **NgRx Signal Store**.
    
- **Headless Architecture (Brain vs. HLM):** By separating logic (Brain) from presentation (HLM), we gain total control over the DOM and styling without sacrificing accessibility (A11y).
    
- **Tailwind CSS Integration:** Spartan UI treats Tailwind as a first-class citizen. This allows us to implement our custom **OKLCH-based design system** (ADR 001) directly via Tailwind utility classes.
    
- **Performance & Tree-Shaking:** Unlike monolithic libraries, Spartan allows us to import only the specific "HLM" components we need, significantly reducing the final bundle size.
    
- **Design Continuity:** The aesthetic matches the modern "Shadcn-like" density observed in leading fintech applications, providing a clean, high-contrast look for financial ledgers.
    

## Consequences

- **Positive:** Sub-millisecond UI reactivity due to Signal-based change detection.
    
- **Positive:** Total flexibility in styling; we are not constrained by a library's internal CSS.
    
- **Neutral:** Developers must manage the "hlm" components within the local codebase (copy-paste strategy), which increases the number of files in the project but provides ultimate local control.
    
- **Negative:** Requires more manual setup for complex financial components (e.g., advanced currency masks) compared to specialized libraries like Taiga UI.
    

## References

- [Spartan UI Documentation](https://www.spartan.ng/ "null")
    
- [Architecture Document v2.0](https://www.google.com/search?q=architecture_finova.md "null")
    
- [Design System Document](https://www.google.com/search?q=design_system_finova.md "null")
