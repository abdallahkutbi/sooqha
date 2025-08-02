import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useAiPanel } from '@/components/tiptap-ui/ai-panel/use-ai-panel';

describe('useAiPanel', () => {
  it('provides default agents when none are supplied', () => {
    const { result } = renderHook(() => useAiPanel({}));
    expect(result.current.aiAgents.length).toBeGreaterThan(0);
  });

  it('is not visible when hideWhenUnavailable is true and editor is missing', () => {
    const { result } = renderHook(() => useAiPanel({ hideWhenUnavailable: true }));
    expect(result.current.isVisible).toBe(false);
  });
});
