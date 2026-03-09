export default function Header({ running }) {
  return (
    <header style={{
      padding: '40px 0 32px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      borderBottom: '1px solid rgba(42,42,22,0.12)',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: 'var(--amber)',
          fontWeight: 500,
        }}>
          Autonomous AI System
        </span>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 32,
          fontWeight: 700,
          color: 'var(--deep)',
          lineHeight: 1,
        }}>
          Voyage<em style={{ fontStyle: 'italic', color: 'var(--amber)' }}>AI</em>
        </h1>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px',
        background: 'var(--deep)',
        borderRadius: 100,
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        color: 'var(--amber-light)',
        letterSpacing: 1,
      }}>
        <div style={{
          width: 6, height: 6,
          borderRadius: '50%',
          background: 'var(--teal-light)',
        }}
          className="animate-pulse-dot"
        />
        {running ? 'AGENTS RUNNING' : 'READY'}
      </div>
    </header>
  )
}
