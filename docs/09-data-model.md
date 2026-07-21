# Data Model

## ChatMessage

```ts
type ChatRole = "user" | "assistant";

type ChatLanguage = "th" | "en";

type ChatMessageStatus =
  | "pending"
  | "streaming"
  | "completed"
  | "stopped"
  | "error";

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  status: ChatMessageStatus;
  createdAt: string;
  error?: string;
  language?: ChatLanguage;
}
```

## Conversation

```ts
interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}
```

## AI Connection

```ts
type AiProvider = "openai" | "gemini";

interface AiConnection {
  provider: AiProvider;
  apiKey: string;
}

interface ChatRequest {
  provider: AiProvider;
  apiKey: string;
  messages: ChatMessage[];
}

interface AiProviderOption {
  id: AiProvider;
  label: string;
  description: string;
  enabled: boolean;
}
```

`apiKey` is an ephemeral transport value. It may exist only in browser memory
and in request-scoped server memory. It must never be persisted or stored in a
conversation or message object. Provider-specific model identifiers and
endpoints remain server-controlled and are not part of these client-facing
models.

## MVP Storage

For the MVP:

- Store the current conversation in client state.
- Refreshing the page may clear the conversation.
- Authentication is not included.
- Persistent database storage is not included.
- The selected API key exists only in browser memory and is cleared by refresh
  or page closure.

## Future Database Entities

- User.
- Conversation.
- Message.
- UsageRecord.
- UserSetting.

## Proposed Basketball Shoe Product Model

```ts
interface BasketballShoe {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number | null;
  currency: string;
  availableSizes: string[];
  stockStatus: "in_stock" | "low_stock" | "out_of_stock" | "unknown";
  courtType: ("indoor" | "outdoor")[];
  suitablePositions: string[];
  suitablePlayStyles: string[];
  footWidth: ("narrow" | "regular" | "wide")[];
  cushioning: "low" | "medium" | "high";
  support: "low" | "medium" | "high";
  traction: "low" | "medium" | "high";
  durability: "low" | "medium" | "high";
  weight?: number;
  imageUrl?: string;
  source: "business_api" | "sample_data";
  lastUpdatedAt?: string;
}
```

## Proposed Customer Preference Model

```ts
interface ShoeRecommendationPreferences {
  position?: string;
  playStyle?: string;
  budgetMin?: number;
  budgetMax?: number;
  shoeSize?: string;
  footWidth?: "narrow" | "regular" | "wide";
  courtType?: "indoor" | "outdoor" | "both";
  preferredBrands?: string[];
  cushioningPreference?: "low" | "medium" | "high";
  supportPreference?: "low" | "medium" | "high";
}
```

## Proposed Product Search Result

```ts
interface ProductSearchResult {
  products: BasketballShoe[];
  source: "business_api" | "sample_data";
  isLiveData: boolean;
  retrievedAt: string;
}
```

## Proposed Business API Error

```ts
interface BusinessApiError {
  code:
    | "BUSINESS_API_UNAVAILABLE"
    | "BUSINESS_API_TIMEOUT"
    | "INVALID_PRODUCT_DATA"
    | "PRODUCT_NOT_FOUND"
    | "PRODUCT_DATA_UNAVAILABLE";
  message: string;
  retryable: boolean;
}
```

These product, preference, search-result, and business-API-error models are
proposed for a later implementation phase. They are included for documentation
purposes only and must not be implemented during this documentation task.
