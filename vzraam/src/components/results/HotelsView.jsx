export default function HotelsView({ data }) {
  const hotels = data?.hotels ?? []
  if (!hotels.length) return <Empty />

  return (
    <div>
      {hotels.map((h, i) => (
        <div
          key={i}
          className="animate-card-in"
          style={{
            background: 'white',
            borderRadius: 16,
            border: '1px solid rgba(42,42,22,0.08)',
            padding: 24,
            marginBottom: 16,
            display: 'flex',
            gap: 24,
            animationDelay: `${i * 80}ms`,
          }}
        >
          {/* Thumb */}
          <div style={{
            width: 100, height: 100, borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 40, flexShrink: 0, background: 'var(--sand)',
          }}>
            {h.emoji ?? '🏨'}
          </div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: 'var(--deep)', marginBottom: 4 }}>
              {h.name} {h.recommended && '⭐'}
            </div>
            <div style={{ color: 'var(--amber)', fontSize: 14, marginBottom: 8 }}>
              {'★'.repeat(Math.round(h.stars ?? 4))}
            </div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {[['Location', h.location], ['Rating', h.rating], ['Amenities', (h.amenities ?? []).slice(0, 3).join(' · ')]].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(42,42,22,0.4)' }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--deep)' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Price + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: 'var(--amber)' }}>
                ${h.pricePerNight?.toLocaleString()}
              </div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(42,42,22,0.4)' }}>/ night</div>
              <div style={{ fontSize: 12, color: 'rgba(42,42,22,0.5)', marginTop: 4 }}>
                Total: ${h.totalPrice?.toLocaleString()}
              </div>
            </div>
            <button style={{
              background: 'var(--teal)', color: 'white', border: 'none',
              borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', fontFamily: "'Sora', sans-serif",
            }}>
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

function Empty() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 40px', color: 'rgba(42,42,22,0.35)' }}>
      <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>🏨</div>
      <div>Hotel data unavailable</div>
    </div>
  )
}
