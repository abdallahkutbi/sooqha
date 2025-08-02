/**
 * Page Size Constants
 * ==================
 * 
 * Defines standard page dimensions for document editing.
 * All dimensions are in inches for consistent rendering across devices.
 */

export interface PageSize {
  id: string
  name: string
  width: string
  height: string
  widthInches: number
  heightInches: number
  description: string
}

export const PAGE_SIZES: Record<string, PageSize> = {
  a4: {
    id: "a4",
    name: "A4",
    width: "8.27in",
    height: "11.69in",
    widthInches: 8.27,
    heightInches: 11.69,
    description: "International standard (210mm × 297mm)"
  },
  letter: {
    id: "letter",
    name: "Letter",
    width: "8.5in",
    height: "11in",
    widthInches: 8.5,
    heightInches: 11,
    description: "US standard (8.5\" × 11\")"
  },
  legal: {
    id: "legal",
    name: "Legal",
    width: "8.5in",
    height: "14in",
    widthInches: 8.5,
    heightInches: 14,
    description: "US legal size (8.5\" × 14\")"
  },
  tabloid: {
    id: "tabloid",
    name: "Tabloid",
    width: "11in",
    height: "17in",
    widthInches: 11,
    heightInches: 17,
    description: "US tabloid size (11\" × 17\")"
  },
  executive: {
    id: "executive",
    name: "Executive",
    width: "7.25in",
    height: "10.5in",
    widthInches: 7.25,
    heightInches: 10.5,
    description: "Executive size (7.25\" × 10.5\")"
  },
  a3: {
    id: "a3",
    name: "A3",
    width: "11.69in",
    height: "16.54in",
    widthInches: 11.69,
    heightInches: 16.54,
    description: "Large format (297mm × 420mm)"
  },
  a5: {
    id: "a5",
    name: "A5",
    width: "5.83in",
    height: "8.27in",
    widthInches: 5.83,
    heightInches: 8.27,
    description: "Small format (148mm × 210mm)"
  }
}

export const DEFAULT_PAGE_SIZE = "a4"

export function getPageSize(id: string): PageSize {
  return PAGE_SIZES[id] || PAGE_SIZES[DEFAULT_PAGE_SIZE]
}

export function getPageSizeList(): PageSize[] {
  return Object.values(PAGE_SIZES)
} 