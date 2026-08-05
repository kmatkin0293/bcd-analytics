import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { init, AuthType, Action } from '@thoughtspot/visual-embed-sdk'
import { TierProvider, useTier, Tier } from './context/TierContext'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import AIAssistantWidget from './components/AIAssistantWidget'
import Home from './pages/Home'
import SupplyChainOverview from './pages/SupplyChainOverview'
import ProgramInsights from './pages/ProgramInsights'
import AIAssistantPage from './pages/AIAssistantPage'
import TierSelect from './pages/TierSelect'

init({
  thoughtSpotHost: 'https://sebe.thoughtspotstaging.cloud',
  authType: AuthType.Basic,
  username: 'katie.matkin@thoughtspot.com',
  password: 'Welcome2026!',
  customizations: {
    iconSpriteUrl: 'https://cdn.jsdelivr.net/gh/CamTS256/icon-store/robot11.svg',
    content: {
      strings: {
        'Spotter': 'AI Analyst',
        'Hi, I\'m Spotter': 'Hi, I\'m AI Analyst',
        'Ask Spotter': 'Ask AI Analyst',
        'Powered by Spotter': 'Powered by AI Analyst',
        'AI Highlights': 'AI Analyst Highlights',
      },
    },
    style: {
      customCSS: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        variables: ({
          // ── Typography ─────────────────────────────────────────────
          '--ts-var-root-font-family': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
          '--ts-var-root-color': '#1A1245',
          '--ts-var-root-background': '#EDEAF7',

          // ── Primary buttons (indigo) ────────────────────────────────
          '--ts-var-button--primary-background': '#2B2777',
          '--ts-var-button--primary-color': '#ffffff',
          '--ts-var-button--primary-border-color': '#2B2777',

          // ── Secondary buttons ───────────────────────────────────────
          '--ts-var-button--secondary-background': '#ffffff',
          '--ts-var-button--secondary-color': '#2B2777',
          '--ts-var-button--secondary-border-color': '#C4BDE0',

          // ── Tertiary / ghost buttons ────────────────────────────────
          '--ts-var-button--tertiary-color': '#2B2777',
          '--ts-var-button--tertiary-background': 'transparent',
          '--ts-var-button--tertiary-border-color': 'transparent',

          // ── Chips / filter pills ────────────────────────────────────
          '--ts-var-chip--active-background': '#2B2777',
          '--ts-var-chip--active-color': '#ffffff',
          '--ts-var-chip-color': '#4A4570',
          '--ts-var-chip-background': '#F4F2FC',
          '--ts-var-chip-border-color': '#DED9EF',

          // ── Links ───────────────────────────────────────────────────
          '--ts-var-link-color': '#2B2777',
          '--ts-var-link--hover-color': '#E8652A',

          // ── Viz / liveboard background ──────────────────────────────
          '--ts-var-viz-background': '#ffffff',
          '--ts-var-viz-border-color': '#DED9EF',
          '--ts-var-viz-title-color': '#1A1245',
          '--ts-var-viz-title-font-size': '13px',
          '--ts-var-viz-title-font-weight': '600',
          '--ts-var-viz-description-color': '#4A4570',
          '--ts-var-viz-legend-hover-background': '#F4F2FC',

          // ── Search bar ──────────────────────────────────────────────
          '--ts-var-search-data-background': '#ffffff',
          '--ts-var-search-data-color': '#1A1245',
          '--ts-var-search-auto-complete-background': '#ffffff',

          '--ts-var-viz-color-1': '#2B2777',
          '--ts-var-viz-color-2': '#5E59C4',
          '--ts-var-viz-color-3': '#4A90D9',
          '--ts-var-viz-color-4': '#9B96D8',
          '--ts-var-viz-color-5': '#00A8B5',
          '--ts-var-viz-color-6': '#7B75A8',
          '--ts-var-viz-color-7': '#3D3AAF',
          '--ts-var-viz-color-8': '#B8B4E8',
          '--ts-var-viz-color-9': '#2D6BB5',
          '--ts-var-viz-color-10': '#E8652A',
        } as any),
        rules_UNSTABLE: {
          // ── Highcharts series colours (area + line charts) ──────────
          '.highcharts-color-0 .highcharts-graph':         { stroke: '#2B2777' },
          '.highcharts-color-0 .highcharts-area':          { fill: '#2B2777', 'fill-opacity': '0.12' },
          '.highcharts-color-0 .highcharts-point':         { fill: '#2B2777', stroke: '#2B2777' },
          '.highcharts-color-0 .highcharts-column-series': { fill: '#2B2777' },
          '.highcharts-color-0':                           { fill: '#2B2777', stroke: '#2B2777' },

          '.highcharts-color-1 .highcharts-graph':         { stroke: '#5E59C4' },
          '.highcharts-color-1 .highcharts-area':          { fill: '#5E59C4', 'fill-opacity': '0.12' },
          '.highcharts-color-1 .highcharts-point':         { fill: '#5E59C4', stroke: '#5E59C4' },
          '.highcharts-color-1':                           { fill: '#5E59C4', stroke: '#5E59C4' },

          '.highcharts-color-2 .highcharts-graph':         { stroke: '#4A90D9' },
          '.highcharts-color-2 .highcharts-area':          { fill: '#4A90D9', 'fill-opacity': '0.12' },
          '.highcharts-color-2 .highcharts-point':         { fill: '#4A90D9', stroke: '#4A90D9' },
          '.highcharts-color-2':                           { fill: '#4A90D9', stroke: '#4A90D9' },

          '.highcharts-color-3 .highcharts-graph':         { stroke: '#9B96D8' },
          '.highcharts-color-3 .highcharts-area':          { fill: '#9B96D8', 'fill-opacity': '0.12' },
          '.highcharts-color-3 .highcharts-point':         { fill: '#9B96D8', stroke: '#9B96D8' },
          '.highcharts-color-3':                           { fill: '#9B96D8', stroke: '#9B96D8' },

          '.highcharts-color-4 .highcharts-graph':         { stroke: '#00A8B5' },
          '.highcharts-color-4 .highcharts-area':          { fill: '#00A8B5', 'fill-opacity': '0.12' },
          '.highcharts-color-4 .highcharts-point':         { fill: '#00A8B5', stroke: '#00A8B5' },
          '.highcharts-color-4':                           { fill: '#00A8B5', stroke: '#00A8B5' },

          '.highcharts-color-5 .highcharts-graph':         { stroke: '#7B75A8' },
          '.highcharts-color-5 .highcharts-area':          { fill: '#7B75A8', 'fill-opacity': '0.12' },
          '.highcharts-color-5':                           { fill: '#7B75A8', stroke: '#7B75A8' },

          '.highcharts-color-6 .highcharts-graph':         { stroke: '#3D3AAF' },
          '.highcharts-color-6 .highcharts-area':          { fill: '#3D3AAF', 'fill-opacity': '0.12' },
          '.highcharts-color-6':                           { fill: '#3D3AAF', stroke: '#3D3AAF' },

          '.highcharts-color-7 .highcharts-graph':         { stroke: '#B8B4E8' },
          '.highcharts-color-7 .highcharts-area':          { fill: '#B8B4E8', 'fill-opacity': '0.12' },
          '.highcharts-color-7':                           { fill: '#B8B4E8', stroke: '#B8B4E8' },

          // ── Bar / column charts ─────────────────────────────────────
          '.highcharts-series-0.highcharts-column-series rect.highcharts-point': { fill: '#2B2777' },
          '.highcharts-series-1.highcharts-column-series rect.highcharts-point': { fill: '#5E59C4' },
          '.highcharts-series-2.highcharts-column-series rect.highcharts-point': { fill: '#4A90D9' },
          '.highcharts-series-3.highcharts-column-series rect.highcharts-point': { fill: '#9B96D8' },

          // ── Pie / donut charts ──────────────────────────────────────
          '.highcharts-series-0 .highcharts-point:nth-child(1)': { fill: '#2B2777' },
          '.highcharts-series-0 .highcharts-point:nth-child(2)': { fill: '#5E59C4' },
          '.highcharts-series-0 .highcharts-point:nth-child(3)': { fill: '#4A90D9' },
          '.highcharts-series-0 .highcharts-point:nth-child(4)': { fill: '#9B96D8' },
          '.highcharts-series-0 .highcharts-point:nth-child(5)': { fill: '#00A8B5' },
          '.highcharts-series-0 .highcharts-point:nth-child(6)': { fill: '#7B75A8' },
          '.highcharts-series-0 .highcharts-point:nth-child(7)': { fill: '#3D3AAF' },
          '.highcharts-series-0 .highcharts-point:nth-child(8)': { fill: '#B8B4E8' },

          // ── Card borders & viz containers ───────────────────────────
          '.viz-container': {
            'border-color': '#DED9EF !important',
            'border-radius': '12px !important',
          },

          // ── Liveboard canvas background ─────────────────────────────
          '.pinboard-content-module__pinboardCanvasWrapper': { background: '#EDEAF7 !important' },
          '.pinboard-content-module__pinboardContent':       { background: '#EDEAF7 !important' },
          '[class*="pinboardCanvas"]':                       { background: '#EDEAF7 !important' },
          '[class*="liveboardCanvas"]':                      { background: '#EDEAF7 !important' },
          '.bk-app-root':                                    { background: '#EDEAF7 !important' },

          // ── "Analyse change" link colour ────────────────────────────
          'a': { color: '#2B2777 !important' },
        },
      },
    },
  },
})

