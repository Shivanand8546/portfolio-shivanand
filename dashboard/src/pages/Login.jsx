import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/slices/authSlice'
import { Navigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { isAuthenticated, loading } = useSelector(s => s.auth)
  if (isAuthenticated) return <Navigate to="/" />

  const handleSubmit = (e) => { e.preventDefault(); dispatch(login(email, password)) }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050510' }}>
      <div style={{ background: '#0d0d1a', border: '1px solid #2a1a4a', borderRadius: 16, padding: '2.5rem', width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(145deg,#6a3093,#a044ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: 20, fontWeight: 700, color: '#fff' }}>SS</div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#fff' }}>Admin Login</h1>
          <p style={{ fontSize: '0.85rem', color: '#6a5a8a', marginTop: 4 }}>Shivanand Portfolio Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: '#8a7aaa', display: 'block', marginBottom: 6 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="shivanand2124@gmail.com" required
              style={{ width: '100%', background: '#0a0a18', border: '1px solid #2a1a4a', borderRadius: 8, padding: '10px 14px', color: '#c0b0e0', fontSize: '0.9rem', outline: 'none' }} />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: '#8a7aaa', display: 'block', marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
              style={{ width: '100%', background: '#0a0a18', border: '1px solid #2a1a4a', borderRadius: 8, padding: '10px 14px', color: '#c0b0e0', fontSize: '0.9rem', outline: 'none' }} />
          </div>
          <button type="submit" disabled={loading} style={{ marginTop: 6, background: 'linear-gradient(145deg,#6a3093,#a044ff)', color: '#fff', border: 'none', padding: '12px', borderRadius: 9, fontSize: '0.95rem', fontWeight: 500, cursor: 'pointer' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
