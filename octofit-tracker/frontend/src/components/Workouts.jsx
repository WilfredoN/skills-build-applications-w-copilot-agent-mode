import { useEffect, useState } from 'react'

export default function Workouts({ apiBase }) {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = `${apiBase}/workouts/`
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
