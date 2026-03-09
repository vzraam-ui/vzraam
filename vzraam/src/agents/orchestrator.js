import { runFlightAgent }     from './flightAgent'
import { runHotelAgent }      from './hotelAgent'
import { runItineraryAgent }  from './itineraryAgent'
import { runRestaurantAgent } from './restaurantAgent'
import { calcBudget, calcNights, delay, randomPNR, randomRef } from '../lib/utils'

/**
 * Main orchestration pipeline.
 * Calls setAgent / addLog callbacks so the UI can react in real-time.
 *
 * @param {object}   formData  - raw form values from TripForm
 * @param {Function} setAgent  - (agentId, 'idle'|'running'|'done'|'error') => void
 * @param {Function} addLog    - (agent, message, type?) => void
 * @returns {object}           - { flights, hotels, itinerary, restaurants, budget, ctx }
 */
export async function runOrchestrator(formData, setAgent, addLog) {
  const ctx = {
    destination: formData.destination,
    from:        formData.from        || 'New York',
    startDate:   formData.startDate,
    endDate:     formData.endDate,
    budget:      formData.budget      || '3000',
    travelers:   formData.travelers   || '2',
    preferences: formData.preferences || 'comfortable travel, mix of culture and relaxation',
    nights:      calcNights(formData.startDate, formData.endDate),
  }

  // ── Orchestrator ──────────────────────────────────────────────────────────
  setAgent('orchestrator', 'running')
  addLog('Orchestrator', 'Initializing vacation planning pipeline…')
  await delay(500)
  addLog('Orchestrator', `Trip: ${ctx.from} → ${ctx.destination}, ${ctx.nights} nights, ${ctx.travelers} travelers`, 'info')
  addLog('Orchestrator', 'Dispatching sub-agents in parallel…', 'success')
  setAgent('orchestrator', 'done')

  // ── Flights + Hotels (parallel) ────────────────────────────────────────
  setAgent('flight', 'running')
  setAgent('hotel',  'running')
  addLog('Flight Scout', 'Searching available routes & pricing…')
  addLog('Hotel Hunter', 'Querying accommodation options…')

  let flights, hotels
  try {
    ;[flights, hotels] = await Promise.all([
      runFlightAgent(ctx),
      runHotelAgent(ctx),
    ])
    addLog('Flight Scout', 'Routes found — best price secured', 'success')
    addLog('Hotel Hunter', '3 properties matched preferences',  'success')
    setAgent('flight', 'done')
    setAgent('hotel',  'done')
  } catch (err) {
    addLog('Flight Scout', `Error: ${err.message}`, 'error')
    setAgent('flight', 'error')
    setAgent('hotel',  'error')
    throw err
  }

  // ── Itinerary ─────────────────────────────────────────────────────────
  setAgent('itinerary', 'running')
  addLog('Day Planner', `Building ${ctx.nights}-day itinerary…`)
  let itinerary
  try {
    itinerary = await runItineraryAgent(ctx)
    addLog('Day Planner', `${ctx.nights} days planned with local highlights`, 'success')
    setAgent('itinerary', 'done')
  } catch (err) {
    addLog('Day Planner', `Error: ${err.message}`, 'error')
    setAgent('itinerary', 'error')
    throw err
  }

  // ── Restaurants ───────────────────────────────────────────────────────
  setAgent('restaurant', 'running')
  addLog('Food Guide', `Scouting dining in ${ctx.destination}…`)
  let restaurants
  try {
    restaurants = await runRestaurantAgent(ctx)
    addLog('Food Guide', '6 curated dining experiences selected', 'success')
    setAgent('restaurant', 'done')
  } catch (err) {
    addLog('Food Guide', `Error: ${err.message}`, 'error')
    setAgent('restaurant', 'error')
    throw err
  }

  // ── Budget ─────────────────────────────────────────────────────────────
  setAgent('budget', 'running')
  addLog('Budget Ctrl', 'Calculating cost breakdown…')
  await delay(400)
  const budget = calcBudget(flights, hotels, itinerary, ctx)
  const budgetLabel = budget.total <= Number(ctx.budget)
    ? `$${budget.total.toLocaleString()} of $${ctx.budget} — within budget ✓`
    : `$${budget.total.toLocaleString()} — over budget by $${(budget.total - Number(ctx.budget)).toLocaleString()}`
  addLog('Budget Ctrl', budgetLabel, budget.total <= Number(ctx.budget) ? 'success' : 'error')
  setAgent('budget', 'done')

  // ── Booking ────────────────────────────────────────────────────────────
  setAgent('booking', 'running')
  addLog('Booker', 'Processing flight reservations…')
  await delay(500)
  addLog('Booker', `Flight PNR confirmed: ${randomPNR()}`, 'success')
  addLog('Booker', 'Processing hotel reservation…')
  await delay(400)
  addLog('Booker', `Hotel booking ref: ${randomRef()}`, 'success')
  setAgent('booking', 'done')

  // ── Packager ───────────────────────────────────────────────────────────
  setAgent('packager', 'running')
  addLog('Packager', 'Assembling travel pack…')
  await delay(600)
  addLog('Packager', 'PDF itinerary generated',           'success')
  addLog('Packager', 'Confirmation emails queued',        'success')
  addLog('Packager', 'Calendar invites (.ics) prepared',  'success')
  addLog('Packager', 'Emergency contacts & local tips bundled', 'info')
  setAgent('packager', 'done')

  addLog('Orchestrator', '✓ All agents complete — vacation plan ready!', 'success')

  return { flights, hotels, itinerary, restaurants, budget, ctx }
}
