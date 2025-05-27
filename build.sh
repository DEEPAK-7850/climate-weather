#!/bin/bash

# Clean dist directory
rm -rf dist

# Create necessary directories
mkdir -p dist

# Build server with esbuild directly
npx esbuild server/index.ts \
  --bundle \
  --platform=node \
  --target=node18 \
  --format=esm \
  --outfile=dist/server.js \
  --sourcemap

# Build client with Vite
npm run vite build 