# Task List

## Status Legend

- `[ ]` Not started.
- `[~]` In progress.
- `[x]` Completed.
- `[!]` Blocked.

## Phase 1: Foundation

- [x] T001 Create the Next.js project.
- [x] T002 Configure TypeScript strict mode.
- [x] T003 Configure Tailwind CSS.
- [x] T004 Install and configure shadcn/ui.
- [x] T005 Add environment validation.
- [x] T006 Create the base application layout.
- [x] T007 Add lint and typecheck scripts.

## Phase 2: Chat Interface

- [x] T101 Create the application shell.
- [x] T102 Create the desktop sidebar.
- [x] T103 Create the mobile sidebar.
- [x] T104 Create the chat header.
- [x] T105 Create the empty chat state.
- [x] T106 Create the message list.
- [x] T107 Create the message item.
- [x] T108 Create the chat composer.
- [x] T109 Add responsive behavior.
- [x] T110 Add dark mode.

## Phase 3: Chat Behavior

- [x] T201 Define chat types.
- [x] T202 Create the `useChat` hook.
- [x] T203 Add message submission.
- [x] T204 Add keyboard shortcuts.
- [x] T205 Add automatic scrolling.
- [x] T206 Add pending state.
- [x] T207 Add error state.
- [x] T208 Add retry behavior.
- [x] T209 Add stop behavior.

## Phase 4: AI Provider Integration

- [x] T301 Add official OpenAI and Google GenAI SDKs.
- [x] T302 Define AI provider and connection types.
- [x] T303 Create provider and ephemeral API key setup UI.
- [x] T304 Create the chat request schema.
- [x] T305 Create `POST /api/chat`.
- [x] T306 Create the AI provider router.
- [x] T307 Create the OpenAI adapter.
- [x] T308 Create the Gemini adapter.
- [x] T309 Add shared basketball shoe assistant instructions.
- [x] T310 Add provider-independent response streaming.
- [x] T311 Add cancellation support.
- [x] T312 Normalize provider and authentication errors.
- [x] T313 Remove the mock response from the default chat flow.
- [x] T314 Verify keys are never persisted, logged, or exposed.

## Phase 5: Production Safety

- [ ] T401 Add request size limits.
- [ ] T402 Add message length limits.
- [ ] T403 Add rate limiting.
- [ ] T404 Add request timeout.
- [ ] T405 Review logging.
- [ ] T406 Review secret handling.
- [ ] T407 Add moderation if required.

## Phase 6: Testing

- [ ] T501 Add schema tests.
- [ ] T502 Add chat state tests.
- [ ] T503 Add composer tests.
- [ ] T504 Add API route tests.
- [ ] T505 Add streaming tests.
- [ ] T506 Add end-to-end tests.
- [ ] T507 Run an accessibility review.
- [ ] T508 Run a responsive design review.
