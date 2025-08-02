import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useUnmount } from '@/hooks/use-unmount';

describe('useUnmount', () => {
  it('invokes callback on unmount', () => {
    const fn = vi.fn();
    const { unmount } = renderHook(() => useUnmount(fn));
    unmount();
    expect(fn).toHaveBeenCalled();
  });
});
