# AI Content Panel Integration Guide

## Overview

The AI Content Panel is a comprehensive React component that integrates with Tiptap's Content AI extension system. It provides a side panel UI for managing AI responses, suggestions, and actions in real-time.

## Features

### 🎯 Core Functionality
- **Real-time AI Response Streaming**: Displays AI responses as they're generated
- **AI Suggestion Management**: Lists and manages AI suggestions with accept/reject actions
- **Interactive AI Actions**: Trigger AI commands like summarize, translate, continue
- **State Management**: Monitors AI state (loading, idle, error) and responds accordingly
- **Collapsible Interface**: Expandable/collapsible panel for better UX

### 🎨 UI Components
- **AI Actions Grid**: Quick access to AI commands
- **Response Display**: Shows AI responses with accept/reject/regenerate options
- **Suggestions List**: Displays AI suggestions with individual accept/reject buttons
- **Loading States**: Animated loading spinners and progress indicators
- **Error Handling**: Graceful error display with retry options

## Technical Architecture

### Component Structure
```
AiContentPanel
├── Header (Title + Controls)
├── Content Area
│   ├── AI Actions Card
│   ├── AI Response Card
│   ├── AI Suggestions Card
│   └── Empty State Card
```

### State Management
- **AI Response State**: Monitors `editor.storage.ai` for response data
- **Suggestions State**: Tracks `editor.extensionStorage.aiSuggestion` for suggestions
- **Real-time Updates**: Listens to editor `update` and `selectionUpdate` events

### Integration Points

#### 1. Editor Storage Access
```typescript
// AI Response Storage
const storage = editor.storage.ai
const response = {
  content: storage.response || "",
  state: storage.state || "idle",
  error: storage.error
}

// AI Suggestions Storage
const extensionStorage = editor.extensionStorage.aiSuggestion
const suggestions = extensionStorage.getSuggestions()
```

#### 2. AI Commands Integration
```typescript
// AI Action Commands
editor.commands.aiSummarize?.()
editor.commands.aiTranslate?.()
editor.commands.aiContinue?.()

// Response Management Commands
editor.commands.aiAccept?.()
editor.commands.aiReject?.()
editor.commands.aiRegenerate?.()

// Suggestion Management Commands
editor.commands.aiAcceptSuggestion?.(id)
editor.commands.aiRejectSuggestion?.(id)
```

## Usage Examples

### Basic Integration
```tsx
import { AiContentPanel } from "@/components/tiptap-ui/ai-panel"

function Editor() {
  const editor = useEditor({
    extensions: [
      // ... other extensions
      Ai, // Tiptap Content AI extension
      AiSuggestion, // AI Suggestion extension
    ],
  })

  return (
    <div>
      <EditorContent editor={editor} />
      <AiContentPanel
        editor={editor}
        isOpen={true}
        className="ai-content-panel"
      />
    </div>
  )
}
```

### Advanced Configuration
```tsx
<AiContentPanel
  editor={editor}
  isOpen={isPanelOpen}
  onClose={() => setIsPanelOpen(false)}
  className="custom-ai-panel"
/>
```

## Styling Customization

### CSS Variables
The component uses CSS custom properties for theming:

```scss
// Panel Layout
--tt-toolbar-height: 60px
--tt-bg-color: #ffffff
--tt-border-color: #e5e7eb

// Typography
--tt-font-family-primary: "Inter", sans-serif
--tt-font-size-sm: 0.875rem
--tt-font-weight-semibold: 600

// Colors
--tt-text-primary: #111827
--tt-text-muted: #6b7280
--tt-brand-color-500: #3b82f6
--tt-green-600: #059669
--tt-red-600: #dc2626
```

### Custom Styling
```scss
.ai-content-panel {
  // Custom panel styling
  width: 450px;
  background: var(--custom-bg);
  
  .ai-panel-header {
    // Custom header styling
  }
  
  .ai-actions-card {
    // Custom actions styling
  }
}
```

## API Reference

### Props
```typescript
interface AiContentPanelProps {
  editor: Editor | null
  isOpen?: boolean
  onClose?: () => void
  className?: string
}
```

