import * as React from "react"
import type { Editor } from "@tiptap/react"
import type { FileNode } from "./file-explorer-panel"

// Default mock data for demonstration
const defaultMockData: FileNode[] = [
  {
    id: "1",
    name: "src",
    type: "folder",
    children: [
      {
        id: "2",
        name: "components",
        type: "folder",
        parentId: "1",
        children: [
          {
            id: "3",
            name: "Button.tsx",
            type: "file",
            extension: "tsx",
            parentId: "2",
          },
          {
            id: "4",
            name: "Input.tsx",
            type: "file",
            extension: "tsx",
            parentId: "2",
          },
          {
            id: "5",
            name: "ui",
            type: "folder",
            parentId: "2",
            children: [
              {
                id: "6",
                name: "dialog.tsx",
                type: "file",
                extension: "tsx",
                parentId: "5",
              },
              {
                id: "7",
                name: "tooltip.tsx",
                type: "file",
                extension: "tsx",
                parentId: "5",
              },
            ],
          },
        ],
      },
      {
        id: "8",
        name: "pages",
        type: "folder",
        parentId: "1",
        children: [
          {
            id: "9",
            name: "Home.tsx",
            type: "file",
            extension: "tsx",
            parentId: "8",
          },
          {
            id: "10",
            name: "About.tsx",
            type: "file",
            extension: "tsx",
            parentId: "8",
          },
        ],
      },
      {
        id: "11",
        name: "App.tsx",
        type: "file",
        extension: "tsx",
        parentId: "1",
      },
      {
        id: "12",
        name: "index.css",
        type: "file",
        extension: "css",
        parentId: "1",
      },
    ],
  },
  {
    id: "13",
    name: "public",
    type: "folder",
    children: [
      {
        id: "14",
        name: "logo.svg",
        type: "file",
        extension: "svg",
        parentId: "13",
      },
      {
        id: "15",
        name: "favicon.ico",
        type: "file",
        extension: "ico",
        parentId: "13",
      },
    ],
  },
  {
    id: "16",
    name: "package.json",
    type: "file",
    extension: "json",
  },
  {
    id: "17",
    name: "README.md",
    type: "file",
    extension: "md",
  },
  {
    id: "18",
    name: "tsconfig.json",
    type: "file",
    extension: "json",
  },
]

export interface UseFileExplorerPanelConfig {
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
}

/**
 * Hook for managing file explorer panel state and actions.
 * 
 * This hook provides:
 * - File tree state management
 * - Drag and drop operations
 * - File selection handling
 * - Visibility control
 */
export function useFileExplorerPanel(config: UseFileExplorerPanelConfig) {
  const {
    editor,
    data = defaultMockData,
    onSelect,
    onMove,
    hideWhenUnavailable = false,
    onSelected,
  } = config

  // File data state management
  const [fileData, setFileData] = React.useState<FileNode[]>(data)

  // Update file data when prop changes
  React.useEffect(() => {
    setFileData(data)
  }, [data])

  // Panel visibility logic
  const isVisible = React.useMemo(() => {
    if (hideWhenUnavailable && !editor) {
      return false
    }
    return true
  }, [editor, hideWhenUnavailable])

  // Handle file/folder selection
  const handleSelect = React.useCallback(
    (node: FileNode) => {
      onSelect?.(node)
      onSelected?.()
    },
    [onSelect, onSelected]
  )

  // Handle drag and drop file operations
  const handleMove = React.useCallback(
    (draggedId: string, targetId: string) => {
      console.log('Handle move called:', draggedId, 'to', targetId)
      
      // Create a deep copy of the data
      const updateData = (nodes: FileNode[]): FileNode[] => {
        return nodes.map((node) => ({
          ...node,
          children: node.children ? updateData(node.children) : undefined,
        }))
      }

      // Find and remove the dragged item
      let draggedItem: FileNode | null = null
      const removeItem = (nodes: FileNode[]): FileNode[] => {
        return nodes.filter((node) => {
          if (node.id === draggedId) {
            draggedItem = { ...node }
            console.log('Found dragged item:', draggedItem)
            return false
          }
          if (node.children) {
            node.children = removeItem(node.children)
          }
          return true
        })
      }

      // Add the item to the target folder
      const addToTarget = (nodes: FileNode[]): FileNode[] => {
        return nodes.map((node) => {
          if (
            node.id === targetId &&
            node.type === "folder" &&
            draggedItem
          ) {
            console.log('Adding item to target folder:', node.name)
            return {
              ...node,
              children: [
                ...(node.children || []),
                { ...draggedItem, parentId: targetId },
              ],
            }
          }
          if (node.children) {
            return {
              ...node,
              children: addToTarget(node.children),
            }
          }
          return node
        })
      }

      if (draggedId !== targetId) {
        const newData = updateData(fileData)
        const withoutDragged = removeItem(newData)
        const finalData = addToTarget(withoutDragged)

        console.log('Setting new file data')
        setFileData(finalData)
        onMove?.(draggedId, targetId)
      }
    },
    [fileData, onMove]
  )

  // Utility functions for external use
  const utils = React.useMemo(
    () => ({
      /**
       * Refresh the file tree data
       */
      refreshData: (newData: FileNode[]) => setFileData(newData),

      /**
       * Find a node by ID in the current file tree
       */
      findNodeById: (id: string): FileNode | null => {
        const findInNodes = (nodes: FileNode[]): FileNode | null => {
          for (const node of nodes) {
            if (node.id === id) return node
            if (node.children) {
              const found = findInNodes(node.children)
              if (found) return found
            }
          }
          return null
        }
        return findInNodes(fileData)
      },

      /**
       * Get all files (not folders) from the tree
       */
      getAllFiles: (): FileNode[] => {
        const files: FileNode[] = []
        const collectFiles = (nodes: FileNode[]) => {
          nodes.forEach((node) => {
            if (node.type === "file") {
              files.push(node)
            } else if (node.children) {
              collectFiles(node.children)
            }
          })
        }
        collectFiles(fileData)
        return files
      },

      /**
       * Get all folders from the tree
       */
      getAllFolders: (): FileNode[] => {
        const folders: FileNode[] = []
        const collectFolders = (nodes: FileNode[]) => {
          nodes.forEach((node) => {
            if (node.type === "folder") {
              folders.push(node)
              if (node.children) {
                collectFolders(node.children)
              }
            }
          })
        }
        collectFolders(fileData)
        return folders
      },
    }),
    [fileData]
  )

  return {
    /**
     * Whether the panel should be visible
     */
    isVisible,

    /**
     * Current file tree data
     */
    fileData,

    /**
     * Handle file/folder selection
     */
    handleSelect,

    /**
     * Handle drag and drop file operations
     */
    handleMove,

    /**
     * Utility functions for working with file data
     */
    utils,
  }
}