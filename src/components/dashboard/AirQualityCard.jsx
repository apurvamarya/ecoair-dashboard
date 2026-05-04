import { getAqiInfo } from '../../utils/constants'

const AirQualityCard = ({ aqiIndex, location, country, lastUpdated }) => {
  const aqiInfo = getAqiInfo(aqiIndex)

  return (
    <div className="rounded-xl border border-gray-100 dark:border-oled-border bg-white dark:bg-oled-card p-6 animate-slide-up transition-theme">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 font-display uppercase tracking-widest mb-1">
            Air Quality Index
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <span
              className="text-5xl font-light font-display tabular-nums"
              style={{ color: aqiInfo.color }}
            >
              {aqiIndex}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500 font-display">/6</span>
          </div>
        </div>

        {/* Status badge */}
        <div
          className="mt-1 px-3 py-1.5 rounded-full text-xs font-medium font-display text-white"
          style={{ backgroundColor: aqiInfo.color }}
        >
          {aqiInfo.label}
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 font-display leading-relaxed">
        {aqiInfo.description}
      </p>

      {/* AQI scale bar */}
      <div className="mt-4">
        <div className="flex gap-0.5 rounded-full overflow-hidden h-1.5">
          {[1,2,3,4,5,6].map(level => {
            const lvlInfo = getAqiInfo(level)
            return (
              <div
                key={level}
                className="flex-1 transition-opacity duration-300"
                style={{
                  backgroundColor: lvlInfo.color,
                  opacity: level <= aqiIndex ? 1 : 0.2,
                }}
              />
            )
          })}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-gray-400 dark:text-gray-600 font-display">Good</span>
          <span className="text-[10px] text-gray-400 dark:text-gray-600 font-display">Hazardous</span>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-oled-border flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 font-display">
            {location}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-display mt-0.5">{country}</p>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-600 font-mono">
          {lastUpdated}
        </p>
      </div>
    </div>
  )
}

export default AirQualityCard
