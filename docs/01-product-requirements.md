# Product Requirements

## Target Users

- Basketball players.
- Beginner basketball players.
- Students looking for basketball shoes.
- Customers who are unsure which shoes match their play style.
- Customers comparing basketball shoe models.
- Desktop and mobile users.

## MVP Features

### Chat

- Users can type and send messages.
- Pressing Enter sends a message.
- Pressing Shift + Enter creates a new line.
- User and assistant messages are visually distinct.
- Assistant responses are streamed.
- Duplicate submissions are blocked while the assistant is responding.
- Users can stop response generation.
- Users can retry failed requests.
- Users can write messages in Thai or English.
- The assistant should reply in the same language as the user whenever
  practical.
- Users must not be required to write prompts in English.

### Language Support

- Thai responses must be natural, polite, and easy to understand.
- Thai basketball shoe terminology should be understandable to general
  customers.
- User-facing chat controls and states must support Thai, including errors,
  retry, stop, composer guidance, and empty-state suggestions.
- Accessibility labels may use clear Thai, clear English, or concise bilingual
  text.

### Conversation

- Users can start a new conversation.
- Messages are stored during the current session.
- An empty state is shown before the first message.
- The view scrolls to the latest message when appropriate.
- User messages are preserved when an error occurs.

### Interface

- Responsive layout.
- Dark mode support.
- Loading states.
- Error states.
- Keyboard navigation.
- Markdown rendering.
- Code block rendering.

## MVP AI Connection

Before using the basketball shoe assistant, users must:

1. Select OpenAI or Google Gemini.
2. Enter an API key for the selected provider.
3. Continue to the chat interface.

The first MVP uses a Bring Your Own API Key model. The project owner does not
provide credentials or pay for users' AI-provider usage. The application must:

- Provide a provider selector for OpenAI and Gemini.
- Clearly display the active provider.
- Provide a masked API key input with Show, Hide, and Clear actions.
- Provide clear missing-key, invalid-key, and provider-specific authentication
  feedback.
- Disable the composer until a provider and non-empty API key are present.
- Support Thai and English labels throughout connection setup.
- Explain that API usage and charges belong to the API key owner.
- Keep provider endpoints and model identifiers under server control.
- Start a new conversation or clear incompatible conversation state when the
  provider changes.

An OpenAI key must be routed only to the OpenAI adapter, and a Gemini key only
to the Gemini adapter. Users cannot supply arbitrary API base URLs or model
identifiers. Supplying a non-empty key allows the user to continue, but the
application must not claim that the key is valid until a provider request
succeeds.

## Basketball Shoe Assistance

The chatbot must help customers discover basketball shoes, receive
recommendations, and compare shoe models. It must support choosing shoes based
on playing position, play style, budget, foot shape, and indoor or outdoor court
usage.

When customer requirements are incomplete, the chatbot must be able to ask
about:

- Playing position.
- Play style.
- Budget.
- Shoe size.
- Foot width.
- Indoor or outdoor court usage.
- Preferred cushioning.
- Preferred support level.
- Brand preference.

Customers may ask about shoe size, fit, cushioning, traction, support,
durability, weight, prices, and availability. Price and availability answers may
only be provided when store data is available.

## Recommendation Explanations

Recommendations should include clear reasons and explain relevant factors such
as:

- Cushioning.
- Traction.
- Support.
- Stability.
- Weight.
- Fit.
- Durability.
- Indoor or outdoor suitability.
- Estimated price range when product data is available.

The chatbot must clearly distinguish between:

- Verified store data.
- General product guidance.
- Information that is currently unavailable.

The chatbot must not invent product prices, sizes, specifications, stock
availability, discounts, or store policies.

## Product Data Access

The application must support:

- Searching the product catalog.
- Filtering products by brand.
- Filtering products by size.
- Filtering products by minimum and maximum budget.
- Filtering products by playing position.
- Filtering products by play style.
- Filtering products by foot width.
- Filtering products by indoor or outdoor court use.
- Retrieving verified price and stock information.
- Displaying a clear unavailable state when product data cannot be retrieved.
- Distinguishing verified store data from general AI guidance.
- Using mock product data during development.

The chatbot must not claim that a product, size, promotion, or price is available
unless it has been verified by current business data.

## Architecture Separation

Generic chat components must remain reusable. Basketball-shoe-specific product
data, recommendation rules, assistant instructions, and store integrations must
remain separate from chat presentation and chat state.

## Future Features

- Authentication.
- Persistent conversation history.
- Rename conversations.
- Delete conversations.
- Multiple AI models.
- File uploads.
- Image input.
- Conversation search.
- Usage dashboard.
- User settings.
- Product catalog integration.
- Inventory checking.
- Product search and filtering.
- Size availability.
- Product comparison.
- Shopping cart.
- Order creation.
- Customer accounts.
- Purchase history.
- Store staff management.
