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
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable"
import {
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

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

  // Build component props - filter out custom props
  const componentProps: Record<string, any> = {
    ...item.props,
    portal: props.isMobile,
  }

  // Add editor prop if it exists
  if (props.editor) {
    componentProps.editor = props.editor
  }

  // Add specific props that certain components need
  if (item.id === "file-explorer") {
    componentProps.isOpen = props.isFileExplorerOpen
    componentProps.onToggle = props.onFileExplorerToggle
  }

  if (item.id === "ai-toggle") {
    componentProps.isOpen = props.isAIOpen
    componentProps.onToggle = props.onAIToggle
  }

  if (item.id === "page-size") {
    componentProps.currentPageSize = props.pageSize
    componentProps.onPageSizeChange = props.onPageSizeChange
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

  // Add mobile-specific props that components expect
  if (props.isMobile) {
    componentProps.portal = true
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <Component {...componentProps} />
    </div>
  )
}

export function DraggableToolbar(props: DraggableToolbarProps) {
  const [mounted, setMounted] = React.useState(false)
  const [toolbarItems, setToolbarItems] = React.useState<ToolbarItem[]>([])

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

  // Ensure we only render on the client side to prevent hydration errors
  React.useEffect(() => {
    setMounted(true)
    setToolbarItems(getToolbarItems())
  }, [])

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

  // Don't render until mounted to prevent hydration errors
  if (!mounted) {
    return (
      <ToolbarGroup style={{ gap: '0.5rem' }}>
        {/* Render a simple placeholder while mounting */}
        {getToolbarItems().slice(0, 5).map((item) => (
          <div key={item.id} style={{ width: '32px', height: '32px', background: 'var(--tt-gray-light-200)', borderRadius: '4px' }} />
        ))}
      </ToolbarGroup>
    )
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
        <ToolbarGroup style={{ gap: '0.5rem' }}>
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