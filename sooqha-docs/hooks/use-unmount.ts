import { useRef, useEffect } from "react"

/**
 * Hook that executes a callback when the component unmounts.
 *
 * @param callback Function to be called on component unmount
 */
export const useUnmount = <T extends (...args: unknown[]) => unknown>(
  callback: (...args: Parameters<T>) => ReturnType<T>
) => {
  const ref = useRef(callback)
  ref.current = callback

  useEffect(
    () => () => {
      ref.current()
    },
    []
  )
}

export default useUnmount
