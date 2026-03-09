import { useEffect, useRef } from 'react'

const typeColors = {
  default: 'rgba(245,240,232,0.8)',
  success: '#3aab9a',
  error:   '#e87070',
  info:    'rgba(245,240,232,0.45)',
}

export default function LogStream({ logs, running }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight
  }, [logs])

  if (!logs.length && !running) return null

  return (
    <div style={{
      background: 'var(--deep)',
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 40,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px',
        borderBottom: '1px solid rgba(200,136,42,0.15)',
      }}>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: 'var(--amber-light)',
        }}>
          ◈ Agent Log Stream
        </span>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          color: 'rgba(200,136,42,0.5)',
        }}>
          {logs.length} events
        </span>
      </div>

      <div
        ref={ref}
        style={{
          height: 200,
          overflowY: 'auto',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {logs.map((l) => (
          <div key={l.id} className="animate-log-fade" style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            lineHeight: 1.6,
            display: 'flex',
            gap: 12,
          }}>
            <span style={{ color: 'rgba(200,136,42,0.5)', flexShrink: 0 }}>{l.time}</span>
            <span style={{ color: 'var(--amber-light)', flexShrink: 0, minWidth: 120 }}>[{l.agent}]</span>
            <span style={{ color: typeColors[l.type] ?? typeColors.default }}>{l.msg}</span>
          </div>
        ))}
        {running && (
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            lineHeight: 1.6,
            display: 'flex',
            gap: 12,
          }}>
            <span style={{ color: 'rgba(200,136,42,0.5)' }}>…</span>
            <span style={{ color: 'var(--amber-light)', minWidth: 120 }}>[system]</span>
            <span style={{ color: typeColors.info }}>processing…</span>
          </div>
        )}
      </div>
    </div>
  )
}
