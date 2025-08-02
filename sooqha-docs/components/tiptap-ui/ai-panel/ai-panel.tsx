import * as React from "react"

// --- Styles ---
import "./ai-panel.scss"

// --- Hooks ---
import { useAiPanel } from "./use-ai-panel"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- UI ---
import { Input } from "@/components/tiptap-ui-primitive/input"
import { Separator } from "@/components/tiptap-ui-primitive/separator"
import { Button } from "@/components/tiptap-ui-primitive/button"
import type { Editor } from "@tiptap/react"

// --- Icons ---
import {
  Search,
  Sparkles,
  Bot,
  Lightbulb,
  Wand2,
  MessageSquare,
  Send,
  RotateCcw,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  Paperclip,
  Globe,
  Mic,
  Settings,
} from "lucide-react"

// --- Utils ---
import { cn } from "@/lib/utils"

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

export type AiPanelVariant = "side" | "full-height" | "attached" | "compact"

export interface AiPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null
  /**
   * AI messages history
   */
  messages?: AiMessage[]
  /**
   * Available Agent actions
   */
  agents?: AgentCommand[]
  /**
   * Callback when an Agent action is executed
   */
  onAgent?: (agent: AgentCommand) => void
  /**
   * Callback when a message is selected
   */
  onSelectMessage?: (message: AiMessage) => void
  /**
   * Callback when AI response is inserted
   */
  onInsert?: (content: string) => void
  /**
   * Callback when AI response is replaced
   */
  onReplace?: (content: string) => void
  /**
   * Callback when AI response is retried
   */
  onRetry?: () => void
  /**
   * Whether the panel should hide when not available.
   * @default false
   */
  hideWhenUnavailable?: boolean
  /**
   * Callback function called after a successful action.
   */
  onAction?: () => void
  /**
   * Custom className for the panel
   */
  panelClassName?: string
  /**
   * Panel height
   * @default "auto"
   */
  height?: string
  /**
   * Panel width
   * @default "320px"
   */
  width?: string
  /**
   * Panel variant
   * @default "side"
   */
  variant?: AiPanelVariant
  /**
   * Whether AI is currently processing
   */
  isProcessing?: boolean
  /**
   * Current AI prompt
   */
  currentPrompt?: string
  /**
   * Callback when prompt is submitted
   */
  onPromptSubmit?: (prompt: string) => void
}

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

const AgentActionItem: React.FC<{
  agent: AgentCommand
  onExecute: (agent: AgentCommand) => void
  isSelected?: boolean
}> = ({ agent, onExecute, isSelected }) => {
  const Icon = agent.icon

  return (
    <div
      className={cn(
        "tt-ai-panel-agent",
        isSelected && "tt-ai-panel-agent--selected"
      )}
      onClick={() => onExecute(agent)}
    >
      <Icon className="tt-ai-panel-agent-icon" />
      <div className="tt-ai-panel-agent-content">
        <div className="tt-ai-panel-agent-name">{agent.name}</div>
        <div className="tt-ai-panel-agent-description">{agent.description}</div>
      </div>
      {agent.shortcut && (
        <div className="tt-ai-panel-agent-shortcut">{agent.shortcut}</div>
      )}
    </div>
  )
}

const ChatInput: React.FC<{
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isProcessing?: boolean
  placeholder?: string
}> = ({ value, onChange, onSubmit, isProcessing = false, placeholder = "Message..." }) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim() && !isProcessing) {
      onSubmit()
    }
  }

  // Auto-resize textarea
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value])

  return (
    <div className="tt-ai-panel-chat-input">
      <textarea
        ref={textareaRef}
        className="tt-ai-panel-chat-input-field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={isProcessing}
        rows={1}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
          }
        }}
      />
      
      <div className="tt-ai-panel-chat-input-actions">
        <div className="tt-ai-panel-chat-input-action-group">
          <button className="tt-ai-panel-chat-input-action-button">
            <Paperclip className="tt-ai-panel-chat-input-action-icon" />
            <span className="tt-ai-panel-chat-input-action-text">Attach</span>
          </button>
          
          <button className="tt-ai-panel-chat-input-action-button tt-ai-panel-chat-input-action-button--disabled">
            <Globe className="tt-ai-panel-chat-input-action-icon" />
            <span className="tt-ai-panel-chat-input-action-text">Browse</span>
          </button>
          
          <button className="tt-ai-panel-chat-input-action-button">
            <Lightbulb className="tt-ai-panel-chat-input-action-icon" />
            <span className="tt-ai-panel-chat-input-action-text">Suggest</span>
          </button>
        </div>
        
        <button
          className="tt-ai-panel-chat-input-send-button"
          onClick={handleSubmit}
          disabled={!value.trim() || isProcessing}
        >
          {isProcessing ? (
            <Loader2 className="tt-ai-panel-chat-input-send-button-icon animate-spin" />
          ) : (
            <Send className="tt-ai-panel-chat-input-send-button-icon" />
          )}
        </button>
      </div>
    </div>
  )
}

const AiPanelContent: React.FC<{
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
}> = ({
  messages,
  agents,
  onSelectMessage,
  onInsert,
  onReplace,
  onRetry,
  onAgent,
  panelClassName,
  height = "auto",
  width = "320px",
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

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (promptInput.trim() && onPromptSubmit) {
      onPromptSubmit(promptInput.trim())
      setPromptInput("")
    }
  }

  return (
    <div
      className={cn(
        "tt-ai-panel",
        variant && `tt-ai-panel--${variant}`,
        panelClassName
      )}
      style={{ height, width }}
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
            <div className="tt-ai-panel-messages">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <AiMessageItem
                    key={message.id}
                    message={message}
                    onSelect={handleSelectMessage}
                    onInsert={onInsert}
                    onReplace={onReplace}
                    onRetry={onRetry}
                    isSelected={selectedMessageId === message.id}
                  />
                ))
              ) : (
                <div className="tt-ai-panel-empty">
                  <Sparkles className="tt-ai-panel-empty-icon" />
                  <p>Start a conversation with AI</p>
                </div>
              )}
            </div>
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
          <div className="tt-ai-panel-agents">
            {agents.map((agent) => (
              <AgentActionItem
                key={agent.id}
                agent={agent}
                onExecute={onAgent!}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * AI Panel component for interacting with AI in a Tiptap editor.
 *
 * For custom implementations, use the `useAiPanel` hook instead.
 */
export const AiPanel = React.forwardRef<
  HTMLDivElement,
  AiPanelProps
>(
  (
    {
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
    },
    ref
  ) => {
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
      <div ref={ref} {...props}>
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
)

AiPanel.displayName = "AiPanel" 