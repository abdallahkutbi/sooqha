import { Node, mergeAttributes } from '@tiptap/core'

export interface PageBreakOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    pageBreak: {
      /**
       * Add a page break
       */
      setPageBreak: () => ReturnType
      /**
       * Check if cursor is at bottom of page and insert page break if needed
       */
      checkAndInsertPageBreak: () => ReturnType
    }
  }
}

export const PageBreak = Node.create<PageBreakOptions>({
  name: 'pageBreak',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  group: 'block',

  parseHTML() {
    return [
      {
        tag: 'div[data-type="page-break"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 'data-type': 'page-break' })]
  },

  addCommands() {
    return {
      setPageBreak:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
          })
        },
      checkAndInsertPageBreak:
        () =>
        ({ editor, commands }) => {
          const { state } = editor
          const { selection } = state
          const { $from } = selection
          
          // Get the current position in the document
          const pos = $from.pos
          const dom = editor.view.dom
          
          // Find the current page container
          let currentPage = dom.querySelector('.simple-editor-content')
          if (!currentPage) return false
          
          // Get the position of the cursor relative to the page
          const selectionCoords = editor.view.coordsAtPos(pos)
          const pageRect = currentPage.getBoundingClientRect()
          const cursorY = selectionCoords.top
          const pageBottom = pageRect.bottom
          
          // Check if cursor is near the bottom of the page (within 50px)
          if (cursorY > pageBottom - 50) {
            // Insert a page break
            return commands.setPageBreak()
          }
          
          return false
        },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Enter': () => {
        // Insert page break when Ctrl/Cmd + Enter is pressed
        return this.editor.commands.setPageBreak()
      },
    }
  },
}) 