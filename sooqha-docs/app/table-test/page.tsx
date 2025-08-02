"use client"

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"

export default function TableTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Table Functionality Test
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Test the table functionality by clicking the table button in the toolbar.
        </p>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <SimpleEditor />
        </div>
      </div>
    </div>
  )
} 