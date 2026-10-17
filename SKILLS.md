# Skills Guide

These are small, inspectable skills you can copy into a project today. They use plain Markdown with YAML front matter, so they are easy to version, review, and adapt.

## Quick install

Copy one skill into the skills directory used by your agent or project:

```bash
mkdir -p .skills
cp skills/audit-ledger/SKILL.md .skills/
```

Replace `audit-ledger` with any folder below. Keep only the skills you want active.

## Available skills

### Audit Ledger

`skills/audit-ledger/SKILL.md` keeps multi-step work auditable. It records one discrete action at a time and separates measured, reported, estimated, and unavailable values.

### Privacy Boundary Review

`skills/privacy-boundary-review/SKILL.md` adds a permission checkpoint before sign-in, account connection, uploads, downloads, form submissions, purchases, settings changes, or sensitive disclosures.

### Lesson Planner

`skills/lesson-planner/SKILL.md` turns a topic into a short, practice-first lesson with objectives, a worked example, an exercise, and an assessment check.

### Prompt Reviewer

`skills/prompt-reviewer/SKILL.md` reviews prompts for ambiguity, missing constraints, unsafe permissions, unverifiable claims, and unclear output requirements.

### Project Brief

`skills/project-brief/SKILL.md` converts an idea into a buildable brief with users, non-goals, acceptance criteria, risks, and a first milestone.

## Design principles

- Prefer evidence over confident narration.
- Ask before crossing an external or irreversible boundary.
- Keep secrets, private exports, cookies, and credentials out of prompts and repositories.
- State uncertainty beside the claim it affects.
- Make the smallest useful change, then verify it.

Each skill is MIT-licensed with the repository unless a more specific license is added to that file.
