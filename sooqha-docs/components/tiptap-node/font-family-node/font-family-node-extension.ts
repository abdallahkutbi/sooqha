import { Mark, mergeAttributes } from '@tiptap/core'

export interface FontFamilyOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontFamily: {
      /**
       * Set font family
       */
      setFontFamily: (fontFamily: string) => ReturnType
      /**
       * Unset font family
       */
      unsetFontFamily: () => ReturnType
    }
  }
}

export const FontFamily = Mark.create<FontFamilyOptions>({
  name: 'fontFamily',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      fontFamily: {
        default: null,
        parseHTML: element => element.style.fontFamily,
        renderHTML: attributes => {
          if (!attributes.fontFamily) {
            return {}
          }

          return {
            style: `font-family: ${attributes.fontFamily}`,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[style*="font-family"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setFontFamily:
        (fontFamily: string) =>
        ({ commands }) => {
          return commands.setMark(this.name, { fontFamily })
        },
      unsetFontFamily:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name)
        },
    }
  },
}) 