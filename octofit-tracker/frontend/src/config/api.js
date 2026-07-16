// Base URL for the Octofit API (logic tier on port 8000).
//
// In GitHub Codespaces, define `VITE_CODESPACE_NAME` (for example in
// `octofit-tracker/frontend/.env.local`) so requests target the forwarded
// public URL. When it is unset we fall back to `http://localhost:8000`
// to avoid building broken `https://undefined-8000.app.github.dev` URLs.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

// Build the endpoint URL for a given API resource, e.g. `users` ->
// `https://<codespace>-8000.app.github.dev/api/users/`.
export function apiUrl(resource) {
  return `${apiBaseUrl}/api/${resource}/`
}

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
