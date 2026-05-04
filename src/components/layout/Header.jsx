import { NavLink, Link } from 'react-router-dom'
import ThemeToggle from '../common/ThemeToggle'
import SearchBar from '../common/SearchBar'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-100 dark:border-oled-border transition-theme">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-7 h-7 rounded-lg bg-gray-900 dark:bg-white flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <svg className="w-4 h-4 text-white dark:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 .75-7.414 5.25 5.25 0 0 0-10.233-2.33 3 3 0 0 0-3.758 3.848A4.5 4.5 0 0 0 2.25 15z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 font-display tracking-tight hidden sm:block">
              EcoAir
            </span>
          </Link>

          {/* Search bar (compact) */}
          <div className="flex-1 max-w-sm">
            <SearchBar compact />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-auto shrink-0">
            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-3 py-1.5 text-xs font-medium rounded-md font-display transition-colors duration-150 ${
                    isActive
                      ? 'bg-gray-100 dark:bg-oled-surface text-gray-900 dark:text-gray-100'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`
                }
              >
                Dashboard
              </NavLink>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
