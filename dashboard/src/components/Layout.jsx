import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice'

const links = [
  { to: '/', icon: 'ti-home', label: 'Dashboard' },
  { to: '/projects', icon: 'ti-layout-grid', label: 'Projects' },
  { to: '/skills', icon: 'ti-code', label: 'Skills' },
  { to: '/timeline', icon: 'ti-briefcase', label: 'Timeline' },
  { to: '/messages', icon: 'ti-mail', label: 'Messages' },
  { to: '/profile', icon: 'ti-user', label: 'Profile' },
]

export default function Layout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(s => s.auth)

  const handleLogout = () => { dispatch(logout()); navigate('/login') }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 220, background: '#0a0a18', borderRight: '1px solid #1a0a30', display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem', position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 0.5rem 1.2rem', borderBottom: '1px solid #1a0a30', marginBottom: '0.8rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: 'linear-gradient(145deg,#6a3093,#a044ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: '#fff', flexShrink: 0 }}>SS</div>
          <div>
            <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>Admin Panel</p>
            <p style={{ fontSize: '0.72rem', color: '#9b6ddf' }}>{user?.fullName || 'Shivanand'}</p>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 9,
              color: isActive ? '#fff' : '#6a5a8a', background: isActive ? 'rgba(106,48,147,0.25)' : 'transparent',
              fontSize: '0.85rem', transition: 'all 0.2s'
            })}>
              <i className={`ti ${l.icon}`} style={{ fontSize: 18, color: 'inherit' }} aria-hidden="true"></i>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 9, background: 'rgba(224,90,90,0.1)', border: '1px solid rgba(224,90,90,0.2)', color: '#e05a5a', fontSize: '0.85rem', cursor: 'pointer', marginTop: '0.5rem' }}>
          <i className="ti ti-logout" style={{ fontSize: 18 }} aria-hidden="true"></i> Logout
        </button>
      </aside>

      <main style={{ flex: 1, marginLeft: 220, padding: '2rem', minHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  )
}
