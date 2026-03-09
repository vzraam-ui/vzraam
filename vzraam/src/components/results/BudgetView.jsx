const COLORS = ['#c8882a', '#2a7c6f', '#8b5a2a', '#4a7a8a', '#7c6a2a']

export default function BudgetView({ data, ctx }) {
  const items  = data?.items ?? []
  const total  = data?.total ?? 0
  const budget = parseFloat(ctx?.budget ?? 0)
  const under  = total <= budget

  return (
    <div className="animate-card-in" style={{
      background: 'white',
      borderRadius: 16,
      border: '1px solid rgba(42,42,22,0.08)',
      padding: 28,
    }}>
      {/* Title */}
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 22, fontWeight: 700, color: 'var(--deep)',
        marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12,
      }}>
        💰 Budget Breakdown
        <span style={{
          padding: '6px 16px',
          borderRadius: 100,
          fontFamily: "'DM Mono', monospace",
          fontSize: 11, letterSpacing: 1,
          background: under ? 'rgba(42,124,111,0.1)' : 'rgba(139,42,42,0.1)',
          color: under ? 'var(--teal)' : 'var(--crimson)',
        }}>
          {under
            ? `$${(budget - total).toLocaleString()} under budget`
            : `$${(total - budget).toLocaleString()} over budget`}
        </span>
      </div>

      {/* Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, fontSize: 14, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>{item.icon}</span> {item.label}
            </div>
            <div style={{ width: 200, height: 6, background: 'var(--fog)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${Math.min(100, (item.amount / budget) * 100)}%`,
                background: COLORS[i % COLORS.length],
                borderRadius: 3,
                transition: 'width 1s ease',
              }} />
            </div>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 13, color: 'var(--deep)', fontWeight: 500,
              minWidth: 80, textAlign: 'right',
            }}>
              ${item.amount?.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: 20, borderTop: '2px solid var(--deep)',
      }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--deep)' }}>Total Estimated Cost</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: 'var(--amber)' }}>
          ${total?.toLocaleString()}
        </div>
      </div>
    </div>
  )
}
