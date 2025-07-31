"use client"

import * as React from "react"

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import type { Editor } from "@tiptap/react"

/**
 * Page size width constraints for AI panel
 */
const PAGE_SIZE_WIDTHS = {
  a4: 595,
  letter: 612,
  legal: 612,
  custom: 0, // Full width - will be calculated dynamically
  default: 595 // Default to A4
} as const

/**
 * Configuration for the AI side panel functionality
 */
export interface UseAISidePanelConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null
  /**
   * Whether the panel is currently open.
   */
  isOpen: boolean
  /**
   * Callback to toggle the panel.
   */
  onToggle: () => void
  /**
   * Initial width of the panel in pixels.
   */
  initialWidth?: number
  /**
   * Minimum width of the panel in pixels.
   */
  minWidth?: number
  /**
   * Maximum width of the panel in pixels.
   */
  maxWidth?: number
  /**
   * Current page size to calculate width constraints.
   */
  pageSize?: string
}

/**
 * Custom hook that provides AI side panel functionality
 */
export function useAISidePanel(config: UseAISidePanelConfig) {
  const { 
    editor: providedEditor, 
    initialWidth = 320,
    minWidth = 280,
    maxWidth: providedMaxWidth,
    pageSize = "a4"
  } = config
  
  const { editor } = useTiptapEditor(providedEditor)
  const [messages, setMessages] = React.useState<Array<{type: 'user' | 'ai', content: string}>>([])
  const [inputValue, setInputValue] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  
  // Fixed width - no resize functionality
  const width = 395

  const handleSendMessage = React.useCallback(async () => {
    if (!inputValue.trim()) return

    const userMessage = { type: 'user' as const, content: inputValue }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = { type: 'ai' as const, content: 'This is a simulated AI response. Replace with actual AI integration.' }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }, [inputValue])

  const handleAIAction = React.useCallback((action: string) => {
    if (!editor) return
    
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to
    )

    const prompt = `Please ${action} the following text: "${selectedText}"`
    setInputValue(prompt)
  }, [editor])

  return {
    editor,
    messages,
    inputValue,
    setInputValue,
    isLoading,
    handleSendMessage,
    handleAIAction,
    width,
  }
} 