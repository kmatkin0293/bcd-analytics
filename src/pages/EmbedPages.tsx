import { useState } from 'react'
import {
  AppEmbed,
  SearchEmbed,
  SpotterEmbed,
  LiveboardEmbed,
  Page,
  useEmbedRef,
} from '@thoughtspot/visual-embed-sdk/react'
import {
  Action,
  CustomActionsPosition,
  CustomActionTarget,
  HostEvent,
  SpotterQueryMode,
} from '@thoughtspot/visual-embed-sdk'
import { useTier } from '../context/TierContext'
import { hiddenActionsForTier } from '../tierActions'
import PassengerDetailsModal from '../components/PassengerDetailsModal'

const EXECUTIVE_OVERVIEW_LIVEBOARD = '3c46f1c1-52bc-4af4-a897-b4585bb6b3ca'

const WORKSHEET_ID = '83774852-f400-4fdc-94b3-a6be4804c201'

// ─── Shared frame height (viewport minus header + page-header) ────────────────
const FRAME_H = 'calc(100vh - 180px)'

// ─── "Show Passenger Details" context-menu action (applied to all VIZ targets) ─
const PASSENGER_ACTION = {
  id: 'show-passenger-details',
  name: 'Show Passenger Details',
  position: CustomActionsPosition.CONTEXTMENU,
  target: CustomActionTarget.VIZ,
} as const

// Extract country value from a ThoughtSpot context-menu action payload.
// The clicked point carries selectedAttributes; we look for the first
// attribute whose column name contains "country" (case-insensitive).
function extractCountryFromPayload(payload: any): { country: string; columnName: string } | null {
  const clickedPoint =
    payload?.data?.contextMenuPoints?.clickedPoint ??
    payload?.contextMenuPoints?.clickedPoint
  if (!clickedPoint) return null

  const attrs: any[] = [
    ...(clickedPoint.selectedAttributes ?? []),
    ...(clickedPoint.deselectedAttributes ?? []),
  ]

  const match = attrs.find(
    (a: any) =>
      typeof a?.column?.name === 'string' &&
      a.column.name.toLowerCase().includes('country'),
  )

  if (!match) return null
  return { country: String(match.value), columnName: match.column.name }
}

// ─── Shared page shell ────────────────────────────────────────────────────────

