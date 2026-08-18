import { NavLink, useNavigate } from 'react-router-dom'
import { useTier } from '../context/TierContext'

// ─── Icons ────────────────────────────────────────────────────────────────────

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

const LiveboardsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
)

const ExecutiveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
)

const SpotterIcon = () => (
  <svg width="22" height="12" viewBox="0 0 46 32" fill="currentColor">
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

const AnswersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)

const CollectionsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
)

const SchedulesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

const SearchDataIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
)

// ─── Nav items ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { path: '/',                  label: 'Home',               icon: <HomeIcon />,        end: true  },
  { path: '/executive-overview',label: 'Executive Overview', icon: <ExecutiveIcon />,   end: false },
  { path: '/liveboards',        label: 'My Reports',         icon: <LiveboardsIcon />,  end: false },
  { path: '/spotter',           label: 'BCD AI',             icon: <SpotterIcon />,     end: false, isAI: true },
  { path: '/answers',           label: 'Answers',            icon: <AnswersIcon />,     end: false },
  { path: '/collections',       label: 'Collections',        icon: <CollectionsIcon />, end: false },
  { path: '/schedules',         label: 'Schedules',          icon: <SchedulesIcon />,   end: false },
  { path: '/search-data',       label: 'Search Data',        icon: <SearchDataIcon />,  end: false },
]

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export default function Sidebar() {
  const { tier } = useTier()
  const navigate = useNavigate()

  const tierLabel = tier === 'enterprise' ? 'Enterprise' : tier === 'premium' ? 'Premium' : 'Basic'
  const tierColor = tier === 'enterprise' ? '#FC4C02' : tier === 'premium' ? '#7C3AED' : '#9CA3AF'

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `nav-item${isActive ? ' active' : ''}${item.isAI ? ' nav-item--ai' : ''}`
            }
            style={item.isAI ? ({ isActive }: { isActive: boolean }) => ({
              color: isActive ? '#FC4C02' : undefined,
            }) : undefined}
          >
            <span className="nav-icon" style={item.isAI ? { color: '#FC4C02' } : undefined}>
              {item.icon}
            </span>
            <span style={item.isAI ? { color: '#FC4C02', fontWeight: 600 } : undefined}>
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          onClick={() => navigate('/tier-select')}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(11,0,82,0.04)', border: '1px solid rgba(11,0,82,0.10)',
            borderRadius: 8, padding: '7px 10px', cursor: 'pointer', fontFamily: 'inherit',
            marginBottom: 10, transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(11,0,82,0.09)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(11,0,82,0.04)'}
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
