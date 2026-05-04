import { API_BASE_URL, API_KEY } from './constants'

/**
 * Fetch air quality data for a given city.
 * @param {string} city - City name
 * @param {AbortSignal} signal - Optional AbortSignal for cancellation
 * @returns {Promise<Object>} - Parsed JSON response
 */
export const fetchCityAirQuality = async (city, signal = null) => {
  const url = `${API_BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(city.trim())}&aqi=yes`

  const options = { method: 'GET' }
  if (signal) options.signal = signal

  const response = await fetch(url, options)

  if (response.status === 400 || response.status === 404) {
    const err = new Error(`City "${city}" not found. Please check the spelling and try again.`)
    err.type = 'NOT_FOUND'
    throw err
  }

  if (!response.ok) {
    const err = new Error(`Server error (${response.status}). Please try again later.`)
    err.type = 'SERVER_ERROR'
    throw err
  }

  return response.json()
}
