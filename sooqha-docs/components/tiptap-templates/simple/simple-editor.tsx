/*
 * SIMPLE EDITOR COMPONENT
 * ======================
 * 
 * A professional document-style rich text editor built with TipTap.
 * Features:
 * - Document-style layout with bordered content area
 * - Comprehensive formatting toolbar (headings, lists, text styling)
 * - AI-powered writing assistance with side panel
 * - Responsive design (mobile/desktop optimized)
 * - Image upload with drag & drop
 * - Export functionality (PDF, Word, etc.)
 * - Page size controls (A4, Letter, etc.)
 * - Theme support (light/dark modes)
 * 
 * Component Structure:
 * - MainToolbarContent: Desktop toolbar with all formatting options
 * - MobileToolbarContent: Mobile toolbar with context switching
 * - SimpleEditor: Main component orchestrating everything
 * 
 * Layout:
 * ┌─────────────────────────────────────────┐
 * │              TOOLBAR (Fixed)            │
 * ├─────────────────────┬───────────────────┤
 * │    WRITING AREA     │   AI SIDE PANEL   │
 * │   (Centered Doc)    │  (Slide Panel)    │
 * └─────────────────────┴───────────────────┘
 */

"use client"

// ===== REACT & CORE IMPORTS =====
import * as React from "react"
import { EditorContent, EditorContext, useEditor } from "@tiptap/react"

// ===== TIPTAP CORE EXTENSIONS =====
// These provide the fundamental editing capabilities
import { StarterKit } from "@tiptap/starter-kit" // Basic editor functionality
import { Image } from "@tiptap/extension-image" // Image rendering
import { TaskItem, TaskList } from "@tiptap/extension-list" // Checkbox lists
import { TextAlign } from "@tiptap/extension-text-align" // Text alignment
import { Typography } from "@tiptap/extension-typography" // Smart typography
import { Highlight } from "@tiptap/extension-highlight" // Text highlighting
import { Subscript } from "@tiptap/extension-subscript" // Subscript text
import { Superscript } from "@tiptap/extension-superscript" // Superscript text
import { Selection } from "@tiptap/extensions" // Selection management

// ===== TABLE EXTENSIONS =====
import { Table } from "@tiptap/extension-table" // Table functionality
import { TableRow } from "@tiptap/extension-table-row" // Table row management
import { TableCell } from "@tiptap/extension-table-cell" // Table cell management
import { TableHeader } from "@tiptap/extension-table-header" // Table header cells

// ===== FONT SIZE EXTENSIONS =====
import { TextStyle } from "@tiptap/extension-text-style" // Text styling foundation
import { FontSize } from "@tiptap/extension-text-style" // Font size functionality

// ===== LINE SPACING EXTENSIONS =====
import { LineSpacing } from "@/components/tiptap-node/line-spacing-node/line-spacing-node-extension" // Line spacing functionality

// ===== FONT FAMILY EXTENSIONS =====
import { FontFamily } from "@/components/tiptap-node/font-family-node/font-family-node-extension" // Font family functionality

// ===== UI PRIMITIVE COMPONENTS =====
// Base UI building blocks for the editor interface
import { Button } from "@/components/tiptap-ui-primitive/button" // Styled buttons
import { Spacer } from "@/components/tiptap-ui-primitive/spacer" // Layout spacing
import {
  Toolbar,        // Main toolbar container
  ToolbarGroup,   // Groups related toolbar items
  ToolbarSeparator, // Visual separators between groups
} from "@/components/tiptap-ui-primitive/toolbar"

// ===== TIPTAP CUSTOM NODES =====
// Custom node extensions for enhanced functionality
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension" // Drag & drop image uploads
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension" // HR dividers

