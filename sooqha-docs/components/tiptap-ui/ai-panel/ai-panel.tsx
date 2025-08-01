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

export interface AiCommand {
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
   * Available AI commands
   */
  commands?: AiCommand[]
  /**
   * Callback when an AI command is executed
   */
  onCommand?: (command: AiCommand) => void
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

const AiCommandItem: React.FC<{
  command: AiCommand
  onExecute: (command: AiCommand) => void
  isSelected?: boolean
}> = ({ command, onExecute, isSelected }) => {
  const Icon = command.icon

  return (
    <div
      className={cn(
        "tt-ai-panel-command",
        isSelected && "tt-ai-panel-command--selected"
      )}
      onClick={() => onExecute(command)}
    >
      <Icon className="tt-ai-panel-command-icon" />
      <div className="tt-ai-panel-command-content">
        <div className="tt-ai-panel-command-name">{command.name}</div>
        <div className="tt-ai-panel-command-description">{command.description}</div>
      </div>
      {command.shortcut && (
        <div className="tt-ai-panel-command-shortcut">{command.shortcut}</div>
      )}
    </div>
  )
}

const AiPanelContent: React.FC<{
  messages: AiMessage[]
  commands: AiCommand[]
  onSelectMessage?: (message: AiMessage) => void
  onInsert?: (content: string) => void
  onReplace?: (content: string) => void
  onRetry?: () => void
  onCommand?: (command: AiCommand) => void
  panelClassName?: string
  height?: string
  width?: string
  variant?: AiPanelVariant
  isProcessing?: boolean
  currentPrompt?: string
  onPromptSubmit?: (prompt: string) => void
}> = ({
  messages,
  commands,
  onSelectMessage,
  onInsert,
  onReplace,
  onRetry,
  onCommand,
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
  const [activeTab, setActiveTab] = React.useState<"chat" | "commands">("chat")

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
        <h3 className="tt-ai-panel-title">AI Assistant</h3>
        <div className="tt-ai-panel-header-actions">
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
                activeTab === "commands" && "tt-ai-panel-tab--active"
              )}
              onClick={() => setActiveTab("commands")}
            >
              Commands
            </button>
          </div>
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
              <form onSubmit={handlePromptSubmit} className="tt-ai-panel-prompt-form">
                <Input
                  type="text"
                  placeholder="Ask AI anything..."
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  className="tt-ai-panel-prompt-input"
                  disabled={isProcessing}
                />
                <Button
                  type="submit"
                  size="small"
                  disabled={!promptInput.trim() || isProcessing}
                  className="tt-ai-panel-prompt-submit"
                >
                  {isProcessing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="tt-ai-panel-commands">
            {commands.map((command) => (
              <AiCommandItem
                key={command.id}
                command={command}
                onExecute={onCommand!}
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
      commands = [],
      onCommand,
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
      aiCommands,
      handleCommand,
      handleInsert,
      handleReplace,
      handleRetry,
      handlePromptSubmit,
    } = useAiPanel({
      editor,
      messages,
      commands,
      onCommand,
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
          commands={aiCommands}
          onSelectMessage={onSelectMessage}
          onInsert={handleInsert}
          onReplace={handleReplace}
          onRetry={handleRetry}
          onCommand={handleCommand}
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