# Architecture Decision Log

## ADR-001: Use Next.js App Router

### Status

Accepted.

### Decision

Use Next.js App Router as the application framework.

### Reason

- Supports server-side routes.
- Works well with TypeScript.
- Fits React application development.
- Provides a straightforward deployment path.

---

## ADR-002: Call OpenAI From the Server Only

### Status

Accepted.

### Decision

All OpenAI API requests must go through a server-side route.

### Reason

- Protects the API key.
- Allows server-side validation.
- Allows rate limiting.
- Centralizes model and prompt configuration.

---

## ADR-003: Use the Responses API

### Status

Accepted.

### Decision

Use the OpenAI Responses API for the new implementation.

### Reason

- Supports streaming.
- Supports conversation workflows.
- Can be extended with additional input types and tools later.

---

## ADR-004: No Database in the First MVP

### Status

Accepted.

### Decision

Store messages in client state during the first MVP.

### Consequences

- Faster initial development.
- Conversation history is lost after a refresh.
- A database must be added in a later phase.

---

## ADR-005: Use Basketball Shoe Retail as the Product Domain

### Status

Accepted.

### Decision

The project is an AI chatbot for a basketball shoe store. Basketball shoe
recommendations are part of the product requirements.

- Product data, assistant instructions, and store integrations must remain
  separate from generic chat UI components.
- Generic chat components must remain reusable.
- Business-specific rules belong in dedicated product, data, and assistant
  configuration modules.
- The first MVP may use sample product data.
- Real inventory and pricing integrations will be implemented later.

### Consequences

- Chat presentation and chat state remain independent of basketball shoe product
  data and recommendation logic.
- External store APIs can be introduced without embedding integration logic in
  generic UI components.
- Sample data must be clearly distinguished from verified store inventory and
  pricing.

---

## ADR-006: Separate AI Provider and Basketball Shoe Business API Integrations

### Status

Accepted.

### Decision

AI response generation and basketball shoe product-data retrieval are separate
responsibilities.

- Each integration must use separate credentials and configuration.
- Both integrations must be accessed through server-side adapters.
- External product responses must be normalized into internal application
  models.
- Generic chat components must not depend on a specific product API provider.
- The first MVP may use sample or mock product data.
- A real store API can be connected later without rewriting the chat interface.
- The application should continue providing clearly labeled general guidance
  when live product data is unavailable.

### Consequences

- AI-provider and business-API failures require separate error normalization.
- Protected credentials remain on the application server.
- Provider-specific request and response formats remain isolated inside their
  adapters.

---

## ADR-007: Use One Server-Configured AI Model for the First MVP

### Status

Superseded by ADR-008.

### Decision

This former single-provider decision has been withdrawn. It does not describe
the current MVP. ADR-008 defines the replacement BYOK and multi-provider
architecture.

### Consequences

- Implementations must follow ADR-008 rather than this superseded decision.

---

## ADR-008: Use Bring Your Own Key With Server-Side Provider Adapters

### Status

Accepted.

### Decision

The first MVP uses a Bring Your Own API Key model:

- Users provide their own API key.
- OpenAI and Google Gemini are the first supported providers.
- The project owner does not provide credentials or fund user API requests.
- Keys are held temporarily in browser and request-scoped server memory and are
  never persisted.
- The browser does not call AI providers directly.
- The application server routes requests through provider-specific adapters.
- Provider endpoints and model identifiers remain server-controlled.
- Shared chat behavior, streaming events, and errors remain
  provider-independent.
- An OpenAI key is used only by the OpenAI adapter, and a Gemini key only by the
  Gemini adapter.

### Consequences

- Supporting multiple providers increases implementation, validation, testing,
  privacy, and security complexity.
- The academic MVP accepts this complexity so evaluators can test using their
  own credentials.
- Provider setup must clearly explain ephemeral key handling and user-owned API
  charges.
- Changing providers must begin a new conversation or clear incompatible state.
- Future providers can be added behind the router without coupling generic chat
  components to provider SDKs.
