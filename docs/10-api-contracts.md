# API Contracts

## POST /api/chat

Sends messages and relevant conversation context to the assistant.

### Request

```json
{
  "provider": "gemini",
  "apiKey": "user-provided-secret",
  "messages": [
    {
      "role": "user",
      "content": "ช่วยแนะนำรองเท้าบาสสำหรับพอยต์การ์ด"
    }
  ]
}
```

### Validation

- `provider` must be `openai` or `gemini`.
- `apiKey` is required and must be a non-empty string with a reasonable maximum
  length.
- The server must not infer the provider from the key.
- Unsupported providers must be rejected.
- The request must not accept custom base URLs or raw model identifiers.
- `messages` must be an array.
- At least one message is required.
- `role` must be `user` or `assistant`.
- `content` must be a string.
- `content` must not be empty.
- The total number and size of messages must be limited.

### Success Response

Return a streaming response.

### Error Response

```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "The service is receiving too many requests. Please try again."
  }
}
```

## Internal Error Codes

- `INVALID_REQUEST`.
- `MESSAGE_TOO_LONG`.
- `AI_PROVIDER_REQUIRED`.
- `UNSUPPORTED_AI_PROVIDER`.
- `API_KEY_REQUIRED`.
- `INVALID_API_KEY`.
- `AI_AUTHENTICATION_FAILED`.
- `AI_PROVIDER_UNAVAILABLE`.
- `AI_PROVIDER_TIMEOUT`.
- `INVALID_AI_RESPONSE`.
- `RATE_LIMITED`.
- `REQUEST_TIMEOUT`.
- `INTERNAL_ERROR`.

## API Rules

- Never send stack traces to the client.
- Never expose the API key in responses, errors, URLs, logs, or analytics.
- Chat request bodies containing API keys must not be logged or cached.
- The client must not depend directly on raw provider error messages.
- Route the key only to the adapter matching the explicit provider.
- Discard the request-scoped key reference after completion or cancellation.

## Proposed Product Endpoints

These application-owned endpoints are proposed for a later implementation
phase. They are not part of the current application.

### `GET /api/products`

Searches the basketball shoe catalog and returns normalized product data.

Supported query parameters may include:

- `query`.
- `brand`.
- `size`.
- `budgetMin`.
- `budgetMax`.
- `position`.
- `playStyle`.
- `footWidth`.
- `courtType`.

### `GET /api/products/:id`

Returns normalized details for one basketball shoe product.

### Product Endpoint Rules

- These endpoints belong to the application server.
- The browser must not call a protected external product API directly.
- The application server must validate all query parameters.
- External response formats must be converted into internal models.
- Raw credentials and raw provider errors must never be returned.

### Product API Error Codes

- `BUSINESS_API_UNAVAILABLE`.
- `BUSINESS_API_TIMEOUT`.
- `INVALID_PRODUCT_DATA`.
- `PRODUCT_NOT_FOUND`.
- `PRODUCT_DATA_UNAVAILABLE`.
