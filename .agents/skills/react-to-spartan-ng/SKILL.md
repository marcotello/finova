---
name: react-to-spartan-ng
description: Ports React components with Tailwind CSS to Angular 19+ standalone components using spartan.ng design tokens and signal-based architecture. Use when migrating React screens or building UI adhering to the shadcn-compatible Spartan UI system. Do not use for backend integrations or non-UI pure logic porting.
---

# UI Porting Procedure (React to Angular with Spartan UI)

Follow these steps when converting React components (especially those using `shadcn/ui` and Tailwind CSS) into Angular 19+ standalone components using `spartan.ng`. 

## 1. Analyze the React Component
1. Review the NextJS/React source code to identify structural elements (layouts, cards, headers, grids).
2. Identify React Hooks (`useState`, `useMemo`, `useEffect`) which must be mapped to Angular Signals (`signal`, `computed`, `effect`).
3. Note all icons imported from `lucide-react`.

## 2. Generate the Angular Component
1. Generate the standalone component using the Angular CLI: `ng g c [component-name]`.
2. Ensure the component imports essential Angular modules: `NgClass` (for dynamic class bindings), `NgIcon` (for icons), and `FormsModule` (for two-way data binding).

## 3. Implement the Component Logic (.ts)
1. Convert all state definitions to Angular Signals.
   * *React:* `const [formData, setFormData] = useState({email: ''})`
   * *Angular:* `formData = signal({email: ''})`
2. Implement modification handlers that utilize `.update()` or `.set()` on signals.
3. Import icons from `@ng-icons/lucide` matching the React `lucide-react` icons. Include them in the `@Component` `providers` array via `provideIcons({ ... })`.
4. If styling involves theme toggling, inject the `GlobalStateService` (or similar service specific to the workspace) to track and mutate the system theme signal.

## 4. Port the Template (.html)
1. Copy the core HTML structure and Tailwind classes. Spartan UI utilizes identical design tokens to shadcn (`bg-background`, `bg-card`, `text-muted-foreground`, `border-border`, `ring-primary`).
2. Map React dynamic classes `className={condition ? 'class-a' : 'class-b'}` to `[ngClass]="condition() ? 'class-a' : 'class-b'"`.
3. Convert all input value bindings to `[ngModel]="signalName()"` and `(ngModelChange)="signalName.set($event)"` (or trigger update functions).
4. Replace `lucide-react` tags `<Mail className="..."/>` with `<ng-icon name="lucideMail" class="..."></ng-icon>`.
5. Map React functional control flows to Angular 17+ control flows:
   * `{condition && <Element/>}` becomes `@if (condition()) { <Element/> }`
   * `{items.map(item => <Element/>)}` becomes `@for (item of items(); track item.id) { <Element/> }`

## 5. Address Angular-Specific Quirks
1. **Pipes and Templates**: If using Angular pipes like `CurrencyPipe` inside a `Record<string, unknown>`, utilize `$any()` to satisfy strict template checking constraints (e.g. `{{ $any(item.value) | currency }}`).
2. **Icons Mapping**: Always prefix Lucide icons with `lucide` in camelCase (e.g., `ArrowRight` -> `lucideArrowRight`).
3. **Control Status**: Angular's strict forms or bindings must observe disabled states natively using `[disabled]="isLoading()"`.

## 6. Update Routing
1. Once ported, register the new component route inside `src/app/app.routes.ts`.
2. Choose the appropriate layout wrapper depending on the design (e.g., `MainLayout` for dashboard pages, `FullScreenLayout` for authentication/full screens).
