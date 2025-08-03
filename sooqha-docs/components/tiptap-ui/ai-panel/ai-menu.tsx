import * as React from "react"
import type { Editor } from "@tiptap/react"

interface AiMenuItem {
  title: string
  description?: string
  onAction: () => void
  icon?: React.ComponentType<{ className?: string }>
}

export interface AiMenuProps {
  editor?: Editor | null
  items?: AiMenuItem[]
  aiAgentProvider?: any // AI Agent provider
}

export const AiMenu: React.FC<AiMenuProps> = ({ editor, items, aiAgentProvider }) => {
  if (!editor) {
    return null
  }

  // Default AI commands if no items provided
  const defaultItems: AiMenuItem[] = [
    {
      title: "Improve Writing",
      description: "Enhance grammar, style, and clarity",
      onAction: () => {
        if (aiAgentProvider) {
          aiAgentProvider.addUserMessage("Please improve the grammar, style, and clarity of the selected text.")
          aiAgentProvider.run()
        }
      }
    },
    {
      title: "Fix Grammar",
      description: "Correct spelling and grammar errors",
      onAction: () => {
        if (aiAgentProvider) {
          aiAgentProvider.addUserMessage("Please fix any spelling and grammar errors in the selected text.")
          aiAgentProvider.run()
        }
      }
    },
    {
      title: "Summarize",
      description: "Create a concise summary",
      onAction: () => {
        if (aiAgentProvider) {
          aiAgentProvider.addUserMessage("Please provide a concise summary of the selected text.")
          aiAgentProvider.run()
        }
      }
    },
    {
      title: "Expand",
      description: "Add more detail and context",
      onAction: () => {
        if (aiAgentProvider) {
          aiAgentProvider.addUserMessage("Please expand on the selected text with more detail and context.")
          aiAgentProvider.run()
        }
      }
    },
    {
      title: "Rewrite",
      description: "Rephrase in a different style",
      onAction: () => {
        if (aiAgentProvider) {
          aiAgentProvider.addUserMessage("Please rewrite the selected text in a different style or tone.")
          aiAgentProvider.run()
        }
      }
    }
  ]

  const menuItems = items || defaultItems

  return (
    <div className="tt-ai-menu">
      {menuItems.map(item => (
        <button
          key={item.title}
          type="button"
          className="tt-ai-menu-item"
          onClick={item.onAction}
          title={item.description}
        >
          <span className="tt-ai-menu-item-title">{item.title}</span>
          {item.description && (
            <span className="tt-ai-menu-item-description">{item.description}</span>
          )}
        </button>
      ))}
    </div>
  )
}

AiMenu.displayName = "AiMenu"

