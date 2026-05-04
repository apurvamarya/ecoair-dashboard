import { createContext, useContext, useState, useCallback } from 'react'

const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
  // Global cache: { [cityNameLower]: { data, timestamp } }
  const [cache, setCache] = useState({})

  const getCached = useCallback((city) => {
    const key = city.toLowerCase().trim()
    const entry = cache[key]
    if (!entry) return null
    // Cache valid for 5 minutes
    if (Date.now() - entry.timestamp > 300000) return null
    return entry.data
  }, [cache])

  const setCache_ = useCallback((city, data) => {
    const key = city.toLowerCase().trim()
    setCache(prev => ({
      ...prev,
      [key]: { data, timestamp: Date.now() },
    }))
  }, [])

  const clearCache = useCallback((city) => {
    if (city) {
      const key = city.toLowerCase().trim()
      setCache(prev => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    } else {
      setCache({})
    }
  }, [])

  return (
    <DataContext.Provider value={{ getCached, setCache: setCache_, clearCache }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
