# VoyageAI ✈️

**Autonomous multi-agent vacation planner powered by Claude AI**

VoyageAI is an end-to-end holiday planning system. A user provides a natural language request — destination, dates, budget, and preferences — and 8 autonomous AI agents collaboratively plan flights, book hotels, generate a day-by-day itinerary, recommend restaurants, track budget, and deliver a complete travel pack.

---

## 🏗️ Architecture

```
User Request
     │
     ▼
┌─────────────────────────────────────────────────────────┐
│                    Orchestrator Agent                    │
│            (coordinates the full pipeline)               │
└──────┬──────────────────────────────────────────────────┘
       │
       ├── ✈️  Flight Agent      → finds optimal routes & pricing
       ├── 🏨  Hotel Agent       → curates accommodations (parallel with Flight)
       ├── 🗺️  Itinerary Agent   → builds day-by-day schedule
       ├── 🍽️  Restaurant Agent  → recommends local dining
       ├── 💰  Budget Controller → calculates full cost breakdown
       ├── 📋  Booking Agent     → simulates reservation processing
       └── 📦  Packager Agent    → assembles PDF, emails, calendar invites
```

Each agent calls `claude-sonnet-4-20250514` with a specialised system prompt and returns structured JSON. Flights and hotels run **in parallel** via `Promise.all` to save time.

---

## 🗂️ Project Structure

```
vzraam/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example               ← copy to .env and add your API key
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx               ← React entry point
    ├── App.jsx                ← Root component
    ├── styles/
    │   └── globals.css        ← CSS variables, animations, Tailwind base
    ├── lib/
    │   ├── constants.js       ← Agent definitions, tab config, model name
    │   ├── utils.js           ← delay, calcBudget, safeJSON, date helpers
    │   └── mockData.js        ← Fallback data when API response fails to parse
    ├── agents/
    │   ├── claudeClient.js    ← Anthropic API wrapper (reads VITE_ANTHROPIC_API_KEY)
    │   ├── orchestrator.js    ← Master pipeline: sequences & parallelises agents
    │   ├── flightAgent.js     ← Flight search prompt + parser
    │   ├── hotelAgent.js      ← Hotel search prompt + parser
    │   ├── itineraryAgent.js  ← Itinerary generation prompt + parser
    │   └── restaurantAgent.js ← Restaurant recommendation prompt + parser
    ├── hooks/
    │   └── usePlanner.js      ← All pipeline state + launch handler
    └── components/
        ├── Header.jsx
        ├── TripForm.jsx
        ├── AgentPipeline.jsx  ← Live agent status cards
        ├── LogStream.jsx      ← Real-time event log
        ├── ResultsPanel.jsx   ← Tab switcher + view router
        └── results/
            ├── ItineraryView.jsx
            ├── FlightsView.jsx
            ├── HotelsView.jsx
            ├── RestaurantsView.jsx
            ├── BudgetView.jsx
            └── DeliverablesView.jsx
```

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/vzraam-ui/vzraam.git
cd vzraam
npm install
```

### 2. Configure API Key

```bash
cp .env.example .env
```

Open `.env` and set your Anthropic API key:

```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

Get your key at [console.anthropic.com](https://console.anthropic.com).

### 3. Run Dev Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### 4. Build for Production

```bash
npm run build
npm run preview
```

---

## ⚙️ Tech Stack

| Layer        | Technology                  |
|--------------|-----------------------------|
| Framework    | React 18 + Vite             |
| Styling      | CSS custom properties + Tailwind (utilities only) |
| AI           | Anthropic Claude Sonnet 4   |
| Fonts        | Playfair Display, DM Mono, Sora (Google Fonts) |

---

## 🔑 Environment Variables

| Variable                    | Required | Description                        |
|-----------------------------|----------|------------------------------------|
| `VITE_ANTHROPIC_API_KEY`    | ✅ Yes   | Your Anthropic API key             |

> ⚠️ **Security note:** `VITE_` prefix exposes the variable to the browser bundle. For production, route API calls through a backend proxy so the key is never shipped to the client.

---

## 📦 Deliverables Generated

| Deliverable           | Description                                          |
|-----------------------|------------------------------------------------------|
| 📄 PDF Itinerary      | Day-by-day travel guide with activities & tips       |
| ✉️ Confirmation Emails | Flight + hotel confirmations with booking refs       |
| 📅 Calendar Invites   | `.ics` events for flights, check-in, activities      |
| 🗺️ Offline Maps       | Destination maps with pinned itinerary locations     |
| 🚨 Emergency Pack     | Contacts, embassy info, travel insurance template    |
| 💳 Expense Tracker    | Budget spreadsheet with daily allowances             |

---

## 🛠️ Extending the System

### Add a new agent

1. Create `src/agents/myNewAgent.js` — call `callClaude()`, parse JSON, return data.
2. Register it in `src/lib/constants.js` under `AGENTS`.
3. Call it from `src/agents/orchestrator.js` in the appropriate pipeline stage.
4. Add a result view in `src/components/results/` and wire it in `ResultsPanel.jsx`.

---

## 📄 License

MIT
