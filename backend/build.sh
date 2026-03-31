#!/bin/bash
# Build script for Render deployment

# Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Create uploads directory if it doesn't exist
mkdir -p uploads

echo "Build completed successfully!"
