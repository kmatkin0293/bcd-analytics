import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { init, AuthType } from '@thoughtspot/visual-embed-sdk'
import { TierProvider } from './context/TierContext'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import AIAssistantWidget from './components/AIAssistantWidget'
import Home from './pages/Home'
import TierSelect from './pages/TierSelect'
import {
  LiveboardsPage,
  ExecutiveOverviewPage,
  SpotterPage,
  AnswersPage,
  CollectionsPage,
  SchedulesPage,
  SearchDataPage,
} from './pages/EmbedPages'

init({
  thoughtSpotHost: 'https://se-thoughtspot-cloud.thoughtspot.cloud',
  authType: AuthType.Basic,
  username: 'katie.matkin@thoughtspot.com',
  password: 'Welcome2026!',
  customizations: {
    iconSpriteUrl: 'https://cdn.jsdelivr.net/gh/CamTS256/icon-store/plane.svg',
    content: {
      strings: {
        'Spotter': 'BCD AI',
        'Hi, I\'m Spotter': 'Hi, I\'m BCD AI',
        'Ask Spotter': 'Ask BCD AI',
        'Powered by Spotter': 'Powered by BCD AI',
        'AI Highlights': 'BCD AI Highlights',
      },
    },
    style: {
      customCSS: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
          variables: ({
          // ── Typography ─────────────────────────────────────────────
          '--ts-var-root-font-family': "'Inter Display', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
          '--ts-var-root-color': '#0B0052',
          '--ts-var-root-background': '#F1F4F6',

          // ── Primary buttons (BCD navy) ──────────────────────────────
          '--ts-var-button--primary-background': '#0B0052',
          '--ts-var-button--primary-color': '#ffffff',
          '--ts-var-button--primary-border-color': '#0B0052',

          // ── Secondary buttons ───────────────────────────────────────
          '--ts-var-button--secondary-background': '#ffffff',
          '--ts-var-button--secondary-color': '#0B0052',
          '--ts-var-button--secondary-border-color': '#B7C9D3',

          // ── Tertiary / ghost buttons ────────────────────────────────
          '--ts-var-button--tertiary-color': '#0B0052',
          '--ts-var-button--tertiary-background': 'transparent',
          '--ts-var-button--tertiary-border-color': 'transparent',

          // ── Chips / filter pills ────────────────────────────────────
          '--ts-var-chip--active-background': '#0B0052',
          '--ts-var-chip--active-color': '#ffffff',
          '--ts-var-chip-color': '#2A3744',
          '--ts-var-chip-background': '#F1F4F6',
          '--ts-var-chip-border-color': '#DDE4E9',

          // ── Links ───────────────────────────────────────────────────
          '--ts-var-link-color': '#0B0052',
          '--ts-var-link--hover-color': '#FC4C02',

          // ── Viz / liveboard background ──────────────────────────────
          '--ts-var-viz-background': '#ffffff',
          '--ts-var-viz-border-color': '#DDE4E9',
          '--ts-var-viz-title-color': '#0B0052',
          '--ts-var-viz-title-font-size': '13px',
          '--ts-var-viz-title-font-weight': '600',
          '--ts-var-viz-description-color': '#2A3744',
          '--ts-var-viz-legend-hover-background': '#F1F4F6',

          // ── Search bar ──────────────────────────────────────────────
          '--ts-var-search-data-background': '#ffffff',
          '--ts-var-search-data-color': '#0B0052',
          '--ts-var-search-auto-complete-background': '#ffffff',

          '--ts-var-viz-color-1': '#0B0052',
          '--ts-var-viz-color-2': '#00629B',
          '--ts-var-viz-color-3': '#00AFD7',
          '--ts-var-viz-color-4': '#188171',
          '--ts-var-viz-color-5': '#00A651',
          '--ts-var-viz-color-6': '#4A90D9',
          '--ts-var-viz-color-7': '#180075',
          '--ts-var-viz-color-8': '#B7C9D3',
          '--ts-var-viz-color-9': '#007BFF',
          '--ts-var-viz-color-10': '#FC4C02',
        } as any),
        rules_UNSTABLE: {
          // ── Highcharts series colours (area + line charts) ──────────
          '.highcharts-color-0 .highcharts-graph':         { stroke: '#0B0052' },
          '.highcharts-color-0 .highcharts-area':          { fill: '#0B0052', 'fill-opacity': '0.12' },
          '.highcharts-color-0 .highcharts-point':         { fill: '#0B0052', stroke: '#0B0052' },
          '.highcharts-color-0 .highcharts-column-series': { fill: '#0B0052' },
          '.highcharts-color-0':                           { fill: '#0B0052', stroke: '#0B0052' },

          '.highcharts-color-1 .highcharts-graph':         { stroke: '#00629B' },
          '.highcharts-color-1 .highcharts-area':          { fill: '#00629B', 'fill-opacity': '0.12' },
          '.highcharts-color-1 .highcharts-point':         { fill: '#00629B', stroke: '#00629B' },
          '.highcharts-color-1':                           { fill: '#00629B', stroke: '#00629B' },

          '.highcharts-color-2 .highcharts-graph':         { stroke: '#00AFD7' },
          '.highcharts-color-2 .highcharts-area':          { fill: '#00AFD7', 'fill-opacity': '0.12' },
          '.highcharts-color-2 .highcharts-point':         { fill: '#00AFD7', stroke: '#00AFD7' },
          '.highcharts-color-2':                           { fill: '#00AFD7', stroke: '#00AFD7' },

          '.highcharts-color-3 .highcharts-graph':         { stroke: '#188171' },
          '.highcharts-color-3 .highcharts-area':          { fill: '#188171', 'fill-opacity': '0.12' },
          '.highcharts-color-3 .highcharts-point':         { fill: '#188171', stroke: '#188171' },
          '.highcharts-color-3':                           { fill: '#188171', stroke: '#188171' },

          '.highcharts-color-4 .highcharts-graph':         { stroke: '#00A651' },
          '.highcharts-color-4 .highcharts-area':          { fill: '#00A651', 'fill-opacity': '0.12' },
          '.highcharts-color-4 .highcharts-point':         { fill: '#00A651', stroke: '#00A651' },
          '.highcharts-color-4':                           { fill: '#00A651', stroke: '#00A651' },

          '.highcharts-color-5 .highcharts-graph':         { stroke: '#4A90D9' },
          '.highcharts-color-5 .highcharts-area':          { fill: '#4A90D9', 'fill-opacity': '0.12' },
          '.highcharts-color-5':                           { fill: '#4A90D9', stroke: '#4A90D9' },

          '.highcharts-color-6 .highcharts-graph':         { stroke: '#FC4C02' },
          '.highcharts-color-6 .highcharts-area':          { fill: '#FC4C02', 'fill-opacity': '0.10' },
          '.highcharts-color-6':                           { fill: '#FC4C02', stroke: '#FC4C02' },

          '.highcharts-color-7 .highcharts-graph':         { stroke: '#B7C9D3' },
          '.highcharts-color-7 .highcharts-area':          { fill: '#B7C9D3', 'fill-opacity': '0.12' },
          '.highcharts-color-7':                           { fill: '#B7C9D3', stroke: '#B7C9D3' },

          // ── Bar / column charts ─────────────────────────────────────
          '.highcharts-series-0.highcharts-column-series rect.highcharts-point': { fill: '#0B0052' },
          '.highcharts-series-1.highcharts-column-series rect.highcharts-point': { fill: '#00629B' },
          '.highcharts-series-2.highcharts-column-series rect.highcharts-point': { fill: '#00AFD7' },
          '.highcharts-series-3.highcharts-column-series rect.highcharts-point': { fill: '#188171' },

          // ── Pie / donut charts ──────────────────────────────────────
          '.highcharts-series-0 .highcharts-point:nth-child(1)': { fill: '#0B0052' },
          '.highcharts-series-0 .highcharts-point:nth-child(2)': { fill: '#00629B' },
          '.highcharts-series-0 .highcharts-point:nth-child(3)': { fill: '#00AFD7' },
          '.highcharts-series-0 .highcharts-point:nth-child(4)': { fill: '#188171' },
          '.highcharts-series-0 .highcharts-point:nth-child(5)': { fill: '#00A651' },
          '.highcharts-series-0 .highcharts-point:nth-child(6)': { fill: '#4A90D9' },
          '.highcharts-series-0 .highcharts-point:nth-child(7)': { fill: '#FC4C02' },
          '.highcharts-series-0 .highcharts-point:nth-child(8)': { fill: '#B7C9D3' },

          // ── Card borders & viz containers ───────────────────────────
          '.viz-container': {
            'border-color': '#DDE4E9 !important',
            'border-radius': '12px !important',
          },

          // ── Liveboard canvas background ─────────────────────────────
          '.pinboard-content-module__pinboardCanvasWrapper': { background: '#F1F4F6 !important' },
          '.pinboard-content-module__pinboardContent':       { background: '#F1F4F6 !important' },
          '[class*="pinboardCanvas"]':                       { background: '#F1F4F6 !important' },
          '[class*="liveboardCanvas"]':                      { background: '#F1F4F6 !important' },
          '.bk-app-root':                                    { background: '#F1F4F6 !important' },

          // ── "Analyse change" link colour ────────────────────────────
          'a': { color: '#0B0052 !important' },

        },
      },
    },
  },
})

export { hiddenActionsForTier } from './tierActions'

function Shell() {
  return (
    <div className="app-layout">
      <Header />
      <div className="content-area">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/liveboards" element={<LiveboardsPage />} />
            <Route path="/executive-overview" element={<ExecutiveOverviewPage />} />
            <Route path="/spotter" element={<SpotterPage />} />
            <Route path="/answers" element={<AnswersPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/schedules" element={<SchedulesPage />} />
            <Route path="/search-data" element={<SearchDataPage />} />
            <Route path="/tier-select" element={<TierSelect />} />
          </Routes>
        </main>
      </div>
      <AIAssistantWidget />
    </div>
  )
}

function AppRouter() {
  return <Shell />
}

function App() {
  return (
    <BrowserRouter>
      <TierProvider>
        <AppRouter />
      </TierProvider>
    </BrowserRouter>
  )
}

export default App
