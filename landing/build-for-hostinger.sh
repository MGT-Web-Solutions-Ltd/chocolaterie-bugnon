#!/bin/bash
# Builds ../hostinger-site/ — select ALL files in that folder and upload to public_html
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SRC="$SCRIPT_DIR"
DEST="$REPO_ROOT/hostinger-site"

echo "Building Hostinger package → $DEST"
rm -rf "$DEST"
mkdir -p "$DEST"

rsync -a \
  --exclude='.DS_Store' \
  --exclude='README.md' \
  --exclude='DEPLOY.md' \
  --exclude='build-for-hostinger.sh' \
  --exclude='js/chocobugnon-config.example.js' \
  --exclude='images/new_images/Logo_*' \
  "$SRC/" "$DEST/"

echo "Done. Upload everything inside: hostinger-site/"
ls -la "$DEST" | head -20
