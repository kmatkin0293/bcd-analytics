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
          '--ts-var-root-color': '#001E50',
          '--ts-var-root-background': '#EDF2FC',

          // ── Primary buttons (BCD navy) ──────────────────────────────
          '--ts-var-button--primary-background': '#003087',
          '--ts-var-button--primary-color': '#ffffff',
          '--ts-var-button--primary-border-color': '#003087',

          // ── Secondary buttons ───────────────────────────────────────
          '--ts-var-button--secondary-background': '#ffffff',
          '--ts-var-button--secondary-color': '#003087',
          '--ts-var-button--secondary-border-color': '#B8C8E4',

          // ── Tertiary / ghost buttons ────────────────────────────────
          '--ts-var-button--tertiary-color': '#003087',
          '--ts-var-button--tertiary-background': 'transparent',
          '--ts-var-button--tertiary-border-color': 'transparent',

          // ── Chips / filter pills ────────────────────────────────────
          '--ts-var-chip--active-background': '#003087',
          '--ts-var-chip--active-color': '#ffffff',
          '--ts-var-chip-color': '#3D5A8A',
          '--ts-var-chip-background': '#EDF2FC',
          '--ts-var-chip-border-color': '#D0DAEF',

          // ── Links ───────────────────────────────────────────────────
          '--ts-var-link-color': '#003087',
          '--ts-var-link--hover-color': '#F46522',

          // ── Viz / liveboard background ──────────────────────────────
          '--ts-var-viz-background': '#ffffff',
          '--ts-var-viz-border-color': '#D0DAEF',
          '--ts-var-viz-title-color': '#001E50',
          '--ts-var-viz-title-font-size': '13px',
          '--ts-var-viz-title-font-weight': '600',
          '--ts-var-viz-description-color': '#3D5A8A',
          '--ts-var-viz-legend-hover-background': '#EDF2FC',

          // ── Search bar ──────────────────────────────────────────────
          '--ts-var-search-data-background': '#ffffff',
          '--ts-var-search-data-color': '#001E50',
          '--ts-var-search-auto-complete-background': '#ffffff',

          '--ts-var-viz-color-1': '#003087',
          '--ts-var-viz-color-2': '#1565C0',
          '--ts-var-viz-color-3': '#0D9ED9',
          '--ts-var-viz-color-4': '#4A90D9',
          '--ts-var-viz-color-5': '#00A8B5',
          '--ts-var-viz-color-6': '#3D6BB5',
          '--ts-var-viz-color-7': '#1A4FA8',
          '--ts-var-viz-color-8': '#7BB3E8',
          '--ts-var-viz-color-9': '#2D8EBF',
          '--ts-var-viz-color-10': '#F46522',
        } as any),
        rules_UNSTABLE: {
          // ── Highcharts series colours (area + line charts) ──────────
          '.highcharts-color-0 .highcharts-graph':         { stroke: '#003087' },
          '.highcharts-color-0 .highcharts-area':          { fill: '#003087', 'fill-opacity': '0.12' },
          '.highcharts-color-0 .highcharts-point':         { fill: '#003087', stroke: '#003087' },
          '.highcharts-color-0 .highcharts-column-series': { fill: '#003087' },
          '.highcharts-color-0':                           { fill: '#003087', stroke: '#003087' },

          '.highcharts-color-1 .highcharts-graph':         { stroke: '#1565C0' },
          '.highcharts-color-1 .highcharts-area':          { fill: '#1565C0', 'fill-opacity': '0.12' },
          '.highcharts-color-1 .highcharts-point':         { fill: '#1565C0', stroke: '#1565C0' },
          '.highcharts-color-1':                           { fill: '#1565C0', stroke: '#1565C0' },

          '.highcharts-color-2 .highcharts-graph':         { stroke: '#0D9ED9' },
          '.highcharts-color-2 .highcharts-area':          { fill: '#0D9ED9', 'fill-opacity': '0.12' },
          '.highcharts-color-2 .highcharts-point':         { fill: '#0D9ED9', stroke: '#0D9ED9' },
          '.highcharts-color-2':                           { fill: '#0D9ED9', stroke: '#0D9ED9' },

          '.highcharts-color-3 .highcharts-graph':         { stroke: '#4A90D9' },
          '.highcharts-color-3 .highcharts-area':          { fill: '#4A90D9', 'fill-opacity': '0.12' },
          '.highcharts-color-3 .highcharts-point':         { fill: '#4A90D9', stroke: '#4A90D9' },
          '.highcharts-color-3':                           { fill: '#4A90D9', stroke: '#4A90D9' },

          '.highcharts-color-4 .highcharts-graph':         { stroke: '#00A8B5' },
          '.highcharts-color-4 .highcharts-area':          { fill: '#00A8B5', 'fill-opacity': '0.12' },
          '.highcharts-color-4 .highcharts-point':         { fill: '#00A8B5', stroke: '#00A8B5' },
          '.highcharts-color-4':                           { fill: '#00A8B5', stroke: '#00A8B5' },

          '.highcharts-color-5 .highcharts-graph':         { stroke: '#3D6BB5' },
          '.highcharts-color-5 .highcharts-area':          { fill: '#3D6BB5', 'fill-opacity': '0.12' },
          '.highcharts-color-5':                           { fill: '#3D6BB5', stroke: '#3D6BB5' },

          '.highcharts-color-6 .highcharts-graph':         { stroke: '#1A4FA8' },
          '.highcharts-color-6 .highcharts-area':          { fill: '#1A4FA8', 'fill-opacity': '0.12' },
          '.highcharts-color-6':                           { fill: '#1A4FA8', stroke: '#1A4FA8' },

          '.highcharts-color-7 .highcharts-graph':         { stroke: '#7BB3E8' },
          '.highcharts-color-7 .highcharts-area':          { fill: '#7BB3E8', 'fill-opacity': '0.12' },
          '.highcharts-color-7':                           { fill: '#7BB3E8', stroke: '#7BB3E8' },

          // ── Bar / column charts ─────────────────────────────────────
          '.highcharts-series-0.highcharts-column-series rect.highcharts-point': { fill: '#003087' },
          '.highcharts-series-1.highcharts-column-series rect.highcharts-point': { fill: '#1565C0' },
          '.highcharts-series-2.highcharts-column-series rect.highcharts-point': { fill: '#0D9ED9' },
          '.highcharts-series-3.highcharts-column-series rect.highcharts-point': { fill: '#4A90D9' },

          // ── Pie / donut charts ──────────────────────────────────────
          '.highcharts-series-0 .highcharts-point:nth-child(1)': { fill: '#003087' },
          '.highcharts-series-0 .highcharts-point:nth-child(2)': { fill: '#1565C0' },
          '.highcharts-series-0 .highcharts-point:nth-child(3)': { fill: '#0D9ED9' },
          '.highcharts-series-0 .highcharts-point:nth-child(4)': { fill: '#4A90D9' },
          '.highcharts-series-0 .highcharts-point:nth-child(5)': { fill: '#00A8B5' },
          '.highcharts-series-0 .highcharts-point:nth-child(6)': { fill: '#3D6BB5' },
          '.highcharts-series-0 .highcharts-point:nth-child(7)': { fill: '#1A4FA8' },
          '.highcharts-series-0 .highcharts-point:nth-child(8)': { fill: '#7BB3E8' },

          // ── Card borders & viz containers ───────────────────────────
          '.viz-container': {
            'border-color': '#D0DAEF !important',
            'border-radius': '12px !important',
          },

          // ── Liveboard canvas background ─────────────────────────────
          '.pinboard-content-module__pinboardCanvasWrapper': { background: '#EDF2FC !important' },
          '.pinboard-content-module__pinboardContent':       { background: '#EDF2FC !important' },
          '[class*="pinboardCanvas"]':                       { background: '#EDF2FC !important' },
          '[class*="liveboardCanvas"]':                      { background: '#EDF2FC !important' },
          '.bk-app-root':                                    { background: '#EDF2FC !important' },

          // ── "Analyse change" link colour ────────────────────────────
          'a': { color: '#003087 !important' },
        },
      },
    },
  },
})

// ─── Hidden actions per tier ──────────────────────────────────────────────────

const AI_ACTIONS: Action[] = [
  // SpotIQ / classic AI
  Action.SpotIQAnalyze,
  Action.AIHighlights,
  Action.EnableContextualChangeAnalysis,
  Action.EnableIterativeChangeAnalysis,
  Action.ManageMonitor,
  Action.CreateMonitor,
  // Spotter on individual viz cards and sidebar
  Action.AskAi,
  Action.PreviewDataSpotter,
  Action.ResetSpotterChat,
  Action.SpotterFeedback,
  Action.SpotterSidebarToggle,
  Action.SpotterNewChat,
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
  if (tier === 'basic')      return [...INTERACTIVE_ACTIONS, ...AI_ACTIONS]
  if (tier === 'essentials') return AI_ACTIONS
  return [] // pro — nothing hidden
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
