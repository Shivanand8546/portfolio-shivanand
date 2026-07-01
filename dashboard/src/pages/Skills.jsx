import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSkills, createSkill, deleteSkill } from '../redux/slices/skillSlice'

const inp = { width: '100%', background: '#0a0a18', border: '1px solid #2a1a4a', borderRadius: 8, padding: '10px 14px', color: '#c0b0e0', fontSize: '0.85rem', outline: 'none', marginBottom: 10 }

const categoryOptions = ["Languages", "Frontend", "Backend & Database", "DevOps & Tools", "Other"]

export default function Skills() {
  const dispatch = useDispatch()
  const { skills, loading } = useSelector(s => s.skill)
  const [title, setTitle] = useState('')
  const [proficiency, setProficiency] = useState(80)
  const [category, setCategory] = useState('Languages')
  const [svg, setSvg] = useState(null)
  const [show, setShow] = useState(false)

  useEffect(() => { dispatch(getAllSkills()) }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('title', title)
    fd.append('proficiency', proficiency)
    fd.append('category', category)
    if (svg) fd.append('svg', svg)
    dispatch(createSkill(fd))
    setTitle(''); setProficiency(80); setCategory('Languages'); setSvg(null); setShow(false)
  }

  // Group skills by category
  const grouped = {}
  ;(skills || []).forEach(s => {
    const cat = s.category || 'Other'
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(s)
  })

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff' }}>Skills</h1>
          <p style={{ color: '#6a5a8a', fontSize: '0.85rem', marginTop: 3 }}>{skills?.length || 0} skills total</p>
        </div>
        <button onClick={() => setShow(!show)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'linear-gradient(145deg,#6a3093,#a044ff)', color: '#fff', border: 'none', padding: '9px 18px', borderRadius: 9, fontSize: '0.85rem', cursor: 'pointer' }}>
          <i className="ti ti-plus" aria-hidden="true"></i> Add Skill
        </button>
      </div>

      {show && (
        <form onSubmit={handleSubmit} style={{ background: '#0d0d1a', border: '1px solid #2a1a4a', borderRadius: 14, padding: '1.4rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#f0ecff', fontSize: '1rem', marginBottom: '1rem' }}>New Skill</h3>

          <label style={{ fontSize: '0.78rem', color: '#8a7aaa', display: 'block', marginBottom: 5 }}>Skill Name *</label>
          <input style={inp} placeholder="e.g. React.js" value={title} onChange={e => setTitle(e.target.value)} required />

          <label style={{ fontSize: '0.78rem', color: '#8a7aaa', display: 'block', marginBottom: 5 }}>Category *</label>
          <select style={inp} value={category} onChange={e => setCategory(e.target.value)}>
            {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <label style={{ fontSize: '0.78rem', color: '#8a7aaa', display: 'block', marginBottom: 5 }}>Proficiency: {proficiency}%</label>
          <input type="range" min="1" max="100" value={proficiency} onChange={e => setProficiency(e.target.value)} style={{ width: '100%', accentColor: '#9b6ddf', marginBottom: 10 }} />

          <label style={{ fontSize: '0.78rem', color: '#8a7aaa', display: 'block', marginBottom: 5 }}>Skill Icon (SVG/PNG) *</label>
          <input type="file" accept="image/*,.svg" onChange={e => setSvg(e.target.files[0])} required style={{ color: '#8a7aaa', fontSize: '0.85rem', marginBottom: 14 }} />

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" disabled={loading} style={{ background: 'linear-gradient(145deg,#6a3093,#a044ff)', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: 8, fontSize: '0.85rem', cursor: 'pointer' }}>
              {loading ? 'Saving...' : 'Save Skill'}
            </button>
            <button type="button" onClick={() => setShow(false)} style={{ background: 'transparent', color: '#6a5a8a', border: '1px solid #2a1a4a', padding: '10px 22px', borderRadius: 8, fontSize: '0.85rem', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      )}

      {/* Skills grouped by category */}
      {categoryOptions.map(cat => grouped[cat] ? (
        <div key={cat} style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 500, color: '#9b6ddf', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.75rem' }}>{cat}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
            {grouped[cat].map(s => (
              <div key={s._id} style={{ background: '#0d0d1a', border: '1px solid #2a1a4a', borderRadius: 12, padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                {s.svg?.url && <img src={s.svg.url} alt={s.title} style={{ width: 42, height: 42, objectFit: 'contain' }} />}
                <p style={{ fontSize: '0.82rem', color: '#c0b0e0', textAlign: 'center' }}>{s.title}</p>
                {s.proficiency && (
                  <div style={{ width: '100%', height: 3, background: '#1a0a30', borderRadius: 99 }}>
                    <div style={{ height: '100%', width: `${s.proficiency}%`, background: 'linear-gradient(90deg,#6a3093,#a044ff)', borderRadius: 99 }}></div>
                  </div>
                )}
                <button onClick={() => dispatch(deleteSkill(s._id))} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(224,90,90,0.1)', border: '1px solid rgba(224,90,90,0.2)', color: '#e05a5a', padding: '5px 10px', borderRadius: 7, fontSize: '0.75rem', cursor: 'pointer' }}>
                  <i className="ti ti-trash" style={{ fontSize: 13 }} aria-hidden="true"></i> Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null)}

      {!skills?.length && !loading && <p style={{ color: '#4a3a6a', textAlign: 'center', marginTop: '3rem' }}>No skills yet. Add your first skill!</p>}
    </div>
  )
}
