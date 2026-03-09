export default function FlightsView({ data }) {
  if (!data?.outbound) return <Empty />

  const { outbound, return: ret, totalFlightCost, savings } = data

  return (
    <div>
      {[['Outbound', outbound], ['Return', ret]].map(([lbl, f]) =>
        f ? (
          <div
            key={lbl}
            className="animate-card-in"
            style={{
              background: 'white',
              borderRadius: 16,
              border: '1px solid rgba(42,42,22,0.08)',
              padding: 24,
              marginBottom: 16,
            }}
          >
            <div style={{
              marginBottom: 12,
              fontSize: 11,
              fontFamily: "'DM Mono', monospace",
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'rgba(42,42,22,0.4)',
            }}>
              {lbl} Flight
            </div>

            {/* Route */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: 'var(--deep)' }}>
                  {f.departure?.split(' ')[0] ?? '—'}
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'rgba(42,42,22,0.4)', marginTop: 2 }}>
                  {f.departure}
                </div>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', position: 'relative', height: 1, background: 'var(--amber)' }}>
                  <span style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'white', padding: '0 8px',
                    color: 'var(--amber)', fontSize: 14,
                  }}>✈</span>
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(42,42,22,0.4)', letterSpacing: 1 }}>
                  {f.duration}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: 'var(--deep)' }}>
                  {f.arrival?.split(' ')[0] ?? '—'}
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'rgba(42,42,22,0.4)', marginTop: 2 }}>
                  {f.arrival}
                </div>
              </div>

              <div style={{
                marginLeft: 'auto',
                background: 'var(--deep)',
                color: 'var(--amber-light)',
                borderRadius: 8,
                padding: '8px 16px',
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
                fontWeight: 700,
              }}>
                ${f.price?.toLocaleString()}
              </div>
            </div>

            {/* Details */}
            <div style={{
              display: 'flex', gap: 24, paddingTop: 16,
              borderTop: '1px solid var(--fog)', flexWrap: 'wrap',
            }}>
              {[['Airline', f.airline], ['Flight', f.flightNo], ['Stops', f.stops === 0 ? 'Nonstop' : `${f.stops} stop`], ['Class', f.class]].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(42,42,22,0.4)' }}>{k}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--deep)' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null
      )}

      {totalFlightCost && (
        <div style={{ textAlign: 'right', marginTop: 8, fontFamily: "'DM Mono', monospace", fontSize: 13, color: 'rgba(42,42,22,0.5)' }}>
          Total flights:{' '}
          <strong style={{ color: 'var(--amber)' }}>${totalFlightCost.toLocaleString()}</strong>
          {savings && <span style={{ marginLeft: 16, color: 'var(--teal)' }}>✓ {savings}</span>}
        </div>
      )}
    </div>
  )
}

function Empty() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 40px', color: 'rgba(42,42,22,0.35)' }}>
      <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>✈️</div>
      <div>Flight data unavailable</div>
    </div>
  )
}
