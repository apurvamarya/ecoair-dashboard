import { useState, useEffect, useRef, useCallback } from 'react'
import { fetchCityAirQuality } from '../utils/api'
import { useData } from '../context/DataContext'

/**
 * Custom hook to fetch and manage air quality data for a city.
 * Implements: AbortController cleanup, loading/error states, cache integration.
 */
const useAirQuality = (city) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { getCached, setCache } = useData()
  const abortRef = useRef(null)
  const prevCityRef = useRef(null)

  const fetchData = useCallback(async (cityName, bypassCache = false) => {
    if (!cityName || cityName.trim() === '') return

    // Check cache first
    if (!bypassCache) {
      const cached = getCached(cityName)
      if (cached) {
        setData(cached)
        setError(null)
        setLoading(false)
        return
      }
    }

    // Abort any in-flight request
    if (abortRef.current) {
      abortRef.current.abort()
    }

    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)

    try {
      const result = await fetchCityAirQuality(cityName, controller.signal)
      setData(result)
      setCache(cityName, result)
      setError(null)
    } catch (err) {
      if (err.name === 'AbortError') return // Request was intentionally aborted
      setError(err.message || 'An unexpected error occurred.')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [getCached, setCache])

  useEffect(() => {
    if (!city) return

    // Track previous city
    prevCityRef.current = city
    fetchData(city)

    // Cleanup: abort on unmount or city change
    return () => {
      if (abortRef.current) {
        abortRef.current.abort()
      }
    }
  }, [city, fetchData])

  const refresh = useCallback(() => {
    if (city) fetchData(city, true)
  }, [city, fetchData])

  return { data, loading, error, refresh }
}

export default useAirQuality
