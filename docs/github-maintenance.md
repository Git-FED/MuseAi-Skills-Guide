# GitHub maintenance

The repository currently has eleven open Dependabot pull requests. When an account with repository write access is available, run:

```bash
gh auth login
gh label create roadmap --repo Git-FED/MuseAi-Skills-Guide --description "Project roadmap" --color 0e8a16 || true
./scripts/merge-dependabot.sh
./scripts/create-and-pin-roadmap-issue.sh
```

The scripts use the GitHub CLI, merge only open pull requests authored by Dependabot, create the public roadmap issue from [`roadmap-issue.md`](roadmap-issue.md), and pin the new issue. They do not handle credentials or print tokens.
