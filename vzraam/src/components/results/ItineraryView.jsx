export default function ItineraryView({ data }) {
  const days = data?.days ?? []
  if (!days.length) return <Empty msg="Itinerary is loading…" />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {days.map((day, di) => (
        <div
          key={di}
          className="animate-card-in"
          style={{
            background: 'white',
            borderRadius: 16,
            border: '1px solid rgba(42,42,22,0.08)',
            overflow: 'hidden',
            animationDelay: `${di * 80}ms`,
          }}
        >
          {/* Header */}
          <div style={{
            background: 'var(--deep)',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: 'var(--amber)',
                marginBottom: 4,
              }}>
                Day {day.dayNum ?? di + 1} · {day.theme}
              </div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 18,
                color: 'white',
                fontStyle: 'italic',
              }}>
                {day.title}
              </div>
            </div>
            <div style={{
              fontSize: 20,
              background: 'rgba(200,136,42,0.2)',
              borderRadius: 8,
              padding: '6px 10px',
            }}>
              {day.weather}
            </div>
          </div>

          {/* Activities */}
          <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {(day.activities ?? []).map((act, ai) => (
              <div key={ai} style={{
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
                padding: '12px 16px',
                borderRadius: 10,
                background: 'var(--sand)',
                borderLeft: '3px solid var(--fog)',
              }}>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: 'var(--amber)',
                  flexShrink: 0,
                  paddingTop: 2,
                  minWidth: 52,
                }}>
                  {act.time}
                </div>
                <div style={{ fontSize: 18, flexShrink: 0 }}>{act.icon ?? '📍'}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--deep)', marginBottom: 2 }}>{act.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(42,42,22,0.55)', lineHeight: 1.5 }}>{act.description}</div>
                </div>
                {act.cost > 0 && (
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12,
                    color: 'var(--teal)',
                    flexShrink: 0,
                    fontWeight: 500,
                  }}>
                    ${act.cost}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Empty({ msg }) {
  return (
    <div style={{ textAlign: 'center', padding: '80px 40px', color: 'rgba(42,42,22,0.35)' }}>
      <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>🗺️</div>
      <div style={{ fontSize: 15 }}>{msg}</div>
    </div>
  )
}
