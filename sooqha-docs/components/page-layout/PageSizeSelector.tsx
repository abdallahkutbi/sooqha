import React, { useState, useEffect } from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/tiptap-ui-primitive/dropdown-menu/index'
import { Button, ButtonGroup } from '@/components/tiptap-ui-primitive/button'
import { Card, CardBody } from '@/components/tiptap-ui-primitive/card'
import { ChevronDown as ChevronDownIcon, FileText as FileTextIcon } from 'lucide-react'
import { getPageSizeList, getPageSize } from './page-size-constants'

interface PageSizeSelectorProps {
  currentPageSize: string
  onPageSizeChange: (size: string) => void
}

export function PageSizeSelector({ currentPageSize, onPageSizeChange }: PageSizeSelectorProps) {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pageSizes = getPageSizeList()
  const currentSize = getPageSize(currentPageSize)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        type="button"
        data-style="ghost"
        role="button"
        tabIndex={-1}
        aria-label="Page size"
        tooltip="Page size"
      >
        <FileTextIcon className="tiptap-button-icon" />
        <span className="tiptap-button-text">{currentPageSize.toUpperCase()}</span>
        <ChevronDownIcon className="tiptap-button-dropdown-small" />
      </Button>
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          data-style="ghost"
          role="button"
          tabIndex={-1}
          aria-label="Page size"
          tooltip="Page size"
        >
          <FileTextIcon className="tiptap-button-icon" />
          <span className="tiptap-button-text">{currentPageSize.toUpperCase()}</span>
          <ChevronDownIcon className="tiptap-button-dropdown-small" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent style={{ 
        width: "fit-content",
        background: "transparent",
        border: "none",
        boxShadow: "none",
        padding: "0"
      }}>
        <Card style={{ width: "fit-content" }}>
          <CardBody>
            <ButtonGroup>
              {pageSizes.map((pageSize) => (
                <DropdownMenuItem
                  key={pageSize.id}
                  onClick={() => onPageSizeChange(pageSize.id)}
                  data-active={currentPageSize === pageSize.id}
                  asChild
                >
                  <Button
                    type="button"
                    data-style="ghost"
                    style={{
                      textAlign: "center",
                      justifyContent: "center",
                      minWidth: "100px"
                    }}
                  >
                    <span>{pageSize.name}</span>
                  </Button>
                </DropdownMenuItem>
              ))}
            </ButtonGroup>
          </CardBody>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 