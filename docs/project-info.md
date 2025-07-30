# 🧠 Sooqha – AI-Native Docs MVP (Project Overview for Cursor)

Sooqha is not a toy. It’s a serious AI-native productivity platform — a modern alternative to Google Docs, Sheets, and Slides — being built from scratch for the next decade.

This file tells you, Cursor, and any devs or AI agents exactly what this codebase is trying to do, how it’s structured, what’s in scope, and what is NOT.

---

## 🚀 GOAL (MVP)

Build a **frontend-only MVP** of the Docs editor at route `/editor/:docId`.

It should:

- Use **React** with **TypeScript**
- Mount a **Tiptap** block-based editor
- Support slash commands like `/summarize`, `/rewrite`, `/fix-grammar`
- Integrate **OpenAI API** (client-side only)
- Display AI output in a **right-side panel**
- Provide options to **Insert**, **Replace**, and **Retry**
- Save/load document to/from **localStorage** by `docId`
- Allow export to **Markdown (.md)**, **HTML**, and **PDF** (via browser print)
- Be styled with **TailwindCSS**
- Stay lean and maintainable — no overengineering

---

## 🧱 STACK

| Layer     | Tech                           |
|-----------|--------------------------------|
| Framework | React + TypeScript (via Vite)  |
| Styling   | TailwindCSS                    |
| Editor    | Tiptap (React wrapper)         |
| AI        | OpenAI API (client-side only)  |
| State     | localStorage                   |
| Export    | Markdown / HTML / PDF (browser)|

No backend. No auth. No database. Not negotiable for MVP.

---

## 📁 FOLDER STRUCTURE (Planned)

```
src/
├── components/          → Editor.tsx, SidePanel.tsx, SlashMenu.tsx, ExportMenu.tsx
├── pages/               → EditorPage.tsx (for /editor/:docId)
├── lib/                 → ai.ts (OpenAI handler), export.ts (downloaders)
├── hooks/               → useEditorStorage.ts, useAI.ts
├── App.tsx              → Main router
```

---

## ⚙️ COMPONENT RESPONSIBILITIES

### `Editor.tsx`
- Mounts Tiptap editor
- Applies block extensions (paragraph, heading, quote, list, code, etc.)
- Handles text selection for AI prompts

### `SlashMenu.tsx`
- Intercepts `/` commands inside Tiptap
- Displays command list
- Triggers AI prompt logic

### `SidePanel.tsx`
- Receives AI output
- Shows Insert / Replace / Retry
- Displays loading and error states

### `ExportMenu.tsx`
- Export as `.md` (Tiptap JSON → Markdown string)
- Export as `.html` (wrapped template)
- Export to PDF (browser print)

---

## 🔌 OPENAI INTEGRATION

- Use `gpt-4` or `gpt-3.5-turbo` via `fetch`
- No server-side API layer — call directly from client
- Pass selected text or full doc context
- Example prompt structure:

```ts
{
  type: "summarize" | "rewrite" | "fix-grammar",
  input: string,
  context?: string
}
```

---

## 🧠 DESIGN PRINCIPLES

- **AI is native**, not a plugin
- **Everything is modular** and scoped to the editor
- **No backend logic** — all in browser for MVP
- **Minimal UI** — no bloat, just the essentials
- **Performance-first** — fast load, fast feedback

---

## ✅ MVP TASK LIST

- [ ] Scaffold project with React, TypeScript, Vite, Tailwind
- [ ] Create `/editor/:docId` route with React Router
- [ ] Mount Tiptap with paragraph, heading, list, quote, code
- [ ] Build slash command input UI
- [ ] Wire OpenAI calls to commands
- [ ] Build right-side AI panel with Insert / Replace / Retry
- [ ] Save/load documents from localStorage
- [ ] Export to Markdown
- [ ] Export to HTML
- [ ] Export to PDF (via browser)

---

## 🔒 WHAT’S OUT OF SCOPE (FOR NOW)

- No user login or auth
- No database or cloud storage
- No real-time collaboration
- No backend API
- No Slides or Sheets yet
- No monetization, dashboards, or onboarding
- No AI memory or prompt engineering engine — keep it simple

---

## 🧾 FINAL NOTES (For Cursor or Engineers)

This is not a “demo project.” This is the foundation of a real product. Everything built here will compound. Prioritize clarity, structure, speed. Make it work before you make it perfect. Don’t overthink — just execute.

When in doubt:
- Keep it modular
- Keep it readable
- Keep it local