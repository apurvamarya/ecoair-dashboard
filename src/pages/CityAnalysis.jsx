import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import DashboardView from '../components/dashboard/DashboardView'
import useAirQuality from '../hooks/useAirQuality'
import useDebounce from '../hooks/useDebounce'
import { useSearch } from '../context/SearchContext'

const CityAnalysis = () => {
  const { name } = useParams()
  const navigate = useNavigate()
  const { confirmSearch } = useSearch()
  const prevNameRef = useRef(null)

  // Decode city from URL
  const cityName = decodeURIComponent(name || '')

  // Debounce city name to avoid rapid re-fetches during URL changes
  const debouncedCity = useDebounce(cityName, 300)

  const { data, loading, error, refresh } = useAirQuality(debouncedCity)

  // Sync search context with current city
  useEffect(() => {
    if (cityName && cityName !== prevNameRef.current) {
      prevNameRef.current = cityName
      confirmSearch(cityName)
    }
  }, [cityName, confirmSearch])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-6 text-xs font-display">
        <Link
          to="/"
          className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Dashboard
        </Link>
        <svg className="w-3 h-3 text-gray-300 dark:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
        <span className="text-gray-600 dark:text-gray-300 font-medium">{cityName}</span>
      </nav>

      <DashboardView
        data={data}
        loading={loading}
        error={error}
        onRefresh={refresh}
        city={cityName}
      />
    </div>
  )
}

export default CityAnalysis
