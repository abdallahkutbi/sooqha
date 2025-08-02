import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ChatInput } from '@/components/tiptap-ui/ai-panel/chat-input'

describe('ChatInput Browse button', () => {
  it('is disabled and cannot be activated', () => {
    render(<ChatInput value="" onChange={() => {}} onSubmit={() => {}} />)
    const browseButton = screen.getByRole('button', { name: /browse/i })

    // Button is disabled for assistive technologies and pointer interaction
    expect(browseButton).toBeDisabled()

    // Mouse clicks do not trigger handlers
    const clickHandler = vi.fn()
    browseButton.addEventListener('click', clickHandler)
    browseButton.click()
    expect(clickHandler).not.toHaveBeenCalled()

    // Disabled button cannot receive focus
    browseButton.focus()
    expect(browseButton).not.toHaveFocus()
  })
})

