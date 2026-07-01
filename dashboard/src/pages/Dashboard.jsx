import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects } from '../redux/slices/projectSlice'
import { getAllSkills } from '../redux/slices/skillSlice'
import { getAllTimelines } from '../redux/slices/timelineSlice'
import { getAllMessages } from '../redux/slices/messageSlice'
import { Link } from 'react-router-dom'

const Card = ({ icon, label, count, color, to }) => (
  <Link to={to} style={{ background: '#0d0d1a', border: `1px solid ${color}33`, borderRadius: 14, padding: '1.4rem', display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none', transition: 'border-color 0.2s' }}>
    <div style={{ width: 50, height: 50, borderRadius: 12, background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <i className={`ti ${icon}`} style={{ fontSize: 24, color }} aria-hidden="true"></i>
    </div>
    <div>
      <p style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{count}</p>
      <p style={{ fontSize: '0.82rem', color: '#6a5a8a', marginTop: 3 }}>{label}</p>
    </div>
  </Link>
)

export default function Dashboard() {
  const dispatch = useDispatch()
  const { projects } = useSelector(s => s.project)
  const { skills } = useSelector(s => s.skill)
  const { timelines } = useSelector(s => s.timeline)
  const { messages } = useSelector(s => s.message)
  const { user } = useSelector(s => s.auth)

  useEffect(() => {
    dispatch(getAllProjects())
    dispatch(getAllSkills())
    dispatch(getAllTimelines())
    dispatch(getAllMessages())
  }, [])

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 600, color: '#fff' }}>Welcome back, {user?.fullName?.split(' ')[0] || 'Shivanand'} 👋</h1>
        <p style={{ color: '#6a5a8a', fontSize: '0.9rem', marginTop: 4 }}>Here's your portfolio overview</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: '2rem' }}>
        <Card icon="ti-layout-grid" label="Total Projects" count={projects?.length || 0} color="#a044ff" to="/projects" />
        <Card icon="ti-code" label="Total Skills" count={skills?.length || 0} color="#378add" to="/skills" />
        <Card icon="ti-briefcase" label="Experiences" count={timelines?.length || 0} color="#1d9e75" to="/timeline" />
        <Card icon="ti-mail" label="Messages" count={messages?.length || 0} color="#f5c842" to="/messages" />
      </div>

      <div style={{ background: '#0d0d1a', border: '1px solid #1a0a30', borderRadius: 14, padding: '1.4rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 500, color: '#f0ecff', marginBottom: '1rem' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            { label: 'Add Project', to: '/projects', icon: 'ti-plus', color: '#a044ff' },
            { label: 'Add Skill', to: '/skills', icon: 'ti-plus', color: '#378add' },
            { label: 'Add Experience', to: '/timeline', icon: 'ti-plus', color: '#1d9e75' },
            { label: 'View Messages', to: '/messages', icon: 'ti-mail', color: '#f5c842' },
            { label: 'Edit Profile', to: '/profile', icon: 'ti-user', color: '#e05a5a' },
          ].map(a => (
            <Link key={a.label} to={a.to} style={{ display: 'flex', alignItems: 'center', gap: 6, background: `${a.color}15`, border: `1px solid ${a.color}33`, borderRadius: 8, padding: '8px 14px', color: a.color, fontSize: '0.85rem', textDecoration: 'none' }}>
              <i className={`ti ${a.icon}`} style={{ fontSize: 16 }} aria-hidden="true"></i> {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