// ===== NODE STYLING IMPORTS =====
// SCSS imports for custom node appearance
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss" // Quote block styling
import "@/components/tiptap-node/code-block-node/code-block-node.scss" // Code block styling
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss" // HR styling
import "@/components/tiptap-node/list-node/list-node.scss" // List styling (bullets, numbers, tasks)
import "@/components/tiptap-node/image-node/image-node.scss" // Image styling
import "@/components/tiptap-node/heading-node/heading-node.scss" // Heading styling
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss" // Paragraph styling
import "@/components/tiptap-node/table-node/table-node.scss" // Table styling

// ===== TIPTAP UI COMPONENTS =====
// High-level UI components that combine primitives for specific editor functionality

import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu" // H1-H6 selector
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button" // Image upload trigger
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu" // List type selector
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button" // Quote formatting
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button" // Code block creation

// Color highlighting components with desktop/mobile variants
import {
  ColorHighlightPopover,        // Desktop popover with color picker
  ColorHighlightPopoverContent, // Mobile color picker content
  ColorHighlightPopoverButton,  // Mobile trigger button
} from "@/components/tiptap-ui/color-highlight-popover"

// Link creation components with desktop/mobile variants
import {
  LinkPopover,   // Desktop link popover
  LinkContent,   // Mobile link creation content
  LinkButton,    // Mobile link trigger button
} from "@/components/tiptap-ui/link-popover"

import { MarkButton } from "@/components/tiptap-ui/mark-button" // Text formatting (bold, italic, etc.)
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button" // Text alignment controls
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button" // History navigation

// ===== TABLE UI COMPONENTS =====
import { TableDropdownMenu } from "@/components/tiptap-ui/table-dropdown-menu" // Table insertion with options
import { TableControls } from "@/components/tiptap-ui/table-controls" // Table structure management

// ===== FONT SIZE UI COMPONENTS =====
import { FontSizeDropdown } from "@/components/tiptap-ui/font-size-dropdown" // Font size selection

// ===== SPACING UI COMPONENTS =====
import { SpacingDropdown } from "@/components/tiptap-ui/spacing-dropdown" // Line spacing selection

// ===== FONT FAMILY UI COMPONENTS =====
import { FontFamilyDropdown } from "@/components/tiptap-ui/font-family-dropdown" // Font family selection

// ===== TOOLBAR FEATURE COMPONENTS =====
import { ExportButton } from "@/components/tiptap-ui/export-button/export-button" // Document export functionality
import { PageSizeButton } from "@/components/tiptap-ui/page-size-button/page-size-button" // Page size controls (A4, Letter, etc.)
// AI toggle button will be added here when ready
import { FileExplorerButton, FileExplorerPanel } from "@/components/tiptap-ui/file-explorer-panel" // File explorer toggle and panel


// ===== ICON COMPONENTS =====
// SVG icon components for mobile toolbar navigation
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon" // Back navigation
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon" // Highlight tool indicator
import { LinkIcon } from "@/components/tiptap-icons/link-icon" // Link tool indicator

// ===== CUSTOM HOOKS =====
// React hooks for responsive behavior and editor state
import { useIsMobile } from "@/hooks/use-mobile" // Mobile device detection
import { useWindowSize } from "@/hooks/use-window-size" // Window dimensions tracking
import { useCursorVisibility } from "@/hooks/use-cursor-visibility" // Cursor position for mobile toolbar
import { useScrolling } from "@/hooks/use-scrolling" // Scroll state detection

// ===== TEMPLATE-SPECIFIC COMPONENTS =====
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle" // Light/dark mode toggle

// ===== AI INTEGRATION =====
import { AiPanelButton, AiPanel } from "@/components/tiptap-ui/ai-panel" // AI assistant panel

// ===== UTILITY FUNCTIONS =====
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils" // Image upload handling

// ===== STYLING =====
import "@/components/tiptap-templates/simple/simple-editor.scss" // Component-specific styles

// ===== DEFAULT CONTENT =====
import content from "@/components/tiptap-templates/simple/data/content.json" // Initial editor content

