import { useEffect, useState } from 'react'

export default function Activities({ apiBase }) {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = `${apiBase}/activities/`
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const list = data.activities || data || []
        setActivities(list)
      })
      .catch(() => setActivities([]))
      .finally(() => setLoading(false))
  }, [apiBase])

  if (loading) return <p>Loading activities…</p>

  return (
    <div>
      <h2>Activities</h2>
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Distance (km)</th>
            <th>Duration (min)</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((a) => (
            <tr key={a._id}>
              <td>{a.user?.name || (a.user && a.user.email) || '—'}</td>
              <td>{a.type}</td>
              <td>{a.distanceKm}</td>
              <td>{a.durationMin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
