import { RESULT_TABS } from '../lib/constants'
import { SectionHeader } from './AgentPipeline'
import ItineraryView    from './results/ItineraryView'
import FlightsView      from './results/FlightsView'
import HotelsView       from './results/HotelsView'
import RestaurantsView  from './results/RestaurantsView'
import BudgetView       from './results/BudgetView'
import DeliverablesView from './results/DeliverablesView'

export default function ResultsPanel({ results, activeTab, setActiveTab }) {
  if (!results) return null

  return (
    <section style={{ marginBottom: 60 }}>
      <SectionHeader label={`✦ Your Travel Plan — ${results.ctx.destination}`} />

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: 2,
        background: 'rgba(42,42,22,0.08)',
        borderRadius: 10, padding: 4,
        marginBottom: 24, overflowX: 'auto',
      }}>
        {RESULT_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '8px 18px',
              borderRadius: 7,
              fontSize: 13, fontWeight: 500,
              cursor: 'pointer', border: 'none',
              background: activeTab === t.id ? 'white' : 'transparent',
              color: activeTab === t.id ? 'var(--deep)' : 'rgba(42,42,22,0.5)',
              boxShadow: activeTab === t.id ? '0 1px 4px rgba(42,42,22,0.1)' : 'none',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: 6,
              fontFamily: "'Sora', sans-serif",
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Views */}
      {activeTab === 'itinerary'    && <ItineraryView   data={results.itinerary}    />}
      {activeTab === 'flights'      && <FlightsView      data={results.flights}      />}
      {activeTab === 'hotels'       && <HotelsView       data={results.hotels}       />}
      {activeTab === 'restaurants'  && <RestaurantsView  data={results.restaurants}  />}
      {activeTab === 'budget'       && <BudgetView       data={results.budget}  ctx={results.ctx} />}
      {activeTab === 'deliverables' && <DeliverablesView ctx={results.ctx}           />}
    </section>
  )
}
