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
import { Table as TableIcon, ChevronDown as ChevronDownIcon } from "lucide-react"

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
          type="button"
          data-style="ghost"
          role="button"
          tabIndex={-1}
          aria-label="Insert table"
          tooltip="Insert table"
          className={className}
        >
          <TableIcon className="tiptap-button-icon" />
          <ChevronDownIcon className="tiptap-button-dropdown-small" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent portal={portal} style={{ 
        background: "transparent",
        border: "none",
        boxShadow: "none",
        padding: "0"
      }}>
        <Card>
          <CardBody>
            <ButtonGroup>
              <DropdownMenuItem onClick={() => insertTable(2, 2)} asChild>
                <Button
                  type="button"
                  data-style="ghost"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    minWidth: "140px"
                  }}
                >
                  <TableIcon className="tiptap-button-icon" />
                  <span>2×2 Table</span>
                </Button>
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => insertTable(3, 3)} asChild>
                <Button
                  type="button"
                  data-style="ghost"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    minWidth: "140px"
                  }}
                >
                  <TableIcon className="tiptap-button-icon" />
                  <span>3×3 Table</span>
                </Button>
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => insertTable(4, 4)} asChild>
                <Button
                  type="button"
                  data-style="ghost"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    minWidth: "140px"
                  }}
                >
                  <TableIcon className="tiptap-button-icon" />
                  <span>4×4 Table</span>
                </Button>
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => insertTable(3, 3, false)} asChild>
                <Button
                  type="button"
                  data-style="ghost"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    minWidth: "140px"
                  }}
                >
                  <TableIcon className="tiptap-button-icon" />
                  <span>3×3 Table (no header)</span>
                </Button>
              </DropdownMenuItem>
            </ButtonGroup>
          </CardBody>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 