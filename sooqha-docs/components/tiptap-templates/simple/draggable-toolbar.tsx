"use client"

import * as React from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable"
import {
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"

import { ToolbarGroup, ToolbarSeparator } from "@/components/tiptap-ui-primitive/toolbar"
import { Spacer } from "@/components/tiptap-ui-primitive/spacer"
import { Button } from "@/components/tiptap-ui-primitive/button"
import { 
  getToolbarItems, 
  saveToolbarOrder, 
  type ToolbarItem 
} from "./toolbar-config"

interface DraggableToolbarProps {
  onHighlighterClick: () => void
  onLinkClick: () => void
  isMobile: boolean
  pageSize: string
  onPageSizeChange: (size: string) => void
  isAIOpen: boolean
  onAIToggle: () => void
  isFileExplorerOpen: boolean
  onFileExplorerToggle: () => void
  editor: any
}

interface SortableToolbarItemProps {
  item: ToolbarItem
  props: DraggableToolbarProps
}

function SortableToolbarItem({ item, props }: SortableToolbarItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  // Choose component based on mobile/desktop
  const Component = props.isMobile && item.mobileComponent 
    ? item.mobileComponent 
    : item.component

  // If no component is defined (for separators/spacers), render the special item
  if (!Component) {
    if (item.isSeparator) {
      return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
          <ToolbarSeparator />
        </div>
      )
    }

    if (item.isSpacer) {
      return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
          <Spacer />
        </div>
      )
    }

    return null
  }

  // Build component props
  const componentProps: Record<string, any> = {
    ...item.props,
    ...props,
    portal: props.isMobile,
  }

  // Handle mobile-specific props
  if (props.isMobile && item.mobileProps) {
    Object.entries(item.mobileProps).forEach(([key, value]) => {
      if (typeof value === 'string' && value.startsWith('on')) {
        // Handle function props like onClick
        const handlerName = value as string
        if (handlerName === 'onHighlighterClick') {
          componentProps.onClick = props.onHighlighterClick
        } else if (handlerName === 'onLinkClick') {
          componentProps.onClick = props.onLinkClick
        }
      } else {
        componentProps[key] = value
      }
    })
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative group"
    >
      <Component {...componentProps} />
      
      {/* Drag handle - only visible on hover */}
      <div
        {...listeners}
        className="absolute -left-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing p-1 rounded"
        style={{ zIndex: 10 }}
      >
        <GripVertical className="w-3 h-3 text-gray-400" />
      </div>
    </div>
  )
}

export function DraggableToolbar(props: DraggableToolbarProps) {
  const [toolbarItems, setToolbarItems] = React.useState<ToolbarItem[]>(() => 
    getToolbarItems()
  )

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setToolbarItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over?.id)
        
        const newItems = arrayMove(items, oldIndex, newIndex)
        
        // Save the new order to localStorage
        saveToolbarOrder(newItems)
        
        return newItems
      })
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={toolbarItems.map(item => item.id)}
        strategy={horizontalListSortingStrategy}
      >
        <ToolbarGroup>
          {toolbarItems.map((item) => (
            <SortableToolbarItem
              key={item.id}
              item={item}
              props={props}
            />
          ))}
        </ToolbarGroup>
      </SortableContext>
    </DndContext>
  )
} 