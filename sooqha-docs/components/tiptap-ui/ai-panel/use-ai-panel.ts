import * as React from "react"
import type { Editor } from "@tiptap/react"
import type { AiMessage, AiCommand } from "./ai-panel"
import { Sparkles, Wand2, Check, Lightbulb } from "lucide-react"

// Default AI commands for demonstration
const defaultAiCommands: AiCommand[] = [
  {
    id: "summarize",
    name: "Summarize",
    description: "Create a concise summary of the selected text",
    shortcut: "/summarize",
    icon: Sparkles,
  },
  {
    id: "rewrite",
    name: "Rewrite",
    description: "Rewrite the selected text in a different style",
    shortcut: "/rewrite",
    icon: Wand2,
  },
  {
    id: "fix-grammar",
    name: "Fix Grammar",
    description: "Correct grammar and spelling errors",
    shortcut: "/fix-grammar",
    icon: Check,
  },
  {
    id: "expand",
    name: "Expand",
    description: "Expand on the selected text with more details",
    shortcut: "/expand",
    icon: Lightbulb,
  },
]

export interface UseAiPanelConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null
  /**
   * AI messages history
   */
  messages?: AiMessage[]
  /**
   * Available AI commands
   */
  commands?: AiCommand[]
  /**
   * Callback when an AI command is executed
   */
  onCommand?: (command: AiCommand) => void
  /**
   * Callback when AI response is inserted
   */
  onInsert?: (content: string) => void
  /**
   * Callback when AI response is replaced
   */
  onReplace?: (content: string) => void
  /**
   * Callback when AI response is retried
   */
  onRetry?: () => void
  /**
   * Whether the panel should hide when not available.
   * @default false
   */
  hideWhenUnavailable?: boolean
  /**
   * Callback function called after a successful action.
   */
  onAction?: () => void
  /**
   * Callback when prompt is submitted
   */
  onPromptSubmit?: (prompt: string) => void
}

/**
 * Hook for managing AI panel state and actions.
 * 
 * This hook provides:
 * - AI message state management
 * - AI command handling
 * - Message insertion and replacement
 * - Panel visibility control
 */
export function useAiPanel(config: UseAiPanelConfig) {
  const {
    editor,
    messages = [],
    commands = defaultAiCommands,
    onCommand,
    onInsert,
    onReplace,
    onRetry,
    hideWhenUnavailable = false,
    onAction,
    onPromptSubmit,
  } = config

  // AI messages state management
  const [aiMessages, setAiMessages] = React.useState<AiMessage[]>(messages)

  // Update messages when prop changes
  React.useEffect(() => {
    setAiMessages(messages)
  }, [messages])

  // Panel visibility logic
  const isVisible = React.useMemo(() => {
    if (hideWhenUnavailable && !editor) {
      return false
    }
    return true
  }, [editor, hideWhenUnavailable])

  // Handle AI command execution
  const handleCommand = React.useCallback(
    (command: AiCommand) => {
      console.log('AI command executed:', command.name)
      onCommand?.(command)
      onAction?.()
    },
    [onCommand, onAction]
  )

  // Handle message insertion
  const handleInsert = React.useCallback(
    (content: string) => {
      console.log('Inserting AI content:', content)
      if (editor) {
        editor.chain().focus().insertContent(content).run()
      }
      onInsert?.(content)
      onAction?.()
    },
    [editor, onInsert, onAction]
  )

  // Handle message replacement
  const handleReplace = React.useCallback(
    (content: string) => {
      console.log('Replacing content with AI response:', content)
      if (editor) {
        const { from, to } = editor.state.selection
        editor.chain().focus().deleteRange({ from, to }).insertContent(content).run()
      }
      onReplace?.(content)
      onAction?.()
    },
    [editor, onReplace, onAction]
  )

  // Handle retry
  const handleRetry = React.useCallback(() => {
    console.log('Retrying AI request')
    onRetry?.()
    onAction?.()
  }, [onRetry, onAction])

  // Handle prompt submission
  const handlePromptSubmit = React.useCallback(
    (prompt: string) => {
      console.log('Submitting AI prompt:', prompt)
      onPromptSubmit?.(prompt)
      onAction?.()
    },
    [onPromptSubmit, onAction]
  )

  // Utility functions for external use
  const utils = React.useMemo(
    () => ({
      /**
       * Add a new AI message
       */
      addMessage: (message: AiMessage) => {
        setAiMessages(prev => [...prev, message])
      },

      /**
       * Update a message by ID
       */
      updateMessage: (id: string, updates: Partial<AiMessage>) => {
        setAiMessages(prev => 
          prev.map(msg => msg.id === id ? { ...msg, ...updates } : msg)
        )
      },

      /**
       * Remove a message by ID
       */
      removeMessage: (id: string) => {
        setAiMessages(prev => prev.filter(msg => msg.id !== id))
      },

      /**
       * Clear all messages
       */
      clearMessages: () => {
        setAiMessages([])
      },

      /**
       * Get the last message
       */
      getLastMessage: (): AiMessage | null => {
        return aiMessages[aiMessages.length - 1] || null
      },

      /**
       * Get messages by type
       */
      getMessagesByType: (type: "user" | "assistant"): AiMessage[] => {
        return aiMessages.filter(msg => msg.type === type)
      },
    }),
    [aiMessages]
  )

  return {
    /**
     * Whether the panel should be visible
     */
    isVisible,

    /**
     * Current AI messages
     */
    aiMessages,

    /**
     * Available AI commands
     */
    aiCommands: commands,

    /**
     * Handle AI command execution
     */
    handleCommand,

    /**
     * Handle message insertion
     */
    handleInsert,

    /**
     * Handle message replacement
     */
    handleReplace,

    /**
     * Handle retry
     */
    handleRetry,

    /**
     * Handle prompt submission
     */
    handlePromptSubmit,

    /**
     * Utility functions for working with AI data
     */
    utils,
  }
} 