/*
 * MAIN TOOLBAR CONTENT COMPONENT
 * =============================
 * 
 * Desktop toolbar that displays all formatting options in a single horizontal bar.
 * On mobile, this switches to context-sensitive toolbars for better usability.
 * 
 * Toolbar Structure (left to right):
 * 1. Export tools
 * 2. Page size controls
 * 3. History (undo/redo)
 * 4. Content structure (headings, lists, quotes, code)
 * 5. Text formatting (bold, italic, strike, code, underline, highlight, links)
 * 6. Special formatting (superscript, subscript)
 * 7. Text alignment (left, center, right, justify)
 * 8. Media insertion (images)
 * 9. AI tools and theme toggle
 */
const MainToolbarContent = ({
  onHighlighterClick,  // Mobile: Navigate to highlighter toolbar
  onLinkClick,         // Mobile: Navigate to link toolbar
  isMobile,            // Device type for responsive behavior
  pageSize,            // Current page size (A4, Letter, etc.)
  onPageSizeChange,    // Page size change handler
  isAIOpen,            // AI panel open state
  onAIToggle,          // AI panel toggle handler
  isFileExplorerOpen,  // File explorer panel open state
  onFileExplorerToggle, // File explorer panel toggle handler
}: {
  onHighlighterClick: () => void
  onLinkClick: () => void
  isMobile: boolean
  pageSize: string
  onPageSizeChange: (size: string) => void
  isAIOpen: boolean
  onAIToggle: () => void
  isFileExplorerOpen: boolean
  onFileExplorerToggle: () => void
}) => {
  return (
    <>
      {/* === DOCUMENT ACTIONS GROUP === */}
      <ToolbarGroup>
        <FileExplorerButton
          isOpen={isFileExplorerOpen}
          onToggle={onFileExplorerToggle}
        /> {/* File explorer toggle */}
        <ExportButton /> {/* PDF, Word, etc. export functionality */}
      </ToolbarGroup>
      
      <Spacer /> {/* Push remaining content to the right */}
      
      <ToolbarSeparator />

      {/* === PAGE LAYOUT GROUP === */}
      <ToolbarGroup>
        <PageSizeButton 
          currentSize={pageSize}
          onSizeChange={onPageSizeChange}
        /> {/* A4, Letter, Legal page size selection */}
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* === HISTORY NAVIGATION GROUP === */}
      <ToolbarGroup>
        <UndoRedoButton action="undo" /> {/* Undo last action */}
        <UndoRedoButton action="redo" /> {/* Redo last undone action */}
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* === CONTENT STRUCTURE GROUP === */}
      <ToolbarGroup>
        {/* Heading level selector (H1-H4) */}
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
        
        <FontSizeDropdown portal={isMobile} /> {/* Font size selection */}
        <FontFamilyDropdown portal={isMobile} /> {/* Font family selection */}
        
        {/* List type selector (bullets, numbers, tasks) */}
        <ListDropdownMenu
          types={["bulletList", "orderedList", "taskList"]}
          portal={isMobile}
        />
        
        <CodeBlockButton />   {/* Code block creation */}
        <TableDropdownMenu portal={isMobile} /> {/* Table insertion with options */}
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* === TEXT FORMATTING GROUP === */}
      <ToolbarGroup>
        {/* Basic text styling */}
        <MarkButton type="bold" />      {/* **Bold** text */}
        <MarkButton type="italic" />    {/* *Italic* text */}
        <MarkButton type="strike" />    {/* ~~Strikethrough~~ text */}
        <MarkButton type="underline" /> {/* Underlined text */}
        
        {/* Advanced formatting with desktop/mobile variants */}
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        
        {!isMobile ? (
          <LinkPopover />
        ) : (
          <LinkButton onClick={onLinkClick} />
        )}
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* === SPECIAL FORMATTING GROUP === */}
      <ToolbarGroup>
        <MarkButton type="superscript" /> {/* X² superscript text */}
        <MarkButton type="subscript" />   {/* X₂ subscript text */}
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* === TEXT ALIGNMENT GROUP === */}
      <ToolbarGroup>
        <TextAlignButton align="left" />    {/* Left-align text */}
        <TextAlignButton align="center" />  {/* Center-align text */}
        <TextAlignButton align="right" />   {/* Right-align text */}
        <SpacingDropdown portal={isMobile} /> {/* Line spacing selection */}
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* === MEDIA INSERTION GROUP === */}
      <ToolbarGroup>
        <ImageUploadButton /> {/* Drag & drop image upload */}
      </ToolbarGroup>

      <Spacer /> {/* Push AI and theme controls to far right */}

      {/* Mobile-only separator before final group */}
      {isMobile && <ToolbarSeparator />}

      {/* === AI & SETTINGS GROUP === */}
      <ToolbarGroup>
        <AiPanelButton
          isOpen={isAIOpen}
          onToggle={onAIToggle}
        /> {/* AI writing assistant panel toggle */}
        <ThemeToggle /> {/* Light/dark mode toggle */}
      </ToolbarGroup>
    </>
  )
}

