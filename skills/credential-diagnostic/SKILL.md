---
name: credential-diagnostic
description: Test a suspect credential against the correct endpoint and the four-check rule before declaring any key dead or asking the user to repost it.
---

# Credential Diagnostic

## Test the right endpoint first

- Confirm the service's current API version and test the suspect key against a documented endpoint before you conclude anything. A 403 on one endpoint is not a dead token.
- Test the identity or session endpoint first, the call that answers who this key is, because it separates a dead key from a wrong route or a missing scope.
- Never print raw token values to stdout, inside scripts, or in logs. Diagnose keys in shell variables and mask every value in any output.

## Run the four checks

- Rule out each of these before you blame the credential: the account is suspended, the site is under maintenance, a rate limit was hit, or the link or token expired.
- When none of the four apply, the method is the issue, never the key. Fix your call and retest instead of asking for a new key.

## Check stored credentials before asking

- Check your stored credentials or password vault for the current key before you ask the user for anything. A key already stored is already in your reach.
- Never ask the user to repost a key that is already stored. A needless repost request is the failure, not the key.

## Persist rotating tokens immediately

- For services whose refresh tokens are single use and rotating, save the new token in the same run that burns the old one. A keep-alive script that burns a grant without persisting the replacement kills the connection.
- Never test-refresh a rotating grant twice. One refresh consumes the old token, so a second attempt burns the new one too.

## Alternatives for better results

- Reproduce the failure with the smallest possible call before you change anything, so the fix is aimed at the real error.
