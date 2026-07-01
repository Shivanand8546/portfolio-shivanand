import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMessages, deleteMessage } from '../redux/slices/messageSlice'

export default function Messages() {
  const dispatch = useDispatch()
  const { messages, loading } = useSelector(s => s.message)

  useEffect(() => { dispatch(getAllMessages()) }, [])

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff' }}>Messages</h1>
        <p style={{ color: '#6a5a8a', fontSize: '0.85rem', marginTop: 3 }}>{messages?.length || 0} messages received</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages?.map(m => (
          <div key={m._id} style={{ background: '#0d0d1a', border: '1px solid #2a1a4a', borderRadius: 12, padding: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(106,48,147,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, color: '#9b6ddf' }}>
                  {m.senderName?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p style={{ fontWeight: 500, color: '#f0ecff', fontSize: '0.95rem' }}>{m.senderName}</p>
                  <p style={{ fontSize: '0.78rem', color: '#6a5a8a' }}>{m.senderEmail}</p>
                </div>
              </div>
              <button onClick={() => dispatch(deleteMessage(m._id))} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(224,90,90,0.1)', border: '1px solid rgba(224,90,90,0.2)', color: '#e05a5a', padding: '6px 10px', borderRadius: 7, fontSize: '0.8rem', cursor: 'pointer' }}>
                <i className="ti ti-trash" style={{ fontSize: 14 }} aria-hidden="true"></i>
              </button>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#8a7aaa', lineHeight: 1.6, paddingLeft: 46 }}>{m.message}</p>
            <p style={{ fontSize: '0.75rem', color: '#4a3a6a', marginTop: 8, paddingLeft: 46 }}>{new Date(m.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
          </div>
        ))}
      </div>
      {!messages?.length && !loading && (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <i className="ti ti-mail-off" style={{ fontSize: 48, color: '#2a1a4a', display: 'block', marginBottom: 12 }} aria-hidden="true"></i>
          <p style={{ color: '#4a3a6a' }}>No messages yet.</p>
        </div>
      )}
    </div>
  )
}
