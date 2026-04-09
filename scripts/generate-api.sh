#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Default values
API_SOURCE="http://localhost:3000/api-json"
IS_LOCAL=false

# Parse arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -u|--url) API_SOURCE="$2"; shift ;;
        -l|--local) API_SOURCE="$2"; IS_LOCAL=true; shift ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

echo "Starting API generation..."

if [ "$IS_LOCAL" = true ]; then
  # Check if local file exists
  if [ ! -f "$API_SOURCE" ]; then
    echo "Error: Local file not found at $API_SOURCE"
    exit 1
  fi
  echo "Using local file: $API_SOURCE. Running OpenAPI Generator..."
else
  # Verify backend is reachable
  if ! curl -s -f "$API_SOURCE" > /dev/null; then
    echo "Error: URL is not reachable at $API_SOURCE"
    echo "Please ensure the finova-api backend is running or provide a valid URL."
    exit 1
  fi
  echo "URL is reachable. Running OpenAPI Generator..."
fi

# Run OpenAPI Generator
npx @openapitools/openapi-generator-cli generate \
  -i "$API_SOURCE" \
  -g typescript-angular \
  -o src/app/core/api \
  --skip-validate-spec \
  --additional-properties=providedInRoot=true,stringEnums=true,supportsES6=true

echo "API generation completed successfully! Code is available in src/app/core/api."
