const ITEMS = [
  { icon: '📄', name: 'PDF Itinerary',       desc: 'Complete day-by-day travel guide with maps, schedules, and local tips.',   action: 'Download PDF'      },
  { icon: '✉️', name: 'Confirmation Emails',  desc: 'Flight and hotel confirmations with booking references, ready to send.',    action: 'Send Emails'       },
  { icon: '📅', name: 'Calendar Invites',     desc: 'Pre-filled .ics events for flights, check-in, activities, and check-out.', action: 'Add to Calendar'   },
  { icon: '🗺️', name: 'Offline Maps',         desc: 'Downloadable destination maps with all itinerary locations pinned.',       action: 'Download Maps'     },
  { icon: '🚨', name: 'Emergency Pack',       desc: 'Local emergency contacts, embassy info, travel insurance template.',       action: 'View Pack'         },
  { icon: '💳', name: 'Expense Tracker',      desc: 'Pre-configured budget spreadsheet with daily allowances and categories.',  action: 'Open Tracker'      },
]

export default function DeliverablesView({ ctx }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
      {ITEMS.map((d, i) => (
        <div
          key={i}
          className="animate-card-in"
          style={{
            background: 'white',
            border: '1px solid rgba(42,42,22,0.08)',
            borderRadius: 14,
            padding: 20,
            display: 'flex', flexDirection: 'column', gap: 12,
            cursor: 'pointer',
            transition: 'all 0.2s',
            animationDelay: `${i * 60}ms`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--amber)'
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(200,136,42,0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(42,42,22,0.08)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <div style={{ fontSize: 32 }}>{d.icon}</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--deep)' }}>{d.name}</div>
          <div style={{ fontSize: 12, color: 'rgba(42,42,22,0.5)', lineHeight: 1.5, flex: 1 }}>
            {d.desc.replace('destination', ctx?.destination ?? 'your destination')}
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: "'DM Mono', monospace",
            fontSize: 11, letterSpacing: 1, textTransform: 'uppercase',
            color: 'var(--amber)', fontWeight: 500,
          }}>
            {d.action} →
          </div>
        </div>
      ))}
    </div>
  )
}
