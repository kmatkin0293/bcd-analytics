import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTier } from '../context/TierContext'

// ─── Constants ───────────────────────────────────────────────────────────────

const WORKSHEET_ID = '83774852-f400-4fdc-94b3-a6be4804c201'
const TS_HOST      = 'https://sebe.thoughtspotstaging.cloud'
const LIVEBOARD_ID = '757c3274-bbf8-490d-8078-f64f44351a64'

const ACCENT       = '#0B0052'
const ACCENT_LIGHT = 'rgba(11,0,82,0.07)'
const ACCENT_BORDER= 'rgba(11,0,82,0.18)'
const ORANGE       = '#FC4C02'

// ─── KPI icons ────────────────────────────────────────────────────────────────

const IconCard = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
)
const IconTransactions = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="17 1 21 5 17 9"/>
    <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
    <polyline points="7 23 3 19 7 15"/>
    <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
  </svg>
)
const IconChart = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
)
const IconGlobe = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)
const IconPolicy = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

// ─── KPI definitions ──────────────────────────────────────────────────────────

type KpiFormat = 'currency' | 'number' | 'percent' | 'integer'

const KPI_DEFS = [
  { label: 'Total Charges',         change: '+8.2%',  trend: 'up',   query: '[Total Charges]',            fallback: '$14.79M', format: 'currency' as KpiFormat, icon: <IconCard />         },
  { label: 'Total Bookings',         change: '+5.4%',  trend: 'up',   query: '[Total Bookings]',           fallback: '6K',      format: 'number'   as KpiFormat, icon: <IconTransactions /> },
  { label: 'Central Card Accounts', change: '0%',     trend: 'flat', query: '[Central Card Accounts]',    fallback: '14',      format: 'integer'  as KpiFormat, icon: <IconChart />        },
  { label: 'Virtual Card Accounts', change: '+2',     trend: 'up',   query: '[Virtual Card Accounts]',    fallback: '4',       format: 'integer'  as KpiFormat, icon: <IconGlobe />        },
  { label: 'Policy Compliance',     change: '+1.2%',  trend: 'up',   query: '[Policy Compliance Rate]',   fallback: '94.6%',   format: 'percent'  as KpiFormat, icon: <IconPolicy />       },
]

// ─── Value formatter ──────────────────────────────────────────────────────────

