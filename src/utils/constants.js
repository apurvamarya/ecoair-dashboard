export const API_BASE_URL = 'https://api.weatherapi.com/v1/current.json'
export const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
export const REFRESH_INTERVAL = 300000 // 5 minutes in ms
export const DEBOUNCE_DELAY = 500 // ms

export const AQI_LEVELS = [
  { min: 1, max: 1, label: 'Good', color: '#22C55E', bg: 'bg-green-500', description: 'Air quality is satisfactory.' },
  { min: 2, max: 2, label: 'Moderate', color: '#EAB308', bg: 'bg-yellow-500', description: 'Acceptable quality; some pollutants may affect very sensitive people.' },
  { min: 3, max: 3, label: 'Unhealthy (Sensitive)', color: '#F97316', bg: 'bg-orange-500', description: 'Sensitive groups may experience health effects.' },
  { min: 4, max: 4, label: 'Unhealthy', color: '#EF4444', bg: 'bg-red-500', description: 'Everyone may begin to experience health effects.' },
  { min: 5, max: 5, label: 'Very Unhealthy', color: '#A855F7', bg: 'bg-purple-500', description: 'Health alert: everyone may experience serious effects.' },
  { min: 6, max: 6, label: 'Hazardous', color: '#991B1B', bg: 'bg-red-900', description: 'Health warning of emergency conditions.' },
]

export const POLLUTANTS = [
  { key: 'pm2_5', label: 'PM2.5', unit: 'µg/m³', color: '#60A5FA', description: 'Fine particulate matter' },
  { key: 'pm10',  label: 'PM10',  unit: 'µg/m³', color: '#34D399', description: 'Coarse particulate matter' },
  { key: 'co',    label: 'CO',    unit: 'µg/m³', color: '#FBBF24', description: 'Carbon monoxide' },
]

export const getAqiInfo = (aqiIndex) => {
  return AQI_LEVELS.find(l => aqiIndex >= l.min && aqiIndex <= l.max) || AQI_LEVELS[0]
}