function PageShell({
  breadcrumb,
  title,
  desc,
  children,
}: {
  breadcrumb: string
  title: string
  desc: string
  children: React.ReactNode
}) {
  return (
    <div className="embed-page">
      <div className="page-header">
        <div style={{ fontSize: 11, color: '#8DA3B0', fontWeight: 600, letterSpacing: '0.04em', marginBottom: 4 }}>
          {breadcrumb}
        </div>
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
      <div className="embed-area">
        <div className="embed-shell">
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── Liveboards ───────────────────────────────────────────────────────────────

export function LiveboardsPage() {
  const { tier } = useTier()
  const [modal, setModal] = useState<{ country: string; columnName: string } | null>(null)

  const handleCustomAction = (payload: any) => {
    if (
      payload?.id !== PASSENGER_ACTION.id &&
      payload?.data?.id !== PASSENGER_ACTION.id
    ) return
    const result = extractCountryFromPayload(payload)
    if (result) setModal(result)
  }

  return (
    <>
      <PageShell
        breadcrumb="BCD Analytics"
        title="My Reports"
        desc="Browse and explore all available reports and liveboards across your travel program"
      >
        <AppEmbed
          pageId={Page.Liveboards}
          hiddenActions={hiddenActionsForTier(tier)}
          showPrimaryNavbar={false}
          frameParams={{ width: '100%', height: FRAME_H }}
          customActions={[PASSENGER_ACTION]}
          onCustomAction={handleCustomAction}
        />
      </PageShell>
      {modal && (
        <PassengerDetailsModal
          country={modal.country}
          columnName={modal.columnName}
          onClose={() => setModal(null)}
        />
      )}
    </>
  )
}

// ─── Executive Overview ───────────────────────────────────────────────────────

export function ExecutiveOverviewPage() {
  const { tier } = useTier()
  const [modal, setModal] = useState<{ country: string; columnName: string } | null>(null)

  const handleCustomAction = (payload: any) => {
    if (
      payload?.id !== PASSENGER_ACTION.id &&
      payload?.data?.id !== PASSENGER_ACTION.id
    ) return
    const result = extractCountryFromPayload(payload)
    if (result) setModal(result)
  }

  return (
    <>
      <PageShell
        breadcrumb="BCD Analytics"
        title="Executive Overview"
        desc="Executive overview analytics across your travel program"
      >
        <LiveboardEmbed
          liveboardId={EXECUTIVE_OVERVIEW_LIVEBOARD}
          hiddenActions={hiddenActionsForTier(tier)}
          fullHeight={true}
          isLiveboardMasterpiecesEnabled={true}
          frameParams={{ width: '100%' }}
          customActions={[PASSENGER_ACTION]}
          onCustomAction={handleCustomAction}
        />
      </PageShell>
      {modal && (
        <PassengerDetailsModal
          country={modal.country}
          columnName={modal.columnName}
          onClose={() => setModal(null)}
        />
      )}
    </>
  )
}

// ─── Spotter ─────────────────────────────────────────────────────────────────

const SAMPLE_QUESTIONS = [
  { label: 'Top destinations', q: 'What are the top 10 travel destinations?' },
  { label: 'Bookings this month', q: 'How many bookings were made this month?' },
  { label: 'Spend by country', q: 'What is the total travel spend by country?' },
  { label: 'Frequent travellers', q: 'Who are the top 10 most frequent travellers?' },
  { label: 'Average trip cost', q: 'What is the average cost per trip?' },
  { label: 'Trips by department', q: 'Show me the number of trips by department' },
  { label: 'Month vs last month', q: 'How does this month compare to last month?' },
  { label: 'Cancelled bookings', q: 'How many bookings were cancelled?' },
]

const SpotterIcon = () => (
  <svg width="36" height="22" viewBox="0 0 46 32" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M9.159,23H14.5c0.006,0,0.01-0.003,0.016-0.003c1.011,5.152,4.522,8.969,8.698,8.969
      c4.175,0,7.685-3.816,8.697-8.966h4.172c-0.881,0.636-1.462,1.666-1.462,2.833c0,1.93,1.57,3.5,3.5,3.5s3.5-1.57,3.5-3.5
      c0-1.167-0.58-2.197-1.462-2.833H45.5c0.276,0,0.5-0.224,0.5-0.5S45.776,22,45.5,22H32.074c0.085-0.663,0.139-1.34,0.139-2.034
      c0-2.598-0.629-4.999-1.686-6.966H36.5c0.276,0,0.5-0.224,0.5-0.5S36.776,12,36.5,12h-6c-0.177,0-0.324,0.097-0.413,0.235
      c-1.594-2.516-3.949-4.138-6.587-4.25V1c0-0.276-0.224-0.5-0.5-0.5S22.5,0.724,22.5,1v7c0,0.005,0.003,0.009,0.003,0.014
      C20.121,8.264,18.002,10,16.501,12c0,0-0.001,0-0.001,0h-6c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5h5.4
      c-1.057,1.966-1.686,4.368-1.686,6.966c0,0.695,0.054,1.372,0.139,2.034H0.5C0.224,22,0,22.224,0,22.5S0.224,23,0.5,23h4.583
      c-0.881,0.636-1.462,1.666-1.462,2.833c0,1.93,1.57,3.5,3.5,3.5s3.5-1.57,3.5-3.5C10.621,24.666,10.041,23.636,9.159,23z
       M40.621,25.833c0,1.379-1.122,2.5-2.5,2.5s-2.5-1.121-2.5-2.5s1.122-2.5,2.5-2.5S40.621,24.454,40.621,25.833z M23.214,8.966
      c4.411,0,8,4.935,8,11s-3.589,11-8,11s-8-4.935-8-11S18.803,8.966,23.214,8.966z M7.121,28.333c-1.378,0-2.5-1.121-2.5-2.5
      s1.122-2.5,2.5-2.5s2.5,1.121,2.5,2.5S8.5,28.333,7.121,28.333z"/>
    <path d="M20.5,16h5c0.276,0,0.5-0.224,0.5-0.5S25.776,15,25.5,15h-5c-0.276,0-0.5,0.224-0.5,0.5S20.224,16,20.5,16z"/>
  </svg>
)

// Tier badge shown in the questions panel
const TIER_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  basic:      { label: 'Basic',      color: '#8DA3B0',  bg: 'rgba(141,163,176,0.10)' },
  premium:    { label: 'Premium',    color: '#7C3AED',  bg: 'rgba(124,58,237,0.10)'  },
  enterprise: { label: 'Enterprise', color: '#FC4C02',  bg: 'rgba(252,76,2,0.10)'    },
}

export function SpotterPage() {
  const embedRef = useEmbedRef<typeof SpotterEmbed>()
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const { tier, hasMCP, hasChatHistory, hasAnalysts } = useTier()

  const handleQuestion = (q: string, idx: number) => {
    setActiveIdx(idx)
    setTimeout(() => setActiveIdx(null), 1800)
    embedRef.current?.trigger(HostEvent.SpotterSearch, {
      query: q,
      executeSearch: true,
    })
  }

  // Build tier-specific SpotterEmbed props
  const tierSpotterProps: Record<string, any> = {}

  // Enable the updated Spotter 3 chat prompt for all tiers — this is what
  // activates the new bottom-bar UI and the MCP connector icon.
  tierSpotterProps.updatedSpotterChatPrompt = true

  if (tier === 'basic') {
    // Hide mode switcher + MCP connector via action IDs (where supported)
    // and CSS selectors (official docs workaround for connector elements).
    tierSpotterProps.hiddenActions = [
      Action.SpotterChatModeSwitcher,
      Action.SpotterChatConnectors,
      Action.SpotterChatConnectorResources,
    ]
    tierSpotterProps.customizations = {
      style: {
        rules_UNSTABLE: {
          // MCP connector resources button (exact selector from TS docs)
          '.button-module__buttonWrapper.chat-connector-resources-module__addConnectorResourceButton': {
            display: 'none !important',
          },
          // "+" add resources icon (exact selector from TS docs)
          'button.button-module__button.button-module__buttonWithIcon.button-module__tertiary.button-module__sizeM.button-module__backgroundLight.button-module__both': {
            display: 'none !important',
          },
          // Broader fallback — any element whose class references connector modules
          '[class*="chat-connector"]': {
            display: 'none !important',
          },
          '[class*="chatConnector"]': {
            display: 'none !important',
          },
        },
      },
    }
  }

  if (hasMCP) {
    // Premium + Enterprise: enable Deep Analysis (Research) mode and brand MCP cards
    tierSpotterProps.defaultQueryMode = SpotterQueryMode.RESEARCH
    tierSpotterProps.spotterChatConfig = {
      toolResponseCardBrandingLabel: 'BCD AI',
    }
  }

  if (hasChatHistory) {
    tierSpotterProps.enablePastConversationsSidebar = true
  }

  if (hasAnalysts) {
    tierSpotterProps.spotterSidebarConfig = {
      enablePastConversationsSidebar: true,
      spotterAnalystsLabel: 'Analysts',
    }
  }

  const badge = TIER_BADGE[tier]

  // Feature flags shown in the questions panel
  const features = [
    { label: 'BCD AI Chat',       active: true                             },
    { label: 'Fast Search & Deep Analysis', active: tier !== 'basic'       },
    { label: 'MCP Tools',         active: hasMCP                           },
    { label: 'Chat History',      active: hasChatHistory                   },
    { label: 'Analysts',          active: hasAnalysts                      },
  ]

  return (
    <div className="ai-page">
      {/* Page header */}
      <div className="page-header">
        <div style={{ fontSize: 11, color: '#8DA3B0', fontWeight: 600, letterSpacing: '0.04em', marginBottom: 4 }}>
          BCD Analytics
        </div>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SpotterIcon />
          BCD AI
        </h1>
        <p>Ask natural language questions about your travel data and get instant AI-powered answers</p>
      </div>

      {/* Two-column body */}
      <div style={{ display: 'flex', gap: 20, padding: '0 24px 24px', alignItems: 'flex-start' }}>

        {/* Left: embed */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="embed-shell">
            <SpotterEmbed
              ref={embedRef}
              worksheetId={WORKSHEET_ID}
              hideSampleQuestions={true}
              frameParams={{ width: '100%', height: 'calc(100vh - 200px)' }}
              {...tierSpotterProps}
            />
          </div>
        </div>

        {/* Right: panel */}
        <div style={{
          width: 260,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>

          {/* Tier status card */}
          <div style={{
            background: '#fff',
            border: '1px solid #DDE4E9',
            borderRadius: 12,
            padding: '14px 16px',
            boxShadow: '0 2px 8px rgba(11,0,82,0.05)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#8DA3B0', textTransform: 'uppercase' }}>
                AI Tier
              </span>
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
                textTransform: 'uppercase', padding: '3px 9px', borderRadius: 20,
                color: badge.color, background: badge.bg,
              }}>
                {badge.label}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                    background: f.active ? 'rgba(74,222,128,0.15)' : 'rgba(0,0,0,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {f.active
                      ? <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      : <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><line x1="3" y1="3" x2="9" y2="9" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round"/><line x1="9" y1="3" x2="3" y2="9" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round"/></svg>
                    }
                  </span>
                  <span style={{ fontSize: 11.5, color: f.active ? '#0B0052' : '#B7C9D3', fontWeight: f.active ? 500 : 400 }}>
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample questions */}
          <div style={{
            background: '#fff',
            border: '1px solid #DDE4E9',
            borderRadius: 12,
            padding: '14px 16px',
            boxShadow: '0 2px 8px rgba(11,0,82,0.05)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#8DA3B0', textTransform: 'uppercase', marginBottom: 12 }}>
              Try asking
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SAMPLE_QUESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuestion(item.q, idx)}
                  title={item.q}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    background: activeIdx === idx ? 'rgba(11,0,82,0.06)' : '#F1F4F6',
                    border: '1px solid',
                    borderColor: activeIdx === idx ? 'rgba(11,0,82,0.2)' : '#DDE4E9',
                    borderRadius: 8,
                    padding: '10px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'inherit',
                    transition: 'all 0.15s',
                    width: '100%',
                  }}
                  onMouseEnter={e => {
                    if (activeIdx !== idx) {
                      e.currentTarget.style.background = 'rgba(11,0,82,0.05)'
                      e.currentTarget.style.borderColor = 'rgba(11,0,82,0.18)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (activeIdx !== idx) {
                      e.currentTarget.style.background = '#F1F4F6'
                      e.currentTarget.style.borderColor = '#DDE4E9'
                    }
                  }}
                >
                  <span style={{ fontSize: 14, marginTop: 1, flexShrink: 0, color: '#FC4C02' }}>›</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#0B0052', marginBottom: 2 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 11, color: '#8DA3B0', lineHeight: 1.4 }}>
                      {activeIdx === idx ? '✓ Asking BCD AI...' : item.q}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div style={{ marginTop: 14, fontSize: 10, color: '#B7C9D3', lineHeight: 1.5 }}>
              Click any question to send it directly to BCD AI.
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

