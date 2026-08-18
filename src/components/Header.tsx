import { useNavigate } from 'react-router-dom'

function BCDAnalyticsLogo() {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate('/')}
      style={{ cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center' }}
    >
      <img src="/bcd-logo.png" alt="BCD Analytics" style={{ height: 38, width: 'auto', display: 'block' }} />
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
  const navigate = useNavigate()

  return (
    <header className="header">
      {/* Left: BCD Analytics logo */}
      <BCDAnalyticsLogo />

      {/* Right: action items */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <button className="ai-analyst-btn" onClick={() => navigate('/ai-assistant')}>
          <AIAnalystIcon />
          AI Analyst
        </button>

        <button className="icon-btn" title="Help">
          <HelpIcon />
        </button>

        <button className="icon-btn" title="Notifications">
          <BellIcon />
        </button>

        <div className="avatar" title="BCD Analytics">BA</div>
      </div>
    </header>
  )
}
