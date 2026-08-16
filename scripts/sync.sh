#!/usr/bin/env bash
# Stage, commit, and push in one step.
# Usage: pnpm sync "commit message"
# If no message is passed, prompts for one interactively.
set -euo pipefail

message="${1:-}"

if [ -z "$message" ]; then
  read -rp "Commit message: " message
fi

if [ -z "$message" ]; then
  echo "Aborting: commit message cannot be empty." >&2
  exit 1
fi

git add -A
git commit -m "$message"
git push
