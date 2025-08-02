"use client"

import * as React from "react"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { Button } from "@/components/tiptap-ui-primitive/button"
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/tiptap-ui-primitive/dropdown-menu"
import { ChevronDownIcon } from "@/components/tiptap-icons/chevron-down-icon"
import { SpacingIcon } from "@/components/tiptap-icons/spacing-icon"

interface SpacingDropdownProps {
  /**
   * Whether to render the dropdown in a portal (for mobile)
   * @default false
   */
  portal?: boolean
  /**
   * Additional CSS classes to apply to the button
   */
  className?: string
}

const SPACING_OPTIONS = [
  { label: "Single", value: "1" },
  { label: "1.15", value: "1.15" },
  { label: "1.5", value: "1.5" },
  { label: "Double", value: "2" },
  { label: "2.5", value: "2.5" },
  { label: "3", value: "3" },
]

/**
 * SpacingDropdown Component
 * 
 * A dropdown menu that provides line spacing options for text formatting.
 * Allows users to change the line spacing of selected text or apply to new text.
 */
export function SpacingDropdown({ portal = false, className }: SpacingDropdownProps) {
  const { editor } = useTiptapEditor()
  const [isOpen, setIsOpen] = React.useState(false)
  
  // Get current line spacing from editor
  const currentSpacing = React.useMemo(() => {
    if (!editor) return "1"
    
    const { state } = editor
    const { selection } = state
    const { from, to } = selection
    
    // Check if there's a line spacing mark in the current selection
    const lineSpacingMark = state.doc.rangeHasMark(from, to, state.schema.marks.lineSpacing)
    if (lineSpacingMark) {
      // Extract line spacing from the mark
      const lineSpacing = editor.getAttributes('lineSpacing').lineSpacing
      if (lineSpacing) {
        return lineSpacing
      }
    }
    
    return "1" // Default spacing
  }, [editor])

  const setSpacing = React.useCallback((spacing: string) => {
    if (!editor) return

    editor
      .chain()
      .focus()
      .setMark('lineSpacing', { lineSpacing: spacing })
      .run()
    
    setIsOpen(false)
  }, [editor])

  const unsetSpacing = React.useCallback(() => {
    if (!editor) return

    editor
      .chain()
      .focus()
      .unsetMark('lineSpacing')
      .run()
    
    setIsOpen(false)
  }, [editor])

  if (!editor) return null

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          data-style="ghost"
          className={className}
          title="Line spacing"
        >
          <SpacingIcon className="tiptap-button-icon" />
          <ChevronDownIcon className="tiptap-button-icon" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent portal={portal} className="spacing-dropdown-content">
        {SPACING_OPTIONS.map((spacing) => (
          <DropdownMenuItem 
            key={spacing.value}
            onClick={() => setSpacing(spacing.value)}
          >
            <span className="spacing-option">
              {spacing.label}
            </span>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuItem onClick={unsetSpacing}>
          <span className="spacing-option">Default</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 