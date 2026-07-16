import { useApiCollection } from '../hooks/useApiCollection'

function formatDate(value) {
  if (!value) {
    return '—'
  }
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString()
}

function Activities() {
  const { items, loading, error } = useApiCollection('activities')

  return (
    <div>
      <h1 className="h3 mb-3">Activities</h1>

      {loading && <p className="text-muted">Loading activities…</p>}
      {error && <div className="alert alert-danger">Failed to load activities: {error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Distance (km)</th>
                <th>Calories</th>
                <th>Performed</th>
              </tr>
            </thead>
            <tbody>
              {items.map((activity) => (
                <tr key={activity._id}>
                  <td>{activity.user?.name ?? '—'}</td>
                  <td className="text-capitalize">{activity.type}</td>
                  <td>{activity.durationMinutes}</td>
                  <td>{activity.distanceKm ?? 0}</td>
                  <td>{activity.caloriesBurned ?? 0}</td>
                  <td>{formatDate(activity.performedAt)}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No activities found.
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

export default Activities
