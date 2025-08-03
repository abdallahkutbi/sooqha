import React, { useState } from 'react'
import { Editor } from '@tiptap/react'
import { Button } from '@/components/tiptap-ui-primitive/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/tiptap-ui-primitive/dropdown-menu/index'
import { Card, CardBody } from '@/components/tiptap-ui-primitive/card'
import { ButtonGroup } from '@/components/tiptap-ui-primitive/button'
import { Text, ChevronDown as ChevronDownIcon } from 'lucide-react'

interface FontColorButtonProps {
  editor: Editor | null
  /**
   * External control for dropdown open state
   */
  isOpen?: boolean
  /**
   * External control for dropdown open/close
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Whether to disable the dropdown
   */
  disabled?: boolean
  /**
   * Custom colors array
   */
  colors?: Array<{ name: string; value: string; preview: string }>
}

const DEFAULT_COLORS = [
  { name: 'Black', value: '#000000', preview: '#000000' },
  { name: 'Red', value: '#ef4444', preview: '#ef4444' },
  { name: 'Orange', value: '#f97316', preview: '#f97316' },
  { name: 'Yellow', value: '#eab308', preview: '#eab308' },
  { name: 'Green', value: '#22c55e', preview: '#22c55e' },
  { name: 'Blue', value: '#3b82f6', preview: '#3b82f6' },
  { name: 'Purple', value: '#a855f7', preview: '#a855f7' },
  { name: 'Pink', value: '#ec4899', preview: '#ec4899' },
  { name: 'Gray', value: '#6b7280', preview: '#6b7280' },
]

export function FontColorButton({ 
  editor, 
  isOpen: externalIsOpen,
  onOpenChange: externalOnOpenChange,
  disabled = false,
  colors = DEFAULT_COLORS
}: FontColorButtonProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  
  // Use external control if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen
  const setIsOpen = externalOnOpenChange || setInternalIsOpen

  if (!editor) return null

  const isActive = editor.isActive('textStyle', { color: true })
  
  // Get the currently selected color for the underline
  const currentColor = isActive ? editor.getAttributes('textStyle').color : '#000000'

  const setColor = (color: string) => {
    editor.chain().focus().setMark('textStyle', { color }).run()
    setIsOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (disabled) return
    setIsOpen(open)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          data-style="ghost"
          data-active-state={isActive ? "on" : "off"}
          role="button"
          tabIndex={-1}
          aria-label="Font color"
          tooltip="Font color"
          disabled={disabled}
          className="relative"
        >
          <Text className="tiptap-button-icon" />
          <div 
            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-sm"
            style={{ backgroundColor: currentColor }}
          />
          <ChevronDownIcon className="tiptap-button-dropdown-small" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent style={{ 
        background: "transparent",
        border: "none",
        boxShadow: "none",
        padding: "0"
      }}>
        <Card>
          <CardBody>
            <ButtonGroup style={{ flexDirection: "row", flexWrap: "wrap", gap: "4px" }}>
              {colors.map((color) => (
                <DropdownMenuItem key={color.value} asChild>
                  <Button
                    type="button"
                    data-style="ghost"
                    onClick={() => setColor(color.value)}
                    data-active={isActive && editor.getAttributes('textStyle').color === color.value}
                    style={{
                      width: '32px',
                      height: '32px',
                      padding: '0',
                      borderRadius: '4px',
                      border: '2px solid transparent'
                    }}
                  >
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '2px',
                        backgroundColor: color.preview,
                        border: '1px solid var(--tt-border-color)'
                      }}
                    />
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