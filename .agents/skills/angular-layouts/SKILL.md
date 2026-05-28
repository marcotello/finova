---
name: angular-layouts
description: Scaffolds the standard dual-layout architecture (Full Screen Layout and Main Layout with header, footer, and sidebar) used in standard Angular workspaces. Use when initiating routing shells in a new application to maintain a unified structural frame.
---

# Angular Layouts Scaffold Procedure

Follow these steps to instantiate the core application layout wrappers. The project relies on a dual-layout strategy: 
- **Full Screen Layout:** Used for isolated, frameless pages (e.g., Login, Signup, 404).
- **Main Layout:** Used for the core application, encompassing a header, footer, and a default sidebar.

## 1. Scaffold Layout Components
Execute the provided script `scripts/scaffold-layouts.sh` to instantly generate the layout tree using the Angular CLI. 

If executing manually, run the following commands sequentially from the root of the Angular workspace:
1. `ng g c layout/full-screen-layout --skip-tests`
2. `ng g c layout/main-layout/main --skip-tests`
3. `ng g c layout/main-layout/header --skip-tests`
4. `ng g c layout/main-layout/footer --skip-tests`
5. `ng g c layout/main-layout/sidebar --skip-tests`

*Note: Even if a specific screen does not immediately require a sidebar, it must be generated and included as part of the `main-layout` frame by default. The components only need to be initialized; no additional logic is required during the scaffold phase.*

## 2. Configure Full Screen Layout
1. Open the `full-screen-layout` HTML template.
2. Replace all generated boilerplate with a single, standalone `<router-outlet></router-outlet>`.

## 3. Configure Main Layout
1. Open the `main-layout` (or `main`) HTML template.
2. Structure the HTML to inject the generated frame components alongside the routing outlet. 
3. A common baseline structure looks like:
```html
<div class="app-layout">
  <app-header></app-header>
  <div class="main-content-wrapper">
    <app-sidebar></app-sidebar>
    <main class="content-area">
      <router-outlet></router-outlet>
    </main>
  </div>
  <app-footer></app-footer>
</div>
```

## 4. Register Layouts in Routing
1. Update `app.routes.ts`.
2. Group unprotected/frameless routes as children under the `full-screen-layout` component.
3. Group protected/dashboard routes as children under the `main-layout` component.
