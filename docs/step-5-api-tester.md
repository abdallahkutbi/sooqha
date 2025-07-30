 Sooqha Docs, in its MVP stage, is a frontend-only application that directly interacts with the OpenAI API. Therefore, the testing plan will focus on the
  client-side integration with OpenAI and the internal client-side services.

  Critical APIs or Internal Services to Test

   1. OpenAI API Endpoints (via client-side calls):
       * /summarize (used for summarize slash command)
       * /rewrite (used for rewrite slash command)
       * /fix-grammar (used for fix-grammar slash command)
   2. Client-side AI Integration Logic (`src/lib/ai.ts`):
       * Handling of OpenAI API requests and responses.
       * Error handling for API failures (network issues, invalid API key, rate limits).
   3. Client-side Export Functionalities (`src/lib/export.ts`):
       * Markdown export.
       * HTML export.
       * PDF export (via browser print).

  Test Scenarios and Sample Inputs

  For OpenAI API Endpoints & Client-side AI Integration:

   * Happy Path:
       * Input: Well-formed markdown text of varying lengths (short paragraph, medium article, long document).
       * Scenario: Execute each AI slash command (/summarize, /rewrite, /fix-grammar).
       * Expected Output: Relevant AI response displayed in the right-side panel.
   * Edge Cases:
       * Input: Empty document, document with only special characters, document with malformed markdown.
       * Scenario: Execute AI commands.
       * Expected Output: Graceful handling (e.g., appropriate error message, empty response, or best-effort AI output).
   * Performance/Load (Simulated):
       * Input: Very long documents (near OpenAI token limits).
       * Scenario: Repeatedly execute AI commands.
       * Expected Output: UI remains responsive, loading states are shown, and AI response time is within target.
   * Error Handling:
       * Input: Any valid text.
       * Scenario: Simulate network errors, invalid OpenAI API key, or OpenAI rate limit errors.
       * Expected Output: User-friendly error messages displayed in the AI panel, with options to retry.

  For Client-side Export Functionalities:

   * Happy Path:
       * Input: Documents containing all supported markdown elements (headings, lists, code blocks, links, bold/italic text, etc.).
       * Scenario: Export to Markdown, HTML, and PDF.
       * Expected Output: Correctly formatted output files, preserving content and structure.
   * Edge Cases:
       * Input: Empty document, document with only whitespace, document with extremely complex or deeply nested markdown.
       * Scenario: Export to all formats.
       * Expected Output: Graceful handling, correct empty files, or reasonable representation of complex structures.
   * Performance:
       * Input: Very large documents (e.g., 10,000+ words).
       * Scenario: Export to all formats.
       * Expected Output: Export completes within the target time.

  Criteria for Passing Each Test

   * OpenAI API Calls:
       * Response Time: AI response time < 3 seconds (as per product_overview.md).
       * Accuracy/Relevance: AI output is contextually appropriate and fulfills the command's intent.
       * Reliability: Error rate for valid requests < 1%.
   * Client-side AI Integration Logic:
       * Functionality: Slash commands correctly trigger AI calls. "Insert," "Replace," and "Retry" buttons function as expected.
       * UI Responsiveness: The UI remains interactive during AI processing; loading indicators are displayed correctly.
       * Error Display: Clear, concise, and actionable error messages are shown to the user for API failures.
   * Export Functionalities:
       * Correctness: Exported content is a faithful representation of the editor's content in the chosen format.
       * Performance: Export completes under 5 seconds (as per product_overview.md).
       * Data Integrity: No data loss or corruption during the export process.

  Tools or Frameworks for Automation

   * Unit/Integration Testing (Frontend Logic):
       * Jest: For unit testing JavaScript/TypeScript functions (e.g., src/lib/ai.ts, src/lib/export.ts).
       * React Testing Library: For testing React components (SidePanel.tsx, SlashMenu.tsx) to ensure they render correctly and respond to user
         interactions.
       * Mocking Libraries: To simulate OpenAI API responses (success, error, latency) during testing, avoiding actual API calls and associated costs/rate
         limits.
   * End-to-End (E2E) Testing:
       * Cypress or Playwright: For simulating full user flows in a real browser environment. This would cover:
           * Typing in the editor.
           * Triggering slash commands.
           * Interacting with the AI Assist Panel (Insert, Replace, Retry).
           * Initiating and verifying export processes (e.g., checking downloaded file content).
           * Testing UI responsiveness during AI calls.
   * Performance Testing (Frontend):
       * Browser Developer Tools (e.g., Chrome DevTools Performance tab, Lighthouse): For profiling frontend rendering, load times, and identifying UI
         bottlenecks.
       * E2E tests can include performance assertions (e.g., cy.wait() for AI responses, cy.get().should('be.visible') within a time limit).
   * API Monitoring (External):
       * While not directly automated by Sooqha's internal tests, external monitoring tools (e.g., UptimeRobot, Postman Monitors) could be used to track
         the availability and performance of the OpenAI API itself.