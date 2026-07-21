# Testing Strategy

## Unit Tests

Test:

- Request schemas.
- Message conversion.
- Error mapping.
- Chat state transitions.
- Message utilities.

## Component Tests

Test:

- Composer submission.
- Enter and Shift + Enter behavior.
- Stop button.
- Retry button.
- Empty state.
- Loading state.
- Error state.
- Markdown rendering.

## API Tests

Test:

- Invalid requests.
- Empty content.
- Oversized content.
- Successful streams.
- Aborted requests.
- OpenAI errors.
- Timeouts.
- Rate limits.

## End-to-End Tests

Main flow:

1. Open the application.
2. Send a message.
3. See the user message.
4. See the assistant respond through streaming.
5. Stop response generation.
6. Start a new conversation.
7. Test the mobile layout.

## Definition of Done

A task is complete when:

- Type checking passes.
- Linting passes.
- Relevant tests pass.
- The API key is not present in the client bundle.
- Responsive behavior works.
- Loading and error states are implemented.
- Documentation is updated.
