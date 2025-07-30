import React from "react";

export function SidePanel() {
  return (
    <div className="flex-1">
      <h2 className="text-lg font-semibold mb-4">AI Assistant</h2>
      <div className="bg-white dark:bg-gray-900 p-3 rounded-md shadow-sm min-h-[150px] flex items-center justify-center text-gray-400 dark:text-gray-600">
        AI Output will appear here
      </div>
      <div className="mt-4 flex flex-col space-y-2">
        {/* Placeholder for AI action buttons */}
        <button className="w-full bg-blue-500 text-white py-2 rounded-md opacity-50 cursor-not-allowed">Insert</button>
        <button className="w-full bg-green-500 text-white py-2 rounded-md opacity-50 cursor-not-allowed">Replace</button>
        <button className="w-full bg-yellow-500 text-white py-2 rounded-md opacity-50 cursor-not-allowed">Retry</button>
      </div>
    </div>
  );
}
