export default function RestaurantsView({ data }) {
  const restaurants = data?.restaurants ?? []
  if (!restaurants.length) return <Empty />

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
      {restaurants.map((r, i) => (
        <div
          key={i}
          className="animate-card-in"
          style={{
            background: 'white',
            borderRadius: 14,
            border: '1px solid rgba(42,42,22,0.08)',
            padding: 20,
            display: 'flex', flexDirection: 'column', gap: 12,
            animationDelay: `${i * 60}ms`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 28 }}>{r.emoji ?? '🍴'}</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: 'var(--deep)' }}>
                {r.name}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(42,42,22,0.5)' }}>{r.cuisine}</div>
              <div style={{ fontSize: 13, color: 'var(--amber)' }}>
                {'★'.repeat(Math.round(parseFloat(r.rating) || 4))} {r.rating}
              </div>
            </div>
          </div>

          <div style={{ fontSize: 13, color: 'rgba(42,42,22,0.6)', lineHeight: 1.5 }}>{r.description}</div>

          {r.bestDish && (
            <div style={{ fontSize: 12, color: 'var(--amber)', fontWeight: 500 }}>
              Best dish: {r.bestDish}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--fog)' }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: 'var(--teal)', fontWeight: 500 }}>
              {r.priceRange}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{
                background: 'var(--ghost)', color: 'var(--amber)',
                borderRadius: 100, padding: '3px 10px',
                fontSize: 11, fontWeight: 500, fontFamily: "'DM Mono', monospace",
              }}>{r.mealType}</span>
              {r.reservation && (
                <span style={{
                  background: 'rgba(42,124,111,0.1)', color: 'var(--teal)',
                  borderRadius: 100, padding: '3px 10px',
                  fontSize: 11, fontWeight: 500, fontFamily: "'DM Mono', monospace",
                }}>Reserve</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Empty() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 40px', color: 'rgba(42,42,22,0.35)' }}>
      <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>🍽️</div>
      <div>Restaurant data unavailable</div>
    </div>
  )
}
