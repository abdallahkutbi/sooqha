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
import { ChevronDown as ChevronDownIcon, Type as TypeIcon } from "lucide-react"

// ===== STYLING =====
import "@/components/tiptap-ui/font-size-dropdown/font-size-dropdown.scss"

interface FontSizeDropdownProps {
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

const FONT_SIZES = [
  { label: "12", value: "12px" },
  { label: "14", value: "14px" },
  { label: "16", value: "16px" },
  { label: "18", value: "18px" },
  { label: "20", value: "20px" },
  { label: "24", value: "24px" },
  { label: "28", value: "28px" },
  { label: "32", value: "32px" },
  { label: "36", value: "36px" },
  { label: "48", value: "48px" },
]

/**
 * FontSizeDropdown Component
 * 
 * A dropdown menu that provides font size options for text formatting.
 * Allows users to change the font size of selected text or apply to new text.
 */
export function FontSizeDropdown({ portal = false, className }: FontSizeDropdownProps) {
  const { editor } = useTiptapEditor()
  const [isOpen, setIsOpen] = React.useState(false)
  const [customSize, setCustomSize] = React.useState("")
  
  // Get current font size from editor
  const currentFontSize = React.useMemo(() => {
    if (!editor) return "14"
    
    const { state } = editor
    const { selection } = state
    const { from, to } = selection
    
    // Check if there's a font size mark in the current selection
    const marks = state.doc.rangeHasMark(from, to, state.schema.marks.textStyle)
    if (marks) {
      const mark = state.doc.rangeHasMark(from, to, state.schema.marks.fontSize)
      if (mark) {
        const fontSizeMark = state.doc.rangeHasMark(from, to, state.schema.marks.fontSize)
        if (fontSizeMark) {
          // Extract font size from the mark
          const fontSize = editor.getAttributes('fontSize').fontSize
          if (fontSize) {
            return fontSize.replace('px', '')
          }
        }
      }
    }
    
    return "14" // Default size
  }, [editor])

  const setFontSize = React.useCallback((size: string) => {
    if (!editor) return

    editor
      .chain()
      .focus()
      .setFontSize(size)
      .run()
    
    setIsOpen(false)
  }, [editor])

  const unsetFontSize = React.useCallback(() => {
    if (!editor) return

    editor
      .chain()
      .focus()
      .unsetFontSize()
      .run()
    
    setIsOpen(false)
  }, [editor])

  const handleCustomSizeSubmit = React.useCallback(() => {
    if (!editor || !customSize) return
    
    const size = parseInt(customSize)
    if (size >= 8 && size <= 72) {
      setFontSize(`${size}px`)
      setCustomSize("")
    }
  }, [editor, customSize, setFontSize])

  if (!editor) return null

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          data-style="ghost"
          className={className}
          title="Font size"
        >
          <span className="tiptap-button-icon font-size-display">
            {currentFontSize}
          </span>
          <ChevronDownIcon className="tiptap-button-icon" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent portal={portal} className="font-size-dropdown-content">
        {/* Custom size input */}
        <div className="font-size-custom-input">
          <input
            type="number"
            value={customSize}
            onChange={(e) => setCustomSize(e.target.value)}
            placeholder="Custom size"
            min="8"
            max="72"
            className="font-size-input"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCustomSizeSubmit()
              }
            }}
          />
          <button 
            onClick={handleCustomSizeSubmit}
            className="font-size-submit-btn"
            disabled={!customSize}
          >
            Set
          </button>
        </div>
        
        {/* Preset sizes - show only 3 with scroll */}
        <div className="font-size-presets">
          {FONT_SIZES.slice(0, 3).map((size) => (
            <DropdownMenuItem 
              key={size.value}
              onClick={() => setFontSize(size.value)}
            >
              <span className="font-size-option">
                {size.label}
              </span>
            </DropdownMenuItem>
          ))}
        </div>
        
        {/* Scrollable section for more sizes */}
        <div className="font-size-scrollable">
          {FONT_SIZES.slice(3).map((size) => (
            <DropdownMenuItem 
              key={size.value}
              onClick={() => setFontSize(size.value)}
            >
              <span className="font-size-option">
                {size.label}
              </span>
            </DropdownMenuItem>
          ))}
        </div>
        
        <DropdownMenuItem onClick={unsetFontSize}>
          <span className="font-size-option">Default</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 