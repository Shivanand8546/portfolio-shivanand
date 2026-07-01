import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects, createProject, deleteProject } from '../redux/slices/projectSlice'

const inp = { width: '100%', background: '#0a0a18', border: '1px solid #2a1a4a', borderRadius: 8, padding: '10px 14px', color: '#c0b0e0', fontSize: '0.85rem', outline: 'none', marginBottom: 10 }

export default function Projects() {
  const dispatch = useDispatch()
  const { projects, loading } = useSelector(s => s.project)
  const [form, setForm] = useState({ title: '', description: '', technologies: '', gitRepoLink: '', projectLink: '', deployed: 'No' })
  const [banner, setBanner] = useState(null)
  const [show, setShow] = useState(false)

  useEffect(() => { dispatch(getAllProjects()) }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, v))
    if (banner) fd.append('projectBanner', banner)
    dispatch(createProject(fd))
    setForm({ title: '', description: '', technologies: '', gitRepoLink: '', projectLink: '', deployed: 'No' })
    setBanner(null)
    setShow(false)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff' }}>Projects</h1>
          <p style={{ color: '#6a5a8a', fontSize: '0.85rem', marginTop: 3 }}>{projects?.length || 0} projects total</p>
        </div>
        <button onClick={() => setShow(!show)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'linear-gradient(145deg,#6a3093,#a044ff)', color: '#fff', border: 'none', padding: '9px 18px', borderRadius: 9, fontSize: '0.85rem', cursor: 'pointer' }}>
          <i className="ti ti-plus" aria-hidden="true"></i> Add Project
        </button>
      </div>

      {show && (
        <form onSubmit={handleSubmit} style={{ background: '#0d0d1a', border: '1px solid #2a1a4a', borderRadius: 14, padding: '1.4rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#f0ecff', fontSize: '1rem', marginBottom: '1rem' }}>New Project</h3>
          <input style={inp} placeholder="Title *" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
          <textarea style={{...inp, minHeight: 80, resize: 'vertical'}} placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          <input style={inp} placeholder="Technologies (e.g. React, Node.js)" value={form.technologies} onChange={e => setForm({...form, technologies: e.target.value})} />
          <input style={inp} placeholder="GitHub URL" value={form.gitRepoLink} onChange={e => setForm({...form, gitRepoLink: e.target.value})} />
          <input style={inp} placeholder="Live URL" value={form.projectLink} onChange={e => setForm({...form, projectLink: e.target.value})} />
          <select style={inp} value={form.deployed} onChange={e => setForm({...form, deployed: e.target.value})}>
            <option value="Yes">Deployed: Yes</option>
            <option value="No">Deployed: No</option>
          </select>
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: '0.8rem', color: '#8a7aaa', display: 'block', marginBottom: 6 }}>Project Banner Image *</label>
            <input type="file" accept="image/*" onChange={e => setBanner(e.target.files[0])} required style={{ color: '#8a7aaa', fontSize: '0.85rem' }} />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" disabled={loading} style={{ background: 'linear-gradient(145deg,#6a3093,#a044ff)', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: 8, fontSize: '0.85rem', cursor: 'pointer' }}>
              {loading ? 'Saving...' : 'Save Project'}
            </button>
            <button type="button" onClick={() => setShow(false)} style={{ background: 'transparent', color: '#6a5a8a', border: '1px solid #2a1a4a', padding: '10px 22px', borderRadius: 8, fontSize: '0.85rem', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {projects?.map(p => (
          <div key={p._id} style={{ background: '#0d0d1a', border: '1px solid #2a1a4a', borderRadius: 12, overflow: 'hidden' }}>
            {p.projectBanner?.url && <img src={p.projectBanner.url} alt={p.title} style={{ width: '100%', height: 140, objectFit: 'cover' }} />}
            <div style={{ padding: '1rem' }}>
              <p style={{ fontWeight: 500, color: '#f0ecff', marginBottom: 6, fontSize: '0.95rem' }}>{p.title}</p>
              <p style={{ fontSize: '0.8rem', color: '#6a5a8a', marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.description}</p>
              {p.technologies && <p style={{ fontSize: '0.75rem', color: '#9b6ddf', marginBottom: 10 }}>{p.technologies}</p>}
              <button onClick={() => dispatch(deleteProject(p._id))} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(224,90,90,0.1)', border: '1px solid rgba(224,90,90,0.2)', color: '#e05a5a', padding: '6px 12px', borderRadius: 7, fontSize: '0.8rem', cursor: 'pointer' }}>
                <i className="ti ti-trash" style={{ fontSize: 14 }} aria-hidden="true"></i> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {!projects?.length && !loading && <p style={{ color: '#4a3a6a', textAlign: 'center', marginTop: '3rem' }}>No projects yet. Add your first project!</p>}
    </div>
  )
}
