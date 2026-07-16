import { useApiCollection } from '../hooks/useApiCollection'

function Users() {
  const { items, loading, error } = useApiCollection('users')

  return (
    <div>
      <h1 className="h3 mb-3">Users</h1>

      {loading && <p className="text-muted">Loading users…</p>}
      {error && <div className="alert alert-danger">Failed to load users: {error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Fitness level</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {items.map((user) => (
                <tr key={user._id ?? user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.city}</td>
                  <td className="text-capitalize">{user.fitnessLevel}</td>
                  <td>{user.team?.name ?? '—'}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No users found.
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

export default Users
