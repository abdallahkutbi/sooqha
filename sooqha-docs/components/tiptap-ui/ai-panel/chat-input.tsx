import * as React from "react"

import { Paperclip, Globe, Lightbulb, Send, Loader2 } from "lucide-react"

export interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isProcessing?: boolean
  placeholder?: string
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSubmit,
  isProcessing = false,
  placeholder = "Message...",
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim() && !isProcessing) {
      onSubmit()
    }
  }

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
