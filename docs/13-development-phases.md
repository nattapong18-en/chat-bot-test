# Development Phases

## Phase 1: Foundation

- Create the Next.js project.
- Configure TypeScript.
- Configure Tailwind CSS.
- Add shadcn/ui.
- Create the application shell.
- Add environment validation.

## Phase 2: Static Chat Interface

- Sidebar.
- Chat header.
- Empty state.
- Message list.
- Composer.
- Responsive layout.
- Dark mode.

Do not connect the OpenAI API during this phase.

## Phase 3: Local Chat Behavior

- Message state.
- Message submission.
- Auto scrolling.
- Keyboard behavior.
- Loading state.
- Mock stop behavior.
- Mock error state.

## Phase 4: AI Provider Integration

- Add OpenAI and Google GenAI SDKs.
- Add provider selection and ephemeral API key setup.
- Create `/api/chat` and validate provider, key, and messages.
- Create an AI provider router.
- Create request-scoped OpenAI and Gemini adapters.
- Add shared basketball shoe assistant instructions.
- Add provider-independent streaming and error normalization.
- Add cancellation support.
- Verify that keys are never persisted, logged, cached, or exposed.

Basketball shoe product API integration remains outside Phase 4.

## Phase 5: Reliability

- Error normalization.
- Retry behavior.
- Timeouts.
- Rate limiting.
- Input limits.
- Logging review.
- Moderation if required.

## Phase 6: Testing and Polish

- Unit tests.
- Component tests.
- End-to-end tests.
- Accessibility review.
- Responsive testing.
- Performance review.
- Documentation review.

## Phase 7: Future Expansion

- Authentication.
- Database.
- Persistent conversations.
- Conversation management.
- Usage monitoring.
- Model selection.
