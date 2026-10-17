---
name: audit-ledger
description: Track multi-step agent work as discrete actions with evidence and explicit uncertainty labels.
---

# Audit Ledger

For every discrete action, record: action ID, action type, target, start/end or duration, bytes sent, bytes received, value status, evidence, outcome, retries, and privacy level.

Use `MEASURED` only for direct observation, `REPORTED` for a value supplied by a service, `ESTIMATED` for a transparent calculation, and `UNAVAILABLE` when the evidence cannot establish a value. Keep model-token usage separate from network-byte usage.

Before finishing, summarize totals by action type and service, identify the three largest actions, list assumptions, and name any unavailable values.
