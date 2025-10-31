#!/usr/bin/env bash
set -euo pipefail
PORT=${1:-8000}
ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
cd "$ROOT_DIR"
python -m http.server "$PORT"
