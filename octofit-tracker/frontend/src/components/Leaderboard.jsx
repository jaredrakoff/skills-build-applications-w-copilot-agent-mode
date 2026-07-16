import { useApiCollection } from '../hooks/useApiCollection'

// API endpoint under https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/
// Falls back to localhost when VITE_CODESPACE_NAME is unset.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const { items, loading, error } = useApiCollection(apiUrl)

  return (
    <div>
      <h1 className="h3 mb-3">Leaderboard</h1>

      {loading && <p className="text-muted">Loading leaderboard…</p>}
      {error && <div className="alert alert-danger">Failed to load leaderboard: {error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Points</th>
                <th>Period</th>
              </tr>
            </thead>
            <tbody>
              {items.map((entry) => (
                <tr key={entry._id ?? `${entry.period}-${entry.rank}`}>
                  <td>{entry.rank}</td>
                  <td>{entry.user?.name ?? '—'}</td>
                  <td>{entry.team?.name ?? '—'}</td>
                  <td>{entry.points}</td>
                  <td className="text-capitalize">{entry.period}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No leaderboard entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Leaderboard
