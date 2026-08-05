import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTier, Tier } from '../context/TierContext'

const ORANGE = '#E8652A'

const TIERS: {
  id: Tier
  badge: string
  name: string
  desc: string
  color: string
  features: { label: string; included: boolean }[]
}[] = [
  {
    id: 'tier1',
    badge: 'Read Only',
    name: 'View Only',
    desc: 'Read-only dashboards with no interactive features or AI.',
    color: 'rgba(255,255,255,0.22)',
    features: [
      { label: 'Payment Insights Dashboard',     included: true  },
      { label: 'Program Analytics',              included: true  },
      { label: 'Drill-down & Filters',           included: false },
      { label: 'Download & Export',              included: false },
      { label: 'Copy & Share',                   included: false },
      { label: 'AI Analyst & SpotIQ',            included: false },
    ],
  },
  {
    id: 'tier2',
    badge: 'Standard',
    name: 'Standard',
    desc: 'Full interactive analytics — drill-down, filters, exports — without AI features.',
    color: 'rgba(255,255,255,0.22)',
    features: [
      { label: 'Payment Insights Dashboard',     included: true  },
      { label: 'Program Analytics',              included: true  },
      { label: 'Drill-down & Filters',           included: true  },
      { label: 'Download & Export',              included: true  },
      { label: 'Copy & Share',                   included: true  },
      { label: 'AI Analyst & SpotIQ',            included: false },
    ],
  },
  {
    id: 'tier3',
    badge: 'Recommended',
    name: 'Pro',
    desc: 'Everything in Standard plus AI Analyst, SpotIQ and change analysis.',
    color: ORANGE,
    features: [
      { label: 'Payment Insights Dashboard',     included: true },
      { label: 'Program Analytics',              included: true },
      { label: 'Drill-down & Filters',           included: true },
      { label: 'Download & Export',              included: true },
      { label: 'Copy & Share',                   included: true },
      { label: 'AI Analyst & SpotIQ',            included: true },
    ],
  },
]

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}
function Cross() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

function TripSourceMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tsMarkSel" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F46522" />
          <stop offset="100%" stopColor="#C41208" />
        </linearGradient>
        <clipPath id="tsClipSel">
          <rect width="100" height="100" rx="18" />
        </clipPath>
      </defs>
      <rect width="100" height="100" rx="18" fill="url(#tsMarkSel)" />
      <g clipPath="url(#tsClipSel)">
        <rect x="0" y="0" width="33" height="100" fill="white" />
        <path d="M33 15 H61 A22 22 0 0 1 83 37 V100" stroke="white" strokeWidth="10" fill="none" />
        <path d="M33 40 H54 A14 14 0 0 1 68 54 V100" stroke="white" strokeWidth="10" fill="none" />
        <path d="M33 65 H46 A7  7  0 0 1 53 72 V100" stroke="white" strokeWidth="10" fill="none" />
      </g>
    </svg>
  )
}

export default function TierSelect() {
  const { tier: currentTier, setTier } = useTier()
  const navigate = useNavigate()
  const [hover, setHover] = useState<Tier | null>(null)

  const choose = (t: Tier) => {
    setTier(t)
    navigate('/')
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(145deg, #0B5EAE 0%, #073F7A 40%, #041840 100%)',
      padding: '40px 24px',
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      {/* Brand */}
      <div style={{ textAlign: 'center', marginBottom: 44 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 18 }}>
          <TripSourceMark />
          <span style={{ fontSize: 22, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>tripsource</span>
          <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.2)', margin: '0 6px' }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>BCD Travel</span>
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: 10, lineHeight: 1.15 }}>
          Choose your account tier
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14.5, lineHeight: 1.6, maxWidth: 480, margin: '0 auto' }}>
          Select the level of access for this TripSource analytics session
        </p>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', gap: 16, maxWidth: 980, width: '100%', alignItems: 'stretch' }}>
        {TIERS.map(t => {
          const isActive = currentTier === t.id
          const isHovered = hover === t.id
          const isPro = t.id === 'tier3'
          const borderColor = isPro
            ? (isHovered || isActive ? ORANGE : 'rgba(232,101,42,0.45)')
            : (isHovered || isActive ? 'rgba(255,255,255,0.30)' : 'rgba(255,255,255,0.12)')

          return (
            <div
              key={t.id}
              onMouseEnter={() => setHover(t.id)}
              onMouseLeave={() => setHover(null)}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
                border: `${isPro ? '1.5px' : '1px'} solid ${borderColor}`,
                borderRadius: 14, padding: '28px 24px',
                display: 'flex', flexDirection: 'column',
                transition: 'border-color 0.18s, transform 0.18s',
                transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                position: 'relative',
              }}
            >
              {isActive && (
                <div style={{
                  position: 'absolute', top: -1, right: 16,
                  background: '#4ADE80', color: '#064E2A',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                  padding: '3px 10px', borderRadius: '0 0 8px 8px',
                  textTransform: 'uppercase',
                }}>
                  Current
                </div>
              )}

              <div style={{ marginBottom: 20 }}>
                <span style={{
                  display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: isPro ? ORANGE : 'rgba(255,255,255,0.50)',
                  background: isPro ? 'rgba(232,101,42,0.12)' : 'rgba(255,255,255,0.08)',
                  border: `1px solid ${isPro ? 'rgba(232,101,42,0.28)' : 'rgba(255,255,255,0.12)'}`,
                  padding: '3px 10px', borderRadius: 20, marginBottom: 10,
                }}>
                  {t.badge}
                </span>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 6 }}>{t.name}</h2>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.62)', lineHeight: 1.55 }}>{t.desc}</p>
              </div>

              <div style={{ flex: 1, marginBottom: 24 }}>
                {t.features.map((f, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0',
                    borderBottom: i < t.features.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}>
                    <span style={{ color: f.included ? '#4ADE80' : 'rgba(255,255,255,0.20)', flexShrink: 0 }}>
                      {f.included ? <Check /> : <Cross />}
                    </span>
                    <span style={{ fontSize: 13, color: f.included ? '#fff' : 'rgba(255,255,255,0.38)' }}>
                      {f.label}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => choose(t.id)}
                style={{
                  background: isPro ? ORANGE : 'rgba(255,255,255,0.08)',
                  border: isPro ? 'none' : '1px solid rgba(255,255,255,0.18)',
                  color: '#fff', borderRadius: 9, padding: '11px 22px',
                  fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'inherit', transition: 'background 0.15s', width: '100%',
                }}
                onMouseEnter={e => e.currentTarget.style.background = isPro ? '#d05520' : 'rgba(255,255,255,0.14)'}
                onMouseLeave={e => e.currentTarget.style.background = isPro ? ORANGE : 'rgba(255,255,255,0.08)'}
              >
                {isActive ? `Continue as ${t.name}` : `Switch to ${t.name}`}
              </button>
            </div>
          )
        })}
      </div>

      <p style={{ marginTop: 24, fontSize: 12, color: 'rgba(255,255,255,0.40)', textAlign: 'center' }}>
        You can switch tiers at any time from the TripSource dashboard
      </p>
    </div>
  )
}
