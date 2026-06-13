#!/bin/bash

# Exit on error
set -e

echo "=== Step 1: Installing Netlify CLI globally ==="
if ! command -v netlify &> /dev/null; then
    npm install -g netlify-cli
else
    echo "Netlify CLI is already installed."
fi

echo "=== Step 2: Logging in to Netlify ==="
echo "This will open a browser window to authenticate with your Netlify account."
netlify login

echo "=== Step 3: Creating a new Netlify site & deploying ==="
# Create a new site (interactively allows choosing team and name)
# Then deploy the 'frontend' directory directly to production
netlify init --manual

echo "=== Step 4: Deploying to Production ==="
netlify deploy --prod --dir=frontend

echo "=== Done! ==="
