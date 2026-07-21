# System Architecture

## High-Level Flow

```text
User
|
v
Chat Interface
|
v
Application Server
|-- Chat Orchestration Layer
|-- AI Provider Adapter
`-- Basketball Shoe Business API Adapter
    |
    v
External Product or Store API
```

## MVP AI Provider Request Flow

```text
User
↓
Provider and API Key Setup
↓
Chat Interface
↓
POST /api/chat
↓
Request Validation
↓
AI Provider Router
├── OpenAI Adapter
└── Gemini Adapter
↓
Selected AI Provider
↓
Normalized Streaming Response
↓
Chat Interface
```

## Main Layers

### Presentation Layer

Responsible for:

- User interface.
- Message rendering.
- User interaction.
- Loading states.
- Error states.

### Application Layer

Responsible for:

- Chat state.
- Sending messages.
- Cancelling requests.
- Retry behavior.
- Conversation management.

### API Layer

Responsible for:

- Request validation.
- Coordinating server-side integrations.
- Streaming results.
- Error normalization.
- Rate limiting.

### External Integration Layer

Responsible for:

- OpenAI SDK configuration.
- Model configuration.
- Assistant instructions.
- Basketball shoe business API configuration.
- Independent provider credentials.
- Provider-specific request and response mapping.
- AI and business API error mapping.

### Chat Orchestration Layer

Responsible for:

- Receiving the customer question.
- Determining whether live product data is required.
- Extracting relevant customer preferences.
- Requesting product data through the business API adapter.
- Providing verified product context to the AI provider.
- Returning a normalized response to the chat interface.

### AI Provider Router

Responsible for:

- Validating the provider value.
- Validating that the provider key is present and structurally acceptable
  before handing it to the selected adapter; only a provider request can
  confirm authentication.
- Selecting the correct provider adapter.
- Rejecting unsupported providers.
- Preventing client-controlled base URLs and model identifiers.
- Returning normalized provider-independent events and errors.

### OpenAI Adapter

Responsible for:

- Creating a request-scoped OpenAI client with the user-provided OpenAI key.
- Calling the server-approved OpenAI model.
- Supplying shared basketball shoe assistant instructions.
- Converting OpenAI streaming events into internal events.
- Normalizing OpenAI errors without exposing credentials.

### Gemini Adapter

Responsible for:

- Creating a request-scoped Gemini client with the user-provided Gemini key.
- Calling the server-approved Gemini model.
- Supplying shared basketball shoe assistant instructions.
- Converting Gemini streaming events into internal events.
- Normalizing Gemini errors without exposing credentials.

### Basketball Shoe Business API Adapter

Responsible for:

- Authenticating with the external business API.
- Building product search requests.
- Applying request timeouts.
- Validating external responses.
- Mapping external data into internal product models.
- Normalizing external API errors.
- Hiding provider-specific response formats from the rest of the application.

## Architecture Rules

- Provider SDKs must only be called from the server.
- Generic chat UI components must not depend on provider SDK response types.
- External API data must be converted into application types before reaching the UI.
- Server-side validation is required even when client-side validation exists.
- Generic chat UI components must not call the external business API directly.
- Generic chat UI components must not know which business API provider is used.
- Protected business APIs must be called from the application server.
- External responses must be validated before use.
- External provider-specific fields must not leak into shared UI components.
- The client sends the selected provider and ephemeral API key only as part of
  an HTTPS chat request.
- An OpenAI key must never be sent to the Gemini adapter, and a Gemini key must
  never be sent to the OpenAI adapter.
- The client cannot provide arbitrary API endpoints or raw model identifiers.
- Provider SDK objects remain inside their provider adapters.
- The server controls the supported model and endpoint for each provider.
- API keys must not pass through unrelated components.
- Request-scoped provider clients and key references must be discarded when a
  request or stream finishes.
