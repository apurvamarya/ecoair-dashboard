import DashboardView from '../components/dashboard/DashboardView'
import SearchBar from '../components/common/SearchBar'
import useAirQuality from '../hooks/useAirQuality'

const Dashboard = () => {
  const { data, loading, error, refresh } = useAirQuality()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-10 text-center">
        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 font-display uppercase tracking-widest mb-3">
          Real-Time Analytics
        </p>
        <h1 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-gray-100 font-display mb-6 tracking-tight">
          Air Quality Anywhere
        </h1>
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <SearchBar autoFocus />
          </div>
        </div>
      </div>

      <DashboardView
        data={data}
        loading={loading}
        error={error}
        onRefresh={refresh}
      />
    </div>
  )
}

export default Dashboard