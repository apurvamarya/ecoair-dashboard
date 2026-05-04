import { useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../../context/SearchContext'

/**
 * Controlled search input with validation.
 * Uses children prop for wrapper composability.
 */
const FormWrapper = ({ children, onSubmit, className = '' }) => (
  <form onSubmit={onSubmit} noValidate className={className}>
    {children}
  </form>
)

const SearchBar = ({ compact = false, autoFocus = false }) => {
  const navigate = useNavigate()
  const { query, setQuery, confirmSearch } = useSearch()
  const [inputError, setInputError] = useState('')
  const inputRef = useRef(null)

  const handleChange = useCallback((e) => {
    setQuery(e.target.value)
    if (inputError) setInputError('')
  }, [setQuery, inputError])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const trimmed = query.trim()

    if (!trimmed) {
      setInputError('Please enter a city name.')
      inputRef.current?.focus()
      return
    }

    if (trimmed.length < 2) {
      setInputError('City name must be at least 2 characters.')
      inputRef.current?.focus()
      return
    }

    setInputError('')
    confirmSearch(trimmed)
    navigate(`/city/${encodeURIComponent(trimmed)}`)
  }, [query, navigate, confirmSearch])

  return (
    <FormWrapper onSubmit={handleSubmit} className="relative w-full">
      <div className={`relative flex items-center gap-2 ${compact ? '' : 'max-w-lg'}`}>
        {/* Search icon */}
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
          </svg>
        </div>

        {/* Controlled input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search any city…"
          autoFocus={autoFocus}
          autoComplete="off"
          spellCheck="false"
          className={`
            w-full pl-10 pr-4
            ${compact ? 'py-2 text-sm' : 'py-2.5 text-sm'}
            bg-gray-50 dark:bg-oled-card
            border rounded-lg font-display
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-600
            outline-none transition-all duration-200
            ${inputError
              ? 'border-red-400 dark:border-red-600 focus:border-red-500'
              : 'border-gray-200 dark:border-oled-border focus:border-gray-400 dark:focus:border-gray-600'
            }
          `}
        />

        {/* Submit button */}
        <button
          type="submit"
          className={`
            shrink-0 px-4
            ${compact ? 'py-2 text-sm' : 'py-2.5 text-sm'}
            font-medium font-display rounded-lg
            bg-gray-900 dark:bg-white
            text-white dark:text-black
            hover:opacity-80 transition-opacity duration-200
            whitespace-nowrap
          `}
        >
          Search
        </button>
      </div>

      {/* Inline validation error */}
      {inputError && (
        <p className="mt-1.5 text-xs text-red-500 dark:text-red-400 font-display pl-1 animate-fade-in">
          {inputError}
        </p>
      )}
    </FormWrapper>
  )
}

export default SearchBar