// ─── Answers ─────────────────────────────────────────────────────────────────

export function AnswersPage() {
  const { tier } = useTier()
  return (
    <PageShell
      breadcrumb="BCD Analytics"
      title="Answers"
      desc="View and manage all saved answers and search results from your travel analytics"
    >
      <AppEmbed
        pageId={Page.Answers}
        hiddenActions={hiddenActionsForTier(tier)}
        showPrimaryNavbar={false}
        frameParams={{ width: '100%', height: FRAME_H }}
      />
    </PageShell>
  )
}

// ─── Collections ─────────────────────────────────────────────────────────────

export function CollectionsPage() {
  const { tier } = useTier()
  return (
    <PageShell
      breadcrumb="BCD Analytics"
      title="Collections"
      desc="Organise and manage your curated collections of liveboards, answers, and data objects"
    >
      <AppEmbed
        pageId={Page.Collections}
        hiddenActions={hiddenActionsForTier(tier)}
        showPrimaryNavbar={false}
        frameParams={{ width: '100%', height: FRAME_H }}
      />
    </PageShell>
  )
}

// ─── Schedules ───────────────────────────────────────────────────────────────

export function SchedulesPage() {
  const { tier } = useTier()
  return (
    <PageShell
      breadcrumb="BCD Analytics"
      title="Schedules"
      desc="Set up and manage automated delivery schedules for liveboards and reports"
    >
      <AppEmbed
        path="/insights/home/monitor-alerts"
        hiddenActions={hiddenActionsForTier(tier)}
        showPrimaryNavbar={false}
        frameParams={{ width: '100%', height: FRAME_H }}
      />
    </PageShell>
  )
}

// ─── Search Data ─────────────────────────────────────────────────────────────

export function SearchDataPage() {
  const { tier } = useTier()
  return (
    <PageShell
      breadcrumb="BCD Analytics"
      title="Search Data"
      desc="Search across all your travel data sources using natural language or guided search"
    >
      <SearchEmbed
        dataSources={[WORKSHEET_ID]}
        hiddenActions={hiddenActionsForTier(tier)}
        enableSearchAssist={true}
        frameParams={{ width: '100%', height: FRAME_H }}
      />
    </PageShell>
  )
}
