"use client"

import * as React from "react"

// --- Icons ---
import {
  ChevronDown as ChevronDownIcon,
  ArrowDownToLine as ExportIcon,
} from "lucide-react"

// --- UI Primitives ---
import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button, ButtonGroup } from "@/components/tiptap-ui-primitive/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/tiptap-ui-primitive/dropdown-menu"
import { Card, CardBody } from "@/components/tiptap-ui-primitive/card"

export interface ExportButtonProps extends Omit<ButtonProps, "type"> {
  /**
   * Whether to render the dropdown menu in a portal
   * @default false
   */
  portal?: boolean
  /**
   * Callback for when the dropdown opens or closes
   */
  onOpenChange?: (isOpen: boolean) => void
}

/**
 * Dropdown menu component for exporting documents in a Tiptap editor.
 */
export const ExportButton = React.forwardRef<
  HTMLButtonElement,
  ExportButtonProps
>(
  (
    {
      portal = false,
      onOpenChange,
      ...buttonProps
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)

    const handleExport = (format: string) => {
      // Your export logic here
      console.log(`Exporting as ${format}`);
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
            aria-label="Export document"
            tooltip="Export"
            {...buttonProps}
            ref={ref}
          >
            <ExportIcon className="tiptap-button-icon" />
            <ChevronDownIcon className="tiptap-button-dropdown-small" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" portal={portal}>
          <Card>
            <CardBody>
              <ButtonGroup>
                <DropdownMenuItem onClick={() => handleExport('pdf')}>
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('docx')}>
                  Export as Word
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('html')}>
                  Export as HTML
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('markdown')}>
                  Export as Markdown
                </DropdownMenuItem>
              </ButtonGroup>
            </CardBody>
          </Card>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
)

ExportButton.displayName = "ExportButton"
