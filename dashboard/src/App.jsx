import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProfile } from './redux/slices/authSlice'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Timeline from './pages/Timeline'
import Messages from './pages/Messages'
import Profile from './pages/Profile'
import Layout from './components/Layout'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector(s => s.auth)
  if (loading) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',color:'#9b6ddf'}}>Loading...</div>
  return isAuthenticated ? children : <Navigate to="/login" />
}

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => { dispatch(getProfile()) }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="skills" element={<Skills />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
