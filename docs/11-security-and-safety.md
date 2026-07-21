# Security and Safety

## Bring Your Own AI Provider Key

- User-provided OpenAI and Gemini API keys are high-sensitivity secrets.
- Keys exist only in browser memory and request-scoped server memory.
- Never store keys in localStorage, sessionStorage, cookies, IndexedDB, a
  database, files, or any other persistent storage.
- Never include keys in URLs, analytics, logs, caches, error reports, or API
  responses.
- Never log the full chat request body or authorization values.
- Hold the key in browser memory only while the page remains open.
- Send the key to the application server over HTTPS only with a chat request.
- HTTPS is required outside local development.
- Use the key only for the active request or stream, then discard all
  server-side references.
- Refreshing or closing the page clears the key.
- Clearing the key disables chat until a new provider and key are supplied.
- The browser must not call OpenAI or Gemini directly.
- Server adapters must create request-scoped provider clients.
- Provider errors must be normalized without exposing raw credentials, headers,
  or provider payloads.
- Third-party analytics must not capture key-entry fields or chat request
  bodies.
- Public deployment requires a security and privacy review.

## Input Validation

- Validate every request on the server.
- Limit message length.
- Limit the number of messages per request.
- Limit request body size.
- Reject invalid schemas.

## External API Credentials

- Business API credentials must remain server-side.
- Business API credentials must not use the `NEXT_PUBLIC_` prefix.
- Business API keys must not be logged.
- Business API responses must be treated as untrusted external data.
- All external API responses must be validated.
- The system must use timeouts when calling external APIs.
- The system should limit retries.
- Customer-facing errors must not expose internal URLs, headers, tokens, or
  stack traces.

Proposed environment variables for future business integration and
server-approved AI models:

```env
OPENAI_MODEL=
GEMINI_MODEL=

BUSINESS_API_BASE_URL=
BUSINESS_API_KEY=
BUSINESS_API_TIMEOUT_MS=
```

These variables are documented only and must not be added to application
configuration during this documentation task.

## Rate Limiting

Before public deployment, add:

- Per-IP or per-user rate limits.
- Request timeout.
- Concurrent request limits.
- Usage monitoring.
- Usage safeguards that reduce accidental repeated requests against users' API
  accounts.

## Prompt Injection

- Treat user input as untrusted data.
- Keep user input separate from developer instructions.
- Do not reveal developer instructions.
- Do not allow the model to access secrets or environment variables.

## Content Safety

Consider moderation before opening the application to the public.

## Logging

Do not log:

- API keys.
- Authorization headers.
- Environment variables.
- Personal data without a clear need.
- Full production conversations without an appropriate privacy policy.
- Chat request bodies containing ephemeral provider keys.

Logging and error-reporting systems must redact authentication values before
events leave the application process.
