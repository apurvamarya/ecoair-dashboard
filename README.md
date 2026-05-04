# EcoAir — Real-Time Air Quality Analytics Dashboard

A production-ready React dashboard for real-time air quality analysis of any city globally. Built with a minimalist, premium aesthetic featuring OLED dark mode support.

## ✨ Features

- 🌍 **Search any city** — real-time air quality data for any location worldwide
- 📊 **Recharts visualization** — pollutant bar charts (PM2.5, PM10, CO)
- 🌗 **OLED Dark Mode** — true black (#000000) dark mode with smooth transitions, persisted to localStorage
- ♻️ **Auto-refresh** — data refreshes every 5 minutes automatically
- ⚡ **Debounced search** — 500ms debounce prevents excessive API calls
- 🧩 **Context API** — ThemeContext, DataContext (caching), SearchContext
- 🛡️ **Error Boundary** — graceful crash recovery
- 📱 **Responsive** — mobile-first layout

## 🧱 Tech Stack

| Concern | Choice |
|---|---|
| Framework | React 18 (functional components + hooks) |
| Build Tool | Vite |
| Language | JavaScript ES6+ / JSX |
| Routing | React Router v6 |
| Styling | Tailwind CSS (utility-only) |
| Charts | Recharts |
| HTTP | Fetch API (no Axios) |
| State | Context API (no Redux) |
| API | WeatherAPI.com |

## 📁 File Structure

```
ecoair-dashboard/
├── src/
│   ├── components/
│   │   ├── common/       # ErrorBoundary, LoadingSpinner, ThemeToggle, SearchBar
│   │   ├── layout/       # Header, Footer, LayoutWrapper
│   │   └── dashboard/    # AirQualityCard, PollutantChart, CityInfoSection, DashboardView
│   ├── context/          # ThemeContext, DataContext, SearchContext
│   ├── hooks/            # useDebounce, useAirQuality, useAutoRefresh
│   ├── pages/            # Dashboard, CityAnalysis
│   └── utils/            # api.js, constants.js
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# 1. Extract the ZIP
unzip ecoair-dashboard.zip
cd ecoair-dashboard

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## 🌐 Routes

| Route | Component | Description |
|---|---|---|
| `/` | Dashboard | Redirects to `/city/London` on mount |
| `/city/:name` | CityAnalysis | Detailed air quality view for any city |

## 🔌 API

**Endpoint:** `https://api.weatherapi.com/v1/current.json`

**Parameters:**
- `key` — API key (hardcoded)
- `q` — City name
- `aqi=yes` — Include air quality data

**Pollutants displayed:** PM2.5, PM10, CO only (as specified)

## 📦 Deploy to Vercel

### Option 1: Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

### Option 2: GitHub + Vercel Dashboard
1. Push to GitHub: `git push origin main`
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Vercel auto-detects Vite — click **Deploy**

**Build settings (auto-detected):**
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

## 🎨 Design System

| Token | Light | Dark (OLED) |
|---|---|---|
| Background | `#FFFFFF` | `#000000` |
| Text Primary | `#1A1A1A` | `#F5F5F5` |
| Text Secondary | `#6B7280` | `#9CA3AF` |
| Accent | `#3B82F6` | `#60A5FA` |
| Border | `#E5E7EB` | `#1A1A1A` |
| Card BG | `#FFFFFF` | `#111111` |

## 📋 Module Checklist

- [x] **Module 1** — useEffect: mount fetch, city change re-fetch, cleanup AbortController
- [x] **Module 2** — Forms: controlled input, onSubmit, validation, children wrapper
- [x] **Module 3** — React Router v6: BrowserRouter, Routes, useParams, useNavigate, NavLink
- [x] **Module 4** — Advanced Hooks: useRef (abort, debounce timer), useMemo (sorted pollutants), useCallback (handlers)
- [x] **Module 5** — API: async/await Fetch, loading state, 404 handling, network errors
- [x] **Module 6** — Context API: ThemeContext, DataContext, SearchContext
- [x] **Module 7** — Performance: useDebounce (500ms), setInterval auto-refresh (5min), cleanup

---

Built with ❤️ using React + Vite + Tailwind CSS
