#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting API generation..."

# Run OpenAPI Generator
npx @openapitools/openapi-generator-cli generate \
  -i api-json.json \
  -g typescript-angular \
  -o src/app/core/api \
  --skip-validate-spec \
  --additional-properties=providedInRoot=true,stringEnums=true,supportsES6=true

echo "API generation completed successfully! Code is available in src/app/core/api."
