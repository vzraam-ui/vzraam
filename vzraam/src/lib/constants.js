// ── Agent Pipeline Definitions ─────────────────────────────────────────────
export const AGENTS = [
  { id: 'orchestrator', name: 'Orchestrator',  icon: '🧠', desc: 'Master planner & coordinator' },
  { id: 'flight',       name: 'Flight Scout',  icon: '✈️', desc: 'Finds optimal routes & pricing' },
  { id: 'hotel',        name: 'Hotel Hunter',  icon: '🏨', desc: 'Curates accommodations' },
  { id: 'itinerary',    name: 'Day Planner',   icon: '🗺️', desc: 'Builds your daily schedule' },
  { id: 'restaurant',   name: 'Food Guide',    icon: '🍽️', desc: 'Local dining recommendations' },
  { id: 'budget',       name: 'Budget Ctrl',   icon: '💰', desc: 'Cost optimizer & tracker' },
  { id: 'booking',      name: 'Booker',        icon: '📋', desc: 'Processes reservations' },
  { id: 'packager',     name: 'Packager',      icon: '📦', desc: 'Assembles travel deliverables' },
]

// ── Result Tabs ─────────────────────────────────────────────────────────────
export const RESULT_TABS = [
  { id: 'itinerary',    label: 'Itinerary',    icon: '🗺️' },
  { id: 'flights',      label: 'Flights',      icon: '✈️' },
  { id: 'hotels',       label: 'Hotels',       icon: '🏨' },
  { id: 'restaurants',  label: 'Dining',       icon: '🍽️' },
  { id: 'budget',       label: 'Budget',       icon: '💰' },
  { id: 'deliverables', label: 'Travel Pack',  icon: '📦' },
]

// ── Claude model ────────────────────────────────────────────────────────────
export const CLAUDE_MODEL = 'claude-sonnet-4-20250514'
