import * as React from "react"

// --- Styles ---
import "./ai-panel.scss"

// --- Hooks ---
import { useAiPanel } from "./use-ai-panel"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- UI ---
import type { Editor } from "@tiptap/react"
import { cn } from "@/lib/utils"

// --- Components ---
import { AiPanelContent } from "./ai-panel-content"

export interface AiMessage {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  status?: "loading" | "error" | "success"
}

export interface AgentCommand {
  id: string
  name: string
  description: string
  shortcut?: string
  icon: React.ComponentType<{ className?: string }>
}

export interface AiPanelProps {
  editor?: Editor | null
  messages?: AiMessage[]
  agents?: AgentCommand[]
  onAgent?: (agent: AgentCommand) => void
  onSelectMessage?: (message: AiMessage) => void
  onInsert?: (content: string) => void
  onReplace?: (content: string) => void
  onRetry?: () => void
  hideWhenUnavailable?: boolean
  onAction?: () => void
  panelClassName?: string
  height?: string
  width?: string
  variant?: "side" | "full-height" | "attached" | "compact"
  isProcessing?: boolean
  currentPrompt?: string
  onPromptSubmit?: (prompt: string) => void
}

export const AiPanel: React.FC<AiPanelProps> = ({
  editor: providedEditor,
  messages = [],
  agents = [],
  onAgent,
  onSelectMessage,
  onInsert,
  onReplace,
  onRetry,
  hideWhenUnavailable = false,
  onAction,
  panelClassName,
  height,
  width,
  variant = "side",
  isProcessing = false,
  currentPrompt,
  onPromptSubmit,
  ...props
}) => {
  const { editor } = useTiptapEditor(providedEditor)
  const {
    isVisible,
    aiMessages,
    aiAgents,
    handleAgent,
    handleInsert,
    handleReplace,
    handleRetry,
    handlePromptSubmit,
  } = useAiPanel({
    editor,
    messages,
    agents,
    onAgent,
    onInsert,
    onReplace,
    onRetry,
    hideWhenUnavailable,
    onAction,
    onPromptSubmit,
  })

  if (!isVisible) {
    return null
  }

  return (
    <div className={cn("tt-ai-panel", panelClassName)} {...props}>
      <AiPanelContent
        messages={aiMessages}
        agents={aiAgents}
        onSelectMessage={onSelectMessage}
        onInsert={handleInsert}
        onReplace={handleReplace}
        onRetry={handleRetry}
        onAgent={handleAgent}
        panelClassName={panelClassName}
        height={height}
        width={width}
        variant={variant}
        isProcessing={isProcessing}
        currentPrompt={currentPrompt}
        onPromptSubmit={handlePromptSubmit}
      />
    </div>
  )
}
