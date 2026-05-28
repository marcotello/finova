#!/bin/bash
# Scaffold the Angular Architectural Folder Structure

# Default to the current directory if no argument is provided
TARGET_DIR="${1:-.}"

# Ensure the target directory exists
if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: Target directory '$TARGET_DIR' does not exist."
  echo "Usage: ./scaffold-architecture.sh [target-directory]"
  exit 1
fi

echo "Scaffolding Angular Architecture in $TARGET_DIR..."

mkdir -p "$TARGET_DIR/core"
mkdir -p "$TARGET_DIR/layout"
mkdir -p "$TARGET_DIR/shared"
mkdir -p "$TARGET_DIR/features"
mkdir -p "$TARGET_DIR/pattern"

echo "Directories created successfully:"
echo "  - $TARGET_DIR/core/"
echo "  - $TARGET_DIR/layout/"
echo "  - $TARGET_DIR/shared/"
echo "  - $TARGET_DIR/features/"
echo "  - $TARGET_DIR/pattern/"
echo "Done!"
