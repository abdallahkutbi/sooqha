✦ Here's a prototype-level architecture plan for Sooqha Docs, focusing on the MVP scope:

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