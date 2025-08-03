"use client"

import * as React from "react"

// --- Icons ---
import {
  Upload as UploadIcon,
  FileText as FileTextIcon,
  FileDown as FileDownIcon,
} from "lucide-react"

// --- UI Primitives ---
import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button, ButtonGroup } from "@/components/tiptap-ui-primitive/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/tiptap-ui-primitive/dropdown-menu/index"
import { Card, CardBody } from "@/components/tiptap-ui-primitive/card"

export interface ImportButtonProps extends Omit<ButtonProps, "type"> {
  /**
   * Whether to render the dropdown menu in a portal
   * @default false
   */
  portal?: boolean
  /**
   * Callback for when the dropdown opens or closes
   */
  onOpenChange?: (isOpen: boolean) => void
  /**
   * The Tiptap editor instance
   */
  editor?: any
}

/**
 * Dropdown menu component for importing documents using Tiptap Pro Import extension.
 */
export const ImportButton = React.forwardRef<
  HTMLButtonElement,
  ImportButtonProps
>(
  (
    {
      portal = false,
      onOpenChange,
      editor,
      ...buttonProps
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)

    const handleImport = (format: string) => {
      if (!editor) return
      
      try {
        switch (format) {
          case 'docx':
            editor.commands.importDocx?.()
            break
          case 'html':
            editor.commands.importHtml?.()
            break
          case 'markdown':
            editor.commands.importMarkdown?.()
            break
          default:
            console.warn(`Import format ${format} not supported`)
        }
      } catch (error) {
        console.error(`Import failed for ${format}:`, error)
      }
    };

    const handleOpenChange = React.useCallback(
      (open: boolean) => {
        setIsOpen(open)
        onOpenChange?.(open)
      },
      [onOpenChange]
    )

    return (
      <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            data-style="ghost"
            role="button"
            tabIndex={-1}
            aria-label="Import document"
            tooltip="Import"
            {...buttonProps}
            ref={ref}
          >
            <UploadIcon className="tiptap-button-icon" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" portal={portal} style={{ 
          background: "transparent",
          border: "none",
          boxShadow: "none",
          padding: "0"
        }}>
          <Card>
            <CardBody>
              <ButtonGroup>
                <DropdownMenuItem onClick={() => handleImport('docx')}>
                  <FileDownIcon className="tiptap-button-icon" />
                  Import from Word
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleImport('html')}>
                  <FileTextIcon className="tiptap-button-icon" />
                  Import from HTML
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleImport('markdown')}>
                  <FileTextIcon className="tiptap-button-icon" />
                  Import from Markdown
                </DropdownMenuItem>
              </ButtonGroup>
            </CardBody>
          </Card>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
)

ImportButton.displayName = "ImportButton" 