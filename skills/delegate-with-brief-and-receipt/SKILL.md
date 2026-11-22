---
name: delegate-with-brief-and-receipt
description: Hand work to a subagent, background worker, or browser task with a definition-first brief and a durable result receipt, and verify the outcome before reporting it done.
---

# Delegate Work With a Brief and a Receipt

## Brief before you delegate

- Write the brief before handing anything off. State what the task is in one plain sentence and what it is not.
- List exclusions explicitly. Name the failure modes you have seen: padded lists built to hit a quota, invented facts, and scope drift.
- Give acceptance criteria. Say what done looks like and what the result must contain, such as fields, format, and count.
- Define the receipt up front. Say where results land: a named file under the workspace, live URLs, or exact record IDs. Never leave the return path to chance.

## Enumerate the whole scope before you dispatch

- When the user says everything, all, or every item, list every item by name before you send any worker.
- Never send a partial batch as if it were the whole job. If you must split work, label each batch with its items and state what remains unsent.
- Never treat a vague trailing phrase as a list. Read the agenda yourself and write the missing names out before dispatch.
- For posting work, name every platform in the brief. A platform not named is excluded, and a worker must not add one on its own.
- Check the scope list against the source agenda before dispatch. If the list is shorter than the source, stop and complete it first.
- If the user corrects the scope, rewrite the full list from the correction and re-brief from that list. Do not patch one batch and leave the rest on the old scope.

## Keep research to the named thing

- When the user names one thing, write that thing as the only in-scope subject in the brief and name adjacent topics as excluded.
- Partition worker angles inside the named thing only, and give each worker the named thing as its subject instead of a neighbouring topic.
- Tell each worker that an angle with nothing on the named thing reports nothing found, and that it must not fill the gap with adjacent material.
- Reject a worker result that fills an empty angle with adjacent material, re-brief it once on the named thing only, and do the angle yourself if it still fills the gap.
- Report a near-empty result as the finding, and name the named thing the list covers instead of padding the list with adjacent entries.

## Require a durable receipt

- Instruct the worker to write results to the named file as it goes. A final message alone is not a receipt when the runtime can drop it.
- Never report a delegated task as done without the receipt in hand. For a post that means the live link. For research that means the file with its entries. For a check that means the exact record you read.
- Treat a missing result as unknown, not failed. If the worker vanished and no receipt exists, say so and name what you can still check. Never speculate about the cause.

## Report honestly

- If the outcome is unknown, say unknown and keep working it. A guessed cause is a second failure on top of the first.
- If the result is shallow or padded, reject it against the brief's criteria and re-brief once. If it still misses, do the work yourself rather than shipping padding.
- Hold delegated work to the same bar as your own: a claim is not settled until you verified it, and a post is not done until the user has the URL.

## Alternatives for better results

- Split long delegated work into milestones with a receipt per milestone. A lost worker then costs one step, not the whole job.
- For research tasks that keep returning thin lists, give the worker your own best example first and ask it to match that bar.
