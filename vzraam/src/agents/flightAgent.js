import { callClaude } from './claudeClient'
import { safeJSON } from '../lib/utils'
import { mockFlights } from '../lib/mockData'

export async function runFlightAgent(ctx) {
  const raw = await callClaude(
    'You are a flight search agent. Return ONLY valid JSON, no markdown, no explanation.',
    `Find 2 flight options from ${ctx.from} to ${ctx.destination} on ${ctx.startDate},
     return trip on ${ctx.endDate}, for ${ctx.travelers} passengers, budget $${ctx.budget} total trip.
     Return JSON:
     {
       "outbound": { "airline": str, "flightNo": str, "departure": str, "arrival": str,
                     "duration": str, "stops": int, "price": number, "class": str },
       "return":   { "airline": str, "flightNo": str, "departure": str, "arrival": str,
                     "duration": str, "stops": int, "price": number, "class": str },
       "totalFlightCost": number,
       "savings": str
     }`
  )
  return safeJSON(raw) ?? mockFlights(ctx)
}
