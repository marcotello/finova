# generate-api.sh

## Summary
The `generate-api.sh` script automates the generation of an Angular API client based on a Swagger/OpenAPI JSON specification, utilizing the `@openapitools/openapi-generator-cli`.

## Description
This script is designed to keep your Angular frontend synchronized with the NestJS backend API. By default, it reaches out to the standard backend URL to fetch the `api-json` documentation, and generates strongly-typed TypeScript services and models directly into `src/app/core/api`.

It has been enhanced to support flexible input sources, meaning you can either point it to a different live URL or provide a local `.json` file containing the OpenAPI specifications. This is particularly useful for CI/CD environments, AI agents (like Google Jules), or scenarios where the backend is not actively running.

## Step-by-Step Instructions

### Option 1: Running with Defaults (Recommended for everyday development)
If your backend is running locally on the default port, you can simply run the script via npm. It will automatically check if the backend is reachable at `http://localhost:3000/api-json`.

```bash
npm run api:generate
```
*(Or directly: `bash scripts/generate-api.sh`)*

### Option 2: Running with a Custom URL
If your backend is running on a different port or server, you can pass the `--url` (or `-u`) flag followed by the full address of the JSON endpoint.

```bash
bash scripts/generate-api.sh --url http://api.example.com/api-json
```
*(Alternative: `-u http://api.example.com/api-json`)*

### Option 3: Running with a Local File
If you have downloaded the swagger JSON file and wish to use it instead of making a network request, use the `--local` (or `-l`) flag followed by the file path. 

```bash
bash scripts/generate-api.sh --local ../finova-api/swagger-spec.json
```
*(Alternative: `-l ../finova-api/swagger-spec.json`)*

**Note:** When using the `--local` flag, the script skips the network reachability checks and only verifies that the file exists before invoking the generator.

## Common Errors & Troubleshooting

- **`Error: URL is not reachable at <URL>`**:
  - The script failed to fetch the JSON from the provided URL. Ensure your backend server is actually running, or correct the URL if you're using the `--url` flag.
  
- **`Error: Local file not found at <PATH>`**:
  - You used the `--local` flag, but the path you provided does not exist. Check for typos or ensure that you are using the correct relative/absolute path.

- **`Unknown parameter passed: <PARAM>`**:
  - You passed an unsupported argument. Refer strictly to `-u`/`--url` or `-l`/`--local`.
