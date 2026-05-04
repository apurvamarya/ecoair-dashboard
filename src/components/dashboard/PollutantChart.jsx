import { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Cell, CartesianGrid,
} from 'recharts'
import { POLLUTANTS } from '../../utils/constants'
import { useTheme } from '../../context/ThemeContext'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-white dark:bg-oled-card border border-gray-100 dark:border-oled-border rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 font-display">{d.label}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 font-display mt-0.5">{d.description}</p>
      <p className="text-sm font-mono font-medium mt-1" style={{ color: d.color }}>
        {d.value.toFixed(2)} {d.unit}
      </p>
    </div>
  )
}

const PollutantChart = ({ airQuality }) => {
  const { isDark } = useTheme()

  // useMemo: sort pollutants by value descending
  const sortedPollutants = useMemo(() => {
    if (!airQuality) return []
    return POLLUTANTS
      .map(p => ({
        ...p,
        value: airQuality[p.key] ?? 0,
      }))
      .sort((a, b) => b.value - a.value)
  }, [airQuality])

  const gridColor = isDark ? '#1A1A1A' : '#F3F4F6'
  const axisColor = isDark ? '#4B5563' : '#9CA3AF'

  if (!airQuality) return null

  return (
    <div className="rounded-xl border border-gray-100 dark:border-oled-border bg-white dark:bg-oled-card p-6 animate-slide-up transition-theme">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 font-display uppercase tracking-widest mb-1">
            Pollutant Levels
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600 font-display">PM2.5 · PM10 · CO (µg/m³)</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={sortedPollutants} margin={{ top: 4, right: 0, left: -16, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={gridColor} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fontFamily: 'DM Sans', fill: axisColor }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: axisColor }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: isDark ? '#111111' : '#F9FAFB' }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={56}>
            {sortedPollutants.map((entry) => (
              <Cell key={entry.key} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100 dark:border-oled-border">
        {sortedPollutants.map(p => (
          <div key={p.key} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: p.color }} />
            <span className="text-xs text-gray-500 dark:text-gray-400 font-display">{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PollutantChart
