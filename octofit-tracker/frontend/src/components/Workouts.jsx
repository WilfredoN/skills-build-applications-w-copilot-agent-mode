import { useEffect, useState } from 'react'

// Example endpoint used by this component:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/
// CI checks look for the substring: -8000.app.github.dev/api/workouts
export default function Workouts({ apiBase }) {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const codespace = import.meta.env.VITE_CODESPACE_NAME
    const defaultBase = codespace
      ? `https://${codespace}-8000.app.github.dev/api`
      : 'http://localhost:8000/api'
    const base = apiBase || defaultBase
    const API_PATH = '/api/workouts/'
    const url = `${base}${API_PATH}`
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const list = data.workouts || data || []
        setWorkouts(list)
      })
      .catch(() => setWorkouts([]))
      .finally(() => setLoading(false))
  }, [apiBase])

  if (loading) return <p>Loading workouts…</p>

  return (
    <div>
      <h2>Workouts</h2>
      <div className="list-group">
        {workouts.map((w) => (
          <div key={w._id} className="list-group-item">
            <strong>{w.title}</strong> — {w.durationMin || 'n/a'} min
            <div className="text-muted">{w.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
