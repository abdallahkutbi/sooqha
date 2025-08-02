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
import { ChevronDown as ChevronDownIcon, Type as FontIcon } from "lucide-react"

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
  const [isHovered, setIsHovered] = React.useState(false)
  
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
        return fontOption ? fontOption.label : fontFamily
      }
    }
    
    // If no font family mark, try to detect the computed font family
    // This will show the actual font being used (e.g., "Times New Roman")
    try {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const element = range.startContainer.nodeType === Node.TEXT_NODE 
          ? range.startContainer.parentElement 
          : (range.startContainer as Element)
        
        if (element) {
          const computedStyle = window.getComputedStyle(element)
          const fontFamily = computedStyle.fontFamily
          
          // Extract the first font family (before the comma)
          const firstFont = fontFamily.split(',')[0].trim().replace(/['"]/g, '')
          
          // Find if this matches any of our predefined fonts
          const fontOption = FONT_FAMILIES.find(font => 
            font.value.includes(firstFont) || firstFont.includes(font.label)
          )
          
          if (fontOption) {
            return fontOption.label
          }
          
          // If no match found, return the actual font name
          return firstFont
        }
      }
    } catch (error) {
      console.warn('Error detecting font family:', error)
    }
    
    // Fallback to showing the first font family from our list
    return FONT_FAMILIES[0].label // "Arial" as default
  }, [editor])

  const setFontFamily = React.useCallback((fontFamily: string) => {
    if (!editor) return

    // If the same font is already applied, unset it
    const currentFont = editor.getAttributes('fontFamily').fontFamily
    if (currentFont === fontFamily) {
      editor
        .chain()
        .focus()
        .unsetMark('fontFamily')
        .run()
    } else {
      editor
        .chain()
        .focus()
        .setMark('fontFamily', { fontFamily })
        .run()
    }
    
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
          type="button"
          data-style="ghost"
          role="button"
          tabIndex={-1}
          aria-label="Font family"
          tooltip={`Font family: ${currentFontFamily}`}
          className={className}
        >
          <FontIcon className="tiptap-button-icon w-3 h-3" />
          <span className="tiptap-button-text">{currentFontFamily}</span>
          <ChevronDownIcon className="tiptap-button-dropdown-small" />
        </Button>
      </DropdownMenuTrigger>
      
            <DropdownMenuContent align="center" sideOffset={8} portal={portal} style={{
        width: "fit-content",
        background: "transparent",
        border: "none",
        boxShadow: "none",
        padding: "0"
      }}>
        <Card style={{ width: "fit-content" }}>
          <CardBody>
            <ButtonGroup>
              {FONT_FAMILIES.map((font) => (
                <DropdownMenuItem key={font.value} asChild>
                  <Button
                    type="button"
                    data-style="ghost"
                    onClick={() => setFontFamily(font.value)}
                    data-active={currentFontFamily === font.label}
                    style={{
                      fontFamily: font.value,
                      textAlign: "center",
                      justifyContent: "center",
                      minWidth: "120px"
                    }}
                  >
                    <span>{font.label}</span>
                  </Button>
                </DropdownMenuItem>
              ))}
            </ButtonGroup>
          </CardBody>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 