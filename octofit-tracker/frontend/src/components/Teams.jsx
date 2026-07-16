import { useApiCollection } from '../hooks/useApiCollection'

function Teams() {
  const { items, loading, error } = useApiCollection('teams')

  return (
    <div>
      <h1 className="h3 mb-3">Teams</h1>

      {loading && <p className="text-muted">Loading teams…</p>}
      {error && <div className="alert alert-danger">Failed to load teams: {error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Motto</th>
                <th>Weekly goal (km)</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {items.map((team) => (
                <tr key={team._id ?? team.name}>
                  <td>{team.name}</td>
                  <td>{team.city}</td>
                  <td>{team.motto ?? '—'}</td>
                  <td>{team.weeklyDistanceGoalKm ?? 0}</td>
                  <td>{team.members?.length ?? 0}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No teams found.
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

export default Teams
