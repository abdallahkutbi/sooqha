import { FileExplorerButton } from "@/components/tiptap-ui/file-explorer-panel"
import { ExportButton } from "@/components/tiptap-ui/export-button/export-button"
import { ImportButton } from "@/components/tiptap-ui/import-button/import-button"
import { PageSizeSelector } from "@/components/page-layout/PageSizeSelector"
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button"
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu"
import { FontSizeDropdown } from "@/components/tiptap-ui/font-size-dropdown"
import { FontFamilyDropdown } from "@/components/tiptap-ui/font-family-dropdown"
import { FontColorButton } from "@/components/tiptap-ui/font-color-button/font-color-button"
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu"
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button"
import { TableDropdownMenu } from "@/components/tiptap-ui/table-dropdown-menu"
import { MarkButton } from "@/components/tiptap-ui/mark-button"
import { ColorHighlightPopover, ColorHighlightPopoverButton } from "@/components/tiptap-ui/color-highlight-popover"
import { LinkPopover, LinkButton } from "@/components/tiptap-ui/link-popover"
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button"
import { SpacingDropdown } from "@/components/tiptap-ui/spacing-dropdown"
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button"
import { AIToggleButton } from "@/components/tiptap-ui/ai-toggle-button"
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle"

export interface ToolbarItem {
  id: string
  component?: React.ComponentType<any>
  mobileComponent?: React.ComponentType<any>
  props?: Record<string, any>
  mobileProps?: Record<string, any>
  isSeparator?: boolean
  isSpacer?: boolean
  showOnMobile?: boolean
  showOnDesktop?: boolean
}

export const DEFAULT_TOOLBAR: ToolbarItem[] = [
  // Document Actions Group
  { id: "file-explorer", component: FileExplorerButton },
  { id: "export", component: ExportButton },
  { id: "import", component: ImportButton },
  { id: "spacer-1", isSpacer: true },
  { id: "separator-1", isSeparator: true },
  
  // Page Size Group
  { id: "page-size", component: PageSizeSelector },
  { id: "separator-2", isSeparator: true },
  
  // History Group
  { id: "undo", component: UndoRedoButton, props: { action: "undo" } },
  { id: "redo", component: UndoRedoButton, props: { action: "redo" } },
  { id: "separator-3", isSeparator: true },
  
  // Content Structure Group
  { id: "heading", component: HeadingDropdownMenu, props: { levels: [1, 2, 3, 4] } },
  { id: "font-size", component: FontSizeDropdown },
  { id: "font-family", component: FontFamilyDropdown },
  { id: "font-color", component: FontColorButton },
  { id: "list", component: ListDropdownMenu, props: { types: ["bulletList", "orderedList", "taskList"] } },
  { id: "code-block", component: CodeBlockButton },
  { id: "table", component: TableDropdownMenu },
  { id: "separator-4", isSeparator: true },
  
  // Text Formatting Group
  { id: "bold", component: MarkButton, props: { type: "bold" } },
  { id: "italic", component: MarkButton, props: { type: "italic" } },
  { id: "strike", component: MarkButton, props: { type: "strike" } },
  { id: "underline", component: MarkButton, props: { type: "underline" } },
  { 
    id: "highlight", 
    component: ColorHighlightPopover,
    mobileComponent: ColorHighlightPopoverButton,
    mobileProps: { onClick: "onHighlighterClick" }
  },
  { 
    id: "link", 
    component: LinkPopover,
    mobileComponent: LinkButton,
    mobileProps: { onClick: "onLinkClick" }
  },
  { id: "separator-5", isSeparator: true },
  
  // Text Alignment Group
  { id: "align-left", component: TextAlignButton, props: { align: "left" } },
  { id: "align-center", component: TextAlignButton, props: { align: "center" } },
  { id: "align-right", component: TextAlignButton, props: { align: "right" } },
  { id: "spacing", component: SpacingDropdown },
  { id: "separator-6", isSeparator: true },
  
  // Media Group
  { id: "image-upload", component: ImageUploadButton },
  { id: "spacer-2", isSpacer: true },
  
  // AI & Settings Group
  { id: "ai-toggle", component: AIToggleButton },
  { id: "theme-toggle", component: ThemeToggle },
]

export const STORAGE_KEY = "tiptap-toolbar-order"

export function saveToolbarOrder(items: ToolbarItem[]): void {
  try {
    // Only run on client side
    if (typeof window === 'undefined') return
    
    const order = items.map(item => item.id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order))
  } catch (error) {
    console.warn("Failed to save toolbar order:", error)
  }
}

export function loadToolbarOrder(): string[] | null {
  try {
    // Only run on client side
    if (typeof window === 'undefined') return null
    
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return null
    
    const order = JSON.parse(saved)
    if (!Array.isArray(order)) return null
    
    return order
  } catch (error) {
    console.warn("Failed to load toolbar order:", error)
    return null
  }
}

export function getToolbarItems(): ToolbarItem[] {
  // Only try to load saved order on client side
  const savedOrder = typeof window !== 'undefined' ? loadToolbarOrder() : null
  
  if (!savedOrder) {
    return DEFAULT_TOOLBAR
  }
  
  // Create a map of default items for quick lookup
  const defaultItemsMap = new Map(DEFAULT_TOOLBAR.map(item => [item.id, item]))
  
  // Build the ordered array based on saved order
  const orderedItems: ToolbarItem[] = []
  const usedIds = new Set<string>()
  
  // Add items in saved order
  for (const id of savedOrder) {
    const item = defaultItemsMap.get(id)
    if (item) {
      orderedItems.push(item)
      usedIds.add(id)
    }
  }
  
  // Add any missing items from default order
  for (const item of DEFAULT_TOOLBAR) {
    if (!usedIds.has(item.id)) {
      orderedItems.push(item)
    }
  }
  
  return orderedItems
} 