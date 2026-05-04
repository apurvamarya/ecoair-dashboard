import { createContext, useContext, useState, useCallback } from 'react'

const SearchContext = createContext(null)

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('')
  const [lastSearched, setLastSearched] = useState('')

  const updateQuery = useCallback((val) => {
    setQuery(val)
  }, [])

  const confirmSearch = useCallback((val) => {
    setLastSearched(val.trim())
  }, [])

  return (
    <SearchContext.Provider value={{ query, setQuery: updateQuery, lastSearched, confirmSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearch must be used within SearchProvider')
  return ctx
}
