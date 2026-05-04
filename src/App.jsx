import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { DataProvider } from './context/DataContext'
import { SearchProvider } from './context/SearchContext'
import LayoutWrapper from './components/layout/LayoutWrapper'
import ErrorBoundary from './components/common/ErrorBoundary'
import Dashboard from './pages/Dashboard'
import CityAnalysis from './pages/CityAnalysis'

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <DataProvider>
          <SearchProvider>
            <BrowserRouter>
              <LayoutWrapper>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/city/:name" element={<CityAnalysis />} />
                </Routes>
              </LayoutWrapper>
            </BrowserRouter>
          </SearchProvider>
        </DataProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
