"use client"

import * as React from "react"
import { 
  FileExplorerPanel, 
  FileExplorerButton, 
  useFileExplorerPanel, 
  type FileNode 
} from "@/components/tiptap-ui/file-explorer-panel"
import { Button } from "@/components/tiptap-ui-primitive/button"
import { Card } from "@/components/tiptap-ui-primitive/card"
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle"

// Demo data for the file explorer
const demoData: FileNode[] = [
  {
    id: "1",
    name: "my-project",
    type: "folder",
    children: [
      {
        id: "2",
        name: "src",
        type: "folder",
        parentId: "1",
        children: [
          {
            id: "3",
            name: "components",
            type: "folder",
            parentId: "2",
            children: [
              {
                id: "4",
                name: "Button.tsx",
                type: "file",
                extension: "tsx",
                parentId: "3",
              },
              {
                id: "5",
                name: "Input.tsx",
                type: "file",
                extension: "tsx",
                parentId: "3",
              },
              {
                id: "6",
                name: "FileExplorer.tsx",
                type: "file",
                extension: "tsx",
                parentId: "3",
              },
            ],
          },
          {
            id: "7",
            name: "styles",
            type: "folder",
            parentId: "2",
            children: [
              {
                id: "8",
                name: "globals.css",
                type: "file",
                extension: "css",
                parentId: "7",
              },
              {
                id: "9",
                name: "components.scss",
                type: "file",
                extension: "scss",
                parentId: "7",
              },
            ],
          },
          {
            id: "10",
            name: "utils",
            type: "folder",
            parentId: "2",
            children: [
              {
                id: "11",
                name: "helpers.ts",
                type: "file",
                extension: "ts",
                parentId: "10",
              },
              {
                id: "12",
                name: "constants.ts",
                type: "file",
                extension: "ts",
                parentId: "10",
              },
            ],
          },
          {
            id: "13",
            name: "App.tsx",
            type: "file",
            extension: "tsx",
            parentId: "2",
          },
          {
            id: "14",
            name: "index.tsx",
            type: "file",
            extension: "tsx",
            parentId: "2",
          },
        ],
      },
      {
        id: "15",
        name: "public",
        type: "folder",
        parentId: "1",
        children: [
          {
            id: "16",
            name: "images",
            type: "folder",
            parentId: "15",
            children: [
              {
                id: "17",
                name: "logo.svg",
                type: "file",
                extension: "svg",
                parentId: "16",
              },
              {
                id: "18",
                name: "hero.png",
                type: "file",
                extension: "png",
                parentId: "16",
              },
            ],
          },
          {
            id: "19",
            name: "favicon.ico",
            type: "file",
            extension: "ico",
            parentId: "15",
          },
        ],
      },
      {
        id: "20",
        name: "docs",
        type: "folder",
        parentId: "1",
        children: [
          {
            id: "21",
            name: "README.md",
            type: "file",
            extension: "md",
            parentId: "20",
          },
          {
            id: "22",
            name: "CONTRIBUTING.md",
            type: "file",
            extension: "md",
            parentId: "20",
          },
        ],
      },
      {
        id: "23",
        name: "package.json",
        type: "file",
        extension: "json",
        parentId: "1",
      },
      {
        id: "24",
        name: "tsconfig.json",
        type: "file",
        extension: "json",
        parentId: "1",
      },
    ],
  },
]

export default function FileExplorerDemo() {
  const [selectedFile, setSelectedFile] = React.useState<FileNode | null>(null)
  const [isExplorerOpen, setIsExplorerOpen] = React.useState(true)
  const [message, setMessage] = React.useState("")

  const handleFileSelect = (node: FileNode) => {
    setSelectedFile(node)
    setMessage(`Selected: ${node.name} (${node.type})`)
  }

  const handleFileMove = (draggedId: string, targetId: string) => {
    setMessage(`Moved file ${draggedId} to folder ${targetId}`)
    // In a real app, you would update your file tree data here
  }

  const handleToggleExplorer = () => {
    setIsExplorerOpen(!isExplorerOpen)
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 p-4 flex flex-col">
      <div className="max-w-6xl mx-auto flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            File Explorer Demo
          </h1>
          <div className="flex items-center gap-4">
            <FileExplorerButton
              isOpen={isExplorerOpen}
              onToggle={handleToggleExplorer}
              text="Explorer"
            />
            <ThemeToggle />
          </div>
        </div>

        {/* Description */}
        <Card className="p-6 mb-6 flex-shrink-0">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            TipTap File Explorer Component
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            A professional file tree component that integrates seamlessly with the TipTap editor ecosystem. 
            Features include drag & drop file management, search functionality, theme support, and responsive design.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm">
              Drag & Drop
            </span>
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-sm">
              Search
            </span>
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-sm">
              Theme Support
            </span>
            <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded text-sm">
              TypeScript
            </span>
          </div>
        </Card>

        {/* Demo Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          {/* File Explorer Panel */}
          {isExplorerOpen && (
            <div className="lg:col-span-1 flex flex-col h-full">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100 flex-shrink-0">
                File Explorer
              </h3>
              <div className="flex-1 min-h-0">
                <FileExplorerPanel
                  data={demoData}
                  onSelect={handleFileSelect}
                  onMove={handleFileMove}
                  height="600px"
                  width="100%"
                  variant="side"
                  panelClassName="w-full h-full"
                />
              </div>
            </div>
          )}

          {/* Info Panel */}
          <div className={isExplorerOpen ? "lg:col-span-2" : "lg:col-span-3"}>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              File Information
            </h3>
            
            {/* Selected File Info */}
            <Card className="p-4 mb-4">
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">
                Selected File:
              </h4>
              {selectedFile ? (
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Name:</span>{" "}
                    <span className="text-gray-900 dark:text-gray-100">{selectedFile.name}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Type:</span>{" "}
                    <span className="text-gray-900 dark:text-gray-100">{selectedFile.type}</span>
                  </div>
                  {selectedFile.extension && (
                    <div>
                      <span className="font-medium text-gray-600 dark:text-gray-400">Extension:</span>{" "}
                      <span className="text-gray-900 dark:text-gray-100">{selectedFile.extension}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">ID:</span>{" "}
                    <span className="text-gray-900 dark:text-gray-100">{selectedFile.id}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Click on a file or folder to see its details
                </p>
              )}
            </Card>

            {/* Activity Log */}
            <Card className="p-4">
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">
                Activity Log:
              </h4>
              {message ? (
                <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Interact with the file explorer to see activity
                </p>
              )}
            </Card>
          </div>
        </div>

        {/* Usage Example */}
        <Card className="p-6 mt-6 flex-shrink-0">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Usage Example
          </h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`import { FileExplorerPanel, FileExplorerButton } from "@/components/tiptap-ui/file-explorer-panel"

// Side panel (default)
<FileExplorerPanel
  data={fileTreeData}
  onSelect={(node) => console.log('Selected:', node)}
  onMove={(draggedId, targetId) => console.log('Moved:', draggedId, 'to:', targetId)}
  variant="side"
  width="320px"
/>

// Full height variant
<FileExplorerPanel
  data={fileTreeData}
  variant="full-height"
  height="100vh"
  width="320px"
/>

// With button toggle
<FileExplorerButton
  isOpen={isExplorerOpen}
  onToggle={() => setIsExplorerOpen(!isExplorerOpen)}
  text="Explorer"
/>`}</code>
          </pre>
        </Card>
      </div>
    </div>
  )
}