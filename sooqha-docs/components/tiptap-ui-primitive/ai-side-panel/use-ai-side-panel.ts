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
  
  // Calculate dynamic max width based on page size
  const maxWidth = React.useMemo(() => {
    if (providedMaxWidth) return providedMaxWidth
    
    const pageWidth = PAGE_SIZE_WIDTHS[pageSize as keyof typeof PAGE_SIZE_WIDTHS] || PAGE_SIZE_WIDTHS.default
    
    if (pageSize === "custom") {
      // For custom page size, use viewport width minus some margin
      return Math.min(600, window.innerWidth - 100)
    }
    
    // For fixed page sizes, ensure panel doesn't exceed page width
    // Reserve some space for the panel to not completely overlap the content
    const availableWidth = pageWidth - 200 // Leave 200px margin
    return Math.min(600, Math.max(280, availableWidth))
  }, [pageSize, providedMaxWidth])
  
  // Resize state
  const [width, setWidth] = React.useState(Math.min(initialWidth, maxWidth))
  const [isResizing, setIsResizing] = React.useState(false)
  const [startX, setStartX] = React.useState(0)
  const [startWidth, setStartWidth] = React.useState(0)

  // Update width when maxWidth changes (e.g., when page size changes)
  React.useEffect(() => {
    setWidth(prevWidth => Math.min(prevWidth, maxWidth))
  }, [maxWidth])

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

  // Resize handlers
  const handleResizeStart = React.useCallback((e: React.MouseEvent | MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
    setStartX(e.clientX)
    setStartWidth(width)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [width])

  const handleResizeMove = React.useCallback((e: MouseEvent) => {
    if (!isResizing) return
    
    const deltaX = startX - e.clientX
    const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + deltaX))
    setWidth(newWidth)
  }, [isResizing, startX, startWidth, minWidth, maxWidth])

  const handleResizeEnd = React.useCallback(() => {
    setIsResizing(false)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }, [])

  const handleDoubleClick = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setWidth(Math.min(initialWidth, maxWidth))
  }, [initialWidth, maxWidth])

  // Add event listeners for resize
  React.useEffect(() => {
    if (isResizing) {
      const handleMouseMove = (e: MouseEvent) => handleResizeMove(e)
      const handleMouseUp = () => handleResizeEnd()
      
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isResizing, handleResizeMove, handleResizeEnd])

  return {
    editor,
    messages,
    inputValue,
    setInputValue,
    isLoading,
    handleSendMessage,
    handleAIAction,
    width,
    isResizing,
    handleResizeStart,
    handleDoubleClick,
    maxWidth, // Expose maxWidth for debugging
    minWidth, // Expose minWidth for debugging
  }
} 