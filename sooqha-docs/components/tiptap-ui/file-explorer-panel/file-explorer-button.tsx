import * as React from "react"

// --- Hooks ---
import { useFileExplorerPanel } from "./use-file-explorer-panel"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- UI ---
import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"
import type { Editor } from "@tiptap/react"

// --- Icons ---
import { Folder } from "lucide-react"

export interface FileExplorerButtonProps extends Omit<ButtonProps, "type"> {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null
  /**
   * Whether the file explorer panel is currently open.
   */
  isOpen?: boolean
  /**
   * Callback to toggle the file explorer panel.
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
 * Button component for toggling file explorer panel in a Tiptap editor.
 *
 * For custom button implementations, use the `useFileExplorerPanel` hook instead.
 */
export const FileExplorerButton = React.forwardRef<
  HTMLButtonElement,
  FileExplorerButtonProps
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
        console.log('FileExplorerButton clicked!', { isOpen });
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
        aria-label="Toggle file explorer"
        tooltip="File Explorer"
        {...buttonProps}
      >
        <Folder className="w-4 h-4" />
        {text && <span>{text}</span>}
        {children}
      </Button>
    )
  }
)

FileExplorerButton.displayName = "FileExplorerButton"