# Project Overview

## Project Name

Temporary name: Nattapong AI Chat

## Summary

A web-based AI chatbot for a basketball shoe store. The assistant helps customers
discover, compare, and choose basketball shoes through a conversational shopping
experience powered by the OpenAI API.

Users can:

- Send messages to the AI.
- Receive streamed responses.
- Start a new conversation.
- View messages in the current conversation.
- Stop response generation.
- Retry a failed request.
- Use the application on desktop, tablet, and mobile devices.
- Receive basketball shoe recommendations based on their needs.
- Understand how shoe features relate to fit, comfort, and playing style.

## Primary Goal

Build a basketball shoe shopping assistant that:

- Is easy to use.
- Is fast and responsive.
- Is clearly structured.
- Handles API keys securely.
- Is easy to extend in the future.
- Helps customers find suitable shoes before purchasing.
- Explains why a shoe may or may not suit a customer's requirements.
- Separates verified store data from general product guidance.
- Does not invent product information that is unavailable.

## Non-Goals

The first MVP will not include:

- Online payment.
- Checkout.
- Delivery tracking.
- Real-time inventory synchronization.
- Automatic order creation.
- Customer accounts.
- Product image recognition.

## Business Domain

The selected business domain is basketball shoe retail. The chatbot acts as a
shopping assistant that helps customers find suitable basketball shoes before
purchasing.

Recommendations should explain relevant tradeoffs and reasons rather than only
listing products. The first MVP may use sample product data. Real product
inventory and pricing may be connected in a later phase.

Basketball-shoe-specific instructions, product data, and recommendation rules
must remain separate from generic chat presentation and state so the core chat
components remain reusable.

## External Business API Support

The chatbot may connect to a separately configured basketball shoe product API.
The first MVP may use sample or mock product data, and a real product API may
replace that implementation later.

The business API may provide:

- Product catalogs and product details.
- Product specifications.
- Current prices and promotions.
- Available shoe sizes and stock availability.
- Brand information.
- Store policies.
- Store locations and opening hours.

Product-data retrieval and AI-generated conversation are separate
responsibilities. The application should use verified product data whenever it
is available. The AI provider and basketball shoe business API must use separate
configuration and remain independently replaceable.
