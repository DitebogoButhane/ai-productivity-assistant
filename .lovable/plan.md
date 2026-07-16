
## Overview

A responsive single-page workspace app with a sidebar and 5 AI tools. Real AI calls via Lovable AI Gateway (Gemini) through TanStack server functions. No auth, no database, no persistence — all state lives in-memory during the session.

## Design

- Palette: white background, sage green primary (`oklch(~0.72 0.08 145)`), soft green accents, light grey borders/muted.
- Rounded 2xl cards, generous whitespace, Inter or similar clean sans.
- Sidebar collapses to icons on mobile via shadcn `Sidebar`.
- Subtle fade/slide animations on route transitions and result reveals.

## Routes

```
src/routes/
  __root.tsx              -> SidebarProvider + AppSidebar shell, updated head metadata
  index.tsx               -> Dashboard (welcome + tool cards)
  meeting-notes.tsx       -> Meeting Notes Summarizer
  task-planner.tsx        -> AI Task Planner
  research.tsx            -> AI Research Assistant
  prompt-editor.tsx       -> Prompt Editor
  responsible-ai.tsx      -> Responsible AI info page
  api/ai.ts               -> Server route: POST { toolId, prompt, input } -> streamed text
```

## Components

- `src/components/app-sidebar.tsx` — sage sidebar with nav items + icons.
- `src/components/ai-tool-shell.tsx` — reusable layout: input textarea, editable prompt (collapsible), Generate/Reset buttons, loading state, result card with Copy button, disclaimer footer.
- `src/components/disclaimer.tsx` — Responsible AI disclaimer shown on every AI page.
- `src/components/tool-card.tsx` — dashboard quick-access card.

## Prompt state

- `src/lib/prompts.ts` — default prompt templates for the 4 tools.
- `src/hooks/use-prompts.ts` — in-memory (React context or Zustand-free useState in a provider) store of current prompt per tool; Prompt Editor edits them; each tool page reads/writes the same store. No localStorage.

## AI wiring

- `src/lib/ai-gateway.server.ts` — Lovable AI Gateway provider helper (per the knowledge file).
- `src/routes/api/ai.ts` — POST handler: validates body, picks system prompt by toolId, calls `streamText` with `google/gemini-3-flash-preview`, returns UI message stream response.
- Client uses `useChat` from `@ai-sdk/react` with `DefaultChatTransport({ api: "/api/ai" })` per tool, keyed by toolId. Send one message per generation; render latest assistant message.
- Ensure `LOVABLE_API_KEY` via `ai_gateway--create`.

## Feature details

- **Dashboard**: welcome heading, 4 large tool cards linking to each tool + a Responsible AI card.
- **Meeting Notes Summarizer**: paste notes → returns summary, key points, decisions, action items, deadlines (markdown sections).
- **Task Planner**: enter tasks → daily/weekly schedule toggle → prioritized plan + productivity tips.
- **Research Assistant**: paste article → summary, key insights, simplified explanation, recommendations.
- **Prompt Editor**: list of 4 tools, editable textarea per prompt, Save (in-memory) + Reset to default buttons.
- **Responsible AI**: standalone page + inline disclaimer banner on every AI page.

## UX

- Loading spinner while streaming; Generate button disabled during stream.
- Copy-to-clipboard via `navigator.clipboard` with toast (sonner already available in shadcn).
- Clear/Reset button per tool wipes input + output.
- Fully responsive: sidebar → sheet on mobile.

## Out of scope (per user)

No auth, no DB, no localStorage, no history, no analytics.
