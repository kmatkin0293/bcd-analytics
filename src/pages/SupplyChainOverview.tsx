import { LiveboardEmbed } from '@thoughtspot/visual-embed-sdk/react'
import { Action } from '@thoughtspot/visual-embed-sdk'
import { useTier } from '../context/TierContext'

const LIVEBOARD_ID = '76354676-c78f-4a99-852b-247befb976ed'

const ESSENTIALS_HIDDEN: Action[] = [
  Action.DrillDown,
  Action.SpotIQAnalyze,
  Action.ManageMonitor,
  Action.CreateMonitor,
  Action.AIHighlights,
  Action.EnableContextualChangeAnalysis,
  Action.EnableIterativeChangeAnalysis,
]

const KPIS = [
  { label: 'Total Charges',         value: '$14.79M', sub: 'Last 30 Days',    color: '#22C55E' },
  { label: 'Transactions',          value: '6K',      sub: 'Last 30 Days',    color: '#22C55E' },
  { label: 'Central Card Accounts', value: '14',      sub: 'Active',          color: '#0B5EAE' },
  { label: 'Virtual Card Accounts', value: '4',       sub: 'Active',          color: '#0B5EAE' },
]

function PageKpis() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, padding: '0 28px 16px' }}>
      {KPIS.map((k, i) => (
        <div key={i} style={{
          background: '#ffffff', border: '1px solid #E5E9F2',
          borderRadius: 10, padding: '14px 16px',
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, color: '#9CA3AF',
            textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6,
          }}>
            {k.label}
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#2B2777', letterSpacing: '-0.02em', marginBottom: 3 }}>
            {k.value}
          </div>
          <div style={{ fontSize: 11, color: k.color, fontWeight: 600 }}>{k.sub}</div>
        </div>
      ))}
    </div>
  )
}

export default function SupplyChainOverview() {
  const { isSpotterPro } = useTier()

  return (
    <div className="embed-page">
      <div className="page-header">
        <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500, marginBottom: 4 }}>
          Spend Management
        </div>
        <h1>Payment Insights</h1>
        <p>Total card charges, transactions, and account analytics across all programs</p>
      </div>
      <PageKpis />
      <div className="embed-area">
        <div className="embed-shell">
          <LiveboardEmbed
            liveboardId={LIVEBOARD_ID}
            hiddenActions={isSpotterPro ? [] : ESSENTIALS_HIDDEN}
            fullHeight={true}
            isLiveboardMasterpiecesEnabled={true}
            frameParams={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  )
}