/*
 * MOBILE TOOLBAR CONTENT COMPONENT
 * ================================
 * 
 * Mobile-specific toolbar that replaces the main toolbar when users
 * navigate to specific tools (highlighter or link creation).
 * This provides a focused, touch-friendly interface for complex operations.
 * 
 * Features:
 * - Back navigation to return to main toolbar
 * - Context-specific tool content
 * - Touch-optimized button sizes
 */
const MobileToolbarContent = ({
  type,    // Which tool is active: "highlighter" or "link"
  onBack,  // Navigate back to main toolbar
}: {
  type: "highlighter" | "link"
  onBack: () => void
}) => (
  <>
    {/* === NAVIGATION GROUP === */}
    <ToolbarGroup>
      {/* Back button with current tool indicator */}
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {/* === TOOL-SPECIFIC CONTENT === */}
    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
)

/*
 * SIMPLE EDITOR MAIN COMPONENT
 * ============================
 * 
 * The main editor component that orchestrates the entire document editing experience.
 * This component handles:
 * 
 * 1. **Editor State Management**
 *    - TipTap editor instance with all extensions
 *    - Document content and formatting state
 *    - Undo/redo history
 * 
 * 2. **Responsive UI State**
 *    - Mobile vs desktop behavior
 *    - Toolbar context switching on mobile
 *    - Window size and cursor position tracking
 * 
 * 3. **Feature State**
 *    - AI panel visibility
 *    - Page size settings
 *    - Theme management
 * 
 * 4. **Layout Coordination**
 *    - Toolbar positioning (fixed/floating)
 *    - Content area sizing
 *    - AI panel integration
 */
