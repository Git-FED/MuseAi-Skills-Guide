#!/usr/bin/env bash
set -euo pipefail

repo=${1:-Git-FED/MuseAi-Skills-Guide}
body=${2:-docs/roadmap-issue.md}
command -v gh >/dev/null || { echo 'gh CLI is required.' >&2; exit 1; }

number=$(gh issue create --repo "$repo" --title 'Roadmap: what is next for Muse Skills Guide?' --body-file "$body" --label roadmap --json number --jq .number)
gh issue pin "$number" --repo "$repo"
printf 'Created and pinned roadmap issue #%s in %s\n' "$number" "$repo"
