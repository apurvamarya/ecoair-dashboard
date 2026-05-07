const StatCell = ({ label, value, sub }) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-400 dark:text-gray-500 font-display uppercase tracking-widest">{label}</span>
    <span className="text-lg font-light text-gray-900 dark:text-gray-100 font-display mt-1 tabular-nums">{value}</span>
    {sub && <span className="text-xs text-gray-400 dark:text-gray-600 font-display mt-0.5">{sub}</span>}
  </div>
)

const CityInfoSection = ({ data }) => {
  if (!data) return null

  const { location, current } = data

  return (
    <div className="rounded-xl border border-gray-100 dark:border-oled-border bg-white dark:bg-oled-card p-6 animate-slide-up transition-theme">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 font-display uppercase tracking-widest mb-1">
            Weather Conditions
          </p>
          <div className="flex items-center gap-2 mt-1">
            {/* <img
              // src={`https:${current.condition.icon}`}
              // alt={current.condition.text}
              className="w-8 h-8"
            /> */}
            <span className="text-sm text-gray-600 dark:text-gray-300 font-display">
              {/* {current.condition.text} */}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-light text-gray-900 dark:text-gray-100 font-display tabular-nums">
            {current.temp_c}°<span className="text-lg">C</span>
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-display mt-0.5">
            Feels {current.feelslike_c}°C
          </p>
        </div>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-5 border-t border-gray-100 dark:border-oled-border">
        <StatCell label="Humidity" value={`${current.humidity}%`} />
        <StatCell label="Wind" value={`${current.wind_kph}`} sub="km/h" />
        <StatCell label="Wind Direction" value={current.wind_degree} sub="deg °" />
        <StatCell label="Atmospheric Pressure" value={`${current.pressure_mb}`} sub="mmHg" />
      </div>

      {/* Coordinates */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-oled-border">
        <p className="text-xs text-gray-400 dark:text-gray-600 font-mono">
          {location.lat.toFixed(4)}°N, {location.lon.toFixed(4)}°E · {location.tz_id}
        </p>
      </div>
    </div>
  )
}

export default CityInfoSection
