import { useApiCollection } from '../hooks/useApiCollection'

// API endpoint under https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/
// Falls back to localhost when VITE_CODESPACE_NAME is unset.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function describeExercises(exercises) {
  if (!Array.isArray(exercises) || exercises.length === 0) {
    return '—'
  }
  return exercises.map((exercise) => exercise.name).join(', ')
}

function Workouts() {
  const { items, loading, error } = useApiCollection(apiUrl)

  return (
    <div>
      <h1 className="h3 mb-3">Workouts</h1>

      {loading && <p className="text-muted">Loading workouts…</p>}
      {error && <div className="alert alert-danger">Failed to load workouts: {error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Est. minutes</th>
                <th>Exercises</th>
              </tr>
            </thead>
            <tbody>
              {items.map((workout) => (
                <tr key={workout._id ?? workout.title}>
                  <td>{workout.title}</td>
                  <td className="text-capitalize">{workout.category}</td>
                  <td className="text-capitalize">{workout.difficulty}</td>
                  <td>{workout.estimatedMinutes}</td>
                  <td>{describeExercises(workout.exercises)}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No workouts found.
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

export default Workouts
