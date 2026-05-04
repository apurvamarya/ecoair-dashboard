import { useEffect, useRef } from 'react'
import { REFRESH_INTERVAL } from '../utils/constants'

/**
 * Custom hook that calls a callback at a fixed interval.
 * Clears the interval on unmount (no memory leaks).
 * @param {Function} callback - Function to call on each interval tick
 * @param {number} interval - Interval in ms (default: 5 minutes)
 * @param {boolean} enabled - Whether auto-refresh is active
 */
const useAutoRefresh = (callback, interval = REFRESH_INTERVAL, enabled = true) => {
  const savedCallback = useRef(callback)
  const intervalRef = useRef(null)

  // Keep ref up to date without restarting the interval
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (!enabled) return

    intervalRef.current = setInterval(() => {
      savedCallback.current()
    }, interval)

    // Cleanup on unmount or when disabled
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [interval, enabled])

  return intervalRef
}

export default useAutoRefresh
