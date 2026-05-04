import { useState, useEffect, useRef } from 'react'
import { DEBOUNCE_DELAY } from '../utils/constants'

/**
 * Custom debounce hook using useRef to store timer ID.
 * Returns the debounced value after the specified delay.
 */
const useDebounce = (value, delay = DEBOUNCE_DELAY) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const timerRef = useRef(null)

  useEffect(() => {
    // Clear previous timer (cleanup)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    // Set new timer
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup on unmount or next effect run
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
