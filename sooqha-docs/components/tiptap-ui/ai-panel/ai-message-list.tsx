import * as React from "react"

import { MessageSquare, Bot, RotateCcw, Copy, Check, Loader2, AlertCircle, Sparkles } from "lucide-react"

import { Button } from "@/components/tiptap-ui-primitive/button"
import { cn } from "@/lib/utils"
import type { AiMessage } from "./ai-panel"

interface AiMessageItemProps {
  message: AiMessage
  onSelect?: (message: AiMessage) => void
  onInsert?: (content: string) => void
  onReplace?: (content: string) => void
  onRetry?: () => void
  isSelected?: boolean
}

const AiMessageItem: React.FC<AiMessageItemProps> = ({
  message,
  onSelect,
  onInsert,
  onReplace,
  onRetry,
  isSelected,
}) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleClick = () => {
    onSelect?.(message)
  }

  return (
    <div
      className={cn(
        "tt-ai-panel-message",
        isSelected && "tt-ai-panel-message--selected"
      )}
      onClick={handleClick}
    >
      <div className="tt-ai-panel-message-header">
        <div className="tt-ai-panel-message-icon">
          {message.type === "user" ? (
            <MessageSquare className="tt-ai-panel-message-icon-user" />
          ) : (
            <Bot className="tt-ai-panel-message-icon-assistant" />
          )}
        </div>
        <div className="tt-ai-panel-message-meta">
          <span className="tt-ai-panel-message-type">
            {message.type === "user" ? "You" : "AI"}
          </span>
          <span className="tt-ai-panel-message-time">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>
        {message.type === "assistant" && (
          <div className="tt-ai-panel-message-actions">
            <Button
              size="small"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
                handleCopy()
              }}
              className="tt-ai-panel-message-action"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            </Button>
            {onInsert && (
              <Button
                size="small"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  onInsert(message.content)
                }}
                className="tt-ai-panel-message-action"
              >
                Insert
              </Button>
            )}
            {onReplace && (
              <Button
                size="small"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  onReplace(message.content)
                }}
                className="tt-ai-panel-message-action"
              >
                Replace
              </Button>
            )}
            {onRetry && (
              <Button
                size="small"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  onRetry()
                }}
                className="tt-ai-panel-message-action"
              >
                <RotateCcw className="w-3 h-3" />
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="tt-ai-panel-message-content">
        {message.status === "loading" ? (
          <div className="tt-ai-panel-message-loading">
            <Loader2 className="tt-ai-panel-message-loading-icon" />
            <span>AI is thinking...</span>
          </div>
        ) : message.status === "error" ? (
          <div className="tt-ai-panel-message-error">
            <AlertCircle className="tt-ai-panel-message-error-icon" />
            <span>Failed to generate response</span>
          </div>
        ) : (
          <div className="tt-ai-panel-message-text">{message.content}</div>
        )}
      </div>
    </div>
  )
}

export interface AiMessageListProps {
  messages: AiMessage[]
  selectedId?: string
  onSelectMessage?: (message: AiMessage) => void
  onInsert?: (content: string) => void
  onReplace?: (content: string) => void
  onRetry?: () => void
}

export const AiMessageList: React.FC<AiMessageListProps> = ({
  messages,
  selectedId,
  onSelectMessage,
  onInsert,
  onReplace,
  onRetry,
}) => {
  return (
    <div className="tt-ai-panel-messages">
      {messages.length > 0 ? (
        messages.map((message) => (
          <AiMessageItem
            key={message.id}
            message={message}
            onSelect={onSelectMessage}
            onInsert={onInsert}
            onReplace={onReplace}
            onRetry={onRetry}
            isSelected={selectedId === message.id}
          />
        ))
      ) : (
        <div className="tt-ai-panel-empty">
          <Sparkles className="tt-ai-panel-empty-icon" />
          <p>Start a conversation with AI</p>
        </div>
      )}
    </div>
  )
}