### State Interfaces
```typescript
interface AiResponse {
  content: string
  state: 'loading' | 'idle' | 'error'
  error?: string
}

interface AiSuggestion {
  id: string
  from: number
  to: number
  text: string
  rule: string
  message?: string
}
```

## Event Handling

### AI Action Handlers
```typescript
const handleAiAction = (command: string) => {
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
    // ... other commands
  }
}
```

### Suggestion Handlers
```typescript
const handleSuggestionAction = (id: string, action: 'accept' | 'reject') => {
  if (action === 'accept') {
    editor.commands.aiAcceptSuggestion?.(id)
  } else {
    editor.commands.aiRejectSuggestion?.(id)
  }
}
```

## Responsive Design

### Mobile Support
- Panel transforms to full-width overlay on mobile
- Touch-friendly button sizes
- Collapsible interface for better mobile UX

### Breakpoint Behavior
```scss
@media (max-width: 768px) {
  .ai-content-panel {
    width: 100%;
    transform: translateX(100%);
    
    &.open {
      transform: translateX(0);
    }
  }
}
```

## Performance Considerations

### Optimization Strategies
1. **Debounced Updates**: State updates are debounced to prevent excessive re-renders
2. **Error Boundaries**: Graceful error handling for missing extensions
3. **Memory Management**: Proper cleanup of event listeners
4. **Conditional Rendering**: Components only render when needed

### Best Practices
```typescript
// Use try-catch for storage access
try {
  const storage = editor.storage.ai
  // Access storage safely
} catch (error) {
  console.warn("Could not access AI storage:", error)
}

// Clean up event listeners
useEffect(() => {
  editor.on('update', handleUpdate)
  return () => {
    editor.off('update', handleUpdate)
  }
}, [editor])
```

## Troubleshooting

### Common Issues

#### 1. Panel Not Appearing
- Check if `editor` is properly initialized
- Verify `isOpen` prop is set to `true`
- Ensure CSS is properly imported

#### 2. AI Commands Not Working
- Verify Tiptap Content AI extension is installed
- Check if AI provider is configured
- Ensure commands are available in editor instance

#### 3. Suggestions Not Loading
- Confirm AI Suggestion extension is active
- Check `editor.extensionStorage.aiSuggestion` exists
- Verify suggestion data structure

#### 4. Styling Issues
- Import the SCSS file: `import "./ai-content-panel.scss"`
- Check CSS custom properties are defined
- Verify dark mode classes are applied

### Debug Mode
```typescript
// Enable debug logging
const DEBUG = true

if (DEBUG) {
  console.log('AI Storage:', editor.storage.ai)
  console.log('AI Suggestions:', editor.extensionStorage.aiSuggestion)
}
```

## Integration with Existing AI Systems

### Tiptap AI Agent Compatibility
The panel works alongside the Tiptap AI Agent extension:

```typescript
// Both systems can coexist
import AiAgent from "@tiptap-pro/extension-ai-agent"
import { Ai } from "@tiptap/extension-ai"

const extensions = [
  AiAgent.configure({ provider: aiAgentProvider }),
  Ai.configure({ provider: aiProvider }),
  AiSuggestion.configure({ provider: aiProvider })
]
```

### Custom AI Providers
```typescript
// Custom AI provider integration
const customAiProvider = {
  generate: async (prompt: string) => {
    // Custom AI logic
    return response
  }
}

// Use with Tiptap Content AI
Ai.configure({ provider: customAiProvider })
```

## Future Enhancements

### Planned Features
- **Streaming Response Animation**: Animated text appearance
- **Suggestion Grouping**: Group suggestions by category
- **Custom AI Actions**: User-defined AI commands
- **Keyboard Shortcuts**: Hotkey support for common actions
- **Analytics Integration**: Track AI usage patterns

### Extension Points
```typescript
// Custom action handlers
interface CustomAiAction {
  id: string
  label: string
  icon: React.ComponentType
  handler: () => void
}

// Custom suggestion renderers
interface CustomSuggestionRenderer {
  type: string
  component: React.ComponentType<SuggestionProps>
}
```

This AI Content Panel provides a complete solution for integrating Tiptap's Content AI system with a beautiful, functional UI that enhances the editing experience. 