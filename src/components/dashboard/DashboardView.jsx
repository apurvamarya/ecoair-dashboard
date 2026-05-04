import { useCallback } from 'react'
import AirQualityCard from './AirQualityCard'
import PollutantChart from './PollutantChart'
import CityInfoSection from './CityInfoSection'
import LoadingSpinner from '../common/LoadingSpinner'
import useAutoRefresh from '../../hooks/useAutoRefresh'
import { REFRESH_INTERVAL } from '../../utils/constants'

const DashboardView = ({ data, loading, error, onRefresh, city }) => {
  // useCallback: memoize the refresh handler
  const handleRefresh = useCallback(() => {
    if (onRefresh) onRefresh()
  }, [onRefresh])

  // Auto-refresh every 5 minutes
  useAutoRefresh(handleRefresh, REFRESH_INTERVAL, !!data)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <LoadingSpinner size="lg" label={`Fetching data for ${city}…`} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-oled-surface flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 font-display max-w-xs">{error}</p>
        <button
          onClick={handleRefresh}
          className="mt-4 px-4 py-2 text-xs font-medium font-display rounded-lg border border-gray-200 dark:border-oled-border text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-oled-surface transition-colors"
        >
          Try again
        </button>
      </div>
    )
  }

  if (!data) return null

  const { location, current } = data
  const aqi = current.air_quality?.['us-epa-index'] ?? 1

  return (
    <div className="animate-fade-in">
      {/* City header */}
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 font-display leading-tight">
            {location.name}
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 font-display mt-0.5">
            {location.region && `${location.region}, `}{location.country}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Auto-refresh indicator */}
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-slow" />
            <span className="text-xs text-gray-400 dark:text-gray-500 font-display">Live · 5 min refresh</span>
          </div>
          {/* Manual refresh */}
          <button
            onClick={handleRefresh}
            title="Refresh data"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-oled-border text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-oled-surface transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AirQualityCard
          aqiIndex={aqi}
          location={location.name}
          country={location.country}
          lastUpdated={current.last_updated}
        />
        <CityInfoSection data={data} />
        <div className="lg:col-span-2">
          <PollutantChart airQuality={current.air_quality} />
        </div>
      </div>
    </div>
  )
}

export default DashboardView
