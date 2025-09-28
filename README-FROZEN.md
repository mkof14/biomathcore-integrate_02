# Member Zone — FROZEN
This block is frozen to prevent accidental changes:
- Local pre-commit hook blocks edits to: src/app/member, src/components (member UI pieces), src/lib/assistant, src/lib/reports, src/app/catalog.
- GitHub CODEOWNERS requires review by @mkof14.
- CI workflow fails if those paths change.

To make an intentional edit:
1) Local one-off: `ALLOW_MEMBER_EDITS=1 git commit -m "intentional change"`
2) In CI/PR: set env `ALLOW_MEMBER_EDITS=1` before merge, and add context in PR.
