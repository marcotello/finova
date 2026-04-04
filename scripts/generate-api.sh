#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting API generation..."

# Verify backend is reachable
if ! curl -s -f http://localhost:3000/api-json > /dev/null; then
  echo "Error: Backend is not reachable at http://localhost:3000/api-json."
  echo "Please ensure the finova-api backend is running."
  exit 1
fi

echo "Backend is reachable. Running OpenAPI Generator..."

# Run OpenAPI Generator
npx @openapitools/openapi-generator-cli generate \
  -i http://localhost:3000/api-json \
  -g typescript-angular \
  -o src/app/core/api \
  --additional-properties=providedInRoot=true,stringEnums=true,supportsES6=true

echo "API generation completed successfully! Code is available in src/app/core/api."
