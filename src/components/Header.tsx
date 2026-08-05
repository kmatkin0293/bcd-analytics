import { useNavigate } from 'react-router-dom'
import { useTier } from '../context/TierContext'

// ─── TripSource logo mark ─────────────────────────────────────────────────────
// Solid white left pillar + 3 curved white strips that go horizontal then arc
// 90° downward — matching the official TripSource app icon.

function TripSourceMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tsMark" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F46522" />
          <stop offset="100%" stopColor="#C41208" />
        </linearGradient>
        {/* Clip everything to the rounded-square shape */}
        <clipPath id="tsClip">
          <rect width="100" height="100" rx="18" />
        </clipPath>
      </defs>
      {/* Gradient background */}
      <rect width="100" height="100" rx="18" fill="url(#tsMark)" />
      <g clipPath="url(#tsClip)">
        {/* Solid left pillar — full height, ~1/3 of icon width */}
        <rect x="0" y="0" width="33" height="100" fill="white" />
        {/*
          3 strips: each goes horizontal from the pillar edge, arcs 90° clockwise,
          then continues straight down to the bottom of the icon.
          Outer strip has the largest radius, inner the smallest.
        */}
        <path d="M33 15 H61 A22 22 0 0 1 83 37 V100" stroke="white" strokeWidth="10" fill="none" />
        <path d="M33 40 H54 A14 14 0 0 1 68 54 V100" stroke="white" strokeWidth="10" fill="none" />
        <path d="M33 65 H46 A7  7  0 0 1 53 72 V100" stroke="white" strokeWidth="10" fill="none" />
      </g>
    </svg>
  )
}

function TripSourceLogo() {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate('/')}
      style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer', userSelect: 'none' }}
    >
      <TripSourceMark size={34} />
      <span style={{
        fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em',
        color: '#1A2340', lineHeight: 1,
      }}>
        tripsource
      </span>
    </div>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const HelpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
)

// Circular dots icon matching the ThoughtSpot Spotter branding
const AIAnalystIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Colorful dots arranged in a ring, mimicking the Spotter/AI icon */}
    <circle cx="11" cy="3"   r="2"   fill="#F46522" />
    <circle cx="16.5" cy="5"   r="1.8" fill="#F4852A" />
    <circle cx="19" cy="11"  r="1.8" fill="#E040A0" />
    <circle cx="16.5" cy="17"  r="1.8" fill="#9C3DD4" />
    <circle cx="11" cy="19"  r="2"   fill="#6B3FC0" />
    <circle cx="5.5" cy="17"  r="1.8" fill="#4A6FE8" />
    <circle cx="3"  cy="11"  r="1.8" fill="#38B2E8" />
    <circle cx="5.5" cy="5"   r="1.8" fill="#F4A020" />
  </svg>
)

// ─── Header ───────────────────────────────────────────────────────────────────

export default function Header() {
  const { isSpotterPro } = useTier()
  const navigate = useNavigate()

  return (
    <header className="header">
      {/* Left: TripSource logo */}
      <TripSourceLogo />

      {/* Right: action items */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {isSpotterPro && (
          <button className="ai-analyst-btn" onClick={() => navigate('/ai-assistant')}>
            <AIAnalystIcon />
            AI Analyst
          </button>
        )}

        <button className="icon-btn" title="Help">
          <HelpIcon />
        </button>

        <button className="icon-btn" title="Notifications">
          <BellIcon />
        </button>

        <div className="avatar" title="BCD Travel">BT</div>
      </div>
    </header>
  )
}
