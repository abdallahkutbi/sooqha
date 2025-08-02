import * as React from "react"

import { Separator } from "@/components/tiptap-ui-primitive/separator"
import { Settings } from "lucide-react"

import { cn } from "@/lib/utils"
import { ChatInput } from "./chat-input"
import { AiMessageList } from "./ai-message-list"
import { AgentList } from "./agent-list"
import type { AiMessage, AgentCommand, AiPanelVariant } from "./ai-panel"

export interface AiPanelContentProps {
  messages: AiMessage[]
  agents: AgentCommand[]
  onSelectMessage?: (message: AiMessage) => void
  onInsert?: (content: string) => void
  onReplace?: (content: string) => void
  onRetry?: () => void
  onAgent?: (agent: AgentCommand) => void
  panelClassName?: string
  height?: string
  width?: string
  variant?: AiPanelVariant
  isProcessing?: boolean
  currentPrompt?: string
  onPromptSubmit?: (prompt: string) => void
}

export const AiPanelContent: React.FC<AiPanelContentProps> = ({
  messages,
  agents,
  onSelectMessage,
  onInsert,
  onReplace,
  onRetry,
  onAgent,
  panelClassName,
  height = "auto",
  width = "clamp(320px, 50vw, 600px)",
  variant = "side",
  isProcessing,
  currentPrompt,
  onPromptSubmit,
}) => {
  const [selectedMessageId, setSelectedMessageId] = React.useState<string>()
  const [promptInput, setPromptInput] = React.useState(currentPrompt || "")
  const [activeTab, setActiveTab] = React.useState<"chat" | "agent">("chat")

  const handleSelectMessage = (message: AiMessage) => {
    setSelectedMessageId(message.id)
    onSelectMessage?.(message)
  }

  return (
    <div
      className={cn(
        "tt-ai-panel",
        variant && `tt-ai-panel--${variant}`,
        panelClassName
      )}
      style={{ height, width, maxWidth: "100%" }}
    >
      <div className="tt-ai-panel-header">
        <div className="tt-ai-panel-header-left">
          <h3 className="tt-ai-panel-title">AI Assistant</h3>
        </div>
        <div className="tt-ai-panel-header-center">
          <div className="tt-ai-panel-tabs">
            <button
              className={cn(
                "tt-ai-panel-tab",
                activeTab === "chat" && "tt-ai-panel-tab--active"
              )}
              onClick={() => setActiveTab("chat")}
            >
              Chat
            </button>
            <button
              className={cn(
                "tt-ai-panel-tab",
                activeTab === "agent" && "tt-ai-panel-tab--active"
              )}
              onClick={() => setActiveTab("agent")}
            >
              Agent
            </button>
          </div>
        </div>
        <div className="tt-ai-panel-header-right">
          <button className="tt-ai-panel-settings-button">
            <Settings className="tt-ai-panel-settings-icon" />
          </button>
        </div>
      </div>
      <Separator className="tt-ai-panel-separator" />
      <div className="tt-ai-panel-content">
        {activeTab === "chat" ? (
          <div className="tt-ai-panel-chat">
            <AiMessageList
              messages={messages}
              selectedId={selectedMessageId}
              onSelectMessage={handleSelectMessage}
              onInsert={onInsert}
              onReplace={onReplace}
              onRetry={onRetry}
            />
            <div className="tt-ai-panel-prompt">
              <ChatInput
                value={promptInput}
                onChange={setPromptInput}
                onSubmit={() => {
                  if (promptInput.trim() && onPromptSubmit) {
                    onPromptSubmit(promptInput.trim())
                    setPromptInput("")
                  }
                }}
                isProcessing={isProcessing}
                placeholder="Enter your message..."
              />
            </div>
          </div>
        ) : (
          <AgentList agents={agents} onAgent={(agent) => onAgent?.(agent)} />
        )}
      </div>
    </div>
  )
}
