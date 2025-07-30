Sooqha Docs' analytics and success tracking plan will focus on understanding user engagement with its core features, especially AI, and ensuring
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
     backend.