function formatKpiDisplay(raw: string | null, fmt: KpiFormat, fallback: string): string {
  if (raw === null) return fallback
  const n = parseFloat(raw)
  if (isNaN(n)) return raw
  switch (fmt) {
    case 'currency': {
      if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
      if (n >= 1_000)     return `$${(n / 1_000).toFixed(0)}K`
      return `$${n.toFixed(0)}`
    }
    case 'number': {
      if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
      if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`
      return n.toLocaleString('en-US', { maximumFractionDigits: 0 })
    }
    case 'integer': {
      return n.toLocaleString('en-US', { maximumFractionDigits: 0 })
    }
    case 'percent': {
      const pct = n <= 1 ? n * 100 : n
      return `${pct.toFixed(1)}%`
    }
  }
}

// ─── SearchData API helper ────────────────────────────────────────────────────

async function fetchKpiValue(query: string): Promise<string | null> {
  try {
    const res = await fetch(`${TS_HOST}/api/rest/2.0/searchdata`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        query_string: query,
        logical_table_identifier: WORKSHEET_ID,
        data_format: 'COMPACT',
        record_offset: 0,
        record_size: 1,
      }),
    })
    if (!res.ok) return null
    const data = await res.json()
    const val = data?.contents?.[0]?.data_rows?.[0]?.[0]
    return val != null ? String(val) : null
  } catch {
    return null
  }
}

async function fetchLiveboardKpis(): Promise<Record<string, string>> {
  try {
    const res = await fetch(`${TS_HOST}/api/rest/2.0/metadata/liveboard/data`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        metadata_identifier: LIVEBOARD_ID,
        data_format: 'COMPACT',
        record_offset: 0,
        record_size: 10,
      }),
    })
    if (!res.ok) return {}
    const data = await res.json()
    const result: Record<string, string> = {}
    for (const viz of data?.contents ?? []) {
      const name: string = viz.visualization_name ?? ''
      const rows: unknown[][] = viz.data_rows ?? []
      if (rows.length === 1 && rows[0].length === 1 && rows[0][0] != null) {
        result[name.toLowerCase()] = String(rows[0][0])
      }
    }
    return result
  } catch {
    return {}
  }
}

// ─── KPI strip ────────────────────────────────────────────────────────────────

interface Kpi { label: string; value: string; change: string; trend: string; icon: React.ReactNode }

function TrendUp()   { return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="18 15 12 9 6 15"/></svg> }
function TrendDown() { return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg> }

function trendColor(t: string) {
  return t === 'up' ? '#22C55E' : t === 'down' ? '#EF4444' : '#9CA3AF'
}

function KpiStrip({ kpis, loading }: { kpis: Kpi[]; loading: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${kpis.length}, 1fr)`,
      gap: '12px',
      width: '100%',
    }}>
      {kpis.map((kpi, i) => (
        <div
          key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            background: '#ffffff',
            border: hovered === i ? `1px solid ${ACCENT_BORDER}` : '1px solid #E5E9F2',
            borderRadius: '12px',
            padding: '16px 18px',
            cursor: 'default',
            transform: hovered === i ? 'translateY(-2px)' : 'translateY(0)',
            transition: 'transform 180ms ease, border-color 180ms ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 7,
              background: ACCENT_LIGHT, border: `1px solid ${ACCENT_BORDER}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: ACCENT,
            }}>
              {kpi.icon}
            </div>
            {kpi.trend !== 'flat' && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 3,
                color: trendColor(kpi.trend), fontSize: '11px', fontWeight: 700,
              }}>
                {kpi.trend === 'up' ? <TrendUp /> : <TrendDown />}
                <span>{kpi.change}</span>
              </div>
            )}
          </div>

          <div style={{
            fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em',
            color: loading ? 'transparent' : ACCENT,
            borderRadius: '5px',
            background: loading ? '#EEF1F8' : 'none',
            animation: loading ? 'kpiShimmer 1.4s ease-in-out infinite' : 'none',
            minWidth: loading ? '48px' : 'auto',
            display: 'inline-block',
            marginBottom: 3,
          }}>
            {kpi.value}
          </div>

          <div style={{
            fontSize: '10px', fontWeight: 700, color: '#9CA3AF',
            textTransform: 'uppercase', letterSpacing: '0.07em',
          }}>
            {kpi.label}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Animated search bar ──────────────────────────────────────────────────────

const PLACEHOLDER_QUERIES = [
  'What is my NDC breakdown?',
  'Show me all travelers going to China in the next 7 days',
  'Show my top 6 hotel cities with the top hotel in each city',
  'What are my top car suppliers by spend YTD?',
  'What is my policy compliance rate this quarter?',
]

const CHIPS = [
  'NDC breakdown',
  'Top hotel cities by spend',
  'Top car suppliers YTD',
  'Travelers going to China',
]

function SearchBar() {
  const [value, setValue]         = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false
    let idx = 0
    let timeout: ReturnType<typeof setTimeout>

    const type = (pos: number) => {
      if (cancelled) return
      const target = PLACEHOLDER_QUERIES[idx]
      setPlaceholder(target.slice(0, pos))
      if (pos < target.length) {
        timeout = setTimeout(() => type(pos + 1), 50)
      } else {
        timeout = setTimeout(() => erase(target.length), 2200)
      }
    }

    const erase = (pos: number) => {
      if (cancelled) return
      const target = PLACEHOLDER_QUERIES[idx]
      setPlaceholder(target.slice(0, pos))
      if (pos > 0) {
        timeout = setTimeout(() => erase(pos - 1), 24)
      } else {
        idx = (idx + 1) % PLACEHOLDER_QUERIES.length
        timeout = setTimeout(() => type(0), 400)
      }
    }

    timeout = setTimeout(() => type(0), 600)
    return () => { cancelled = true; clearTimeout(timeout) }
  }, [])

  const go = (q: string) => {
    if (q.trim()) navigate(`/spotter?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={e => { e.preventDefault(); go(value) }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          background: '#FFFFFF',
          border: '1px solid #DDE4E9',
          borderRadius: '12px', padding: '4px 4px 4px 16px',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8DA3B0" strokeWidth="2" style={{ flexShrink: 0, marginRight: 10 }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="search-input"
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={placeholder || 'Ask AI Analyst anything about your travel spend data…'}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: '#0B0052', fontSize: '13.5px', fontFamily: 'inherit',
              padding: '10px 0', caretColor: '#0B0052',
            }}
          />
          <button
            type="submit"
            disabled={!value.trim()}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: ORANGE,
              color: '#fff', border: 'none', borderRadius: '9px',
              padding: '9px 16px', fontSize: '13px', fontWeight: 700,
              cursor: value.trim() ? 'pointer' : 'not-allowed',
              opacity: value.trim() ? 1 : 0.55, flexShrink: 0, fontFamily: 'inherit',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"/>
            </svg>
            Ask AI Analyst
          </button>
        </div>
      </form>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
        {CHIPS.map(c => (
          <button
            key={c}
            onClick={() => go(c)}
            style={{
              background: '#FFFFFF',
              border: '1px solid #DDE4E9',
              borderRadius: '20px', padding: '5px 13px',
              color: '#2A3744',
              fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#FC4C02'
              e.currentTarget.style.color = '#FC4C02'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#DDE4E9'
              e.currentTarget.style.color = '#2A3744'
            }}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Nav cards ────────────────────────────────────────────────────────────────

const NAV_CARDS = [
  {
    route: '/liveboards',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    title: 'My Reports',
    body:  'Browse and explore all available reports and liveboards across your travel program.',
  },
  {
    route: '/answers',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: 'Answers',
    body:  'View and manage all saved answers and search results from your travel analytics.',
  },
  {
    route: '/search-data',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    title: 'Search Data',
    body:  'Search across all your travel data using natural language or guided search.',
  },
  {
    route: '/spotter',
    icon: (
      <svg width="28" height="16" viewBox="0 0 46 32" fill="currentColor">
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
    ),
    title: 'BCD AI',
    body:  'Ask natural language questions about your travel data and get instant AI-powered answers.',
    accentOrange: true,
  },
]

function NavCard({ icon, title, body, route, accentOrange }: { icon: React.ReactNode; title: string; body: string; route: string; accentOrange?: boolean }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const color = accentOrange ? ORANGE : ACCENT
  const lightBg = accentOrange ? 'rgba(232,101,42,0.08)' : ACCENT_LIGHT
  const borderColor = accentOrange ? 'rgba(232,101,42,0.22)' : ACCENT_BORDER

  return (
    <div
      onClick={() => navigate(route)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#F8FAFF' : '#ffffff',
        borderRadius: '12px', padding: '20px',
        border: `1px solid ${hovered ? borderColor : '#E5E9F2'}`,
        cursor: 'pointer',
        transition: 'border-color 0.15s, background 0.15s, transform 0.15s',
        transform: hovered ? 'translateY(-2px)' : 'none',
        textAlign: 'left',
      }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: lightBg, border: `1px solid ${borderColor}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: color, marginBottom: 10,
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: 13, fontWeight: 700, color: '#0B0052', marginBottom: 5 }}>{title}</h3>
      <p style={{ fontSize: 12, color: '#2A3744', lineHeight: 1.55, marginBottom: 14 }}>{body}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: color, fontSize: 12, fontWeight: 600 }}>
        Open
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </div>
    </div>
  )
}

// ─── KPI data hook ────────────────────────────────────────────────────────────

function useKpis() {
  const [kpis, setKpis]       = useState<Kpi[]>(KPI_DEFS.map(d => ({ label: d.label, value: d.fallback, change: d.change, trend: d.trend, icon: d.icon })))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const rawValues = await Promise.all(KPI_DEFS.map(d => fetchKpiValue(d.query)))

      const nullCount = rawValues.filter(v => v === null).length
      let liveboardData: Record<string, string> = {}
      if (nullCount >= 3) {
        liveboardData = await fetchLiveboardKpis()
      }

      if (cancelled) return

      setKpis(KPI_DEFS.map((d, i) => {
        let raw = rawValues[i]
        if (raw === null && Object.keys(liveboardData).length > 0) {
          const labelKey = d.label.toLowerCase()
          const match = Object.keys(liveboardData).find(k =>
            k.includes(labelKey) || labelKey.split(' ').some(w => w.length > 3 && k.includes(w))
          )
          if (match) raw = liveboardData[match]
        }
        const value = formatKpiDisplay(raw, d.format, d.fallback)
        return { label: d.label, value, change: d.change, trend: d.trend, icon: d.icon }
      }))
      setLoading(false)
    })()
    return () => { cancelled = true }
  }, [])

  return { kpis, loading }
}

// ─── Hero decoration ──────────────────────────────────────────────────────────

function HeroDecoration() {
  return (
    <div style={{
      position: 'absolute', right: 0, top: 0, bottom: 0,
      width: '50%', overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
    }}>
      <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="xhatch" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 0 28 L 28 0" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" fill="none"/>
            <path d="M 0 0 L 28 28" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" fill="none"/>
          </pattern>
          <radialGradient id="xhatchFade" cx="80%" cy="50%" r="65%" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="white" stopOpacity="1"/>
            <stop offset="55%"  stopColor="white" stopOpacity="0.45"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </radialGradient>
          <mask id="xhatchMask">
            <rect width="100%" height="100%" fill="url(#xhatchFade)"/>
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#xhatch)" mask="url(#xhatchMask)"/>
      </svg>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const { kpis, loading } = useKpis()
  const { tier } = useTier()
  const navigate = useNavigate()

  const tierName = tier === 'enterprise' ? 'Enterprise' : tier === 'premium' ? 'Premium' : 'Basic'

  return (
    <div style={{ background: 'transparent' }}>
      <style>{`
        @keyframes kpiShimmer {
          0%,100% { opacity: 0.4; }
          50%      { opacity: 1;   }
        }
        .search-input::placeholder { color: #9B96B8; }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', paddingBottom: 36, background: 'transparent' }}>
        <HeroDecoration />

        <div style={{ padding: '30px 44px 34px', position: 'relative', zIndex: 1 }}>

          {/* Breadcrumb */}
          <div style={{ fontSize: 11, color: '#8DA3B0', marginBottom: 14, fontWeight: 600, letterSpacing: '0.04em' }}>
            BCD Travel &nbsp;/&nbsp; BCD Analytics
          </div>

          {/* Heading */}
          <h1 style={{ fontSize: 36, lineHeight: 1.1, fontWeight: 800, color: '#0B0052', letterSpacing: '-0.03em', maxWidth: 560, marginBottom: 14 }}>
            Welcome back to<br />
            <span style={{ color: '#FC4C02' }}>BCD Analytics.</span>
          </h1>

          {/* Subtitle */}
          <p style={{ color: '#2A3744', fontSize: 14.5, lineHeight: 1.65, maxWidth: 500, marginBottom: 26 }}>
            Travel spend analytics, payment insights, and real-time card tracking — powered by AI Analyst. You're on the{' '}
            <strong style={{ color: '#0B0052', fontWeight: 700 }}>{tierName}</strong> plan.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
            <button
              onClick={() => navigate('/liveboards')}
              style={{
                background: ACCENT, color: '#ffffff', border: 'none',
                borderRadius: 8, padding: '10px 24px', fontWeight: 700,
                fontSize: 13.5, cursor: 'pointer', fontFamily: 'inherit',
                transition: 'opacity 0.15s, transform 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none' }}
            >
              My Reports
            </button>
            <button
              onClick={() => navigate('/spotter')}
              style={{
                background: ORANGE, color: '#ffffff',
                border: 'none',
                borderRadius: 8, padding: '10px 24px', fontWeight: 700,
                fontSize: 13.5, cursor: 'pointer', fontFamily: 'inherit',
                transition: 'opacity 0.15s, transform 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none' }}
            >
              Open BCD AI
            </button>
          </div>

          {/* Search bar */}
          <div style={{ maxWidth: 660 }}>
            <SearchBar />
          </div>
        </div>
      </section>

      {/* ── Content panel ───────────────────────────────────────────────── */}
      <section style={{
        background: 'transparent',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ padding: '36px 44px 48px' }}>

          {/* KPI strip */}
          <KpiStrip kpis={kpis} loading={loading} />

          {/* Quick Access */}
          <h2 style={{
            fontSize: 15, fontWeight: 700, color: '#0B0052',
            margin: '28px 0 14px', letterSpacing: '-0.01em',
          }}>
            Quick Access
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {NAV_CARDS.map(c => (
              <NavCard key={c.route} {...c} />
            ))}
          </div>

        </div>
      </section>
    </div>
  )
}
