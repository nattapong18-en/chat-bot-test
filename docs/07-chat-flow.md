# Chat Flow

## Sending a Message

1. The user enters a message.
2. The client verifies that the message is not empty.
3. The client adds the user message to local state.
4. The client creates an assistant placeholder.
5. The client sends a request to `/api/chat`.
6. The server validates the request.
7. The server calls the OpenAI Responses API.
8. The client receives streamed data.
9. The assistant message is updated incrementally.
10. The message status changes to `completed`.

## Message Status

Assistant messages may use the following states:

- `pending`.
- `streaming`.
- `completed`.
- `stopped`.
- `error`.

## Language Handling

- Accept both Thai and English user messages.
- Detect the language of each user message for response presentation.
- Reply in the same language as the related user message whenever practical.
- Preserve the message language across pending, streaming, stopped, error, and
  retry transitions.

## Stop Generation

When the user presses Stop:

1. Call `AbortController`.
2. Stop reading the stream.
3. Preserve the text already received.
4. Change the message status to `stopped`.
5. Allow the user to continue the conversation.

## Retry

When an error occurs:

1. Do not remove the user message.
2. Change the assistant message status to `error`.
3. Show a Retry action.
4. Retry with the same relevant conversation context.

## Auto Scroll

- Scroll down when the user is already near the bottom.
- Do not force scrolling when the user is reading earlier messages.
- Show a Scroll to Bottom button when appropriate.
