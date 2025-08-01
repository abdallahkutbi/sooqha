import React, { useState, useMemo } from "react";
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
} from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { cn } from "./ui/utils";

interface FileNode {
  id: string;
  name: string;
  type: "folder" | "file";
  children?: FileNode[];
  extension?: string;
  parentId?: string;
}

interface FileExplorerProps {
  data: FileNode[];
  onSelect?: (node: FileNode) => void;
  onMove?: (draggedId: string, targetId: string) => void;
  className?: string;
}

const mockData: FileNode[] = [
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
];

const getFileIcon = (extension?: string) => {
  if (!extension) return File;

  switch (extension.toLowerCase()) {
    case "tsx":
    case "ts":
    case "js":
    case "jsx":
      return Code;
    case "md":
    case "txt":
      return FileText;
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
      return Image;
    case "mp3":
    case "wav":
    case "flac":
      return Music;
    case "mp4":
    case "avi":
    case "mov":
      return Video;
    default:
      return File;
  }
};

interface DragItem {
  id: string;
  type: string;
  node: FileNode;
}

interface FileTreeItemProps {
  node: FileNode;
  level: number;
  onSelect?: (node: FileNode) => void;
  onMove?: (draggedId: string, targetId: string) => void;
  selectedId?: string;
  searchTerm?: string;
}

const FileTreeItem: React.FC<FileTreeItemProps> = ({
  node,
  level,
  onSelect,
  onMove,
  selectedId,
  searchTerm,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedId === node.id;

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "file-node",
    item: { id: node.id, type: "file-node", node },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "file-node",
    drop: (item: DragItem) => {
      if (item.id !== node.id && node.type === "folder") {
        onMove?.(item.id, node.id);
      }
    },
    canDrop: (item: DragItem) => {
      return item.id !== node.id && node.type === "folder";
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const handleClick = () => {
    if (node.type === "folder") {
      setIsExpanded(!isExpanded);
    }
    onSelect?.(node);
  };

  const FileIcon =
    node.type === "file" ? getFileIcon(node.extension) : null;

  const highlightMatch = (text: string, term: string) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span
          key={index}
          className="bg-yellow-400/30 rounded px-0.5"
        >
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div ref={dragPreview}>
      <div
        ref={(el) => {
          drag(el);
          drop(el);
        }}
        className={cn(
          "flex items-center gap-2 py-2 px-3 cursor-pointer transition-all duration-200 group relative",
          isSelected && "bg-[#253745]",
          !isSelected && "hover:bg-[#11212D]",
          isDragging && "opacity-50",
          isOver &&
            canDrop &&
            "bg-[#253745] ring-1 ring-[#4A5C6A]",
        )}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={handleClick}
      >
        {/* Drag handle */}
        <GripVertical className="w-3 h-3 text-[#9BA8AB] opacity-0 group-hover:opacity-100 transition-opacity" />

        {node.type === "folder" && (
          <div className="flex items-center justify-center w-4 h-4">
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className="w-3 h-3 text-[#9BA8AB]" />
              ) : (
                <ChevronRight className="w-3 h-3 text-[#9BA8AB]" />
              )
            ) : null}
          </div>
        )}

        {node.type === "folder" ? (
          isExpanded ? (
            <FolderOpen className="w-4 h-4 text-[#4A5C6A] flex-shrink-0" />
          ) : (
            <Folder className="w-4 h-4 text-[#4A5C6A] flex-shrink-0" />
          )
        ) : (
          FileIcon && (
            <FileIcon className="w-4 h-4 text-[#9BA8AB] flex-shrink-0" />
          )
        )}

        <span className="truncate text-sm select-none text-[#CCD0CF]">
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

const filterNodes = (
  nodes: FileNode[],
  searchTerm: string,
): FileNode[] => {
  if (!searchTerm) return nodes;

  return nodes.reduce<FileNode[]>((acc, node) => {
    const matchesSearch = node.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const filteredChildren = node.children
      ? filterNodes(node.children, searchTerm)
      : [];

    if (matchesSearch || filteredChildren.length > 0) {
      acc.push({
        ...node,
        children: filteredChildren,
      });
    }

    return acc;
  }, []);
};

