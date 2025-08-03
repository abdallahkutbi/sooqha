"use client"

import * as React from "react"
import { Editor } from "@tiptap/react"
import { Loader2, Check, X, RotateCcw, Sparkles, MessageSquare, AlertCircle } from "lucide-react"
import { Button } from "@/components/tiptap-ui-primitive/button"
import { Card, CardBody } from "@/components/tiptap-ui-primitive/card"
import { Separator } from "@/components/tiptap-ui-primitive/separator"

// Import styles
import "./ai-content-panel.scss"

interface AiContentPanelProps {
  editor: Editor | null
  isOpen?: boolean
  onClose?: () => void
  className?: string
}

interface AiSuggestion {
  id: string
  from: number
  to: number
  text: string
  rule: string
  message?: string
}

interface AiResponse {
  content: string
  state: 'loading' | 'idle' | 'error'
  error?: string
}

export const AiContentPanel: React.FC<AiContentPanelProps> = ({
  editor,
  isOpen = true,
  onClose,
  className = ""
}) => {
  const [aiResponse, setAiResponse] = React.useState<AiResponse | null>(null)
  const [suggestions, setSuggestions] = React.useState<AiSuggestion[]>([])
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  // Listen to AI response state changes
  React.useEffect(() => {
    if (!editor) return

    const updateAiResponse = () => {
      try {
        const storage = editor.storage.ai
        if (storage) {
          setAiResponse({
            content: storage.response || "",
            state: storage.state || "idle",
            error: storage.error
          })
        }
      } catch (error) {
        console.warn("Could not access AI storage:", error)
      }
    }

    const updateSuggestions = () => {
      try {
        const extensionStorage = editor.extensionStorage.aiSuggestion
        if (extensionStorage && extensionStorage.getSuggestions) {
          const suggestions = extensionStorage.getSuggestions()
          setSuggestions(suggestions || [])
        }
      } catch (error) {
        console.warn("Could not access AI Suggestion storage:", error)
      }
    }

    // Initial update
    updateAiResponse()
    updateSuggestions()

    // Listen to editor updates
    const handleUpdate = () => {
      updateAiResponse()
      updateSuggestions()
    }

    editor.on('update', handleUpdate)
    editor.on('selectionUpdate', handleUpdate)

    return () => {
      editor.off('update', handleUpdate)
      editor.off('selectionUpdate', handleUpdate)
    }
  }, [editor])

  // AI Action handlers
  const handleAiAction = (command: string) => {
    if (!editor) return

    try {
      switch (command) {
        case 'summarize':
          editor.commands.aiSummarize?.()
          break
        case 'translate':
          editor.commands.aiTranslate?.()
          break
        case 'continue':
          editor.commands.aiContinue?.()
          break
        case 'accept':
          editor.commands.aiAccept?.()
          break
        case 'reject':
          editor.commands.aiReject?.()
          break
        case 'regenerate':
          editor.commands.aiRegenerate?.()
          break
      }
    } catch (error) {
      console.error(`AI command ${command} failed:`, error)
    }
  }

  // Suggestion handlers
  const handleSuggestionAction = (id: string, action: 'accept' | 'reject') => {
    if (!editor) return

    try {
      if (action === 'accept') {
        editor.commands.aiAcceptSuggestion?.(id)
      } else {
        editor.commands.aiRejectSuggestion?.(id)
      }
    } catch (error) {
      console.error(`Suggestion ${action} failed:`, error)
    }
  }

  if (!editor || !isOpen) return null

  return (
    <div className={`ai-content-panel ${className}`}>
      <div className="ai-panel-header">
        <div className="ai-panel-title">
          <Sparkles className="ai-panel-icon" />
          <span>AI Assistant</span>
        </div>
        <div className="ai-panel-controls">
          <Button
            type="button"
            data-style="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ai-panel-collapse-btn"
          >
            {isCollapsed ? '→' : '←'}
          </Button>
          {onClose && (
            <Button
              type="button"
              data-style="ghost"
              size="sm"
              onClick={onClose}
              className="ai-panel-close-btn"
            >
              ×
            </Button>
          )}
        </div>
      </div>

      {!isCollapsed && (
        <div className="ai-panel-content">
          {/* AI Actions */}
          <Card className="ai-actions-card">
            <CardBody>
              <h3 className="ai-section-title">AI Actions</h3>
              <div className="ai-actions-grid">
                <Button
                  type="button"
                  data-style="ghost"
                  size="sm"
                  onClick={() => handleAiAction('summarize')}
                  className="ai-action-btn"
                >
                  <MessageSquare className="ai-action-icon" />
                  Summarize
                </Button>
                <Button
                  type="button"
                  data-style="ghost"
                  size="sm"
                  onClick={() => handleAiAction('translate')}
                  className="ai-action-btn"
                >
                  <Sparkles className="ai-action-icon" />
                  Translate
                </Button>
                <Button
                  type="button"
                  data-style="ghost"
                  size="sm"
                  onClick={() => handleAiAction('continue')}
                  className="ai-action-btn"
                >
                  <RotateCcw className="ai-action-icon" />
                  Continue
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* AI Response */}
          {aiResponse && (
            <Card className="ai-response-card">
              <CardBody>
                <h3 className="ai-section-title">AI Response</h3>
                
                {aiResponse.state === 'loading' && (
                  <div className="ai-loading">
                    <Loader2 className="ai-loading-spinner" />
                    <span>AI is thinking...</span>
                  </div>
                )}

                {aiResponse.state === 'error' && (
                  <div className="ai-error">
                    <AlertCircle className="ai-error-icon" />
                    <span>{aiResponse.error || 'An error occurred'}</span>
                  </div>
                )}

                {aiResponse.state === 'idle' && aiResponse.content && (
                  <div className="ai-response-content">
                    <div className="ai-response-text">
                      {aiResponse.content}
                    </div>
                    <div className="ai-response-actions">
                      <Button
                        type="button"
                        data-style="ghost"
                        size="sm"
                        onClick={() => handleAiAction('accept')}
                        className="ai-accept-btn"
                      >
                        <Check className="ai-action-icon" />
                        Accept
                      </Button>
                      <Button
                        type="button"
                        data-style="ghost"
                        size="sm"
                        onClick={() => handleAiAction('reject')}
                        className="ai-reject-btn"
                      >
                        <X className="ai-action-icon" />
                        Reject
                      </Button>
                      <Button
                        type="button"
                        data-style="ghost"
                        size="sm"
                        onClick={() => handleAiAction('regenerate')}
                        className="ai-regenerate-btn"
                      >
                        <RotateCcw className="ai-action-icon" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          )}

          {/* AI Suggestions */}
          {suggestions.length > 0 && (
            <Card className="ai-suggestions-card">
              <CardBody>
                <h3 className="ai-section-title">Suggestions</h3>
                
                <div className="ai-suggestions-list">
                  {suggestions.map((suggestion) => (
                    <div key={suggestion.id} className="ai-suggestion-item">
                      <div className="ai-suggestion-content">
                        <div className="ai-suggestion-rule">
                          {suggestion.rule}
                        </div>
                        <div className="ai-suggestion-text">
                          {suggestion.text}
                        </div>
                        {suggestion.message && (
                          <div className="ai-suggestion-message">
                            {suggestion.message}
                          </div>
                        )}
                      </div>
                      <div className="ai-suggestion-actions">
                        <Button
                          type="button"
                          data-style="ghost"
                          size="sm"
                          onClick={() => handleSuggestionAction(suggestion.id, 'accept')}
                          className="ai-suggestion-accept-btn"
                        >
                          <Check className="ai-action-icon" />
                        </Button>
                        <Button
                          type="button"
                          data-style="ghost"
                          size="sm"
                          onClick={() => handleSuggestionAction(suggestion.id, 'reject')}
                          className="ai-suggestion-reject-btn"
                        >
                          <X className="ai-action-icon" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}

          {/* Empty State */}
          {!aiResponse && suggestions.length === 0 && (
            <Card className="ai-empty-card">
              <CardBody>
                <div className="ai-empty-state">
                  <Sparkles className="ai-empty-icon" />
                  <h3>AI Assistant Ready</h3>
                  <p>Select text and use AI actions to get started</p>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      )}
    </div>
  )
} 