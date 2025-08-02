"use client"

import * as React from "react"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { Button } from "@/components/tiptap-ui-primitive/button"
import { TableIcon } from "@/components/tiptap-icons/table-icon"

interface TableButtonProps {
  /**
   * The number of rows to create in the table
   * @default 3
   */
  rows?: number
  /**
   * The number of columns to create in the table
   * @default 3
   */
  cols?: number
  /**
   * Whether to include a header row
   * @default true
   */
  withHeaderRow?: boolean
  /**
   * Additional CSS classes to apply to the button
   */
  className?: string
}

/**
 * TableButton Component
 * 
 * A button that inserts a table into the Tiptap editor.
 * Supports customizable table dimensions and header row option.
 */
export function TableButton({
  rows = 3,
  cols = 3,
  withHeaderRow = true,
  className,
}: TableButtonProps) {
  const { editor } = useTiptapEditor()

  const insertTable = React.useCallback(() => {
    if (!editor) return

    editor
      .chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow })
      .run()
  }, [editor, rows, cols, withHeaderRow])

  if (!editor) return null

  return (
    <Button
      data-style="ghost"
      onClick={insertTable}
      className={className}
      title="Insert table"
    >
      <TableIcon className="tiptap-button-icon" />
    </Button>
  )
} 