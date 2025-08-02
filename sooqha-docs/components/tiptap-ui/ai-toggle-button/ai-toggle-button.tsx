import * as React from "react"

// --- Hooks ---
import { AI_TOGGLE_SHORTCUT_KEY, useAIToggle } from "./use-ai-toggle"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- Utils ---
import { parseShortcutKeys } from "@/lib/tiptap-utils"

// --- UI ---
import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"
import { Badge } from "@/components/tiptap-ui-primitive/badge"
import type { Editor } from "@tiptap/react"

export interface AIToggleButtonProps
  extends Omit<ButtonProps, "type"> {
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
  /**
   * Optional text to display alongside the icon.
   */
  text?: string
  /**
   * Optional show shortcut keys in the button.
   * @default false
   */
  showShortcut?: boolean
}

export function AIToggleShortcutBadge({
  shortcutKeys = AI_TOGGLE_SHORTCUT_KEY,
}: {
  shortcutKeys?: string
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>
}

/**
 * Button component for toggling AI assistant panel in a Tiptap editor.
 *
 * For custom button implementations, use the `useAIToggle` hook instead.
 */
export const AIToggleButton = React.forwardRef<
  HTMLButtonElement,
  AIToggleButtonProps
>(
  (
    {
      editor: providedEditor,
      isOpen,
      onToggle,
      text,
      hideWhenUnavailable = false,
      onToggled,
      showShortcut = false,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const {
      isVisible,
      isActive,
      handleToggle,
      label,
      Icon,
      shortcutKeys,
    } = useAIToggle({
      editor,
      isOpen,
      onToggle,
      hideWhenUnavailable,
      onToggled,
    })

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleToggle()
      },
      [handleToggle, onClick]
    )

    if (!isVisible) {
      return null
    }

    return (
      <Button
        type="button"
        data-style="ghost"
        data-active-state={isActive ? "on" : "off"}
        role="button"
        aria-label={label}
        aria-pressed={isActive}
        onClick={handleClick}
        ref={ref}
        {...buttonProps}
      >
        <Icon />
        {text && <span>{text}</span>}
        {showShortcut && <AIToggleShortcutBadge shortcutKeys={shortcutKeys} />}
        {children}
      </Button>
    )
  }
)

AIToggleButton.displayName = "AIToggleButton"
