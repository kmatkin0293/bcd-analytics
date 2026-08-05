import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useTier } from '../context/TierContext'

// ─── Icons ────────────────────────────────────────────────────────────────────

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

const InsightsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
)

const SpendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
)

const SafetyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const AIIcon = () => (
  <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5"
    style={{ transition: 'transform 0.18s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}
  >
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

// ─── Program Insights sub-items ──────────────────────────────────────────────

const PROGRAM_ITEMS = [
  { path: '/program-insights/overview',    label: 'Overview',        functional: true },
  { path: '/program-insights/flights',     label: 'Flights',         functional: true },
  { path: '/program-insights/hotels',      label: 'Hotels & Ground', functional: true },
  { path: '/program-insights/operations',  label: 'Operations',      functional: true },
]

function ProgramInsightsGroup() {
  const { pathname } = useLocation()
  const isChildActive = PROGRAM_ITEMS.some(_ => pathname.startsWith('/program-insights'))
  const [open, setOpen] = useState(isChildActive)

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className={`nav-item nav-group-trigger${isChildActive ? ' active' : ''}`}
        style={{ width: '100%', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
      >
        <span className="nav-icon"><InsightsIcon /></span>
        <span style={{ flex: 1, textAlign: 'left' }}>Program Insights</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="nav-sub-group">
          {PROGRAM_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-sub-item${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Spend Management sub-items ───────────────────────────────────────────────

const SPEND_ITEMS = [
  { path: '/supply-chain', label: 'Payment Insights', functional: true },
  { path: '/card-accounts', label: 'Card Accounts', functional: false },
  { path: '/virtual-payments', label: 'Virtual Payments', functional: false },
  { path: '/digital-invoices', label: 'Digital Invoices', functional: false },
  { path: '/card-reconciliation', label: 'Card Reconciliation', functional: false },
]

function SpendManagementGroup() {
  const { pathname } = useLocation()
  const isChildActive = SPEND_ITEMS.some(i => pathname === i.path)
  const [open, setOpen] = useState(true)

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className={`nav-item nav-group-trigger${isChildActive ? ' active' : ''}`}
        style={{ width: '100%', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
      >
        <span className="nav-icon"><SpendIcon /></span>
        <span style={{ flex: 1, textAlign: 'left' }}>Spend Management</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="nav-sub-group">
          {SPEND_ITEMS.map(item => (
            item.functional ? (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-sub-item${isActive ? ' active' : ''}`}
              >
                {item.label}
              </NavLink>
            ) : (
              <span key={item.path} className="nav-sub-item nav-sub-item--disabled">
                {item.label}
              </span>
            )
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export default function Sidebar() {
  const { isSpotterPro, isInteractive, tier } = useTier()
  const navigate = useNavigate()
  useLocation()

  const tierLabel = tier === 'pro' ? 'Pro' : tier === 'essentials' ? 'Essentials' : 'Basic'
  const tierColor = tier === 'pro' ? '#E8652A' : tier === 'essentials' ? '#2B2777' : '#9CA3AF'

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
          <span className="nav-icon"><HomeIcon /></span>
          Home
        </NavLink>

        <ProgramInsightsGroup />

        <SpendManagementGroup />

        <NavLink
          to="/traveler-safety"
          className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          style={{ pointerEvents: 'none', opacity: 0.45 }}
        >
          <span className="nav-icon"><SafetyIcon /></span>
          <span style={{ flex: 1 }}>Traveler Safety</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </NavLink>

        {isSpotterPro && (
          <NavLink
            to="/ai-assistant"
            className={({ isActive }) => `nav-item nav-item--ai${isActive ? ' active' : ''}`}
          >
            <span className="nav-icon" style={{ color: '#E8652A' }}><AIIcon /></span>
            <span style={{ color: '#E8652A', fontWeight: 600 }}>AI Analyst</span>
          </NavLink>
        )}

        {/* Tier badge — click to switch tier */}
        {!isInteractive && (
          <div style={{ margin: '4px 8px', padding: '6px 10px', background: 'rgba(43,39,119,0.06)', borderRadius: 8, fontSize: 11, color: '#7B6AA0' }}>
            Interactive features disabled on Basic.
          </div>
        )}
      </nav>

      <div className="sidebar-footer">
        <button
          onClick={() => navigate('/tier-select')}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(43,39,119,0.05)', border: '1px solid rgba(43,39,119,0.12)',
            borderRadius: 8, padding: '7px 10px', cursor: 'pointer', fontFamily: 'inherit',
            marginBottom: 10, transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(43,39,119,0.10)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(43,39,119,0.05)'}
        >
          <span style={{ fontSize: 11, fontWeight: 600, color: '#5B6B8A' }}>Account tier</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: tierColor }}>{tierLabel}</span>
        </button>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
          Powered by
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#5B6B8A' }}>BCD Travel</div>
      </div>
    </aside>
  )
}
