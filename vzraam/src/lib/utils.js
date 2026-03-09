// ── Timing ──────────────────────────────────────────────────────────────────
export const delay = (ms) => new Promise((r) => setTimeout(r, ms))

// ── Random ID generators ─────────────────────────────────────────────────
export const randomPNR = () =>
  Math.random().toString(36).slice(2, 8).toUpperCase()

export const randomRef = () =>
  'HTL-' + Math.random().toString(36).slice(2, 8).toUpperCase()

// ── Date helpers ─────────────────────────────────────────────────────────
export const calcNights = (start, end) => {
  if (!start || !end) return 5
  return Math.max(1, Math.round((new Date(end) - new Date(start)) / 86400000))
}

// ── Budget calculator ─────────────────────────────────────────────────────
export const calcBudget = (flights, hotels, itinerary, ctx) => {
  const flightCost = flights?.totalFlightCost ?? 800
  const hotel =
    hotels?.hotels?.find((h) => h.recommended) ?? hotels?.hotels?.[0]
  const hotelCost = hotel?.totalPrice ?? 600
  const actCost = (itinerary?.days ?? []).reduce(
    (s, d) =>
      s + (d.activities ?? []).reduce((a, ac) => a + (ac.cost ?? 0), 0),
    0
  )
  const foodCost = Math.round(ctx.nights * 60 * parseInt(ctx.travelers, 10))
  const miscCost = Math.round((flightCost + hotelCost + actCost + foodCost) * 0.1)
  const total = flightCost + hotelCost + actCost + foodCost + miscCost

  return {
    total,
    items: [
      { icon: '✈️', label: 'Flights',        amount: flightCost },
      { icon: '🏨', label: 'Hotels',         amount: hotelCost  },
      { icon: '🎯', label: 'Activities',     amount: actCost    },
      { icon: '🍽️', label: 'Food & Dining',  amount: foodCost   },
      { icon: '🎒', label: 'Misc & Tips',    amount: miscCost   },
    ],
  }
}

// ── Safe JSON parse ───────────────────────────────────────────────────────
export const safeJSON = (text) => {
  try {
    const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    return JSON.parse(clean)
  } catch {
    return null
  }
}
