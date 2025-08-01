import * as React from "react"

// --- Hooks ---
import { useFileExplorerPanel } from "./use-file-explorer-panel"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- UI ---
import { Input } from "@/components/tiptap-ui-primitive/input"
import { Separator } from "@/components/tiptap-ui-primitive/separator"
import type { Editor } from "@tiptap/react"

// --- Icons ---
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  File,
  FileText,
  Image,
  Code,
  Music,
  Video,
  Search,
  GripVertical,
  ArrowUpDown,
  SortAsc,
  SortDesc,
} from "lucide-react"

// --- DnD ---
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

// --- Utils ---
import { cn } from "@/lib/utils"

export interface FileNode {
  id: string
  name: string
  type: "folder" | "file"
  children?: FileNode[]
  extension?: string
  parentId?: string
}

export type SortType = "name-asc" | "name-desc" | "type" | "none"

export interface FileExplorerPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null
  /**
   * File tree data structure
   */
  data?: FileNode[]
  /**
   * Callback when a file/folder is selected
   */
  onSelect?: (node: FileNode) => void
  /**
   * Callback when a file/folder is moved via drag & drop
   */
  onMove?: (draggedId: string, targetId: string) => void
  /**
   * Whether the panel should hide when not available.
   * @default false
   */
  hideWhenUnavailable?: boolean
  /**
   * Callback function called after a successful selection.
   */
  onSelected?: () => void
  /**
   * Optional text to display alongside the icon.
   */
  text?: string
  /**
   * Optional show shortcut keys in the button.
   * @default false
   */
  showShortcut?: boolean
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
  variant?: "side" | "full-height" | "attached" | "compact"
  /**
   * Callback when drag starts
   */
  onDragStart?: () => void
  /**
   * Callback when drag ends
   */
  onDragEnd?: () => void
}

interface DragItem {
  id: string
  type: string
  node: FileNode
}

interface FileTreeItemProps {
  node: FileNode
  level: number
  onSelect?: (node: FileNode) => void
  onMove?: (draggedId: string, targetId: string) => void
  selectedId?: string
  searchTerm?: string
  onDragStart?: () => void
  onDragEnd?: () => void
}

const getFileIcon = (extension?: string) => {
  if (!extension) return File

  switch (extension.toLowerCase()) {
    case "tsx":
    case "ts":
    case "js":
    case "jsx":
      return Code
    case "md":
    case "txt":
      return FileText
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
      return Image
    case "mp3":
    case "wav":
    case "flac":
      return Music
    case "mp4":
    case "avi":
    case "mov":
      return Video
    default:
      return File
  }
}

