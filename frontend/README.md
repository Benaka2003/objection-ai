# ObjectionAI

AI-powered objection handling frontend, built with React + Vite.

## Setup

```bash
npm install
npm run dev
```

The app expects a backend running at `http://localhost:3001` exposing:

- `GET /health`
- `GET /analytics`
- `GET /history`
- `POST /analyse` — body `{ "input": "..." }`

Change the base URL in `src/utils/constants.js` (`API_BASE`) if your backend runs elsewhere.

## Structure

```
src/
├── api/            API client (fetch wrapper around the ObjectionAI backend)
├── components/     Reusable UI: cards, panels, icons, toasts, skeletons
├── layout/         App shell: navbar, sidebar, page container
├── pages/          Top-level routed views
├── hooks/          Data-fetching and stateful logic (health, analysis, analytics)
├── utils/          Constants and formatting helpers
├── App.jsx         Root component — state-based page switching
├── main.jsx        React entry point
└── index.css       Global styles + liquid-glass design system
```

## Notes

- No mock data anywhere — every page calls the real backend and shows real
  loading/error states if it's unreachable.
- Page switching is local React state (no router), matching the original brief.
- Animations use `framer-motion`. Charts use `recharts`.
