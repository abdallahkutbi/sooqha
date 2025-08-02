import { Mark, mergeAttributes } from '@tiptap/core'

export interface LineSpacingOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lineSpacing: {
      /**
       * Set line spacing
       */
      setLineSpacing: (spacing: string) => ReturnType
      /**
       * Unset line spacing
       */
      unsetLineSpacing: () => ReturnType
    }
  }
}

export const LineSpacing = Mark.create<LineSpacingOptions>({
  name: 'lineSpacing',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      lineSpacing: {
        default: null,
        parseHTML: element => element.style.lineHeight,
        renderHTML: attributes => {
          if (!attributes.lineSpacing) {
            return {}
          }

          return {
            style: `line-height: ${attributes.lineSpacing}`,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[style*="line-height"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setLineSpacing:
        (spacing: string) =>
        ({ commands }) => {
          return commands.setMark(this.name, { lineSpacing: spacing })
        },
      unsetLineSpacing:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name)
        },
    }
  },
}) 