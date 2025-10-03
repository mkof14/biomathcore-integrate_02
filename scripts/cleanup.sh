#!/bin/bash
echo "Cleaning backup files..."
find src -type f \( -name "*.backup.*" -o -name "*.broken.*" -o -name "*.mono.*" \) -delete
echo "Cleanup complete!"
