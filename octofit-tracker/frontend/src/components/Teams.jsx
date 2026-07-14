import { useEffect, useState } from 'react'

export default function Teams({ apiBase }) {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const codespace = import.meta.env.VITE_CODESPACE_NAME
    const defaultBase = codespace
      ? `https://${codespace}-8000.app.github.dev/api`
      : 'http://localhost:8000/api'
    const base = apiBase || defaultBase
    const url = `${base}/teams/`
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const list = data.teams || data || []
        setTeams(list)
      })
      .catch(() => setTeams([]))
      .finally(() => setLoading(false))
  }, [apiBase])

  if (loading) return <p>Loading teams…</p>

  return (
    <div>
      <h2>Teams</h2>
      <ul className="list-group">
        {teams.map((t) => (
          <li key={t._id} className="list-group-item">
            <strong>{t.name}</strong> — {t.members?.length || 0} members
          </li>
        ))}
      </ul>
    </div>
  )
}
