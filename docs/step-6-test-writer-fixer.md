Sooqha Docs, in its MVP stage, is a frontend-only application with direct client-side integration with the OpenAI API. Therefore, the test
  strategy will primarily focus on the frontend application's functionality, its interaction with the external AI service, and the overall user
  experience.

  What Needs to Be Tested

   1. Frontend (UI & Editor Logic):
       * Core Editor Functionality: Markdown rendering, block extensions (paragraph, heading, list, quote, code), keyboard shortcuts, text
         selection.
       * Document Management: Saving and loading documents to/from localStorage, handling of docId.
       * Export Functionality: Correct generation and download of Markdown, HTML, and PDF files.
       * User Interface: Responsiveness across different screen sizes, dark/light mode switching, overall visual consistency and performance.
   2. AI Flows (Client-side OpenAI Integration):
       * Slash Command Triggering: Correct activation and display of the slash command menu.
       * AI Command Execution: Proper payload construction and dispatch to the OpenAI API for /summarize, /rewrite, /fix-grammar.
       * AI Assist Panel Interaction: Display of AI output, functionality of "Insert," "Replace," and "Retry" buttons, clear loading and error
         states.
       * Error Handling: Graceful handling and user-friendly display of errors from the OpenAI API (e.g., network issues, invalid API key, rate
         limits).
   3. Performance:
       * Application load time, editor responsiveness during typing and AI interactions, export speed.

  Test Types

   1. Unit Tests:
       * Purpose: To test individual functions, components, and utility modules in isolation.
       * Focus: src/lib/ai.ts (OpenAI API call logic, prompt construction), src/lib/export.ts (markdown/HTML conversion logic), src/hooks/ (e.g.,
         useEditorStorage.ts), and smaller, stateless React components.
   2. Integration Tests:
       * Purpose: To verify the interactions between different units or components.
       * Focus: How SlashMenu.tsx interacts with the Tiptap editor and triggers AI calls, how SidePanel.tsx receives and displays AI output from
         src/lib/ai.ts, and how ExportMenu.tsx uses src/lib/export.ts.
   3. End-to-End (E2E) Tests:
       * Purpose: To simulate full user journeys and critical workflows from the user's perspective in a real browser environment.
       * Focus: Typing in the editor, using slash commands, interacting with the AI panel (inserting/replacing AI text), saving/loading documents,
          and performing all export actions. These tests will validate the entire system's behavior.

  Example Test Cases

   * Unit Test (src/lib/ai.ts):
       * test('ai.ts: buildOpenAIPayload correctly formats summarize request', () => { ... });
       * test('ai.ts: handleOpenAIError returns user-friendly message for 401', () => { ... });
   * Integration Test (SlashMenu.tsx & Editor.tsx):
       * test('SlashMenu: Typing "/" displays command list', async () => { ... });
       * test('SlashMenu: Selecting "summarize" command triggers AI call with correct context', async () => { ... }); (mocking the AI service)
   * E2E Test (AI Summarization Flow):
       * test('User can summarize text and insert AI output', async () => { ... });
           * Steps: Navigate to editor, type a paragraph, type /summarize, select summarize, wait for AI response, click "Insert", verify
             summarized text is in editor.
       * test('AI panel displays loading state during API call', async () => { ... });
   * E2E Test (Markdown Formatting & Export):
       * test('User can type markdown and export to HTML', async () => { ... });
           * Steps: Type ## My Heading\n- List item, click export, select HTML, download file, verify HTML content.
   * E2E Test (Local Storage):
       * test('Document persists across page refresh', async () => { ... });
           * Steps: Type content, refresh page, verify content is still present.

  Testing Libraries/Tools

   * Unit & Integration Tests:
       * Vitest: A fast, Vite-native test runner that is Jest-compatible. It's ideal for a Vite-based React project due to its speed and
         integration.
       * React Testing Library: For testing React components in a way that encourages good testing practices by focusing on user behavior rather
         than implementation details.
       * msw (Mock Service Worker): For mocking OpenAI API calls at the network level, providing realistic control over API responses (success,
         error, latency) without making actual network requests.
   * End-to-End (E2E) Tests:
       * Playwright: A powerful and reliable E2E testing framework that supports multiple browsers (Chromium, Firefox, WebKit), offers fast
         execution, and has excellent debugging capabilities. It's well-suited for testing complex user interactions and verifying UI states.

  How to Structure the Test Code in the Repo

  The test code should mirror the src/ folder structure to maintain proximity between the code and its tests, making it easy to find and
  maintain tests.

    1 sooqha/
    2 ├── src/
    3 │   ├── components/
    4 │   │   ├── Editor.tsx
    5 │   │   ├── Editor.test.tsx  # Integration tests for Editor component
    6 │   │   ├── SidePanel.tsx
    7 │   │   ├── SidePanel.test.tsx # Integration tests for SidePanel
    8 │   │   ├── SlashMenu.tsx
    9 │   │   └── SlashMenu.test.tsx # Integration tests for SlashMenu
   10 │   ├── pages/
   11 │   │   └── EditorPage.tsx
   12 │   ├── lib/
   13 │   │   ├── ai.ts
   14 │   │   ├── ai.test.ts       # Unit tests for AI utility functions
   15 │   │   ├── export.ts
   16 │   │   └── export.test.ts   # Unit tests for export utility functions
   17 │   ├── hooks/
   18 │   │   ├── useEditorStorage.ts
   19 │   │   └── useEditorStorage.test.ts # Unit tests for custom hook
   20 │   └── App.tsx
   21 ├── e2e/                     # Dedicated folder for End-to-End tests
   22 │   ├── editor.spec.ts       # E2E tests for core editor flows
   23 │   ├── ai-features.spec.ts  # E2E tests for AI integration flows
   24 │   └── export.spec.ts       # E2E tests for export functionality
   25 ├── playwright.config.ts     # Playwright configuration
   26 ├── vitest.config.ts         # Vitest configuration
   27 └── package.json

  This structure ensures clear separation of test types, easy navigation, and efficient execution of the test suite.
  