const FileExplorerContent: React.FC<
  Omit<FileExplorerProps, "onMove"> & {
    onMove: (draggedId: string, targetId: string) => void;
  }
> = ({ data, onSelect, onMove, className }) => {
  const [selectedId, setSelectedId] = useState<string>();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return filterNodes(data, searchTerm);
  }, [data, searchTerm]);

  const handleSelect = (node: FileNode) => {
    setSelectedId(node.id);
    onSelect?.(node);
  };

  // Custom scrollbar styles
  const scrollbarStyles: React.CSSProperties = {
    scrollbarWidth: "thin",
    scrollbarColor: "#4A5C6A #11212D",
  };

  return (
    <div
      className={cn(
        "w-80 h-[600px] bg-[#06141B] border border-[#253745] rounded-lg overflow-hidden shadow-2xl",
        className,
      )}
      style={{ backdropFilter: "blur(10px)" }}
    >
      <div className="border-b border-[#253745] px-4 py-3 bg-[#11212D]">
        <h3 className="text-sm text-[#9BA8AB] mb-3">
          Explorer
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9BA8AB]" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-3/4 h-10 pl-10 pr-3 bg-[#253745] border border-[#4A5C6A] rounded-md text-sm placeholder:text-[#9BA8AB] text-[#CCD0CF] focus:outline-none focus:ring-2 focus:ring-[#4A5C6A] focus:border-transparent transition-all"
          />
        </div>
      </div>
      <div
        className="h-[calc(100%-80px)] overflow-y-auto"
        style={scrollbarStyles}
      >
        <div className="py-1">
          {filteredData.length > 0 ? (
            filteredData.map((node) => (
              <FileTreeItem
                key={node.id}
                node={node}
                level={0}
                onSelect={handleSelect}
                onMove={onMove}
                selectedId={selectedId}
                searchTerm={searchTerm}
              />
            ))
          ) : searchTerm ? (
            <div className="px-4 py-3 text-sm text-[#9BA8AB]">
              No files found for "{searchTerm}"
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const FileExplorer: React.FC<FileExplorerProps> = ({
  data = mockData,
  onSelect,
  onMove,
  className,
}) => {
  const [fileData, setFileData] = useState(data);

  const handleMove = (draggedId: string, targetId: string) => {
    // Create a deep copy of the data
    const updateData = (nodes: FileNode[]): FileNode[] => {
      return nodes.map((node) => ({
        ...node,
        children: node.children
          ? updateData(node.children)
          : undefined,
      }));
    };

    // Find and remove the dragged item
    let draggedItem: FileNode | null = null;
    const removeItem = (nodes: FileNode[]): FileNode[] => {
      return nodes.filter((node) => {
        if (node.id === draggedId) {
          draggedItem = node;
          return false;
        }
        if (node.children) {
          node.children = removeItem(node.children);
        }
        return true;
      });
    };

    // Add the item to the target folder
    const addToTarget = (nodes: FileNode[]): FileNode[] => {
      return nodes.map((node) => {
        if (
          node.id === targetId &&
          node.type === "folder" &&
          draggedItem
        ) {
          return {
            ...node,
            children: [
              ...(node.children || []),
              { ...draggedItem, parentId: targetId },
            ],
          };
        }
        if (node.children) {
          return {
            ...node,
            children: addToTarget(node.children),
          };
        }
        return node;
      });
    };

    const newData = updateData(fileData);
    const withoutDragged = removeItem(newData);
    const finalData = addToTarget(withoutDragged);

    setFileData(finalData);
    onMove?.(draggedId, targetId);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <FileExplorerContent
        data={fileData}
        onSelect={onSelect}
        onMove={handleMove}
        className={className}
      />
    </DndProvider>
  );
};