import { callClaude } from './claudeClient'
import { safeJSON } from '../lib/utils'
import { mockHotels } from '../lib/mockData'

export async function runHotelAgent(ctx) {
  const hotelBudget = Math.round(Number(ctx.budget) * 0.35)
  const raw = await callClaude(
    'You are a hotel search agent. Return ONLY valid JSON, no markdown.',
    `Find 3 hotel options in ${ctx.destination} for ${ctx.nights} nights, ${ctx.travelers} guests,
     within $${hotelBudget} hotel budget. Preferences: ${ctx.preferences}.
     Return JSON:
     { "hotels": [
         { "name": str, "stars": number, "pricePerNight": number, "totalPrice": number,
           "location": str, "rating": str, "amenities": [str], "emoji": str, "recommended": bool }
       ]
     }`
  )
  return safeJSON(raw) ?? mockHotels(ctx)
}
