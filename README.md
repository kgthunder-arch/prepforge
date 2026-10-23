# PrepForge

PrepForge is a browser based engineering placement preparation app. It includes company focused question tracks, progress analytics, a coding lab preview, and a placement leaderboard. Solved question progress is saved in the browser's local storage.

## Requirements

- Node.js 20.19+ or 22.12+
- npm, or Bun if you prefer using the included `bun.lock`

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:3000`). No API key is needed to run the current app.

## Available scripts

- `npm run dev` starts the development server.
- `npm run build` creates a production build in `dist/`.
- `npm run preview` serves the production build locally.
- `npm run lint` runs the TypeScript compiler without emitting files.

## Project structure

- `src/components/` contains the React interface components.
- `src/data/` contains the sample questions and leaderboard data.
- `src/utils/` contains browser storage helpers.
