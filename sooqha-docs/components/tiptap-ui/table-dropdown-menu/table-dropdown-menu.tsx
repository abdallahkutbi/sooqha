"use client"

import * as React from "react"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/tiptap-ui-primitive/dropdown-menu/index"
import { Button } from "@/components/tiptap-ui-primitive/button"
import { Card, CardBody } from "@/components/tiptap-ui-primitive/card"
import { Table as TableIcon, ChevronDown as ChevronDownIcon } from "lucide-react"

interface TableDropdownMenuProps {
  portal?: boolean
  className?: string
}

const MAX_ROWS = 6
const MAX_COLS = 6

export function TableDropdownMenu({ portal = false, className }: TableDropdownMenuProps) {
  const { editor } = useTiptapEditor()
  const [isOpen, setIsOpen] = React.useState(false)
  const [hovered, setHovered] = React.useState({ rows: 0, cols: 0 })

  const insertTable = React.useCallback((rows: number, cols: number, withHeaderRow = true) => {
    if (!editor) return
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow }).run()
    setIsOpen(false)
  }, [editor])

  if (!editor) return null

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          data-style="ghost"
          aria-label="Insert table"
          tooltip="Insert table"
          className={className}
        >
          <TableIcon className="tiptap-button-icon" />
          <ChevronDownIcon className="tiptap-button-dropdown-small" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        portal={portal}
        style={{
          background: "transparent",
          border: "none",
          boxShadow: "none",
          padding: "0"
        }}
      >
        <Card>
          <CardBody>
            <div
              className="grid gap-0.5 p-2"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${MAX_COLS}, 1fr)`
              }}
              onMouseLeave={() => setHovered({ rows: 0, cols: 0 })}
            >
              {Array.from({ length: MAX_ROWS * MAX_COLS }).map((_, i) => {
                const row = Math.floor(i / MAX_COLS)
                const col = i % MAX_COLS
                const isActive = row <= hovered.rows && col <= hovered.cols
                return (
                  <div
                    key={`${row}-${col}`}
                    onMouseEnter={() => setHovered({ rows: row, cols: col })}
                    onClick={() => insertTable(row + 1, col + 1)}
                    className={`w-6 h-6 border rounded-sm transition-colors ${
                      isActive ? "bg-blue-500" : "bg-white hover:bg-gray-200"
                    }`}
                  />
                )
              })}
            </div>
            <p className="text-sm text-center mt-2 text-gray-600">
              {hovered.rows + 1} × {hovered.cols + 1}
            </p>
          </CardBody>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 