# User Experience

## AI Connection Setup

Before chat is enabled, show a connection setup state containing:

- A provider selector with OpenAI and Google Gemini options.
- A masked API key field.
- Show or Hide key action.
- Continue action.
- Clear key action.
- Missing-key, invalid-key, and provider-authentication feedback.
- A security notice explaining that the key exists only in memory while the
  page remains open.
- A usage-cost notice explaining that API charges belong to the key owner.
- Thai and English labels and accessible names.

Suggested Thai labels include:

- `เลือกผู้ให้บริการ AI`
- `OpenAI`
- `Google Gemini`
- `กรอก API Key`
- `แสดงคีย์`
- `ซ่อนคีย์`
- `ดำเนินการต่อ`
- `ล้างคีย์`
- `API Key ไม่ถูกต้อง`
- `คีย์จะถูกเก็บไว้ชั่วคราวระหว่างที่เปิดหน้านี้เท่านั้น`
- `ค่าใช้บริการ API เป็นความรับผิดชอบของเจ้าของคีย์`

The Continue action is disabled until a provider and non-empty key are present.
The chat composer remains disabled until setup is complete. The selected
provider must be visible in the chat experience. Changing providers begins a
new conversation or clears incompatible conversation state. The UI must not
claim that a key is valid before a provider request succeeds.

## Main Screen

The main screen contains:

1. Sidebar.
2. Chat header.
3. Message area.
4. Message composer.

## Sidebar

The sidebar may include:

- Logo.
- New chat button.
- Conversation history.
- Settings button.
- Collapse button.

For the MVP without a database, the sidebar may use a simplified design.

## Empty State

When no messages exist:

- Show the assistant name.
- Show a welcome message that clearly explains that the assistant helps
  customers choose basketball shoes.
- Show three or four basketball-shoe prompt suggestions, such as:
  - "Recommend basketball shoes for a point guard."
  - "I need outdoor basketball shoes under 4,000 THB."
  - "ช่วยแนะนำรองเท้าบาสสำหรับพอยต์การ์ด"
  - "รองเท้าบาสแบบไหนเหมาะกับคนหน้าเท้ากว้าง"

## Message State

After the conversation begins:

- User messages appear as message bubbles.
- Assistant messages use a wider, content-focused layout.
- Markdown is supported.
- Code blocks include a Copy button.
- Scrolling behavior remains predictable.

## Composer

The composer must include:

- Auto-growing textarea.
- Send button.
- Stop button during streaming.
- Placeholder text such as "Ask about basketball shoes, fit, play style, or
  budget".
- The placeholder, stop control, errors, and retry action should use clear Thai
  or bilingual Thai and English text where appropriate.
- Disabled state.
- Appropriate message or request limits.

## Error State

When an API request fails:

- Preserve the user message.
- Show a clear error message.
- Provide a Retry button.
- Do not expose internal system details.
- Present Thai error and retry text when the related user message is in Thai.
