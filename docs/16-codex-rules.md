# Codex Rules

## Before Coding

Codex must:

1. Read `docs/README.md`.
2. Read the documentation related to the assigned task.
3. Read the assigned task.
4. Inspect the existing code before creating new files.
5. Briefly explain the intended changes before editing.

## During Coding

- Work on only one task or one closely related group of tasks at a time.
- Do not add unnecessary dependencies.
- Do not change the architecture without approval.
- Do not create features outside the documented requirements.
- Do not use `any` without a clear reason.
- Never use the OpenAI API key in a client component.
- Do not place large amounts of business logic in UI components.
- Use clear and meaningful names.
- Keep component responsibilities focused.
- Reuse existing components before creating new ones.
- Follow the documented project structure.

## AI Provider Rules

- Call OpenAI and Gemini SDKs from the server only.
- Accept the user-provided provider key only through the validated chat request.
- Keep the key ephemeral and scoped to the active request or stream.
- Never persist or log the API key.
- Never send raw provider errors to the client.
- Read provider model identifiers from central server configuration.
- Store developer instructions in a separate file.
- Validate input before calling OpenAI.
- Support request cancellation.

## After Coding

Codex must:

1. Run the formatter.
2. Run linting.
3. Run type checking.
4. Run relevant tests.
5. Report changed files.
6. Report limitations or unresolved issues.
7. Mark the task as completed only after all checks pass.

## Prohibited Actions

Codex must not:

- Modify multiple phases without explicit instruction.
- Delete large amounts of code without explanation.
- Change the package manager.
- Change the framework.
- Add authentication before its planned phase.
- Add a database before its planned phase.
- Commit secrets.
- Present a mock implementation as production-ready.
