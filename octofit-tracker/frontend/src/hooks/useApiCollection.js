import { useEffect, useState } from 'react'
import { toItems } from '../config/api'

// Fetch a collection from the given API URL and expose loading/error state.
// Keeps compatibility with paginated and array responses via `toItems`.
export function useApiCollection(url) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)

    fetch(url)
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
  }, [url])

  return { items, loading, error }
}
