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
import { TableIcon } from "@/components/tiptap-icons/table-icon"
import { ChevronDownIcon } from "@/components/tiptap-icons/chevron-down-icon"

interface TableDropdownMenuProps {
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

/**
 * TableDropdownMenu Component
 * 
 * A dropdown menu that provides various table insertion options:
 * - 2x2 table
 * - 3x3 table
 * - 4x4 table
 * - Custom table with header row
 */
export function TableDropdownMenu({ portal = false, className }: TableDropdownMenuProps) {
  const { editor } = useTiptapEditor()
  const [isOpen, setIsOpen] = React.useState(false)

  const insertTable = React.useCallback((rows: number, cols: number, withHeaderRow: boolean = true) => {
    if (!editor) return

    editor
      .chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow })
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
          title="Insert table"
        >
          <TableIcon className="tiptap-button-icon" />
          <ChevronDownIcon className="tiptap-button-icon" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent portal={portal}>
        <DropdownMenuItem onClick={() => insertTable(2, 2)}>
          <TableIcon className="tiptap-button-icon" />
          <span>2×2 Table</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => insertTable(3, 3)}>
          <TableIcon className="tiptap-button-icon" />
          <span>3×3 Table</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => insertTable(4, 4)}>
          <TableIcon className="tiptap-button-icon" />
          <span>4×4 Table</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => insertTable(3, 3, false)}>
          <TableIcon className="tiptap-button-icon" />
          <span>3×3 Table (no header)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 