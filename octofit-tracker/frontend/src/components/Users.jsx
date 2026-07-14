import { useEffect, useState } from 'react'

export default function Users({ apiBase }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const codespace = import.meta.env.VITE_CODESPACE_NAME
    const defaultBase = codespace
      ? `https://${codespace}-8000.app.github.dev/api`
      : 'http://localhost:8000/api'
    const base = apiBase || defaultBase
    const API_PATH = '/api/users/'
    const url = `${base}${API_PATH}`
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        // compatible with { users: [] } or direct array
        const list = data.users || data || []
        setUsers(list)
      })
      .catch(() => setUsers([]))
      .finally(() => setLoading(false))
  }, [apiBase])

  if (loading) return <p>Loading users…</p>

  return (
    <div>
      <h2>Users</h2>
      <ul className="list-group">
        {users.map((u) => (
          <li key={u._id} className="list-group-item">
            <strong>{u.name}</strong> — {u.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
