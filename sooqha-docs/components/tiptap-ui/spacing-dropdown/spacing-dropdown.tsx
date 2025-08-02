"use client"

import * as React from "react"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { Button, ButtonGroup } from "@/components/tiptap-ui-primitive/button"
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/tiptap-ui-primitive/dropdown-menu/index"
import { Card, CardBody } from "@/components/tiptap-ui-primitive/card"
import {
  ChevronDown as ChevronDownIcon,
  AlignJustify as SpacingIcon,
} from "lucide-react"

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
          type="button"
          data-style="ghost"
          role="button"
          tabIndex={-1}
          aria-label="Line spacing"
          tooltip="Line spacing"
          className={className}
        >
          <SpacingIcon className="tiptap-button-icon" />
          <span className="tiptap-button-text">{currentSpacing}</span>
          <ChevronDownIcon className="tiptap-button-dropdown-small" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent portal={portal} style={{ 
        width: "fit-content",
        background: "transparent",
        border: "none",
        boxShadow: "none",
        padding: "0"
      }}>
        <Card style={{ width: "fit-content" }}>
          <CardBody>
            <ButtonGroup>
              {SPACING_OPTIONS.map((spacing) => (
                <DropdownMenuItem key={spacing.value} asChild>
                  <Button
                    type="button"
                    data-style="ghost"
                    onClick={() => setSpacing(spacing.value)}
                    data-active={currentSpacing === spacing.value}
                    style={{
                      textAlign: "center",
                      justifyContent: "center",
                      minWidth: "100px"
                    }}
                  >
                    <span>{spacing.label}</span>
                  </Button>
                </DropdownMenuItem>
              ))}
              
              <DropdownMenuItem onClick={unsetSpacing} asChild>
                <Button
                  type="button"
                  data-style="ghost"
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    minWidth: "100px"
                  }}
                >
                  <span>Default</span>
                </Button>
              </DropdownMenuItem>
            </ButtonGroup>
          </CardBody>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 