export function SimpleEditor() {
  // ===== RESPONSIVE BEHAVIOR HOOKS =====
  const isMobile = useIsMobile()       // Detect mobile devices for UI adaptation
  const windowSize = useWindowSize()   // Track window dimensions for layout calculations
  
  // ===== MOBILE UI STATE =====
  // Controls which toolbar is shown on mobile devices
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"  // main: default toolbar, others: context-specific
  >("main")
  
  // ===== REFS FOR DOM MANIPULATION =====
  const toolbarRef = React.useRef<HTMLDivElement>(null) // Reference for toolbar height calculations
  
  // ===== DOCUMENT SETTINGS STATE =====
  const [pageSize, setPageSize] = React.useState("a4")        // Document page size (A4, Letter, etc.)
  const [isAIOpen, setIsAIOpen] = React.useState(false)       // AI assistant panel visibility
  const [isFileExplorerOpen, setIsFileExplorerOpen] = React.useState(false) // File explorer panel visibility
  const [isDragging, setIsDragging] = React.useState(false)   // Track drag state for z-index management
  
  // ===== DEBUG LOGGING =====
  // AI panel debugging will be added here when ready

  // Track file explorer panel state changes for debugging
  React.useEffect(() => {
    console.log('isFileExplorerOpen state changed:', isFileExplorerOpen);
  }, [isFileExplorerOpen]);



  // ===== TIPTAP EDITOR CONFIGURATION =====
  const editor = useEditor({
    // Performance optimizations
    immediatelyRender: false,        // Defer initial render for better performance
    shouldRerenderOnTransaction: false, // Optimize re-rendering behavior
    
    // Editor DOM properties
    editorProps: {
      attributes: {
        // Disable browser autocomplete features for cleaner editing
        autocomplete: "off",
        autocorrect: "off", 
        autocapitalize: "off",
        
        // Accessibility label for screen readers
        "aria-label": "Main content area, start typing to enter text.",
        
        // CSS class for styling the editing area
        class: "simple-editor",
      },
    },
    
    // TipTap extensions that provide editor functionality
    extensions: [
      // ===== CORE FUNCTIONALITY =====
      StarterKit.configure({
        horizontalRule: false, // Disable default HR (we use custom)
        link: {
          openOnClick: false,        // Links don't open automatically
          enableClickSelection: true, // Allow clicking to select links
        },
      }),
      
      // ===== CUSTOM NODES =====
      HorizontalRule,              // Custom horizontal rule implementation
      
      // ===== TEXT FORMATTING =====
      TextAlign.configure({ 
        types: ["heading", "paragraph"] // Apply alignment to headings and paragraphs
      }),
      Highlight.configure({ 
        multicolor: true           // Enable multiple highlight colors
      }),
      Typography,                  // Smart typography (quotes, dashes, etc.)
      Superscript,                 // X² formatting
      Subscript,                   // X₂ formatting
      
      // ===== LISTS =====
      TaskList,                    // Checkbox task lists
      TaskItem.configure({ 
        nested: true               // Allow nested task items
      }),
      
      // ===== TABLES =====
      Table.configure({
        resizable: true,           // Allow column resizing
        handleWidth: 5,            // Width of resize handle
        cellMinWidth: 100,         // Minimum cell width
      }),
      TableRow,                    // Table row management
      TableCell,                   // Table cell management
      TableHeader,                 // Table header cells
      
      // ===== FONT SIZE =====
      TextStyle,                   // Text styling foundation
      FontSize.configure({
        types: ['textStyle'],      // Apply to textStyle marks
      }),
      
      // ===== LINE SPACING =====
      LineSpacing,                // Line spacing functionality
      
      // ===== FONT FAMILY =====
      FontFamily,                 // Font family functionality
      
      // ===== MEDIA =====
      Image,                       // Basic image support
      ImageUploadNode.configure({  // Enhanced image upload with drag & drop
        accept: "image/*",         // Accept all image types
        maxSize: MAX_FILE_SIZE,    // File size limit
        limit: 3,                  // Maximum 3 images at once
        upload: handleImageUpload, // Custom upload handler
        onError: (error) => console.error("Upload failed:", error), // Error handling
      }),
      
      // ===== EDITOR ENHANCEMENTS =====
      Selection,                   // Selection management and events
    ],
    
    // ===== INITIAL CONTENT =====
    content, // Load default content from JSON file
  })

  // ===== UI BEHAVIOR HOOKS =====
  const isScrolling = useScrolling()   // Track scroll state for mobile toolbar hiding
  const rect = useCursorVisibility({   // Track cursor position for mobile toolbar positioning
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0, // Account for toolbar height
  })



  // ===== RESPONSIVE BEHAVIOR EFFECTS =====
  // Reset mobile toolbar view when switching to desktop
  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main") // Always show main toolbar on desktop
    }
  }, [isMobile, mobileView])

  // ===== RENDER =====
  return (
    <div className="simple-editor-wrapper"> {/* Root container with flexbox layout */}
      {/* Provide editor instance to all child components */}
      <EditorContext.Provider value={{ editor }}>
        
        {/* === DYNAMIC TOOLBAR === */}
        <Toolbar
          ref={toolbarRef} // Reference for height calculations
          className={isDragging ? "pointer-events-none" : ""}  // Disable pointer events during drag
          style={{
            // Hide toolbar while scrolling on mobile for better UX
            ...(isScrolling && isMobile
              ? { opacity: 0, transition: "opacity 0.1s ease-in-out" }
              : {}),
            // Position toolbar above cursor on mobile
            ...(isMobile
              ? {
                  bottom: `calc(100% - ${windowSize.height - rect.y}px)`,
                }
              : {}),
          }}
        >
          {/* Conditional toolbar content based on mobile view state */}
          {mobileView === "main" ? (
            // Desktop toolbar or mobile main toolbar
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")} // Navigate to color picker
              onLinkClick={() => setMobileView("link")}               // Navigate to link creator
              isMobile={isMobile}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
              isAIOpen={isAIOpen}
              onAIToggle={() => setIsAIOpen(!isAIOpen)}
              isFileExplorerOpen={isFileExplorerOpen}
              onFileExplorerToggle={() => setIsFileExplorerOpen(!isFileExplorerOpen)}
            />
          ) : (
            // Mobile context-specific toolbar (highlighter or link)
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")} // Return to main toolbar
            />
          )}
        </Toolbar>

        {/* === MAIN EDITOR CONTENT === */}
        <EditorContent
          editor={editor}
          role="presentation" // Accessibility role
          className={`simple-editor-content page-size-${pageSize}`} // Dynamic page size class
        />

        {/* === FILE EXPLORER PANEL (OVERLAY) === */}
        <div 
          className={`fixed left-0 transition-transform duration-300 ease-out ${
            isFileExplorerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ 
            top: 'var(--tt-toolbar-height)',
            height: 'calc(100vh - var(--tt-toolbar-height))',
            width: '320px',
            zIndex: isDragging ? 100 : 40  // Boost z-index during drag
          }}
        >
          <FileExplorerPanel
            editor={editor}           // Pass editor for integration
            height="100%"             // Full height
            width="90%"              // Fill container width
            panelClassName="tt-file-explorer-panel--attached" // Attach to left edge
            onSelect={(node) => {
              console.log('Selected file:', node);
              // You can add file selection logic here
            }}
            onMove={(draggedId, targetId) => {
              console.log('Moved file:', draggedId, 'to:', targetId);
              // You can add file move logic here
            }}
            onDragStart={() => setIsDragging(true)}   // Boost z-index during drag
            onDragEnd={() => setIsDragging(false)}    // Reset z-index after drag
          />
        </div>

        {/* === AI ASSISTANT PANEL === */}
        {/* === AI ASSISTANT PANEL === */}
        <div 
          className={`fixed right-0 top-0 transition-transform duration-300 ease-out ${
            isAIOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ 
            top: 'var(--tt-toolbar-height)',
            height: 'calc(100vh - var(--tt-toolbar-height))',
            width: '320px',
            zIndex: 40
          }}
        >
          <AiPanel
            editor={editor}           // Pass editor for content analysis
            height="100%"             // Full height
            width="100%"              // Fill container width
            panelClassName="tt-ai-panel--attached" // Attach to right edge
            onAgent={(agent) => {
              console.log('Agent action executed:', agent.name);
              // You can add Agent action logic here
            }}
            onInsert={(content) => {
              console.log('Inserting AI content:', content);
              // Content is automatically inserted by the hook
            }}
            onReplace={(content) => {
              console.log('Replacing with AI content:', content);
              // Content is automatically replaced by the hook
            }}
            onRetry={() => {
              console.log('Retrying AI request');
              // You can add retry logic here
            }}
            onPromptSubmit={(prompt) => {
              console.log('AI prompt submitted:', prompt);
              // You can add AI prompt handling here
            }}
          />
        </div>
      </EditorContext.Provider>
    </div>
  )
}
