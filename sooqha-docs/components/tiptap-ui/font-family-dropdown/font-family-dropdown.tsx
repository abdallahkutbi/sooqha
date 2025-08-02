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
import { FontIcon } from "@/components/tiptap-icons/font-icon"

interface FontFamilyDropdownProps {
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

const FONT_FAMILIES = [
  { label: "Default", value: "inherit" },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Times New Roman", value: "Times New Roman, serif" },
  { label: "Courier New", value: "Courier New, monospace" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Verdana", value: "Verdana, sans-serif" },
  { label: "Helvetica", value: "Helvetica, sans-serif" },
  { label: "Comic Sans", value: "Comic Sans MS, cursive" },
  { label: "Impact", value: "Impact, sans-serif" },
  { label: "Tahoma", value: "Tahoma, sans-serif" },
]

/**
 * FontFamilyDropdown Component
 * 
 * A dropdown menu that provides font family options for text formatting.
 * Allows users to change the font style of selected text or apply to new text.
 */
export function FontFamilyDropdown({ portal = false, className }: FontFamilyDropdownProps) {
  const { editor } = useTiptapEditor()
  const [isOpen, setIsOpen] = React.useState(false)
  
  // Get current font family from editor
  const currentFontFamily = React.useMemo(() => {
    if (!editor) return "Default"
    
    const { state } = editor
    const { selection } = state
    const { from, to } = selection
    
    // Check if there's a font family mark in the current selection
    const fontFamilyMark = state.doc.rangeHasMark(from, to, state.schema.marks.fontFamily)
    if (fontFamilyMark) {
      // Extract font family from the mark
      const fontFamily = editor.getAttributes('fontFamily').fontFamily
      if (fontFamily) {
        // Find the label for this font family
        const fontOption = FONT_FAMILIES.find(font => font.value === fontFamily)
        return fontOption ? fontOption.label : "Default"
      }
    }
    
    return "Default" // Default font
  }, [editor])

  const setFontFamily = React.useCallback((fontFamily: string) => {
    if (!editor) return

    editor
      .chain()
      .focus()
      .setMark('fontFamily', { fontFamily })
      .run()
    
    setIsOpen(false)
  }, [editor])

  const unsetFontFamily = React.useCallback(() => {
    if (!editor) return

    editor
      .chain()
      .focus()
      .unsetMark('fontFamily')
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
          title="Font style"
        >
          <FontIcon className="tiptap-button-icon" />
          <ChevronDownIcon className="tiptap-button-icon" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent portal={portal} className="font-family-dropdown-content">
        {FONT_FAMILIES.map((font) => (
          <DropdownMenuItem 
            key={font.value}
            onClick={() => setFontFamily(font.value)}
          >
            <span className="font-family-option" style={{ fontFamily: font.value }}>
              {font.label}
            </span>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuItem onClick={unsetFontFamily}>
          <span className="font-family-option">Reset</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 