const FileTreeItem: React.FC<FileTreeItemProps> = ({
  node,
  level,
  onSelect,
  onMove,
  selectedId,
  searchTerm,
  onDragStart,
  onDragEnd,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const hasChildren = node.children && node.children.length > 0
  const isSelected = selectedId === node.id

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "file-node",
    item: { id: node.id, type: "file-node", node },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => true,
  }), [node])

  // Track drag state changes with useEffect
  const wasDraggingRef = React.useRef(false)
  React.useEffect(() => {
    if (isDragging && !wasDraggingRef.current) {
      wasDraggingRef.current = true
      onDragStart?.()
    } else if (!isDragging && wasDraggingRef.current) {
      wasDraggingRef.current = false
      onDragEnd?.()
    }
  }, [isDragging, onDragStart, onDragEnd])

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "file-node",
    drop: (item: DragItem, monitor) => {
      if (!monitor.didDrop() && item.id !== node.id && node.type === "folder") {
        console.log('Drop detected:', item.id, 'onto', node.id)
        onMove?.(item.id, node.id)
      }
    },
    canDrop: (item: DragItem) => {
      return item.id !== node.id && node.type === "folder"
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
    hover: (item: DragItem, monitor) => {
      if (!monitor.isOver({ shallow: true })) return
      // Optional: Add hover effects here
    },
  }), [node, onMove])

  const handleClick = () => {
    if (node.type === "folder") {
      setIsExpanded(!isExpanded)
    }
    onSelect?.(node)
  }

  const FileIcon = node.type === "file" ? getFileIcon(node.extension) : null

  const highlightMatch = (text: string, term: string) => {
    if (!term) return text
    const regex = new RegExp(`(${term})`, "gi")
    const parts = text.split(regex)
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="tt-file-explorer-highlight">
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  return (
    <div>
      <div
        ref={(el) => {
          if (el) {
            drag(el)
            drop(el)
          }
        }}
        className={cn(
          "tt-file-explorer-item",
          isSelected && "tt-file-explorer-item--selected",
          isDragging && "tt-file-explorer-item--dragging",
          isOver && canDrop && "tt-file-explorer-item--drop-target"
        )}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={handleClick}
      >
        {/* Drag handle */}
        <GripVertical className="tt-file-explorer-drag-handle" />

        {node.type === "folder" && (
          <div className="tt-file-explorer-chevron">
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className="tt-file-explorer-chevron-icon" />
              ) : (
                <ChevronRight className="tt-file-explorer-chevron-icon" />
              )
            ) : null}
          </div>
        )}

        {node.type === "folder" ? (
          isExpanded ? (
            <FolderOpen className="tt-file-explorer-folder-icon tt-file-explorer-folder-icon--open" />
          ) : (
            <Folder className="tt-file-explorer-folder-icon" />
          )
        ) : (
          FileIcon && <FileIcon className="tt-file-explorer-file-icon" />
        )}

        <span className="tt-file-explorer-label">
          {highlightMatch(node.name, searchTerm || "")}
        </span>
      </div>

      {node.type === "folder" && isExpanded && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <FileTreeItem
              key={child.id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              onMove={onMove}
              selectedId={selectedId}
              searchTerm={searchTerm}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const filterNodes = (nodes: FileNode[], searchTerm: string): FileNode[] => {
  if (!searchTerm) return nodes

  return nodes.reduce<FileNode[]>((acc, node) => {
    const matchesSearch = node.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const filteredChildren = node.children
      ? filterNodes(node.children, searchTerm)
      : []

    if (matchesSearch || filteredChildren.length > 0) {
      acc.push({
        ...node,
        children: filteredChildren,
      })
    }

    return acc
  }, [])
}

const sortNodes = (nodes: FileNode[], sortType: SortType): FileNode[] => {
  if (sortType === "none") return nodes

  const sorted = [...nodes].sort((a, b) => {
    switch (sortType) {
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      case "type":
        // Folders first, then files
        if (a.type === b.type) {
          return a.name.localeCompare(b.name)
        }
        return a.type === "folder" ? -1 : 1
      default:
        return 0
    }
  })

  // Recursively sort children
  return sorted.map(node => ({
    ...node,
    children: node.children ? sortNodes(node.children, sortType) : undefined
  }))
}

const limitVisibleNodes = (nodes: FileNode[], maxItems: number = 10): FileNode[] => {
  return nodes.slice(0, maxItems).map(node => ({
    ...node,
    children: node.children ? limitVisibleNodes(node.children, maxItems) : undefined
  }))
}

const FileExplorerContent: React.FC<{
  data: FileNode[]
  onSelect?: (node: FileNode) => void
  onMove: (draggedId: string, targetId: string) => void
  panelClassName?: string
  height?: string
  width?: string
  variant?: "side" | "full-height" | "attached" | "compact"
  onDragStart?: () => void
  onDragEnd?: () => void
}> = ({ data, onSelect, onMove, panelClassName, height = "auto", width = "320px", variant = "side", onDragStart, onDragEnd }) => {
  const [selectedId, setSelectedId] = React.useState<string>()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [sortType, setSortType] = React.useState<SortType>("type")

  const processedData = React.useMemo(() => {
    let processed = data
    
    // Apply filtering first
    if (searchTerm) {
      processed = filterNodes(processed, searchTerm)
    }
    
    // Apply sorting
    processed = sortNodes(processed, sortType)
    
    // Limit visible items when not searching
    if (!searchTerm) {
      processed = limitVisibleNodes(processed, 10)
    }
    
    // Debug: Log processed data to check file names
    console.log('📁 File Explorer - processedData:', processed);
    console.log('📁 File Explorer - first item name:', processed[0]?.name);
    
    return processed
  }, [data, searchTerm, sortType])

  const handleSelect = (node: FileNode) => {
    setSelectedId(node.id)
    onSelect?.(node)
  }

  const handleSortToggle = () => {
    const sortOrder: SortType[] = ["type", "name-asc", "name-desc", "none"]
    const currentIndex = sortOrder.indexOf(sortType)
    const nextIndex = (currentIndex + 1) % sortOrder.length
    setSortType(sortOrder[nextIndex])
  }

  const getSortIcon = () => {
    switch (sortType) {
      case "name-asc":
        return <SortAsc />
      case "name-desc":
        return <SortDesc />
      case "type":
      case "none":
      default:
        return <ArrowUpDown />
    }
  }

  return (
    <div
      className={cn(
        "tt-file-explorer-panel",
        variant && `tt-file-explorer-panel--${variant}`,
        panelClassName
      )}
      style={{ height, width }}
    >
      <div className="tt-file-explorer-header">
        <h3 className="tt-file-explorer-title">Explorer</h3>
        <div className="tt-file-explorer-header-actions">
          <div className="tt-file-explorer-search-container">
            <Search className="tt-file-explorer-search-icon" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="tt-file-explorer-search-input"
            />
          </div>
          <button
            className="tt-file-explorer-sort-button"
            onClick={handleSortToggle}
            title={`Sort: ${sortType}`}
          >
            {getSortIcon()}
          </button>
        </div>
      </div>
      <Separator className="tt-file-explorer-separator" />
      <div className="tt-file-explorer-content">
        <div className="tt-file-explorer-tree">
          {processedData.length > 0 ? (
            processedData.map((node) => (
              <FileTreeItem
                key={node.id}
                node={node}
                level={0}
                onSelect={handleSelect}
                onMove={onMove}
                selectedId={selectedId}
                searchTerm={searchTerm}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
            ))
          ) : searchTerm ? (
            <div className="tt-file-explorer-no-results">
              No files found for "{searchTerm}"
            </div>
          ) : (
            <div className="tt-file-explorer-no-results">
              Showing first 10 items
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * File Explorer Panel component for browsing and managing files in a Tiptap editor.
 *
 * For custom implementations, use the `useFileExplorerPanel` hook instead.
 */
export const FileExplorerPanel = React.forwardRef<
  HTMLDivElement,
  FileExplorerPanelProps
>(
  (
    {
      editor: providedEditor,
      data,
      onSelect,
      onMove,
      hideWhenUnavailable = false,
      onSelected,
      panelClassName,
      height,
      width,
      variant = "side",
      onDragStart,
      onDragEnd,
      ...props
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const {
      isVisible,
      fileData,
      handleMove,
      handleSelect,
    } = useFileExplorerPanel({
      editor,
      data,
      onSelect,
      onMove,
      hideWhenUnavailable,
      onSelected,
    })

    if (!isVisible) {
      return null
    }

    return (
      <div ref={ref} {...props}>
        <DndProvider backend={HTML5Backend}>
          <FileExplorerContent
            data={fileData}
            onSelect={handleSelect}
            onMove={handleMove}
            panelClassName={panelClassName}
            height={height}
            width={width}
            variant={variant}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        </DndProvider>
      </div>
    )
  }
)

FileExplorerPanel.displayName = "FileExplorerPanel"