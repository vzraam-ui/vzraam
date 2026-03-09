import { AGENTS } from '../lib/constants'

export default function AgentPipeline({ agentStates }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <SectionHeader label="Agent Pipeline" />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 12,
      }}>
        {AGENTS.map((a) => {
          const state = agentStates[a.id] || 'idle'
          return <AgentCard key={a.id} agent={a} state={state} />
        })}
      </div>
    </section>
  )
}

function AgentCard({ agent, state }) {
  const colors = {
    idle:    { border: 'rgba(42,42,22,0.08)', bg: 'white',   text: 'rgba(42,42,22,0.35)' },
    running: { border: 'var(--amber)',        bg: 'white',   text: 'var(--amber)'         },
    done:    { border: 'var(--teal)',         bg: 'white',   text: 'var(--teal)'          },
    error:   { border: 'var(--crimson)',      bg: 'white',   text: 'var(--crimson)'       },
  }
  const c = colors[state] ?? colors.idle
  const labels = { idle: 'STANDBY', running: 'ACTIVE…', done: '✓ COMPLETE', error: '✗ ERROR' }

  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: 12,
      padding: 16,
      position: 'relative',
      overflow: 'hidden',
      opacity: state === 'idle' ? 0.5 : 1,
      boxShadow: state === 'running' ? '0 0 0 3px rgba(200,136,42,0.12)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      {state === 'running' && (
        <div
          className="animate-shimmer"
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, transparent, var(--amber), transparent)',
          }}
        />
      )}
      <div style={{ fontSize: 24, marginBottom: 8 }}>{agent.icon}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--deep)', marginBottom: 4, lineHeight: 1.3 }}>
        {agent.name}
      </div>
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 10,
        letterSpacing: 0.5,
        color: c.text,
      }}>
        {labels[state]}
      </div>
    </div>
  )
}

export function SectionHeader({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
      <span style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        letterSpacing: 3,
        textTransform: 'uppercase',
        color: 'var(--amber)',
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
      <div style={{
        flex: 1, height: 1,
        background: 'linear-gradient(90deg, rgba(200,136,42,0.3), transparent)',
      }} />
    </div>
  )
}
