import { useEffect, useRef, useCallback } from 'react'
import type { Editor } from '@tiptap/react'
import { getPageSize } from '@/components/page-layout/page-size-constants'

export interface UsePageBreakOptions {
  editor: Editor | null
  pageSize: string
  onPageBreak?: () => void
}

export function usePageBreak({ editor, pageSize, onPageBreak }: UsePageBreakOptions) {
  const lastPageBreakRef = useRef<number>(0)
  const isProcessingEnterRef = useRef<boolean>(false)
  const lastCursorCheckRef = useRef<number>(0)

  // Function to get current page height in pixels
  const getCurrentPageHeight = useCallback(() => {
    const pageSizeData = getPageSize(pageSize)
    if (!pageSizeData) return 0
    
    // Convert inches to pixels (assuming 96 DPI)
    const heightInPixels = pageSizeData.heightInches * 96
    return heightInPixels
  }, [pageSize])

  // Function to check if content exceeds page height and insert page break
  const checkAndInsertPageBreak = useCallback(() => {
    if (!editor) return

    const { state } = editor
    const { selection } = state
    const { $from } = selection
    
    // Get the current position in the document
    const pos = $from.pos
    const dom = editor.view.dom
    
    // Find the current page container
    const currentPage = dom.closest('.page-container')
    if (!currentPage) return
    
    // Get the position of the cursor relative to the page
    const selectionCoords = editor.view.coordsAtPos(pos)
    const pageRect = currentPage.getBoundingClientRect()
    const cursorY = selectionCoords.top
    const pageBottom = pageRect.bottom
    const pageHeight = getCurrentPageHeight()
    
    // Calculate if cursor is near the bottom of the page
    const bottomThreshold = pageBottom - 100 // 100px from bottom
    
    if (cursorY > bottomThreshold) {
      // Check if we haven't already inserted a page break at this position
      if (pos > lastPageBreakRef.current + 10) {
        // Insert a page break
        editor.commands.setPageBreak()
        lastPageBreakRef.current = pos
        onPageBreak?.()
      }
    }
  }, [editor, pageSize, getCurrentPageHeight, onPageBreak])

  // Function to handle Enter key press
  const handleEnterKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter' && editor && !isProcessingEnterRef.current) {
      isProcessingEnterRef.current = true
      
      // Small delay to let the editor process the Enter key first
      setTimeout(() => {
        checkAndInsertPageBreak()
        isProcessingEnterRef.current = false
      }, 50)
    }
  }, [editor, checkAndInsertPageBreak])

  // Function to monitor cursor position for auto page breaks
  const monitorCursorPosition = useCallback(() => {
    if (!editor) return

    const now = Date.now()
    // Debounce cursor checks to prevent excessive calls
    if (now - lastCursorCheckRef.current < 100) return
    
    lastCursorCheckRef.current = now
    checkAndInsertPageBreak()
  }, [editor, checkAndInsertPageBreak])

  // Set up event listeners
  useEffect(() => {
    if (!editor) return

    const dom = editor.view.dom

    // Add event listener for Enter key
    dom.addEventListener('keydown', handleEnterKey)

    // Monitor cursor position changes
    const handleSelectionUpdate = () => {
      monitorCursorPosition()
    }

    editor.on('selectionUpdate', handleSelectionUpdate)

    return () => {
      dom.removeEventListener('keydown', handleEnterKey)
      editor.off('selectionUpdate', handleSelectionUpdate)
    }
  }, [editor, handleEnterKey, monitorCursorPosition])

  // Reset page break tracking when page size changes
  useEffect(() => {
    lastPageBreakRef.current = 0
    lastCursorCheckRef.current = 0
  }, [pageSize])

  return {
    checkAndInsertPageBreak,
  }
} 