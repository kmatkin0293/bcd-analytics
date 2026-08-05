import { LiveboardEmbed } from '@thoughtspot/visual-embed-sdk/react'
import { Action } from '@thoughtspot/visual-embed-sdk'
import { useNavigate } from 'react-router-dom'
import { useTier } from '../context/TierContext'

const LIVEBOARD_ID = '757c3274-bbf8-490d-8078-f64f44351a64'

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
  const { isSpotterPro } = useTier()
  const navigate = useNavigate()

  if (!isSpotterPro) {
    return (
      <div style={{
        background: '#F5F7FA', minHeight: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 40,
      }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid #E5E9F2',
          borderRadius: 16, padding: '48px 52px', textAlign: 'center', maxWidth: 460,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 12,
            background: 'rgba(43,39,119,0.07)', border: '1px solid rgba(43,39,119,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2B2777" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A2340', marginBottom: 10 }}>
            Program Insights is a Pro feature
          </h2>
          <p style={{ fontSize: 13.5, color: '#5B6B8A', lineHeight: 1.65, marginBottom: 28 }}>
            Upgrade to TripSource Pro to access policy compliance benchmarking, spend analytics, and program performance tracking.
          </p>
          <button
            onClick={() => navigate('/tier-select')}
            style={{
              background: '#2B2777', color: '#fff', border: 'none',
              borderRadius: 9, padding: '11px 28px', fontSize: 14, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit',
              transition: 'background 0.15s, transform 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#211E5C'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#2B2777'; e.currentTarget.style.transform = 'none' }}
          >
            Upgrade to Pro
          </button>
        </div>
      </div>
    )
  }

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
