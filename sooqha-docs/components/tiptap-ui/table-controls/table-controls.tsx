"use client"

import * as React from "react"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { Button } from "@/components/tiptap-ui-primitive/button"
import {
  ChevronDown as ChevronDownIcon,
  Plus as PlusIcon,
  Minus as MinusIcon,
} from "lucide-react"

interface TableControlsProps {
  /**
   * Additional CSS classes to apply to the controls container
   */
  className?: string
}

/**
 * TableControls Component
 * 
 * Provides controls for managing table structure:
 * - Add/remove rows
 * - Add/remove columns
 * - Delete table
 */
export function TableControls({ className }: TableControlsProps) {
  const { editor } = useTiptapEditor()

  const addColumnBefore = React.useCallback(() => {
    if (!editor) return
    editor.chain().focus().addColumnBefore().run()
  }, [editor])

  const addColumnAfter = React.useCallback(() => {
    if (!editor) return
    editor.chain().focus().addColumnAfter().run()
  }, [editor])

  const deleteColumn = React.useCallback(() => {
    if (!editor) return
    editor.chain().focus().deleteColumn().run()
  }, [editor])

  const addRowBefore = React.useCallback(() => {
    if (!editor) return
    editor.chain().focus().addRowBefore().run()
  }, [editor])

  const addRowAfter = React.useCallback(() => {
    if (!editor) return
    editor.chain().focus().addRowAfter().run()
  }, [editor])

  const deleteRow = React.useCallback(() => {
    if (!editor) return
    editor.chain().focus().deleteRow().run()
  }, [editor])

  const deleteTable = React.useCallback(() => {
    if (!editor) return
    editor.chain().focus().deleteTable().run()
  }, [editor])

  if (!editor) return null

  return (
    <div className={`flex items-center gap-1 ${className || ""}`}>
      {/* Column Controls */}
      <div className="flex items-center gap-1">
        <Button
          data-style="ghost"
          onClick={addColumnBefore}
          title="Add column before"
        >
          <PlusIcon className="tiptap-button-icon" />
        </Button>
        <Button
          data-style="ghost"
          onClick={addColumnAfter}
          title="Add column after"
        >
          <PlusIcon className="tiptap-button-icon" />
        </Button>
        <Button
          data-style="ghost"
          onClick={deleteColumn}
          title="Delete column"
        >
          <MinusIcon className="tiptap-button-icon" />
        </Button>
      </div>

      {/* Row Controls */}
      <div className="flex items-center gap-1">
        <Button
          data-style="ghost"
          onClick={addRowBefore}
          title="Add row before"
        >
          <PlusIcon className="tiptap-button-icon" />
        </Button>
        <Button
          data-style="ghost"
          onClick={addRowAfter}
          title="Add row after"
        >
          <PlusIcon className="tiptap-button-icon" />
        </Button>
        <Button
          data-style="ghost"
          onClick={deleteRow}
          title="Delete row"
        >
          <MinusIcon className="tiptap-button-icon" />
        </Button>
      </div>

      {/* Delete Table */}
      <Button
        data-style="ghost"
        onClick={deleteTable}
        title="Delete table"
      >
        <MinusIcon className="tiptap-button-icon" />
      </Button>
    </div>
  )
} 