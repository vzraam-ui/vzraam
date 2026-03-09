import { useState, useRef, useCallback } from 'react'
import { runOrchestrator } from '../agents/orchestrator'

/**
 * usePlanner — encapsulates all pipeline state and the launch handler.
 */
export function usePlanner() {
  const [agentStates, setAgentStates] = useState({})
  const [logs,        setLogs]        = useState([])
  const [running,     setRunning]     = useState(false)
  const [results,     setResults]     = useState(null)
  const [activeTab,   setActiveTab]   = useState('itinerary')
  const startTimeRef = useRef(null)

  // ── Helpers ────────────────────────────────────────────────────────────
  const addLog = useCallback((agent, msg, type = 'default') => {
    const elapsed = startTimeRef.current
      ? `+${((Date.now() - startTimeRef.current) / 1000).toFixed(1)}s`
      : '0.0s'
    setLogs((l) => [...l, { agent, msg, type, time: elapsed, id: Date.now() + Math.random() }])
  }, [])

  const setAgent = useCallback((id, state) => {
    setAgentStates((s) => ({ ...s, [id]: state }))
  }, [])

  // ── Launch ─────────────────────────────────────────────────────────────
  const launch = useCallback(async (formData) => {
    setRunning(true)
    setResults(null)
    setLogs([])
    setAgentStates({})
    startTimeRef.current = Date.now()

    try {
      const plan = await runOrchestrator(formData, setAgent, addLog)
      setResults(plan)
      setActiveTab('itinerary')
    } catch (err) {
      addLog('Orchestrator', `Pipeline error: ${err.message}`, 'error')
    } finally {
      setRunning(false)
    }
  }, [setAgent, addLog])

  return { agentStates, logs, running, results, activeTab, setActiveTab, launch }
}
