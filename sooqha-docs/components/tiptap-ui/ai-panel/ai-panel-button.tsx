import * as React from "react"

// --- Hooks ---
import { useAiPanel } from "./use-ai-panel"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- UI ---
import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"
import type { Editor } from "@tiptap/react"

// --- Icons ---
import { Bot } from "lucide-react"

export interface AiPanelButtonProps extends Omit<ButtonProps, "type"> {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null
  /**
   * Whether the AI panel is currently open.
   */
  isOpen?: boolean
  /**
   * Callback to toggle the AI panel.
   */
  onToggle?: () => void
  /**
   * Whether the button should hide when not available.
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
}

/**
 * Button component for toggling AI panel in a Tiptap editor.
 *
 * For custom button implementations, use the `useAiPanel` hook instead.
 */
export const AiPanelButton = React.forwardRef<
  HTMLButtonElement,
  AiPanelButtonProps
>(
  (
    {
      editor: providedEditor,
      isOpen = false,
      onToggle,
      text,
      hideWhenUnavailable = false,
      onToggled,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('AiPanelButton clicked!', { isOpen });
        onClick?.(event)
        onToggle?.()
        onToggled?.()
      },
      [onClick, onToggle, onToggled, isOpen]
    )

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        data-active={isOpen}
        aria-pressed={isOpen}
        aria-label="Toggle AI panel"
        tooltip="AI Assistant"
        {...buttonProps}
      >
        <Bot className="w-4 h-4" />
        {text && <span>{text}</span>}
        {children}
      </Button>
    )
  }
)

AiPanelButton.displayName = "AiPanelButton" 