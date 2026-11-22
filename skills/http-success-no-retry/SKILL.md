---
name: http-success-no-retry
description: Treat any HTTP 2xx response as success and check what landed before retrying, so a created post is never sent twice.
---

# Treat HTTP 2xx as Success

## Classify the status before you retry

- Treat any status from 200 to 299 as success and never retry it as a failure.
- Treat 201 as created and treat 200 as done and treat 202 as accepted and treat 204 as done with no body.
- Treat only 4xx and 5xx and network errors as candidates for a retry and check the cause before you retry any of them.
- Never assume a non 200 status means the request failed.

## Check what landed before you retry

- Before any retry of a send or post or reply, check the live destination or the landed count first.
- If the item already landed, record it as done and do not send it again.
- If the landed count is unknown and the first attempt returned a 2xx, record the attempt as done and verify it by a read before you send anything again.
- If a sweep reports far fewer landed items than chunks sent, check the status classification first before you rerun the sweep.

## Record the retry decision

- Record the status code and the status class and the landed check for every retried request.
- State the reason for a retry in one line and name the check that showed the first attempt did not land.
- Brief a delegated worker with this rule in the brief and require the same record in its receipt.

## Alternatives for better results

- Prefer a landed count read over a status code guess when the destination offers one.
- Prefer an idempotency key or a unique record id when the service offers one so a repeated send cannot create a duplicate.
- Prefer one careful retry with a fresh landed check over a fast automatic retry loop.
