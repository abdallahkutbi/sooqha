"use client"

import * as React from "react"

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import type { Editor } from "@tiptap/react"

// --- Icons ---
import { AIIcon } from "@/components/tiptap-icons/ai-icon"

export const AI_TOGGLE_SHORTCUT_KEY = "mod+shift+a"

/**
 * Configuration for the AI toggle functionality
 */
export interface UseAIToggleConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null
  /**
   * Whether the AI panel is currently open.
   */
  isOpen: boolean
  /**
   * Callback to toggle the AI panel.
   */
  onToggle: () => void
  /**
   * Whether the button should hide when AI is not available.
   * @default false
   */
  hideWhenUnavailable?: boolean
  /**
   * Callback function called after a successful toggle.
   */
  onToggled?: () => void
}

/**
 * Custom hook that provides AI toggle functionality
 */
export function useAIToggle(config: UseAIToggleConfig) {
  const {
    editor: providedEditor,
    isOpen,
    onToggle,
    onToggled,
  } = config

  const { editor } = useTiptapEditor(providedEditor)
  const [isVisible, setIsVisible] = React.useState<boolean>(true)

  React.useEffect(() => {
    if (!editor) return

    const handleSelectionUpdate = () => {
      // Always show AI toggle button when editor is available
      setIsVisible(true)
    }

    handleSelectionUpdate()

    editor.on("selectionUpdate", handleSelectionUpdate)

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate)
    }
  }, [editor])

  const handleToggle = React.useCallback(() => {
    console.log('AI Toggle clicked, current isOpen:', isOpen);
    onToggle()
    onToggled?.()
  }, [onToggle, onToggled, isOpen])

  return {
    isVisible,
    isActive: isOpen,
    handleToggle,
    canToggle: true,
    label: isOpen ? "Close AI Assistant" : "Open AI Assistant",
    Icon: AIIcon,
    shortcutKeys: AI_TOGGLE_SHORTCUT_KEY,
  }
} 