import * as React from "react"

import type { Editor } from "@tiptap/react"

interface AiMenuItem {
  title: string
  onAction: () => void
}

export interface AiMenuProps {
  editor?: Editor | null
  items: AiMenuItem[]
}

export const AiMenu: React.FC<AiMenuProps> = ({ editor, items }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="tt-ai-menu">
      {items.map(item => (
        <button
          key={item.title}
          type="button"
          className="tt-ai-menu-item"
          onClick={item.onAction}
        >
          {item.title}
        </button>
      ))}
    </div>
  )
}

AiMenu.displayName = "AiMenu"

