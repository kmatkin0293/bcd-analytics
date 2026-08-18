import { LiveboardEmbed } from '@thoughtspot/visual-embed-sdk/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTier } from '../context/TierContext'
import { hiddenActionsForTier } from '../tierActions'

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
  const { tier } = useTier()
  const navigate = useNavigate()
  const meta = TAB_META[tab] ?? TAB_META.overview

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
