import { LiveboardEmbed } from '@thoughtspot/visual-embed-sdk/react'

const LIVEBOARD_ID = '7a6055d1-0b61-452b-967b-2927dc669970'

const KPIS = [
  { label: 'Gross Written Premium', value: '£24.7B', sub: 'YTD',          color: '#4ADE80' },
  { label: 'YoY Growth',            value: '+8.3%',  sub: 'vs Prior Year', color: '#4ADE80' },
  { label: 'Renewal Rate',          value: '87.4%',  sub: 'This Quarter',  color: '#4ADE80' },
  { label: 'New Business Written',  value: '£3.2B',  sub: 'YTD',          color: '#4ADE80' },
]

function PageKpis() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, padding: '0 32px 16px' }}>
      {KPIS.map((k, i) => (
        <div key={i} style={{
          background: '#F8FAFF', border: '1px solid #E5EAF5',
          borderRadius: 10, padding: '14px 16px',
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, color: '#9CA3AF',
            textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6,
          }}>
            {k.label}
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#8A0051', letterSpacing: '-0.02em', marginBottom: 4 }}>
            {k.value}
          </div>
          <div style={{ fontSize: 11, color: k.color, fontWeight: 600 }}>{k.sub}</div>
        </div>
      ))}
    </div>
  )
}

export default function PremiumsOverview() {
  return (
    <div className="embed-page">
      <div className="page-header">
        <h1>Premiums Overview</h1>
        <p>Gross written premium trends, renewal rates, and product-line performance</p>
      </div>
      <PageKpis />
      <div className="embed-area">
        <div className="embed-shell">
          <LiveboardEmbed
            liveboardId={LIVEBOARD_ID}
            fullHeight={true}
            isLiveboardMasterpiecesEnabled={true}
            frameParams={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  )
}
