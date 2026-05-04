const Footer = () => {
  return (
    <footer className="border-t border-gray-100 dark:border-oled-border transition-theme mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400 dark:text-gray-600 font-display">
            © {new Date().getFullYear()} EcoAir — Real-Time Air Quality Analytics
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-slow" />
            <span className="text-xs text-gray-400 dark:text-gray-600 font-display">
              Powered by WeatherAPI.com
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