// ─── Hidden actions per tier ──────────────────────────────────────────────────

const AI_ACTIONS: Action[] = [
  Action.SpotIQAnalyze,
  Action.AIHighlights,
  Action.EnableContextualChangeAnalysis,
  Action.EnableIterativeChangeAnalysis,
  Action.ManageMonitor,
  Action.CreateMonitor,
]

const INTERACTIVE_ACTIONS: Action[] = [
  Action.DrillDown,
  Action.DrillExclude,
  Action.DrillInclude,
  Action.AddFilter,
  Action.CrossFilter,
  Action.RemoveCrossFilter,
  Action.Share,
  Action.CopyLink,
  Action.Download,
  Action.DownloadAsCsv,
  Action.DownloadAsXlsx,
  Action.DownloadAsPdf,
  Action.Edit,
  Action.EditTML,
  Action.ExportTML,
  Action.UpdateTML,
  Action.MakeACopy,
  Action.SaveAsView,
  Action.Pin,
  Action.ShowUnderlyingData,
  Action.Explore,
  Action.ReportError,
]

export function hiddenActionsForTier(tier: Tier): Action[] {
  if (tier === 'tier1') return [...INTERACTIVE_ACTIONS, ...AI_ACTIONS]
  if (tier === 'tier2') return AI_ACTIONS
  return []
}

function Shell() {
  const { isSpotterPro } = useTier()

  return (
    <div className="app-layout">
      <Header />
      <div className="content-area">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/supply-chain" element={<SupplyChainOverview />} />
            <Route path="/program-insights" element={<ProgramInsights />} />
            <Route path="/program-insights/:tab" element={<ProgramInsights />} />
            <Route path="/ai-assistant" element={<AIAssistantPage />} />
            <Route path="/tier-select" element={<TierSelect />} />
          </Routes>
        </main>
      </div>
      {isSpotterPro && <AIAssistantWidget />}
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
