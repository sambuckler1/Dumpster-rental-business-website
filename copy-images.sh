#!/bin/bash

# Source directory (where your images are)
SOURCE="/Users/samuelbuckler/Desktop/trailer imgs"

# Destination directory (Next.js public folder)
DEST="$(pwd)/public"

echo "Copying images from: $SOURCE"
echo "To: $DEST"
echo ""

# Copy JPG files
if [ -d "$SOURCE" ]; then
  cp "$SOURCE"/*.jpg "$DEST/" 2>/dev/null
  cp "$SOURCE"/*.JPG "$DEST/" 2>/dev/null
  echo "✓ JPG images copied"
else
  echo "✗ Source directory not found: $SOURCE"
fi

# Copy MP4 files
if [ -d "$SOURCE" ]; then
  cp "$SOURCE"/*.mp4 "$DEST/" 2>/dev/null
  cp "$SOURCE"/*.MP4 "$DEST/" 2>/dev/null
  echo "✓ MP4 videos copied"
fi

echo ""
echo "Files now in public folder:"
ls -lh "$DEST"/*.{jpg,JPG,mp4,MP4} 2>/dev/null || echo "No image/video files found"
