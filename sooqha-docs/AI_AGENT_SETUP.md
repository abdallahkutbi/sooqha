# AI Agent Setup Guide

## Configuration

To use the Tiptap AI Agent extension, you need to configure your Tiptap Cloud credentials.

### 1. Get Your Credentials

1. Go to your [Tiptap Cloud dashboard](https://cloud.tiptap.dev)
2. Create a new app or use an existing one
3. Copy your `App ID` and `Token`

### 2. Environment Variables

Create a `.env.local` file in the root directory with:

```bash
NEXT_PUBLIC_TIPTAP_APP_ID=your-app-id-here
NEXT_PUBLIC_TIPTAP_TOKEN=your-token-here
```

### 3. Usage

The AI Agent is now integrated into your editor. You can:

- Use the AI menu (floating on the right side)
- Call AI functions programmatically
- Access AI state and messages

### 4. Testing

To test the AI Agent, you can:

1. Select some text in the editor
2. Use the AI menu to run commands
3. Check the browser console for AI Agent logs

## Features

- ✅ **Selection Awareness**: AI understands selected text
- ✅ **Context Awareness**: AI has access to document context
- ✅ **Real-time Updates**: State changes are logged
- ✅ **Error Handling**: Errors are caught and logged

## Next Steps

1. Configure your Tiptap Cloud credentials
2. Test the AI Agent functionality
3. Customize the AI prompts and responses
4. Integrate with your existing AI panel 