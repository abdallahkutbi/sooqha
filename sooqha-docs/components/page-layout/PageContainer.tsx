import React, { useEffect, useRef } from 'react'
import { getPageSize } from './page-size-constants'

interface PageContainerProps {
  children: React.ReactNode
  pageSize: string
  className?: string
  style?: React.CSSProperties
}

export function PageContainer({ children, pageSize, className, style }: PageContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pageSizeData = getPageSize(pageSize)

  useEffect(() => {
    if (containerRef.current && pageSizeData) {
      // Set the height based on page size
      const heightInPixels = pageSizeData.heightInches * 96 // Convert inches to pixels
      containerRef.current.style.height = `${heightInPixels}px`
    }
  }, [pageSizeData])

  return (
    <div
      ref={containerRef}
      className={`page-container ${className || ''}`}
      style={{
        width: '100%',
        maxWidth: '100%',
        background: 'var(--tt-bg-color)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px var(--tt-border-color)',
        borderRadius: '2px',
        margin: '1rem auto 2rem auto',
        padding: '1in',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
      data-page-size={pageSize}
    >
      {children}
    </div>
  )
} 