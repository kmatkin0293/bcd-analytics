import { LiveboardEmbed } from '@thoughtspot/visual-embed-sdk/react'

const LIVEBOARD_ID = '757c3274-bbf8-490d-8078-f64f44351a64'


const KPIS = [
  { label: 'Policy Compliance',   value: '94.6%',   sub: 'This Quarter',  color: '#22C55E' },
  { label: 'Avg Trip Cost',       value: '$2,340',  sub: 'Last 30 Days',  color: '#F59E0B' },
  { label: 'Active Travelers',    value: '1,842',   sub: 'This Month',    color: '#0B5EAE' },
  { label: 'Savings Captured',    value: '$184K',   sub: 'YTD',           color: '#22C55E' },
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

export default function SpoilageQuality() {
  return (
    <div className="embed-page">
      <div className="page-header">
        <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500, marginBottom: 4 }}>
          Program Insights
        </div>
        <h1>Program Analytics</h1>
        <p>Policy compliance, travel program performance, and savings benchmarking</p>
      </div>
      <PageKpis />
      <div className="embed-area">
        <div className="embed-shell">
          <LiveboardEmbed
            liveboardId={LIVEBOARD_ID}
            hiddenActions={[]}
            fullHeight={true}
            isLiveboardMasterpiecesEnabled={true}
            frameParams={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  )
}
