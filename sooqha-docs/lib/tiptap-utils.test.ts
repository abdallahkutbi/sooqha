import { describe, it, expect } from "vitest"
import { sanitizeUrl } from "./tiptap-utils"

describe("sanitizeUrl", () => {
  it("returns '#' for javascript URLs", () => {
    const result = sanitizeUrl("javascript:alert(1)", "https://example.com")
    expect(result).toBe("#")
  })

  it("resolves relative paths against the base URL", () => {
    const result = sanitizeUrl("/foo", "https://example.com")
    expect(result).toBe("https://example.com/foo")
  })
})
