#!/bin/bash
# Scaffold the standard Dual-Layout architecture via Angular CLI

# Ensure we are inside an Angular project
if [ ! -f "angular.json" ]; then
  echo "Error: Must be run from the root of an Angular workspace (where angular.json exists)."
  exit 1
fi

echo "Scaffolding Layout Components..."

# Generate Full Screen Layout
ng generate component layout/full-screen-layout --skip-tests

# Generate Main Layout and its frame components
ng generate component layout/main-layout/main --skip-tests
ng generate component layout/main-layout/header --skip-tests
ng generate component layout/main-layout/footer --skip-tests
ng generate component layout/main-layout/sidebar --skip-tests

echo ""
echo "Layout scaffolding complete!"
echo "Next Steps:"
echo "1. Configure <router-outlet> in the generated HTML templates."
echo "2. Register your layouts in app.routes.ts."
