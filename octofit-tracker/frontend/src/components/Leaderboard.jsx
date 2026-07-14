import { useEffect, useState } from 'react'

export default function Leaderboard({ apiBase }) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = `${apiBase}/leaderboard/`
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const list = data.leaderboard || data || []
        setEntries(list)
      })
      .catch(() => setEntries([]))
      .finally(() => setLoading(false))
  }, [apiBase])

  if (loading) return <p>Loading leaderboard…</p>

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol className="list-group list-group-numbered">
        {entries.map((e, i) => (
          <li key={i} className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{e.user}</div>
            </div>
            <span className="badge bg-primary rounded-pill">{e.points}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
