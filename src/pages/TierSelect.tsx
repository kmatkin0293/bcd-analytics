import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTier } from '../context/TierContext'

const ORANGE  = '#E8652A'

const ESSENTIALS_FEATURES = [
  { label: 'Payment Insights Dashboard',   included: true  },
  { label: 'Program Analytics',            included: false },
  { label: 'AI Analyst Assistant',         included: false },
  { label: 'Natural Language Queries',     included: false },
]

const PRO_FEATURES = [
  { label: 'Payment Insights Dashboard',   included: true },
  { label: 'Program Analytics',            included: true },
  { label: 'AI Analyst Assistant',         included: true },
  { label: 'Natural Language Queries',     included: true },
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
    <svg width="28" height="28" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="10" height="10" rx="1.5" fill="#E8652A" />
      <rect x="15" y="1" width="10" height="10" rx="1.5" fill="#E8652A" />
      <rect x="1" y="15" width="10" height="10" rx="1.5" fill="#E8652A" />
      <rect x="15" y="15" width="10" height="10" rx="1.5" fill="#E8652A" opacity="0.35" />
    </svg>
  )
}

export default function TierSelect() {
  const { setTier } = useTier()
  const navigate = useNavigate()
  const [hover, setHover] = useState<'essentials' | 'pro' | null>(null)

  const choose = (t: 'essentials' | 'pro') => {
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
      {/* Brand lockup */}
      <div style={{ textAlign: 'center', marginBottom: 44 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 18 }}>
          <TripSourceMark />
          <span style={{ fontSize: 22, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
            tripsource
          </span>
          <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.2)', margin: '0 6px' }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>
            BCD Travel
          </span>
        </div>
        <h1 style={{
          fontSize: 30, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em',
          marginBottom: 10, lineHeight: 1.15,
        }}>
          Choose your analytics plan
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14.5, lineHeight: 1.6, maxWidth: 420, margin: '0 auto' }}>
          Unlock the full TripSource travel spend analytics experience
        </p>
      </div>

      {/* Plan cards */}
      <div style={{ display: 'flex', gap: 18, maxWidth: 760, width: '100%', alignItems: 'stretch' }}>

        {/* ── Essentials ── */}
        <div
          onMouseEnter={() => setHover('essentials')}
          onMouseLeave={() => setHover(null)}
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${hover === 'essentials' ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 14, padding: '30px 26px',
            display: 'flex', flexDirection: 'column',
            transition: 'border-color 0.18s, transform 0.18s',
            transform: hover === 'essentials' ? 'translateY(-3px)' : 'translateY(0)',
          }}
        >
          <div style={{ marginBottom: 22 }}>
            <span style={{
              display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.50)',
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
              padding: '3px 10px', borderRadius: 20, marginBottom: 12,
            }}>Standard</span>
            <h2 style={{ fontSize: 21, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Essentials</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.62)', lineHeight: 1.55 }}>
              Core payment insights and travel spend dashboards.
            </p>
          </div>

          <div style={{ flex: 1, marginBottom: 26 }}>
            {ESSENTIALS_FEATURES.map((f, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
                borderBottom: i < ESSENTIALS_FEATURES.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <span style={{ color: f.included ? '#4ADE80' : 'rgba(255,255,255,0.20)', flexShrink: 0 }}>
                  {f.included ? <Check /> : <Cross />}
                </span>
                <span style={{ fontSize: 13, color: f.included ? '#fff' : 'rgba(255,255,255,0.42)' }}>
                  {f.label}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => choose('essentials')}
            style={{
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)',
              color: '#fff', borderRadius: 9, padding: '11px 22px',
              fontSize: 13.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              transition: 'background 0.15s', width: '100%',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          >
            Continue with Essentials
          </button>
        </div>

        {/* ── Pro ── */}
        <div
          onMouseEnter={() => setHover('pro')}
          onMouseLeave={() => setHover(null)}
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
            border: `1.5px solid ${hover === 'pro' ? ORANGE : 'rgba(232,101,42,0.45)'}`,
            borderRadius: 14, padding: '30px 26px',
            display: 'flex', flexDirection: 'column',
            transition: 'border-color 0.18s, transform 0.18s',
            transform: hover === 'pro' ? 'translateY(-3px)' : 'translateY(0)',
          }}
        >
          <div style={{ marginBottom: 22 }}>
            <span style={{
              display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: ORANGE,
              background: 'rgba(232,101,42,0.12)', border: '1px solid rgba(232,101,42,0.28)',
              padding: '3px 10px', borderRadius: 20, marginBottom: 12,
            }}>Recommended</span>
            <h2 style={{ fontSize: 21, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Pro</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.62)', lineHeight: 1.55 }}>
              Full analytics suite with AI Analyst for natural language travel spend insights.
            </p>
          </div>

          <div style={{ flex: 1, marginBottom: 26 }}>
            {PRO_FEATURES.map((f, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
                borderBottom: i < PRO_FEATURES.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <span style={{ color: '#4ADE80', flexShrink: 0 }}>
                  <Check />
                </span>
                <span style={{ fontSize: 13, color: '#fff' }}>{f.label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => choose('pro')}
            style={{
              background: ORANGE, border: 'none', color: '#fff', borderRadius: 9,
              padding: '11px 22px', fontSize: 13.5, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit',
              transition: 'background 0.15s, transform 0.15s', width: '100%',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#d05520'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = ORANGE; e.currentTarget.style.transform = 'none' }}
          >
            Continue with Pro
          </button>
        </div>
      </div>

      <p style={{ marginTop: 24, fontSize: 12, color: 'rgba(255,255,255,0.40)', textAlign: 'center' }}>
        You can switch plans at any time from the TripSource dashboard
      </p>
    </div>
  )
}
