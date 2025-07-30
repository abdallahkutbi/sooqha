"use client"

import * as React from "react"

// --- Icons ---
import { ChevronDownIcon } from "@/components/tiptap-icons/chevron-down-icon"

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

const PAGE_SIZES = [
  { name: "A4", size: "a4", label: "A4" },
  { name: "Letter", size: "letter", label: "Letter" },
  { name: "Legal", size: "legal", label: "Legal" },
  { name: "Custom", size: "custom", label: "Custom" },
];

export interface PageSizeButtonProps extends Omit<ButtonProps, "type"> {
  /**
   * Current page size
   */
  currentSize: string;
  /**
   * Callback when page size changes
   */
  onSizeChange: (size: string) => void;
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
 * Dropdown menu component for selecting page sizes in a Tiptap editor.
 */
export const PageSizeButton = React.forwardRef<
  HTMLButtonElement,
  PageSizeButtonProps
>(
  (
    {
      currentSize,
      onSizeChange,
      portal = false,
      onOpenChange,
      ...buttonProps
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const currentPageSize = PAGE_SIZES.find(size => size.size === currentSize) || PAGE_SIZES[0];

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
            aria-label="Page size options"
            tooltip="Page Size"
            {...buttonProps}
            ref={ref}
          >
            {currentPageSize.name}
            <ChevronDownIcon className="tiptap-button-dropdown-small" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" portal={portal}>
          <Card>
            <CardBody>
              <ButtonGroup>
                {PAGE_SIZES.map((size) => (
                  <DropdownMenuItem 
                    key={size.size}
                    onClick={() => onSizeChange(size.size)}
                  >
                    {size.name}
                  </DropdownMenuItem>
                ))}
              </ButtonGroup>
            </CardBody>
          </Card>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
)

PageSizeButton.displayName = "PageSizeButton"
