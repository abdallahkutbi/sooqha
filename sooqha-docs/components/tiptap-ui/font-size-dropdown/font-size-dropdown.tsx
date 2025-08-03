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
  const [isEditing, setIsEditing] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)
  
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
    
    // If no font size mark, try to detect the computed font size
    try {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const element = range.startContainer.nodeType === Node.TEXT_NODE 
          ? range.startContainer.parentElement 
          : (range.startContainer as Element)
        
        if (element) {
          const computedStyle = window.getComputedStyle(element)
          const fontSize = computedStyle.fontSize
          
          // Extract the numeric value
          const size = parseInt(fontSize)
          if (!isNaN(size)) {
            return size.toString()
          }
        }
      }
    } catch (error) {
      console.warn('Error detecting font size:', error)
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

  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
  }, [])

  const handleInputKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = parseInt(inputValue)
      if (!isNaN(value) && value > 0 && value <= 288) {
        setFontSize(`${value}px`)
        setIsEditing(false)
      }
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setInputValue("")
    }
  }, [inputValue, setFontSize])

  const handleInputBlur = React.useCallback(() => {
    const value = parseInt(inputValue)
    if (!isNaN(value) && value > 0 && value <= 288) {
      setFontSize(`${value}px`)
    }
    setIsEditing(false)
    setInputValue("")
  }, [inputValue, setFontSize])

  const findNearestFontSize = React.useCallback((targetSize: number) => {
    const sizes = FONT_SIZES.map(s => parseInt(s.value))
    return sizes.reduce((prev, curr) => 
      Math.abs(curr - targetSize) < Math.abs(prev - targetSize) ? curr : prev
    )
  }, [])

  // Focus input when editing starts
  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const unsetFontSize = React.useCallback(() => {
    if (!editor) return

    editor
      .chain()
      .focus()
      .unsetFontSize()
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
          aria-label="Font size"
          tooltip={`Font size: ${currentFontSize}px`}
          className={className}
          onDoubleClick={() => setIsEditing(true)}
        >
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              onBlur={handleInputBlur}
              style={{
                width: '30px',
                border: 'none',
                background: 'transparent',
                textAlign: 'center',
                fontSize: 'inherit',
                color: 'inherit',
                marginRight: '4px'
              }}
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span 
              className="tiptap-button-text dark:bg-gray-dark-100 dark:border-gray-dark-300 dark:text-gray-dark-900"
              style={{
                display: 'inline-block',
                minWidth: '24px',
                textAlign: 'center',
                padding: '2px 4px',
                borderRadius: '3px',
                backgroundColor: 'var(--tt-gray-light-100)',
                border: '1px solid var(--tt-gray-light-300)',
                fontSize: '0.75rem',
                lineHeight: '1',
                color: 'var(--tt-gray-light-900)'
              }}
            >
              {currentFontSize}
            </span>
          )}
          <ChevronDownIcon className="tiptap-button-dropdown-small" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="start" sideOffset={8} portal={portal} style={{ 
        width: "fit-content",
        background: "transparent",
        border: "none",
        boxShadow: "none",
        padding: "0"
      }}>
        <Card style={{ width: "fit-content" }}>
          <CardBody style={{ padding: "0.25rem" }}>
            <ButtonGroup style={{ justifyContent: "center" }}>
              {FONT_SIZES.map((size) => (
                <DropdownMenuItem key={size.value} asChild>
                  <Button
                    type="button"
                    data-style="ghost"
                    onClick={() => setFontSize(size.value)}
                    data-active={currentFontSize === size.label}
                    style={{
                      textAlign: "center",
                      justifyContent: "center",
                      minWidth: "40px",
                      width: "40px"
                    }}
                  >
                    <span>{size.label}</span>
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