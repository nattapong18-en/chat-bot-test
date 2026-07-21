# CourtFit

> A basketball shoe recommendation chatbot that turns playing needs into focused, conversational guidance.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Status](https://img.shields.io/badge/Status-Academic_Project-orange)

## Overview

CourtFit is a web-based basketball shoe recommendation assistant. It helps players narrow down suitable shoes from their position, court type, playing style, budget, foot shape, and performance priorities.

It is designed for basketball shoe guidance rather than as a general-purpose chatbot. Recommendations are general AI guidance unless verified product data is introduced in a future phase.

## Key Features

- Basketball-specific recommendation flow and quick prompt builders
- OpenAI and Google Gemini support
- Bring Your Own Key (BYOK) provider setup
- Temporary, in-memory API key handling
- Thai and English chat support
- Normalized streaming responses
- Stop and Retry controls
- New Chat, Change API Key, and Change Provider flows
- Provider-aware error handling
- Responsive desktop, tablet, and mobile UI
- Light and dark themes

## User Flow

1. Select OpenAI or Google Gemini.
2. Enter an API key for the selected provider.
3. Choose quick basketball preferences or type a question.
4. Receive streamed basketball shoe guidance.
5. Stop, retry, start a new chat, change the key, or change provider when needed.

## AI Provider Support

| Provider      | API key source       | Notes                                              |
| ------------- | -------------------- | -------------------------------------------------- |
| OpenAI        | Supplied by the user | Uses a server-controlled OpenAI model and adapter. |
| Google Gemini | Supplied by the user | Uses a server-controlled Gemini model and adapter. |

## Security and Privacy

- API keys are supplied by the user.
- Keys exist only in React memory for the current browser session and in request-scoped server memory.
- A key is sent only to the application server for a request to its explicitly selected provider.
- Keys are not stored in localStorage, cookies, a database, URLs, logs, or analytics.
- Provider routing is explicit; OpenAI and Gemini use separate server-side adapters.
- Raw provider errors are normalized before they reach the UI.
- API usage charges remain the responsibility of the API key owner.

These measures reduce exposure of sensitive credentials, but they are not an absolute security guarantee. Review deployment, transport security, and operational logging before public use.

## Architecture

CourtFit uses Next.js App Router with a React client, a validated chat route, provider-specific server adapters, shared response policy, normalized errors, and a streaming chat UI.

```text
User
  ↓
CourtFit UI (React)
  ↓
POST /api/chat
  ↓
Request validation and Provider Router
  ├── OpenAI Adapter
  └── Gemini Adapter
  ↓
Shared response policy and server-side error normalization
  ↓
Normalized response stream
  ↓
Chat interface
```

## Tech Stack

| Technology            | Purpose                                             |
| --------------------- | --------------------------------------------------- |
| Next.js 16            | App Router application and server route handling    |
| React 19              | Client interface and in-memory chat state           |
| TypeScript            | Strictly typed application code                     |
| Tailwind CSS 4        | Responsive styling and theming                      |
| shadcn/ui             | Reusable accessible UI primitives built on Radix UI |
| OpenAI JavaScript SDK | OpenAI Responses API integration                    |
| Google GenAI SDK      | Google Gemini integration                           |
| Zod                   | Server-side request validation                      |

## Project Structure

```text
app/
├── api/chat/              # Validated chat API route
├── layout.tsx             # Root application layout
└── page.tsx               # Main route

components/
├── layout/                # Application shell and navigation
├── shared/                # Logo, theme, and shared feedback UI
└── ui/                    # Reusable shadcn/ui primitives

features/chat/
├── components/            # Chat, composer, messages, setup, and empty state
├── hooks/                 # Chat and auto-scroll behavior
├── lib/                   # Client streaming and language helpers
├── schemas/               # Chat request schema
└── types/                 # Chat, provider, and stream types

lib/
├── ai/                    # Provider router, adapters, errors, and policy
├── brand.ts                # Central CourtFit branding
└── env.ts                 # Server configuration validation

docs/                      # Product, architecture, and development documentation
```

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm
- An OpenAI API key or Google Gemini API key

### Installation

```bash
git clone <repository-url>
cd chatbot-project-docs
npm install
npm run dev
```

On Windows PowerShell, use `npm.cmd run dev` if local execution policy blocks `npm.ps1`.

Open [http://localhost:3000](http://localhost:3000), choose a provider, and enter your own API key. The application does not confirm a key is valid until the first provider request.

### Useful Commands

```bash
npm run format
npm run lint
npm run typecheck
npm run build
```

## Current Scope

CourtFit intentionally does **not** include live inventory, live prices, a product database, retailer integration, shopping cart, checkout, user authentication, or persistent chat history.

## Future Work

- Verified product catalog and retailer integration
- Inventory and size availability checks
- Authentication and persistent conversations
- Automated unit, component, and end-to-end testing
- Deployment security controls such as rate limiting and monitoring

## Documentation

Project requirements, architecture, data models, and development phases are maintained in [docs/](docs/README.md).
