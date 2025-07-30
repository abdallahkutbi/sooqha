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
         prominent buttons to "Insert" the output into the editor, "Replace" selected text, or "Retry" the AI prompt. Loading and error states will be
         clearly communicated within this panel.

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
     offering a fresh and contemporary user experience.
