#!/usr/bin/env bash
set -euo pipefail
echo "BUILD_SHA=$(git rev-parse HEAD)"
echo "APP_VERSION=$(node -p "require('./package.json').version")"
