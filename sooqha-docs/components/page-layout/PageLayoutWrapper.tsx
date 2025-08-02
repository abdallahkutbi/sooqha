import * as React from "react"
import { cn } from "@/lib/utils"
import { getPageSize, type PageSize } from "./page-size-constants"

// Import the page layout styles
import "./page-size.scss"

export interface PageLayoutWrapperProps {
  children: React.ReactNode
  pageSize?: string
  className?: string
  style?: React.CSSProperties
}

export const PageLayoutWrapper: React.FC<PageLayoutWrapperProps> = ({
  children,
  pageSize = "a4",
  className,
  style,
}) => {
  const [mounted, setMounted] = React.useState(false)
  
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const currentPageSize = getPageSize(pageSize)

  // Don't render until mounted
  if (!mounted) {
    return (
      <div className={cn("page-layout-wrapper", className)} style={style}>
        {children}
      </div>
    )
  }

  return (
    <div 
      className={cn("page-layout-wrapper", className)}
      style={style}
      data-page-size={pageSize}
      data-page-width={currentPageSize.width}
      data-page-height={currentPageSize.height}
    >
      {children}
    </div>
  )
}

export default PageLayoutWrapper 