"use client"

import * as React from "react"

// --- Styles ---
import "./ai-side-panel.scss"

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button"

// --- Icons ---
import { AIIcon } from "@/components/tiptap-icons/ai-icon"
import { CloseIcon } from "@/components/tiptap-icons/close-icon"

// --- Hooks ---
import { useAISidePanel, type UseAISidePanelConfig } from "./use-ai-side-panel"

export interface AISidePanelProps extends UseAISidePanelConfig {
  /**
   * Optional text to display alongside the icon.
   */
  text?: string
}

/**
 * AI Side Panel component for Tiptap editor
 */
export function AISidePanel({
  editor: providedEditor,
  isOpen,
  onToggle,
  ...config
}: AISidePanelProps) {
  const {
    width,
    messages,
    inputValue,
    setInputValue,
    handleSendMessage,
    isLoading,
  } = useAISidePanel({
    editor: providedEditor,
    isOpen,
    onToggle,
    ...config,
  })

  return (
    <div
      className={`ai-side-panel-container ${isOpen ? 'is-open' : ''}`}
      style={{ width: `${width}px` }}
    >
      {/* Panel Card - No resize handle */}
      <div className="ai-side-panel-card">
        {/* Header */}
        <div className="ai-side-panel-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <AIIcon />
            <h3>AI Assistant</h3>
          </div>
          <Button
            type="button"
            data-style="ghost"
            onClick={onToggle}
            aria-label="Close AI Assistant"
          >
            <CloseIcon />
          </Button>
        </div>

        {/* Body */}
        <div className="ai-side-panel-body">
          {/* Messages */}
          <div className="ai-side-panel-messages">
            {messages.length === 0 ? (
              <div style={{ textAlign: "center", color: "var(--tt-color-text-muted)" }}>
                <p>Start a conversation with the AI assistant</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`ai-side-panel-message ${message.type}-message`}
                >
                  <div className="ai-side-panel-message-content">
                    {message.content}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="ai-side-panel-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask the AI assistant..."
              className="tiptap-input"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <Button
              type="button"
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 