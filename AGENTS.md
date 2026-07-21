# AGENTS.md

## Project Documentation

The primary project documentation is stored in `docs/`.

Before modifying code:

1. Read `docs/README.md`.
2. Read `docs/16-codex-rules.md`.
3. Read the documentation related to the assigned task.
4. Check `docs/14-task-list.md`.

## Source of Truth

Use the following priority order:

1. The user's latest instruction.
2. `AGENTS.md`.
3. Documentation inside `docs/`.
4. Existing code.

If information conflicts, stop and report the conflict.

## Development Rules

- Work by task ID.
- Do not work outside the defined scope.
- Never expose secrets.
- OpenAI API requests must run on the server.
- Do not change architecture without recording a decision.
- Run linting, type checking, and tests after changes.
- Update task status after successful completion.
