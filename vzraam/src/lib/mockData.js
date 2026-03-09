// Fallback data used when Claude API response cannot be parsed

export const mockFlights = (ctx) => ({
  outbound: {
    airline: 'Sky Airlines',
    flightNo: 'SK 421',
    departure: `${ctx.from} (JFK) 08:30`,
    arrival: `${ctx.destination} 14:45`,
    duration: '9h 15m',
    stops: 0,
    price: 480,
    class: 'Economy',
  },
  return: {
    airline: 'Sky Airlines',
    flightNo: 'SK 422',
    departure: `${ctx.destination} 16:00`,
    arrival: `${ctx.from} (JFK) 22:10`,
    duration: '10h 10m',
    stops: 0,
    price: 460,
    class: 'Economy',
  },
  totalFlightCost: 940,
  savings: 'Saved ~$120 vs. avg',
})

export const mockHotels = (ctx) => ({
  hotels: [
    {
      name: `Grand Meridian ${ctx.destination}`,
      stars: 4,
      pricePerNight: 120,
      totalPrice: 120 * (ctx.nights || 5),
      location: 'City Center',
      rating: '4.6 / 5',
      amenities: ['Pool', 'WiFi', 'Gym'],
      emoji: '🏨',
      recommended: true,
    },
    {
      name: 'Boutique Haven',
      stars: 3,
      pricePerNight: 85,
      totalPrice: 85 * (ctx.nights || 5),
      location: 'Old Town',
      rating: '4.4 / 5',
      amenities: ['Breakfast', 'WiFi'],
      emoji: '🏡',
      recommended: false,
    },
    {
      name: 'Luxury Suites',
      stars: 5,
      pricePerNight: 220,
      totalPrice: 220 * (ctx.nights || 5),
      location: 'Waterfront',
      rating: '4.9 / 5',
      amenities: ['Spa', 'Butler', 'Pool', 'Lounge'],
      emoji: '✨',
      recommended: false,
    },
  ],
})

export const mockItinerary = (ctx) => {
  const icons = ['🏛️', '🌿', '🎨', '🍜', '🌅', '🏺', '🎭', '🚣']
  const themes = ['Culture', 'Nature', 'Food & Markets', 'History', 'Adventure']
  const weathers = ['☀️', '🌤️', '⛅', '🌥️', '☀️']
  return {
    days: Array.from({ length: ctx.nights || 5 }, (_, i) => ({
      dayNum: i + 1,
      title: `Exploring ${ctx.destination} — Day ${i + 1}`,
      theme: themes[i % themes.length],
      weather: weathers[i % weathers.length],
      activities: [
        { time: '08:30', name: 'Morning Walk & Breakfast', description: 'Start with a local café and soak in the morning atmosphere.', icon: '☕', cost: 15, type: 'food' },
        { time: '10:00', name: `${ctx.destination} Landmark Visit`, description: "Explore one of the city's most iconic attractions.", icon: icons[i % icons.length], cost: 25, type: 'sightseeing' },
        { time: '13:00', name: 'Lunch at Local Restaurant', description: 'Authentic cuisine recommended by locals.', icon: '🍽️', cost: 20, type: 'food' },
        { time: '15:30', name: 'Afternoon Exploration', description: 'Wander through markets, parks, or galleries at your own pace.', icon: '🚶', cost: 0, type: 'leisure' },
        { time: '19:30', name: 'Dinner & Evening', description: 'Curated dinner reservation at a top-rated venue.', icon: '🌙', cost: 45, type: 'food' },
      ],
    })),
  }
}

export const mockRestaurants = () => ({
  restaurants: [
    { name: 'The Local Table',    cuisine: 'Traditional',   priceRange: '$$',  rating: '4.7', description: 'Farm-to-table classics in a cozy setting.',           bestDish: 'Signature stew',      emoji: '🍲', mealType: 'Dinner',    reservation: true  },
    { name: 'Street Market Bites',cuisine: 'Street Food',   priceRange: '$',   rating: '4.5', description: 'Best street food stalls locals actually visit.',       bestDish: 'Mixed platter',       emoji: '🥙', mealType: 'Lunch',     reservation: false },
    { name: 'Rooftop Terrace',    cuisine: 'International', priceRange: '$$$', rating: '4.8', description: 'Panoramic views with fine dining experience.',          bestDish: "Chef's tasting menu", emoji: '🌇', mealType: 'Dinner',    reservation: true  },
    { name: 'Morning Bakery',     cuisine: 'Café & Pastry', priceRange: '$',   rating: '4.6', description: 'Best croissants and coffee in the city.',               bestDish: 'Almond croissant',    emoji: '🥐', mealType: 'Breakfast', reservation: false },
    { name: 'Harbor Fish Co.',    cuisine: 'Seafood',       priceRange: '$$',  rating: '4.7', description: 'Fresh catch straight from local fishermen.',            bestDish: 'Grilled catch of day',emoji: '🐟', mealType: 'Lunch',     reservation: false },
    { name: 'Night Garden',       cuisine: 'Fusion',        priceRange: '$$$', rating: '4.9', description: 'Award-winning fusion cuisine in a garden setting.',     bestDish: 'Tasting menu',        emoji: '🌸', mealType: 'Dinner',    reservation: true  },
  ],
})
