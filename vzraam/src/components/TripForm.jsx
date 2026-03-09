import { useState } from 'react'

const field = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
}
const label = {
  fontFamily: "'DM Mono', monospace",
  fontSize: 10,
  letterSpacing: 2,
  textTransform: 'uppercase',
  color: 'var(--amber)',
  fontWeight: 500,
}
const input = {
  border: '1px solid var(--fog)',
  borderRadius: 8,
  padding: '10px 14px',
  fontFamily: "'Sora', sans-serif",
  fontSize: 14,
  color: 'var(--deep)',
  background: 'var(--sand)',
  outline: 'none',
  width: '100%',
}

export default function TripForm({ onSubmit, disabled }) {
  const [form, setForm] = useState({
    destination: '',
    from: '',
    startDate: '',
    endDate: '',
    budget: '',
    travelers: '2',
    preferences: '',
  })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = () => {
    if (!form.destination || !form.startDate || !form.endDate) return
    onSubmit(form)
  }

  const canSubmit = !disabled && form.destination && form.startDate && form.endDate

  return (
    <section style={{ padding: '56px 0 0' }}>
      {/* Hero copy */}
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 20 }}>
        ✦ End-to-End Vacation Orchestration
      </div>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(28px, 5vw, 52px)',
        fontWeight: 400,
        color: 'var(--deep)',
        lineHeight: 1.15,
        marginBottom: 40,
        maxWidth: 720,
      }}>
        Tell us your dream trip.<br />
        <strong style={{ fontWeight: 700, fontStyle: 'italic', color: 'var(--amber)' }}>
          Eight AI agents
        </strong>{' '}
        handle everything else.
      </h2>

      {/* Form panel */}
      <div style={{
        background: 'white',
        border: '1px solid rgba(42,42,22,0.10)',
        borderRadius: 16,
        padding: 24,
        boxShadow: '0 4px 40px rgba(42,42,22,0.06)',
        marginBottom: 40,
      }}>
        {/* Row 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 16, marginBottom: 16 }}>
          <div style={field}>
            <label style={label}>Destination</label>
            <input style={input} value={form.destination} onChange={set('destination')} placeholder="e.g. Tokyo, Japan" />
          </div>
          <div style={field}>
            <label style={label}>Flying From</label>
            <input style={input} value={form.from} onChange={set('from')} placeholder="e.g. New York" />
          </div>
          <div style={field}>
            <label style={label}>Budget (USD)</label>
            <input style={input} type="number" value={form.budget} onChange={set('budget')} placeholder="e.g. 4000" />
          </div>
          <div style={field}>
            <label style={label}>Travelers</label>
            <select style={{ ...input, cursor: 'pointer' }} value={form.travelers} onChange={set('travelers')}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr auto', gap: 16, alignItems: 'flex-end' }}>
          <div style={field}>
            <label style={label}>Departure</label>
            <input style={input} type="date" value={form.startDate} onChange={set('startDate')} />
          </div>
          <div style={field}>
            <label style={label}>Return</label>
            <input style={input} type="date" value={form.endDate} onChange={set('endDate')} />
          </div>
          <div style={field}>
            <label style={label}>Preferences & Notes</label>
            <input
              style={input}
              value={form.preferences}
              onChange={set('preferences')}
              placeholder="e.g. vegetarian, love museums, luxury hotels…"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            style={{
              background: canSubmit ? 'var(--deep)' : 'rgba(42,42,22,0.2)',
              color: 'var(--amber-light)',
              border: 'none',
              borderRadius: 10,
              padding: '12px 28px',
              fontFamily: "'Sora', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              whiteSpace: 'nowrap',
              transition: 'background 0.2s',
            }}
          >
            <span style={{ fontSize: 18 }}>{disabled ? '⏳' : '🚀'}</span>
            {disabled ? 'Planning…' : 'Plan My Trip'}
          </button>
        </div>
      </div>
    </section>
  )
}
