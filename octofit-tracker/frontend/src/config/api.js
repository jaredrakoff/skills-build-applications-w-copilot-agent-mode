// Codespaces host suffix + API path used to build endpoint URLs, e.g.
//   https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/
//
// Each component builds its own endpoint inline so the full URL is explicit.
// When `VITE_CODESPACE_NAME` is unset we fall back to `http://localhost:8000`
// to avoid building broken `https://undefined-8000.app.github.dev` URLs.

// Normalize an API response into a plain array so components stay
// compatible with both paginated (`{ items }` / `{ results }`) and
// bare-array responses.
export function toItems(data) {
  if (Array.isArray(data)) {
    return data
  }
  if (data && Array.isArray(data.items)) {
    return data.items
  }
  if (data && Array.isArray(data.results)) {
    return data.results
  }
  return []
}
