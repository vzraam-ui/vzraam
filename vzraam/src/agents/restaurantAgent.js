import { callClaude } from './claudeClient'
import { safeJSON } from '../lib/utils'
import { mockRestaurants } from '../lib/mockData'

export async function runRestaurantAgent(ctx) {
  const raw = await callClaude(
    'You are a culinary travel guide. Return ONLY valid JSON, no markdown.',
    `Recommend 6 restaurants in ${ctx.destination} for ${ctx.travelers} travelers.
     Preferences: ${ctx.preferences}.
     Return JSON:
     { "restaurants": [
         { "name": str, "cuisine": str, "priceRange": str, "rating": str,
           "description": str, "bestDish": str, "emoji": str,
           "mealType": str, "reservation": bool }
       ]
     }`
  )
  return safeJSON(raw) ?? mockRestaurants(ctx)
}
