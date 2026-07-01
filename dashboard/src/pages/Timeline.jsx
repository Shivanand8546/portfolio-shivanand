import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTimelines, createTimeline, deleteTimeline } from '../redux/slices/timelineSlice'

const inp = { width: '100%', background: '#0a0a18', border: '1px solid #2a1a4a', borderRadius: 8, padding: '10px 14px', color: '#c0b0e0', fontSize: '0.85rem', outline: 'none', marginBottom: 10 }

export default function Timeline() {
  const dispatch = useDispatch()
  const { timelines, loading } = useSelector(s => s.timeline)
  const [form, setForm] = useState({ title: '', companyName: '', description: '', from: '', to: '', link: '' })
  const [show, setShow] = useState(false)

  useEffect(() => { dispatch(getAllTimelines()) }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createTimeline({ ...form, timeline: { from: form.from, to: form.to } }))
    setForm({ title: '', companyName: '', description: '', from: '', to: '', link: '' })
    setShow(false)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff' }}>Timeline / Experience</h1>
          <p style={{ color: '#6a5a8a', fontSize: '0.85rem', marginTop: 3 }}>{timelines?.length || 0} entries</p>
        </div>
        <button onClick={() => setShow(!show)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'linear-gradient(145deg,#6a3093,#a044ff)', color: '#fff', border: 'none', padding: '9px 18px', borderRadius: 9, fontSize: '0.85rem', cursor: 'pointer' }}>
          <i className="ti ti-plus" aria-hidden="true"></i> Add Experience
        </button>
      </div>

      {show && (
        <form onSubmit={handleSubmit} style={{ background: '#0d0d1a', border: '1px solid #2a1a4a', borderRadius: 14, padding: '1.4rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#f0ecff', fontSize: '1rem', marginBottom: '1rem' }}>New Experience</h3>
          <input style={inp} placeholder="Job Title *" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
          <input style={inp} placeholder="Company Name *" value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} required />
          <textarea style={{...inp, minHeight: 80, resize: 'vertical'}} placeholder="Description *" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <input style={{...inp, marginBottom: 0}} placeholder="From (e.g. Jul 2022)" value={form.from} onChange={e => setForm({...form, from: e.target.value})} />
            <input style={{...inp, marginBottom: 0}} placeholder="To (e.g. Aug 2022 or Present)" value={form.to} onChange={e => setForm({...form, to: e.target.value})} />
          </div>
          <input style={{...inp, marginTop: 10}} placeholder="Company URL (optional)" value={form.link} onChange={e => setForm({...form, link: e.target.value})} />
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button type="submit" disabled={loading} style={{ background: 'linear-gradient(145deg,#6a3093,#a044ff)', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: 8, fontSize: '0.85rem', cursor: 'pointer' }}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={() => setShow(false)} style={{ background: 'transparent', color: '#6a5a8a', border: '1px solid #2a1a4a', padding: '10px 22px', borderRadius: 8, fontSize: '0.85rem', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {timelines?.map(t => (
          <div key={t._id} style={{ background: '#0d0d1a', border: '1px solid #2a1a4a', borderRadius: 12, padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#9b6ddf', flexShrink: 0 }}></div>
                <p style={{ fontWeight: 500, color: '#f0ecff', fontSize: '0.95rem' }}>{t.title}</p>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#9b6ddf', marginBottom: 4, paddingLeft: 18 }}>{t.companyName}</p>
              <p style={{ fontSize: '0.8rem', color: '#6a5a8a', marginBottom: 6, paddingLeft: 18 }}>{t.timeline?.from} — {t.timeline?.to || 'Present'}</p>
              <p style={{ fontSize: '0.82rem', color: '#7a6a9a', paddingLeft: 18 }}>{t.description}</p>
            </div>
            <button onClick={() => dispatch(deleteTimeline(t._id))} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(224,90,90,0.1)', border: '1px solid rgba(224,90,90,0.2)', color: '#e05a5a', padding: '6px 10px', borderRadius: 7, fontSize: '0.8rem', cursor: 'pointer', flexShrink: 0, marginLeft: 12 }}>
              <i className="ti ti-trash" style={{ fontSize: 14 }} aria-hidden="true"></i>
            </button>
          </div>
        ))}
      </div>
      {!timelines?.length && !loading && <p style={{ color: '#4a3a6a', textAlign: 'center', marginTop: '3rem' }}>No experience entries yet.</p>}
    </div>
  )
}
