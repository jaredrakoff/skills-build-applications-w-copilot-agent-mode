# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Environment variables

The presentation tier talks to the logic tier (port 8000) using an API base URL
built from `VITE_CODESPACE_NAME`:

```
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/<resource>/
```

`VITE_CODESPACE_NAME` **must be defined** (for example in `.env.local`) when
running in GitHub Codespaces. Copy `.env.example` to `.env.local` and set it:

```bash
cp octofit-tracker/frontend/.env.example octofit-tracker/frontend/.env.local
# then set VITE_CODESPACE_NAME=<your-codespace-name>
```

If `VITE_CODESPACE_NAME` is unset, the app falls back to `http://localhost:8000`
so it never builds a broken `https://undefined-8000.app.github.dev` URL.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
