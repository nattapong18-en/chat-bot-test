# Project Structure

## Proposed Structure

```text
app/
├── api/
│   └── chat/
│       └── route.ts
├── chat/
│   └── page.tsx
├── layout.tsx
├── page.tsx
└── globals.css

components/
├── ui/
├── layout/
│   ├── app-shell.tsx
│   ├── app-sidebar.tsx
│   └── mobile-sidebar.tsx
└── shared/
    ├── logo.tsx
    ├── theme-toggle.tsx
    └── error-message.tsx

features/
└── chat/
    ├── components/
    │   ├── chat-screen.tsx
    │   ├── chat-header.tsx
    │   ├── message-list.tsx
    │   ├── message-item.tsx
    │   ├── message-content.tsx
    │   ├── chat-composer.tsx
    │   ├── empty-chat.tsx
    │   ├── prompt-suggestions.tsx
    │   └── streaming-indicator.tsx
    ├── hooks/
    │   ├── use-chat.ts
    │   └── use-auto-scroll.ts
    ├── lib/
    │   ├── chat-client.ts
    │   └── message-utils.ts
    ├── schemas/
    │   └── chat-schema.ts
    └── types/
        └── chat.ts

lib/
├── openai/
│   ├── client.ts
│   ├── config.ts
│   ├── instructions.ts
│   └── errors.ts
├── env.ts
└── utils.ts

types/
└── index.ts
```

## Structure Rules

- Keep chat-specific code inside `features/chat`.
- Keep reusable UI primitives inside `components/ui`.
- Keep OpenAI integration inside `lib/openai`.
- Route handlers should coordinate work and avoid containing large amounts of business logic.
- Avoid unnecessarily large component files.
- Avoid barrel exports when they introduce circular dependencies.
