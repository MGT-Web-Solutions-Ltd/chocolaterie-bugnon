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

# data/ holds the Actualités source; it is baked into index.html, so the server never needs it.
EXCLUDES=(
  '.DS_Store'
  'README.md'
  'DEPLOY.md'
  'build-for-hostinger.sh'
  'data'
  'js/chocobugnon-config.example.js'
  'images/new_images/Logo_*'
)

if command -v rsync >/dev/null 2>&1; then
  args=()
  for pattern in "${EXCLUDES[@]}"; do args+=(--exclude="$pattern"); done
  rsync -a "${args[@]}" "$SRC/" "$DEST/"
else
  # Minimal CI containers ship without rsync; cp + prune gets the same result.
  echo "rsync not found — falling back to cp"
  cp -R "$SRC/." "$DEST/"
  for pattern in "${EXCLUDES[@]}"; do
    # Patterns with a slash are paths relative to the root; the rest match any basename.
    if [[ "$pattern" == */* ]]; then
      find "$DEST" -depth -path "$DEST/$pattern" -exec rm -rf {} + 2>/dev/null || true
    else
      find "$DEST" -depth -name "$pattern" -exec rm -rf {} + 2>/dev/null || true
    fi
  done
fi

echo "Done. Upload everything inside: hostinger-site/"
ls -la "$DEST" | head -20
