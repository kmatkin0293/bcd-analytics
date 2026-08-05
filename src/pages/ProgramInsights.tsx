import { LiveboardEmbed } from '@thoughtspot/visual-embed-sdk/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTier } from '../context/TierContext'
import { hiddenActionsForTier } from '../App'

const LIVEBOARD_ID = '757c3274-bbf8-490d-8078-f64f44351a64'

// tabId: ThoughtSpot liveboard tab GUID. undefined = show full liveboard (Overview)
const TABS: { key: string; label: string; tabId?: string }[] = [
  { key: 'overview',   label: 'Overview'        },
  { key: 'flights',    label: 'Flights',          tabId: 'e24b8552-5865-473b-9e33-56d4e51a6b83' },
  { key: 'hotels',     label: 'Hotels & Ground',  tabId: '047d7b5e-2518-4be4-9033-3df7b738c8b8' },
  { key: 'operations', label: 'Operations',       tabId: '047d7b5e-2518-4be4-9033-3df7b738c8b8' },
]

const TAB_META: Record<string, { title: string; desc: string }> = {
  overview:   { title: 'Overview',        desc: 'Program-level summary across all travel categories and key performance metrics'      },
  flights:    { title: 'Flights',         desc: 'Air travel spend, booking trends, carrier performance and policy compliance'         },
  hotels:     { title: 'Hotels & Ground', desc: 'Hotel and ground transport spend, preferred supplier usage and savings captured'     },
  operations: { title: 'Operations',      desc: 'Operational metrics, service delivery performance and traveler satisfaction trends'  },
}

export default function ProgramInsights() {
  const { tab = 'overview' } = useParams<{ tab?: string }>()
  const { tier, isInteractive } = useTier()
  const navigate = useNavigate()
  const meta = TAB_META[tab] ?? TAB_META.overview

  // Tier 1 (View Only) cannot access Program Insights
  if (!isInteractive) {
    return (
      <div style={{
        background: 'transparent', minHeight: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40,
      }}>
        <div style={{
          background: '#ffffff', border: '1px solid #DED9EF',
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
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A1245', marginBottom: 10 }}>
            Program Insights requires Standard or Pro
          </h2>
          <p style={{ fontSize: 13.5, color: '#4A4570', lineHeight: 1.65, marginBottom: 28 }}>
            Your current View Only tier does not include Program Insights. Upgrade to access flights, hotels, ground and operations analytics.
          </p>
          <button
            onClick={() => navigate('/tier-select')}
            style={{
              background: '#2B2777', color: '#fff', border: 'none',
              borderRadius: 9, padding: '11px 28px', fontSize: 14, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.15s, transform 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#211E5C'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#2B2777'; e.currentTarget.style.transform = 'none' }}
          >
            Change Tier
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="embed-page">
      {/* Page header */}
      <div className="page-header">
        <div style={{ fontSize: 11, color: '#9B96B8', fontWeight: 500, marginBottom: 4 }}>
          Program Insights
        </div>
        <h1>{meta.title}</h1>
        <p>{meta.desc}</p>
      </div>

      {/* Tab bar */}
      <div style={{
        display: 'flex', gap: 2, padding: '0 28px',
        borderBottom: '1px solid #DED9EF', background: 'transparent',
      }}>
        {TABS.map(t => {
          const isActive = t.key === tab
          return (
            <button
              key={t.key}
              onClick={() => navigate(`/program-insights/${t.key}`)}
              style={{
                padding: '10px 18px',
                fontSize: 13, fontWeight: isActive ? 600 : 400,
                color: isActive ? '#2B2777' : '#4A4570',
                background: 'none', border: 'none',
                borderBottom: isActive ? '2px solid #2B2777' : '2px solid transparent',
                cursor: 'pointer', fontFamily: 'inherit',
                marginBottom: -1,
                transition: 'color 0.15s, border-color 0.15s',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#2B2777' }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#4A4570' }}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Liveboard embed */}
      <div className="embed-area">
        <div className="embed-shell">
          {(() => {
            const activeTabId = TABS.find(t => t.key === tab)?.tabId
            return (
              <LiveboardEmbed
                key={tab}
                liveboardId={LIVEBOARD_ID}
                {...(activeTabId ? { activeTabId } : {})}
                hiddenActions={hiddenActionsForTier(tier)}
                fullHeight={true}
                isLiveboardMasterpiecesEnabled={true}
                frameParams={{ width: '100%' }}
              />
            )
          })()}
        </div>
      </div>
    </div>
  )
}
