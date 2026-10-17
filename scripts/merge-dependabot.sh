#!/usr/bin/env bash
set -euo pipefail

repo=${1:-Git-FED/MuseAi-Skills-Guide}
command -v gh >/dev/null || { echo 'gh CLI is required.' >&2; exit 1; }

mapfile -t prs < <(gh pr list --repo "$repo" --state open --author dependabot[bot] --json number --jq '.[].number')
if ((${#prs[@]} == 0)); then
  echo "No open Dependabot pull requests found in $repo."
  exit 0
fi

for pr in "${prs[@]}"; do
  echo "Merging Dependabot PR #$pr"
  gh pr merge "$pr" --repo "$repo" --squash --delete-branch
done
