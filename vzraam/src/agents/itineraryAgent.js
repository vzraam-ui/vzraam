import { callClaude } from './claudeClient'
import { safeJSON } from '../lib/utils'
import { mockItinerary } from '../lib/mockData'

export async function runItineraryAgent(ctx) {
  const raw = await callClaude(
    'You are a travel itinerary specialist. Return ONLY valid JSON, no markdown.',
    `Create a detailed ${ctx.nights}-day itinerary for ${ctx.destination}.
     Preferences: ${ctx.preferences}. ${ctx.travelers} travelers.
     For each day include 4-5 activities with times.
     Return JSON:
     { "days": [
         { "dayNum": number, "title": str, "theme": str, "weather": str,
           "activities": [
             { "time": str, "name": str, "description": str,
               "icon": str, "cost": number, "type": str }
           ]
         }
       ]
     }`
  )
  return safeJSON(raw) ?? mockItinerary(ctx)
}
