import { Link, Routes, Route } from 'react-router-dom'
import './App.css'
import Users from './components/Users'
import Activities from './components/Activities'
import Teams from './components/Teams'
import Workouts from './components/Workouts'
import Leaderboard from './components/Leaderboard'

// Build API base using Vite env var with a safe fallback
const codespace = import.meta.env.VITE_CODESPACE_NAME
const apiBase = codespace
  ? `https://${codespace}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function App() {
  return (
    <div className="container py-4">
      <header className="d-flex align-items-center mb-4">
        <h1 className="me-auto">Octofit Tracker</h1>
        <nav>
          <Link className="me-3" to="/users">Users</Link>
          <Link className="me-3" to="/teams">Teams</Link>
          <Link className="me-3" to="/activities">Activities</Link>
          <Link className="me-3" to="/workouts">Workouts</Link>
          <Link to="/leaderboard">Leaderboard</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Users apiBase={apiBase} />} />
          <Route path="/users" element={<Users apiBase={apiBase} />} />
          <Route path="/teams" element={<Teams apiBase={apiBase} />} />
          <Route path="/activities" element={<Activities apiBase={apiBase} />} />
          <Route path="/workouts" element={<Workouts apiBase={apiBase} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBase={apiBase} />} />
        </Routes>
      </main>

      <footer className="mt-5 text-muted small">
        Note: Define VITE_CODESPACE_NAME in .env.local to use Codespaces-hosted API URL.
      </footer>
    </div>
  )
}

export default App
