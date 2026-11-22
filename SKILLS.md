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

### Credential Diagnostic

`skills/credential-diagnostic/SKILL.md` tests a suspect credential against the correct endpoint and the four-check rule before declaring any key dead or asking the user to repost it. A 403 on one endpoint is not a dead token, and a rotating refresh token must be saved in the same run that burns the old one.

### Posting Run Pre-Flight

`skills/posting-run-preflight/SKILL.md` verifies every destination account, its audience tag, and its platform scope before any posting run, so content never lands on the wrong account or in the wrong audience. Copy approval covers the copy, not the destination.

### Delegate With a Brief and a Receipt

`skills/delegate-with-brief-and-receipt/SKILL.md` hands work to a subagent, background worker, or browser task with a definition-first brief, the full scope enumerated by name, and a durable result receipt, and verifies the outcome before reporting it done.

### Verify Before You Claim

`skills/verify-before-claim/SKILL.md` confirms a link, redirect, post, or upload is live from an unblocked path before reporting it delivered, and reports only what the check actually showed. Queued is not posted, and a local file is not a published one.

### HTTP Success, No Retry

`skills/http-success-no-retry/SKILL.md` treats any HTTP 2xx response as success and checks what landed before retrying, so a created post is never sent twice.

## Design principles

- Prefer evidence over confident narration.
- Ask before crossing an external or irreversible boundary.
- Keep secrets, private exports, cookies, and credentials out of prompts and repositories.
- State uncertainty beside the claim it affects.
- Make the smallest useful change, then verify it.

Each skill is MIT-licensed with the repository unless a more specific license is added to that file.
