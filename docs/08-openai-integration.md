# AI Provider Integration

## Supported Providers

The first MVP supports OpenAI and Google Gemini through server-side,
provider-specific adapters. Users provide the API key for their selected
provider. Provider endpoints and model identifiers remain server-controlled.

### OpenAI

- Uses a user-provided OpenAI API key for the active request or stream.
- Uses a server-approved OpenAI model.
- Uses the official OpenAI SDK.
- Supports streamed responses.
- Creates the OpenAI client within the request scope.

### Google Gemini

- Uses a user-provided Gemini API key for the active request or stream.
- Uses a server-approved Gemini model.
- Uses the official Google GenAI SDK unless a separate architecture decision
  selects Google's OpenAI-compatible endpoint.
- Supports streamed responses.
- Creates the Gemini client within the request scope.

OpenAI-compatible Gemini support must not allow provider-specific behavior,
SDK types, endpoints, or errors to leak into the shared chat UI.

## Integration Rules

- Provider SDK calls run only on the application server.
- The browser sends the selected provider and ephemeral API key to
  `POST /api/chat` over HTTPS when making a request.
- The provider router sends the key only to the matching adapter.
- Users cannot provide API base URLs or model identifiers.
- The server selects an approved model and endpoint for each provider.
- Provider clients are request-scoped and discarded when the request ends.
- Keys must never be persisted, logged, cached, returned, or included in URLs.
- Streaming events and provider errors are converted into shared internal
  formats.
- Missing configuration must produce a clear, credential-safe error.

## Server Configuration

The MVP may use server-side variables for approved model identifiers, but not
for user API keys:

```env
OPENAI_MODEL=
GEMINI_MODEL=
```

These values select the server-approved model for each provider. End users do
not submit raw model identifiers and cannot override provider endpoints.

## Server Responsibilities

`POST /api/chat` must:

1. Read the provider, ephemeral API key, and message context.
2. Validate the request without logging its body.
3. Select the matching provider adapter.
4. Create a request-scoped provider client.
5. Add the shared basketball shoe assistant instructions.
6. Call the server-approved provider model.
7. Return a normalized stream.
8. Normalize authentication, provider, network, and cancellation errors.
9. Discard all server-side key references when the request ends.

## Basketball Shoe Assistant Instructions

The same behavioral instructions must be adapted consistently for OpenAI and
Gemini. They should require the assistant to:

- Act as a basketball shoe shopping assistant.
- Ask clarifying questions when customer requirements are incomplete.
- Recommend products based on user needs and explain each recommendation.
- Avoid inventing prices, sizes, stock, discounts, and specifications.
- Use store product data as the source of truth when available.
- Clearly state when requested information is unavailable.
- Avoid injury-prevention claims, medical claims, and purchase pressure.
- Accept Thai and English input without requiring English prompts.
- Reply in the customer's language whenever practical.
- Use natural, polite, easy-to-understand Thai and accessible basketball shoe
  terminology.

These shared instructions belong in a provider-independent module. Adapter
code may translate them into the input format required by each provider.

## External Product Data Grounding

- Provider adapters receive normalized product context from the application.
- Verified prices, sizes, stock, promotions, and specifications must not be
  changed by either provider.
- General guidance must not be presented as verified store information.
- Raw business API errors must not be shown to customers.
- AI tool calling and automatic business API orchestration remain outside
  Phase 4.

## Conversation State

The client may send required conversation context with each request. The API
key is transported separately and must never be placed in conversation or
message objects. Changing providers begins a new conversation or clears
incompatible state.

## Provider-Independent Streaming

The client must support normalized incremental text, completed, error,
cancelled, and incomplete states without depending on raw OpenAI or Gemini SDK
events.
