import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, updatePassword } from '../redux/slices/authSlice'
import axios from 'axios'
import { toast } from 'react-toastify'

const inp = { width: '100%', background: '#0a0a18', border: '1px solid #2a1a4a', borderRadius: 8, padding: '10px 14px', color: '#c0b0e0', fontSize: '0.85rem', outline: 'none', marginBottom: 10 }
const label = { fontSize: '0.78rem', color: '#8a7aaa', display: 'block', marginBottom: 5 }
const URL = import.meta.env.VITE_BACKEND_URL

export default function Profile() {
  const dispatch = useDispatch()
  const { user, loading } = useSelector(s => s.auth)
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', aboutMe: '', githubURL: '', linkedInURL: '', portfolioURL: '' })
  const [avatar, setAvatar] = useState(null)
  const [resumeFile, setResumeFile] = useState(null)
  const [resumeUploading, setResumeUploading] = useState(false)
  const [pw, setPw] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' })

  useEffect(() => {
    if (user) setForm({
      fullName: user.fullName || '',
      email: user.email || '',
      phone: user.phone || '',
      aboutMe: user.aboutMe || '',
      githubURL: user.githubURL || '',
      linkedInURL: user.linkedInURL || '',
      portfolioURL: user.portfolioURL || ''
    })
  }, [user])

  const handleProfile = (e) => {
    e.preventDefault()
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, v))
    if (avatar) fd.append('avatar', avatar)
    dispatch(updateProfile(fd))
  }

  const handleResumeUpload = async (e) => {
    e.preventDefault()
    if (!resumeFile) { toast.error('Please select a PDF file'); return }
    setResumeUploading(true)
    try {
      const fd = new FormData()
      // Send all current form data + resume file
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      fd.append('resume', resumeFile)
      const { data } = await axios.put(`${URL}user/update`, fd, { withCredentials: true })
      toast.success('Resume uploaded successfully!')
      setResumeFile(null)
      // Reset file input
      document.getElementById('resume-input').value = ''
    } catch (e) {
      toast.error(e.response?.data?.message || 'Resume upload failed')
    } finally {
      setResumeUploading(false)
    }
  }

  const handlePassword = (e) => {
    e.preventDefault()
    dispatch(updatePassword(pw))
    setPw({ currentPassword: '', newPassword: '', confirmNewPassword: '' })
  }

  return (
    <div style={{ maxWidth: 700 }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff', marginBottom: '1.5rem' }}>Profile Settings</h1>

      {/* Avatar preview */}
      {user?.avatar?.url && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#0d0d1a', border: '1px solid #2a1a4a', borderRadius: 14, padding: '1.2rem', marginBottom: '1.5rem' }}>
          <img src={user.avatar.url} alt="Avatar" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid #4a2a7a' }} />
          <div>
            <p style={{ color: '#f0ecff', fontWeight: 500 }}>{user.fullName}</p>
            <p style={{ color: '#6a5a8a', fontSize: '0.85rem' }}>{user.email}</p>
            {user.resume && (
              <a href={user.resume} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: '#9b6ddf', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                <i className="ti ti-file-cv" style={{ fontSize: 14 }}></i> View Current Resume
              </a>
            )}
          </div>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleProfile} style={{ background: '#0d0d1a', border: '1px solid #2a1a4a', borderRadius: 14, padding: '1.4rem', marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#f0ecff', fontSize: '1rem', marginBottom: '1rem' }}>Personal Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div><label style={label}>Full Name</label><input style={{...inp, marginBottom: 0}} value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} placeholder="Shivanand Shukla" /></div>
          <div><label style={label}>Email</label><input style={{...inp, marginBottom: 0}} type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
          <div><label style={label}>Phone</label><input style={{...inp, marginBottom: 0}} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
          <div><label style={label}>Portfolio URL</label><input style={{...inp, marginBottom: 0}} value={form.portfolioURL} onChange={e => setForm({...form, portfolioURL: e.target.value})} /></div>
        </div>
        <div style={{ marginTop: 10 }}><label style={label}>About Me</label><textarea style={{...inp, minHeight: 100, resize: 'vertical'}} value={form.aboutMe} onChange={e => setForm({...form, aboutMe: e.target.value})} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div><label style={label}>GitHub URL</label><input style={{...inp, marginBottom: 0}} value={form.githubURL} onChange={e => setForm({...form, githubURL: e.target.value})} /></div>
          <div><label style={label}>LinkedIn URL</label><input style={{...inp, marginBottom: 0}} value={form.linkedInURL} onChange={e => setForm({...form, linkedInURL: e.target.value})} /></div>
        </div>
        <div style={{ marginTop: 10 }}>
          <label style={label}>Profile Photo</label>
          <input type="file" accept="image/*" onChange={e => setAvatar(e.target.files[0])} style={{ color: '#8a7aaa', fontSize: '0.85rem' }} />
        </div>
        <button type="submit" disabled={loading} style={{ marginTop: 14, background: 'linear-gradient(145deg,#6a3093,#a044ff)', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: 8, fontSize: '0.85rem', cursor: 'pointer' }}>
          {loading ? 'Saving...' : 'Update Profile'}
        </button>
      </form>

      {/* Resume Upload */}
      <form onSubmit={handleResumeUpload} style={{ background: '#0d0d1a', border: '1px solid #2a1a4a', borderRadius: 14, padding: '1.4rem', marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#f0ecff', fontSize: '1rem', marginBottom: '0.5rem' }}>Resume / CV</h3>
        <p style={{ color: '#6a5a8a', fontSize: '0.82rem', marginBottom: '1rem' }}>Upload your resume — it will be downloadable from your portfolio.</p>
        {user?.resume && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(29,158,117,0.1)', border: '1px solid rgba(29,158,117,0.2)', borderRadius: 8, padding: '8px 14px', marginBottom: 12 }}>
            <i className="ti ti-circle-check" style={{ color: '#1d9e75', fontSize: 16 }}></i>
            <span style={{ fontSize: '0.82rem', color: '#1d9e75' }}>Resume uploaded</span>
            <a href={user.resume} target="_blank" rel="noreferrer" style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#9b6ddf' }}>View</a>
          </div>
        )}
        <label style={label}>Select PDF File *</label>
        <input id="resume-input" type="file" accept=".pdf" onChange={e => setResumeFile(e.target.files[0])} style={{ color: '#8a7aaa', fontSize: '0.85rem', marginBottom: 14 }} />
        <button type="submit" disabled={resumeUploading} style={{ background: 'linear-gradient(145deg,#1d6e4a,#1d9e75)', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: 8, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <i className="ti ti-upload" style={{ fontSize: 16 }}></i>
          {resumeUploading ? 'Uploading...' : 'Upload Resume'}
        </button>
      </form>

      {/* Password Form */}
      <form onSubmit={handlePassword} style={{ background: '#0d0d1a', border: '1px solid #2a1a4a', borderRadius: 14, padding: '1.4rem' }}>
        <h3 style={{ color: '#f0ecff', fontSize: '1rem', marginBottom: '1rem' }}>Change Password</h3>
        <label style={label}>Current Password</label>
        <input type="password" style={inp} value={pw.currentPassword} onChange={e => setPw({...pw, currentPassword: e.target.value})} placeholder="••••••••" required />
        <label style={label}>New Password</label>
        <input type="password" style={inp} value={pw.newPassword} onChange={e => setPw({...pw, newPassword: e.target.value})} placeholder="••••••••" required />
        <label style={label}>Confirm New Password</label>
        <input type="password" style={{...inp, marginBottom: 14}} value={pw.confirmNewPassword} onChange={e => setPw({...pw, confirmNewPassword: e.target.value})} placeholder="••••••••" required />
        <button type="submit" disabled={loading} style={{ background: 'rgba(224,90,90,0.15)', border: '1px solid rgba(224,90,90,0.3)', color: '#e05a5a', padding: '10px 22px', borderRadius: 8, fontSize: '0.85rem', cursor: 'pointer' }}>
          {loading ? 'Updating...' : 'Change Password'}
        </button>
      </form>
    </div>
  )
}
