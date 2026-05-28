---
name: angular-architecture
description: Scaffolds and enforces a highly scalable, domain-driven Angular architectural folder structure mapping to distinct types (core, layout, shared, features, pattern). Use when initializing new Angular projects or restructuring an existing application. Do not use for generic feature implementation unless establishing new boundaries.
---

# Angular Domain-Driven Architecture Scaffold Procedure

Follow these steps to structure an Angular project by grouping elements into distinct architectural types to enforce clean dependency boundaries. 

## 1. Scaffold Base Directories
Run the `scripts/scaffold-architecture.sh` script to instantly build the base file structure inside the target Angular directory. If the script is unavailable or you are in a non-standard environment, manually construct the following folders:
- `core/`
- `layout/`
- `shared/`
- `features/`
- `pattern/`

## 2. Implement Architectural Constraints

### Core (`core/`)
1. Place headless, injector-based logic here (services, interceptors, guards, global state).
2. Group contents **by domain**, not by type. 
   - *Correct:* `core/auth/auth.service.ts`
   - *Incorrect:* `core/services/auth.service.ts`

### Layout (`layout/`)
1. Place template-based building blocks (components, directives) that form the structural "frame" of the application.
2. Group by layout type (e.g., `layout/main-layout/`, `layout/full-screen-layout/`).

### Shared (`shared/`)
1. Place purely generic, highly reusable standalone UI components (buttons, avatars, generic dialogs).
2. Ensure components here communicate **exclusively via inputs and outputs** (e.g., `@Input()` / `@Output()` or input signals).
3. Never inject domain-specific core services or read global state directly inside shared components.

### Features (`features/`)
1. Place lazy-loaded business features here.
2. Treat each feature as an isolated "black box" (e.g., `features/dashboard/`, `features/settings/`).
3. **Strict Boundary:** A feature folder must NEVER import from a sibling feature folder.
4. For massive features, nest them into sub-features (e.g., `features/order/dashboard/`).

### Pattern (`pattern/`)
1. Place cross-cutting, reusable business workflows here (e.g., `pattern/document-manager/`).
2. Treat these as "drop-in" pre-packaged combinations of components and injectables designed to be embedded within the templates of lazy features.

## 3. Verify Dependency Boundaries
Ensure the application follows a strict one-way dependency graph. If setting up linting, configure tools like `eslint-plugin-boundaries` to enforce these rules:
- `features/` and `pattern/` may depend on `core/`, `shared/`, and `layout/`.
- `layout/` may depend on `shared/` and `core/`.
- `shared/` and `core/` are foundation layers and must NOT depend on `features/`, `pattern/`, or `layout/`.
