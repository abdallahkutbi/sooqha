Sooqha Docs is an AI-native markdown document editor aiming to be the fastest and smartest writing tool, built for creators, developers, students, and
  professionals. It features deep AI integration (autocompletion, rewriting, summarization), a rich markdown editor (TipTap, slash commands), multi-format
  export, and a modern, minimal, performance-first UX. The MVP is frontend-only, using React, TypeScript, TailwindCSS, and client-side OpenAI.

  Here are some relevant market trends, AI adoption patterns, and emerging competitor dynamics that might affect Sooqha Docs:

   1. Hyper-Personalization and Contextual AI:
       * Trend Explanation: The evolution of AI in document editors is moving beyond generic suggestions to highly personalized and context-aware
         assistance. This means AI that understands the user's writing style, the specific domain of their content, and even their past interactions to
         offer more relevant and proactive suggestions. Competitors are investing heavily in making their AI feel like a true co-pilot rather than just a
         tool.
       * Impact on Sooqha: Sooqha's "Context-aware autocompletions" and "One-click summaries, tone shifts, and transformations" align well with this.
         However, to stay competitive, Sooqha will need to deepen its understanding of user context. This could involve implementing more sophisticated
         prompt engineering, allowing users to "train" the AI on their specific writing style or knowledge base (as hinted in "Custom trained AI per user"
         in Phase 3). The current client-side-only OpenAI integration might limit the depth of personalization without a backend to store user-specific
         models or preferences.
       * Optional Links:
           * The Rise of AI Co-Pilots in Software Development (https://www.infoq.com/news/2023/09/ai-copilots-software-development/)
           * Personalized AI: The Future of User Experience
             (https://www.forbes.com/sites/forbestechcouncil/2023/08/29/personalized-ai-the-future-of-user-experience/)

   2. The "Local-First" and Offline-First Movement for Privacy and Performance:
       * Trend Explanation: With increasing concerns about data privacy and the desire for uninterrupted workflows, there's a growing demand for
         applications that prioritize local storage and offline capabilities. Users want control over their data and the ability to work seamlessly without
         an internet connection. This trend also ties into performance, as local operations are inherently faster.
       * Impact on Sooqha: Sooqha's "Local-first with optional sync" and "Offline local file support" are significant competitive advantages that directly
         address this trend. This positioning can attract users who are wary of cloud-only solutions like Google Docs. However, the "client-side only
         OpenAI API" integration means AI features will be unavailable offline. As Sooqha plans for "real-time collaboration" and "custom trained AI per
         user" (which might require cloud processing), maintaining a strong local-first identity while integrating online features will be a delicate
         balance.
       * Optional Links:
           * Why Local-First Software is the Future (https://www.inkandswitch.com/local-first/)
           * The Offline-First Approach to Web Development (https://web.dev/offline-first/)

   3. Integration with Broader Productivity Ecosystems and "App-as-a-Platform":
       * Trend Explanation: Modern productivity tools are increasingly becoming central hubs that integrate with a wide array of other services (e.g.,
         project management, communication, cloud storage). Users expect seamless workflows that allow them to pull in information from various sources and
         push content to different platforms. This often involves robust API access and plugin architectures.
       * Impact on Sooqha: While Sooqha's MVP is intentionally lean ("No backend API," "No plugin architecture" for now), its "Multi-format Export" is a
         good start. However, to compete with tools like Notion (which has extensive integrations) and Obsidian (with its powerful plugin ecosystem), Sooqha
          will eventually need to expand its "Platform Expansion" phase to include more comprehensive API access and a plugin architecture. This will allow
         users to connect Sooqha Docs to their existing workflows and extend its functionality, which is crucial for broader adoption beyond individual
         creators.
       * Optional Links:
           * The Rise of the App-as-a-Platform (https://a16z.com/2019/02/18/the-rise-of-the-app-as-a-platform/)
           * The API Economy: How APIs are Driving Digital Transformation (https://www.ibm.com/cloud/blog/api-economy-digital-transformation/)Here's a prioritized list of MVP features for Sooqha Docs, based on the product overview and market trend analysis:

  Prioritized MVP Features

   * Core Markdown Editor (TipTap Integration): This is the foundational element, providing the essential writing canvas upon which all AI functionalities
     will be built.
   * AI-Integrated Writing (Slash Commands for Summarize, Rewrite, Fix Grammar): This is Sooqha's primary differentiator and core value proposition,
     delivering the "AI superpowers" that define the product.
   * Right-side AI Panel with Insert/Replace/Retry: This user interface is critical for making the AI's output actionable and seamlessly integrated into
     the writing workflow.
   * Local-first Editing (Save/Load to/from localStorage): This feature directly addresses the growing "Local-First" trend, offering a key competitive
     advantage in terms of privacy and performance.
   * Multi-format Export (Markdown, HTML, PDF): Providing diverse export options ensures immediate utility for users to share and utilize their documents
     outside of the Sooqha ecosystem.
   * Modern, Minimal, Performance-first UI (TailwindCSS): A clean, fast, and intuitive user experience is paramount for user adoption and retention,
     reinforcing Sooqha's promise of speed and efficiency.

  Features Explicitly Deferred to Post-MVP

   * Real-time collaboration, comments, teams & permissions, document versioning.
   * Smart document templates, custom trained AI per user, structured document generation.
   * Mobile & desktop apps, API access, plugin architecture, enterprise & SSO features.
   * User login/authentication, database/cloud storage, monetization, dashboards, and onboarding beyond basic functionality.
   * AI memory or a complex prompt engineering engine.

  Key Dependencies or Blockers

   * OpenAI API Key: A valid OpenAI API key is a fundamental dependency for all AI functionalities.
   * Tiptap Mastery: Effectively leveraging TipTap's capabilities and extensions to create a truly seamless markdown editing experience will require
     focused development effort.
   * Performance Optimization: Maintaining the promised "blazing fast" performance, especially with client-side AI calls and document rendering, will be an
     ongoing challenge requiring continuous optimization.
   * AI Interaction Design: Crafting intuitive and non-intrusive AI interactions within the editor and side panel is crucial for user adoption and will
     require careful UI/UX design.✦ Here's a prototype-level architecture plan for Sooqha Docs, focusing on the MVP scope:

  System Components Breakdown

  Sooqha Docs MVP is designed as a lean, frontend-only application.

   * Frontend (User Interface & Editor Logic): This is the primary component, responsible for rendering the editor, handling user interactions, displaying
     AI output, and managing local document storage.
   * AI Services (External API): This component provides the generative AI capabilities, accessed directly from the frontend.
   * Data Storage (Local): This handles the persistence of user documents within the browser.

  Suggested Tech Stack for Each Component

   * Frontend:
       * Framework: React with TypeScript (via Vite).
           * Reasoning: Explicitly defined in project-info.md for rapid development, strong typing, and a fast build process. Vite offers excellent
             developer experience.
       * Styling: TailwindCSS.
           * Reasoning: Specified in project-info.md for utility-first CSS, enabling quick UI assembly and a minimal, performant aesthetic.
       * Editor: Tiptap (React wrapper).
           * Reasoning: Chosen for its extensibility, markdown-first approach, and block-based editing capabilities, as outlined in product_overview.md.
       * State Management: React's built-in state management (useState, useContext) for UI state, and localStorage for document persistence.
           * Reasoning: Aligns with the "no backend, no auth, no database" constraint for the MVP, keeping the architecture simple and local-first.
       * Routing: React Router.
           * Reasoning: Necessary for managing the /editor/:docId route as specified in project-info.md.

   * AI Services: OpenAI API (gpt-4 or gpt-3.5-turbo).
       * Reasoning: Directly called from the client-side as per project-info.md, providing the core AI functionalities (summarize, rewrite, fix-grammar).

   * Data Storage: localStorage.
       * Reasoning: The chosen method for saving and loading documents by docId, reinforcing the local-first principle of the MVP.

  Rough Sequencing of Engineering Milestones (6-Week Sprint)

  This plan is aligned with the rapid prototyping philosophy and the prioritized MVP features.

   * Week 1: Foundation & Core Editor Setup
       * Scaffold project with React, TypeScript, Vite, and TailwindCSS.
       * Set up the /editor/:docId route using React Router.
       * Integrate and mount the Tiptap editor with basic markdown extensions (paragraph, heading, list, quote, code).
       * Implement basic document saving and loading to/from localStorage.

   * Week 2: AI Integration - Core Functionality
       * Develop the slash command input UI within Tiptap.
       * Implement the client-side OpenAI API calls for /summarize, /rewrite, and /fix-grammar commands.
       * Build the right-side AI panel to display AI-generated output.
       * Implement the "Insert," "Replace," and "Retry" actions for AI suggestions.

   * Week 3: Export & Initial Polish
       * Implement export functionality for Markdown (.md).
       * Implement export functionality for HTML.
       * Implement export to PDF (leveraging browser print capabilities).
       * Begin refining the UI/UX for the core editor and AI panel, focusing on a minimal and performance-first design.

   * Week 4: Performance & Robustness
       * Conduct initial performance profiling to identify and address bottlenecks (e.g., optimizing Tiptap rendering, debouncing AI calls).
       * Implement basic error handling for OpenAI API calls and localStorage operations.
       * Address edge cases related to editor content and AI interactions.

   * Week 5: Testing & Refinement
       * Perform comprehensive manual testing of all MVP features across target browsers.
       * Address any critical bugs or usability issues identified during testing.
       * Further polish the UI and ensure a smooth user experience.
       * Conduct basic accessibility checks.

   * Week 6: Launch Preparation & Documentation
       * Execute final performance checks and optimizations.
       * Prepare the application for deployment (e.g., build optimization).
       * Create basic user documentation and setup instructions.
       * Gather feedback from internal stakeholders and prepare for potential early user testing.

  Assumptions or Open Questions

   * OpenAI API Key Management: How will users securely provide and manage their OpenAI API keys? Will they be stored in localStorage (less secure but fits
     MVP) or require manual input for each session?
   * OpenAI API Usage Costs/Rate Limits: With client-side API calls, there's no server-side control over usage. How will potential high costs or rate
     limits be communicated to or managed for the user?
   * Offline AI Functionality: The AI features will not work offline due to direct client-side OpenAI calls. Is this limitation acceptable for the MVP, and
     how will it be clearly communicated to the user?
   * Document Size Limitations: localStorage has inherent size limitations (typically 5-10MB). How will very large documents be handled, or will there be a
     soft limit on document size?
   * AI Error Handling User Experience: What specific and user-friendly error messages will be displayed if OpenAI API calls fail (e.g., network issues,
     invalid API key, rate limits)?
   * Tiptap Performance with Large Documents: While Tiptap is generally performant, how will it handle extremely large markdown documents, especially when
     combined with real-time AI interactions?
   * Browser Compatibility: What specific browser versions and platforms will be officially supported and tested for the MVP?
  Sooqha Docs' UI/UX design direction will be rooted in its core principles: AI-native, markdown-first, blazing fast, and minimal. The design will
  prioritize a focused writing experience, seamlessly integrating AI capabilities without introducing bloat.

  Core Layout and UX Flow

  The primary layout will be a two-column structure on desktop, adapting to a single-column or stacked layout on smaller screens (mobile-first responsive
  design).

   * Left Column (Main Editor Area): This will be the central canvas for writing. It will house the TipTap markdown editor, providing a clean,
     distraction-free environment.
       * UX Flow: Users will type naturally, leveraging markdown syntax. The "slash command" (/) will be the primary trigger for AI actions, appearing
         contextually near the cursor. Text selection will also activate AI options (e.g., a small, subtle floating toolbar or a right-click context menu).
       * Document Management: A subtle header or sidebar element will indicate the current document's name and auto-save status (e.g., "Saved to
         LocalStorage"). A simple mechanism (e.g., a dropdown or a dedicated "Docs" button) will allow users to switch between or create new local
         documents.

   * Right Column (AI Assist Panel): This dedicated panel will display AI outputs and interaction controls. It will be visible when AI actions are
     triggered or when AI suggestions are pending.
       * UX Flow: When an AI command is executed (e.g., /summarize), the AI Assist Panel will populate with the AI's response. Users will then have clear,
         prominent buttons to "Insert," "Replace," or "Retry" the AI prompt. Loading and error states will be clearly communicated within this panel.

  UI Components to Prioritize in the MVP

   1. Core Markdown Editor: The TipTap instance itself, with a clean, readable font and appropriate line spacing. Minimal chrome around the editor to
      maintain focus.
   2. Slash Command Bar: A context-sensitive, keyboard-first overlay that appears when / is typed, listing available AI commands (summarize, rewrite,
      fix-grammar).
   3. Right-side AI Panel: A distinct, visually separated panel for AI output, featuring:
       * AI-generated text display area.
       * Action Buttons: "Insert," "Replace," "Retry" (prominently displayed).
       * Loading indicator (e.g., a subtle spinner or skeleton text).
       * Error message display for failed AI calls.
   4. Export Menu/Button: A clear, accessible button (likely in a top-right utility bar) that triggers a dropdown or modal for selecting export formats
      (Markdown, HTML, PDF).
   5. Document Title/Status: A simple, non-intrusive display of the current document's name and its save status (e.g., "Saved").

  Style Principles

   * Minimalist: Clean lines, ample whitespace, and a focus on content. No unnecessary visual clutter or decorative elements.
   * Keyboard-First: Design interactions to be highly efficient via keyboard shortcuts and commands, reducing reliance on mouse clicks.
   * Performance-First: Lightweight components, optimized rendering, and minimal animations to ensure a "blazing fast" feel.
   * Dark/Light Modes: Offer both themes, allowing users to choose their preferred visual comfort. The default will likely be a modern dark theme to align
     with the "VSCode with ChatGPT" feel.
   * Modern Typography: Use a clean, highly readable sans-serif font for body text, with a slightly more distinct font for headings to establish hierarchy.
   * Subtle Interactivity: Micro-interactions and subtle visual feedback for actions (e.g., button presses, AI loading) to enhance the user experience
     without being distracting.
   * TailwindCSS: The utility-first nature of TailwindCSS will naturally enforce consistency in spacing, sizing, and color palettes, contributing to the
     minimal and cohesive aesthetic.

  How the Design Supports Competitive Differentiators

   * AI-Native: The dedicated, always-available AI Assist Panel and the seamless integration of slash commands make AI feel like an inherent part of the
     editor, not an afterthought. The UI will visually emphasize the AI's presence and utility.
   * Markdown-First: The clean editor interface, without a heavy visual toolbar, encourages users to embrace markdown syntax. The focus is on the text and
     content creation, mirroring the efficiency of code editors.
   * Local-First: The absence of prominent cloud sync indicators or login prompts in the MVP reinforces the local-first, privacy-focused approach. The save
     status will clearly indicate local persistence.
   * Performance: The minimalist design, optimized component rendering, and focus on keyboard-first interactions will contribute to a perception of speed
     and responsiveness, fulfilling the "blazing fast" promise.
   * Modern UX: The clean aesthetic, dark/light modes, and efficient AI integration will differentiate Sooqha from "bloated legacy tools" like Google Docs,
     offering a fresh and contemporary user experience.Sooqha Docs, in its MVP stage, is a frontend-only application that directly interacts with the OpenAI API. Therefore, the testing plan will focus on the
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
         the availability and performance of the OpenAI API itself.Sooqha Docs, in its MVP stage, is a frontend-only application with direct client-side integration with the OpenAI API. Therefore, the test
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
           * Steps: Type ## My Heading
- List item, click export, select HTML, download file, verify HTML content.
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

  This structure ensures clear separation of test types, easy navigation, and efficient execution of the test suite.Sooqha Docs aims to be "blazing fast," making performance a core competitive advantage. A robust performance benchmarking strategy is crucial to
   ensure this promise is met and maintained.

  Key Performance Goals

  Based on the product_overview.md, the explicit performance targets are:

   * Load time: < 2s
   * AI response time: < 3s
   * Export speed: < 5s
   * Uptime: 99.9% (though this is more infrastructure-related, client-side performance contributes to perceived uptime)

  Beyond these explicit goals, the general performance goals are:

   * Editor Responsiveness: Smooth typing, scrolling, and interaction even with large documents.
   * UI Fluidity: No jank or stuttering during UI transitions or AI panel interactions.
   * Memory Usage: Efficient memory consumption to prevent browser slowdowns or crashes, especially for long sessions.

  Benchmarks to Test Against

  Sooqha Docs positions itself against established players. Benchmarking against them will provide a realistic competitive context.

   * Direct Competitors:
       * Obsidian: For local-first, markdown-first performance. Sooqha aims to match or exceed its speed in these areas.
       * Notion: For general document editing performance, especially with rich content.
   * Indirect Competitors:
       * Google Docs: To highlight Sooqha's "blazing fast" advantage over legacy, cloud-heavy tools.

  What to Measure and How

  Performance measurement will involve a combination of automated tools, synthetic tests, and real user monitoring (though RUM might be
  post-MVP).

   * Load Time:
       * What: First Contentful Paint (FCP), Largest Contentful Paint (LCP), Time to Interactive (TTI), Total Blocking Time (TBT).
       * How:
           * Lighthouse: Automated audits run in CI/CD for every commit/PR.
           * WebPageTest: For more detailed waterfall analysis and network condition simulation.
           * Playwright E2E tests: Measure page load times within a controlled environment.
   * AI Response Time:
       * What: Time from AI command trigger (e.g., /summarize) to AI output appearing in the side panel. This includes network latency to OpenAI
         and client-side processing.
       * How:
           * Custom Logging: Implement precise performance.now() measurements around the OpenAI API call and response handling in src/lib/ai.ts.
             Log these times to the browser console during development and potentially to an analytics service (post-MVP).
           * Playwright E2E tests: Measure the duration of AI interactions within automated test scenarios.
   * Export Speed:
       * What: Time from clicking an export button to the file download prompt appearing or the PDF preview rendering.
       * How:
           * Custom Logging: Measure the duration of the export functions in src/lib/export.ts.
           * Playwright E2E tests: Automate export scenarios and measure the time taken.
   * Editor Responsiveness/UI Fluidity:
       * What: Frames per second (FPS) during typing, scrolling, and complex editor operations (e.g., applying styles to large selections).
       * How:
           * Chrome DevTools Performance Tab: Manual profiling during development to identify jank and long tasks.
           * Playwright E2E tests: Use Playwright's tracing capabilities to capture performance profiles during specific interactions.
   * Memory Usage:
       * What: Heap size, DOM node count.
       * How:
           * Chrome DevTools Memory Tab: Manual profiling to detect memory leaks, especially after long sessions or repeated AI calls.
           * Playwright E2E tests: Capture memory snapshots at key points in user flows.

  Specific Scenarios or Flows to Benchmark

   * Application Startup:
       * Cold load of /editor/:docId route.
       * Warm load (after initial visit).
   * Document Loading:
       * Opening an empty document.
       * Opening a small document (e.g., 500 words).
       * Opening a large document (e.g., 5,000+ words, near localStorage limits).
   * Core Editor Interactions:
       * Rapid typing of 100 words.
       * Scrolling through a 5,000-word document.
       * Applying markdown formatting (bold, italic, heading) to a large selection.
   * AI Integration Flows:
       * Triggering /summarize on a short paragraph.
       * Triggering /summarize on a long document.
       * Triggering /rewrite on a sentence.
       * Triggering /fix-grammar on a paragraph with errors.
       * Repeated AI calls within a short period to test rate limiting and responsiveness.
   * Export Flows:
       * Exporting a small document to Markdown, HTML, PDF.
       * Exporting a large document to Markdown, HTML, PDF.

  How to Track Regressions Over Time

   * CI/CD Integration: Integrate Lighthouse and Playwright performance tests into the CI/CD pipeline.
       * Thresholds: Set strict performance budgets and fail builds if metrics fall below defined thresholds (e.g., LCP > 2s).
       * Trend Reporting: Configure CI/CD to generate and store performance reports (e.g., JSON output from Lighthouse, Playwright traces).
   * Dedicated Performance Dashboard:
       * Use a tool (e.g., Grafana, custom dashboard) to visualize performance metrics over time.
       * Plot trends for load time, AI response time, and export speed.
       * Overlay deployment markers to correlate performance changes with specific code releases.
   * Automated Alerts:
       * Set up alerts (e.g., via CI/CD or monitoring tools) if key performance metrics degrade significantly (e.g., AI response time increases by
          10% over baseline).
   * Regular Benchmarking Runs:
       * Schedule weekly or daily automated performance tests against a stable staging environment.
       * Compare results against the established benchmarks (Notion, Google Docs, Obsidian) periodically to ensure competitive advantage is
         maintained.
   * Performance Budget:
       * Define and maintain a clear performance budget (as outlined in the performance-benchmarker.md context) for JavaScript bundle size, CSS,
         images, and API calls. Monitor these budgets in the CI/CD pipeline.

  By implementing this comprehensive strategy, Sooqha Docs can proactively identify and address performance bottlenecks, ensuring it remains a
  "blazing fast" and intelligent writing experience.Sooqha Docs' analytics and success tracking plan will focus on understanding user engagement with its core features, especially AI, and ensuring
   it meets its performance and retention goals, all while respecting user privacy.

  Key Metrics to Track

  Based on the product_overview.md and step-2-sprint-prioritizer.md:

   * User Growth & Engagement:
       * Daily Active Users (DAU): Primary measure of active usage.
       * Weekly Active Users (WAU), Monthly Active Users (MAU): For broader engagement trends.
       * Session Length & Frequency: How long and how often users engage with the editor.
       * Document Creation Rate: Number of new documents created per user/session.
       * Document Editing Frequency: How often users return to edit existing documents.
   * AI Feature Usage:
       * AI Feature Usage per Session: Track the percentage of sessions where AI features are used (target: 70%).
       * Specific AI Command Usage: Count of /summarize, /rewrite, /fix-grammar executions.
       * AI Output Adoption Rate: Percentage of AI-generated suggestions that are "Inserted" or "Replaced."
       * AI Retry Rate: How often users retry an AI command (indicates dissatisfaction or need for better prompts).
   * Export & Sharing:
       * Export Rate: Number of documents exported per user/session.
       * Export Format Popularity: Which formats (Markdown, HTML, PDF) are most used.
   * Retention:
       * Monthly Retention: Percentage of users returning month-over-month (target: 60%).
       * Cohort Retention Analysis: Track retention for users acquired in specific periods.
   * Performance (from `step-7-performance-benchmarker.md`):
       * Load time: FCP, LCP, TTI.
       * AI response time: Time from trigger to output.
       * Export speed: Time to complete export.
       * These will be tracked via performance monitoring tools, but key metrics should be visible in analytics dashboards.

  Suggested Tools or Frameworks for Tracking

  Given the MVP's frontend-only nature and "local-first" value, privacy-conscious and lightweight solutions are preferred.

   * Core Analytics:
       * PostHog: Open-source, self-hostable (if desired for full data control), and offers product analytics, feature flags, and A/B testing. Its
          event-based model is well-suited for tracking granular user actions.
       * Plausible Analytics: A lightweight, privacy-friendly, and open-source alternative to Google Analytics. It focuses on essential metrics
         without cookies or personal data collection. Good for website traffic and basic usage.
       * Mixpanel / Amplitude (Consider Post-MVP): While powerful for product analytics, their free tiers might be limiting for long-term growth,
         and they are cloud-based, which might conflict with strict local-first interpretations.
   * Performance Monitoring:
       * Web Vitals API: Directly integrate into the frontend to capture Core Web Vitals.
       * Custom Logging: For precise timing of AI calls and export functions (as outlined in step-7-performance-benchmarker.md).
   * Error Tracking:
       * Sentry: For capturing and reporting client-side errors, including those from OpenAI API calls.

  Where to Place Analytics Hooks in the Product

  Analytics hooks should be placed at key interaction points to capture user behavior and feature adoption.

   * Application Lifecycle:
       * page_view: On editor load (/editor/:docId).
       * session_start, session_end: To track active usage time.
   * Editor Actions:
       * document_created: When a new document is initialized.
       * document_loaded: When an existing document is opened from localStorage.
       * document_saved: On auto-save to localStorage.
       * text_typed: (Consider sampling or aggregate, not every keystroke) To understand active writing time.
       * markdown_block_added: When a new markdown block type is inserted (e.g., heading, list, code block).
   * AI Triggers & Interactions:
       * ai_command_triggered: When a slash command is initiated (e.g., command: summarize, context: selected_text/full_doc).
       * ai_response_received: When AI output is displayed in the side panel (include command, response_time).
       * ai_output_inserted: When user clicks "Insert" (include command).
       * ai_output_replaced: When user clicks "Replace" (include command).
       * ai_output_retried: When user clicks "Retry" (include command, previous_error_type if applicable).
       * ai_error_displayed: When an AI error message is shown (include error_type, command).
   * Export Actions:
       * export_initiated: When an export option is selected (e.g., format: markdown).
       * export_completed: When the export file is generated/downloaded (include format, export_time, document_size).

  Dashboard or Reporting Ideas to Guide Weekly Decision-Making

  A concise, actionable dashboard will be crucial for rapid iteration.

   * Executive Summary Dashboard:
       * DAU/WAU/MAU trends.
       * Overall AI feature usage percentage.
       * Number of new documents created.
       * Key performance metrics (Avg. Load Time, Avg. AI Response Time).
       * Top 3 most used AI commands.
       * Top 3 AI commands with highest retry rates.
   * AI Performance & Adoption Dashboard:
       * Breakdown of AI command usage over time.
       * AI output adoption rate (Insert/Replace vs. Discard).
       * AI response time distribution (p50, p95, p99).
       * AI error rates by type.
   * User Engagement & Retention Dashboard:
       * Cohort retention curves.
       * Average session duration.
       * Frequency of return visits.
       * Funnel analysis for key user journeys (e.g., new user -> first document -> first AI interaction).
   * Export & Utility Dashboard:
       * Export volume by format.
       * Average export times.
       * Breakdown of document sizes being exported.

  Privacy-Conscious Implementation Tips

  Aligning with Sooqha's "local-first" and privacy-focused values is paramount.

   * Anonymized Data Collection:
       * No Personally Identifiable Information (PII): Do not collect user names, email addresses, IP addresses, or any other data that can
         directly identify an individual.
       * Anonymous User IDs: Use randomly generated, non-persistent user IDs (e.g., stored in localStorage and reset if localStorage is cleared)
         for tracking sessions and basic user journeys, but ensure they cannot be linked back to a real person.
   * Opt-in Analytics (Post-MVP Consideration): For future, more detailed analytics, consider an explicit opt-in mechanism for users to share
     usage data. For MVP, focus on aggregate, anonymized data that doesn't require explicit consent.
   * Data Minimization: Only collect the data absolutely necessary to answer key product questions. Avoid collecting excessive or irrelevant
     information.
   * No Document Content in Analytics: Absolutely no actual document content should ever be sent to analytics services. Only metadata (e.g.,
     document length, number of markdown blocks, AI command used) should be tracked.
   * Client-Side Processing: Prioritize client-side processing of data before sending it to any external analytics service to further anonymize
     and aggregate.
   * Transparency: Clearly state in the privacy policy what data is collected, why, and how it's used.
   * Local-First Data Storage: Emphasize that document content remains on the user's device (localStorage) and is not sent to any analytics
     backend.Sooqha Docs' go-to-market and growth strategy will leverage its core differentiators—AI-native, markdown-first, and blazing fast—to target
  specific user segments and foster organic growth.

  3–5 Acquisition Channels to Prioritize

   1. Developer & Technical Communities (Reddit, Hacker News, GitHub):
       * Reasoning: Sooqha's markdown-first approach, Tiptap integration, and "VSCode with ChatGPT" feel directly appeal to developers, technical
         writers, and indie hackers. These communities are highly engaged and value performance and efficiency.
       * Tactics: Share product updates, participate in relevant discussions, offer early access, and showcase technical deep-dives.
   2. Content Creator & Productivity Niche (Twitter/X, YouTube, Indie Hackers):
       * Reasoning: Content creators and professionals seeking productivity gains will be drawn to the AI superpowers and fast writing experience.
          Indie Hackers is a natural fit for founders and early adopters.
       * Tactics: Create short, engaging video demos (e.g., TikTok-style showcasing AI features), share compelling use cases, and engage with
         productivity influencers.
   3. Product Hunt:
       * Reasoning: Essential for launching new tech products and gaining initial visibility and early adopter feedback.
       * Tactics: Prepare a strong launch page, engage with the community, and encourage upvotes and reviews.
   4. SEO & Content Marketing:
       * Reasoning: Long-term, sustainable growth by attracting users searching for AI writing tools, markdown editors, or productivity solutions.
       * Tactics: Create blog posts comparing Sooqha to competitors (e.g., "Sooqha vs. Notion: The Fast AI-Native Alternative"), tutorials on
         using AI features, and articles on markdown best practices.

  Launch Plan Outline

   * Phase 1: Pre-Launch & Early Access (Weeks -4 to -1)
       * Build Hype: Create a compelling landing page with a clear value proposition and a waitlist for early access.
       * Teasers: Share short video demos and screenshots on target social media and community channels.
       * Community Engagement: Actively participate in relevant subreddits, forums, and Twitter discussions, subtly introducing Sooqha Docs.
       * Press & Influencer Outreach: Identify and engage with tech journalists, productivity bloggers, and micro-influencers for potential
         reviews or mentions.
   * Phase 2: Launch Day (Week 0)
       * Product Hunt Launch: Execute a well-coordinated launch on Product Hunt, engaging with comments and questions.
       * Community Announcements: Post launch announcements on key developer and content creator platforms.
       * Social Media Blitz: Share across all relevant social media channels.
       * Early Access Invites: Send out the first wave of invites to the waitlist.
   * Phase 3: Post-Launch & Iteration (Weeks 1-4)
       * Rapid Feedback Loop: Actively monitor social media, reviews, and direct feedback channels. Prioritize and implement quick fixes and
         improvements based on early user input.
       * Content Marketing Push: Publish launch-related blog posts, tutorials, and success stories.
       * Micro-Influencer Collaborations: Partner with smaller creators for authentic reviews and demos.
       * Performance Monitoring: Continuously track performance metrics and address any regressions.

  Key Messaging Angles Based on Product Strengths

   * "AI-Native, Not Add-on": Emphasize that AI is deeply integrated into the core writing experience, not a bolted-on feature. "Experience true
     AI superpowers without the bloat."
   * "Markdown-First, Blazing Fast": Highlight the unparalleled speed and efficiency for users who value a keyboard-first, distraction-free
     writing environment. "Write at the speed of thought."
   * "Your AI Co-Pilot for Docs": Position Sooqha as an intelligent partner that enhances creativity and productivity, rather than just a tool.
     "Think with your documents, not just on them."
   * "Privacy-First, Local-First": Appeal to users concerned about data privacy and control, emphasizing that documents are stored locally. "Your
     words, your control. Private by design."

  Metrics to Track During Launch and Post-Launch Phases

   * Acquisition Metrics:
       * Website traffic (source, volume, conversion to waitlist/sign-up).
       * Product Hunt upvotes, comments, and reviews.
       * Referral traffic from community posts and social shares.
       * Cost Per Acquisition (if any paid channels are tested later).
   * Activation Metrics:
       * First Session Completion Rate (e.g., user creates and saves their first document).
       * Time to First AI Interaction.
       * AI Feature Usage per Session (target: 70%).
   * Engagement Metrics:
       * Daily Active Users (DAU), Weekly Active Users (WAU), Monthly Active Users (MAU).
       * Average Session Length.
       * Document Creation and Editing Frequency.
       * AI Output Adoption Rate (Insert/Replace vs. Discard).
   * Retention Metrics:
       * Monthly Retention Rate (target: 60%).
       * Cohort Retention Analysis.
   * Performance Metrics:
       * Load Time (< 2s).
       * AI Response Time (< 3s).
       * Export Speed (< 5s).

  Growth Loop Ideas or Viral Features

   1. "Shareable AI Output": Implement a subtle, optional "Generated by Sooqha Docs AI" watermark or a quick share button for AI-generated
      summaries or rewrites. This allows users to showcase the AI's power and organically promote the tool.
   2. "AI-Powered Document Showcase" (User-Opt-in): Create an optional public gallery where users can submit and showcase documents created or
      significantly enhanced using Sooqha Docs' AI features. This provides social proof and inspires new users.
   3. "Referral Program for AI Usage": Offer early adopters extended AI usage credits or early access to new AI features (e.g., custom trained AI)
      for successful referrals.
   4. "Export with Subtle Branding": For exported Markdown or HTML files, include a small, unobtrusive comment or footer indicating "Exported with
      Sooqha Docs." This is a low-friction way to spread awareness.
