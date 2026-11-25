---
name: disk-cleanup
description: "Reclaim disk on the Muse VM: clear the Trash and the backup staging dir (~/.cache/dump-tmp), verify with du and df, and run it daily without touching live data or the backup job's canonical scripts."
---

# Disk Cleanup

Reclaims disk on the Muse VM by clearing two staging areas that only hold copies and trash. Nothing live is touched.

## What it clears

- `~/.local/share/Trash/` — deleted files. On 2026-11-25 this held 8.3G, the trashed FED-13 build. Clearing Trash deletes permanently, there is no recovery after this.
- `~/.cache/dump-tmp/` — working dir of the daily backup dump pipeline. On 2026-11-25 this held 31G: a 23G repo checkout (`muse3-daily-2026-11-22`), a 5G snapshot (`snapshot-2026-11-20`), a 3.5G tarball (`muse3-data-main.tar.gz`), plus per-run logs and scripts.

## What it never touches

- `~/workspace/` — live working data. The tarballs and checkouts in dump-tmp are copies of it.
- `~/workspace/goals/backup-data-dumps/hidden_files/` — the backup job's canonical scripts (`redact.py`, `inspect_restore.py`, `restore_fp.py`). dump-tmp holds working copies only.
- `~/memory/` and `~/MEMORY.md`.
- Live lane logs and running processes.

## Manual run

1. Measure first: `du -sh ~/.local/share/Trash ~/.cache/dump-tmp` and `df -h` on the 150G disk.
2. Check the dump pipeline is not mid-run: `pgrep -af "build-dump|commit-dump|redact"`. If it is running, skip dump-tmp this time.
3. Delete contents only, keep the directories: `rm -rf ~/.local/share/Trash/* ~/.cache/dump-tmp/*`
4. Verify: `du -sh` both dirs reads 0, and `df -h` shows the freed space. On 2026-11-25 the disk went from 70G used / 80G free to 36G used / 114G free.

## Daily automation

Cron `daily-trash-dump-tmp-cleanup`, daily in a window starting 04:00 America/New_York (runs about 04:17 EST). Same steps as the manual run, with the same dump-pipeline guard. Silent unless the cleanup fails or dump-tmp is skipped two days in a row. Log each run to `~/memory/YYYY-MM-DD.md` with sizes freed and free space after.

## Notes

- Clearing dump-tmp does not fix a stale remote backup. The remote MuseAiBot/Muse3-data backup was last pushed Nov 17 2026; the local staging copies are gone but the source data in `~/workspace/` is untouched.
- The biggest workspace dirs (2026-11-25): video-editor 4.1G, space-versions 2.1G, ts-spaces 1.5G, dragon-kings 1.3G. Those are live data and are out of scope for this skill.
