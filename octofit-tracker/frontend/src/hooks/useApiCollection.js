import { useEffect, useState } from 'react'
import { apiUrl, toItems } from '../config/api'

// Fetch a resource collection from the API and expose loading/error state.
// Keeps compatibility with paginated and array responses via `toItems`.
export function useApiCollection(resource) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)

    fetch(apiUrl(resource))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        if (active) {
          setItems(toItems(data))
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message)
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [resource])

  return { items, loading, error }
}
