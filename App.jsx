import { usePlanner }     from './hooks/usePlanner'
import Header            from './components/Header'
import TripForm          from './components/TripForm'
import AgentPipeline     from './components/AgentPipeline'
import LogStream         from './components/LogStream'
import ResultsPanel      from './components/ResultsPanel'

export default function App() {
  const { agentStates, logs, running, results, activeTab, setActiveTab, launch } = usePlanner()

  return (
    <>
      {/* Grain texture overlay */}
      <div className="grain" />

      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Header running={running} />
        <TripForm onSubmit={launch} disabled={running} />
        <AgentPipeline agentStates={agentStates} />
        <LogStream logs={logs} running={running} />
        <ResultsPanel results={results} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  )
}
