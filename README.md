# Synapse

A cute pastel React app for managing tasks and notes in your browser session.

## Project structure

- `client` - React frontend

## Setup

### 1. Install dependencies

From `client`:

```powershell
cd c:\Users\aarus\Synapse\client
npm install
```

### 2. Run the app locally

```powershell
cd c:\Users\aarus\Synapse\client
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:3000`).

## Notes storage behavior

- Tasks and notes are stored in browser `sessionStorage`
- Data is available while the website is open
- Everything is cleared when the browser tab or window is closed
- No backend or SQL database is required for this static deployment

## Website structure

- Smooth navigation with a dropdown menu
- Three main sections: Welcome, Tasks, Notes
- Bootstrap styling for a polished static site experience

## Deployment

This app is configured for GitHub Pages using the `gh-pages` package.

- Build the app: `npm run build`
- Deploy: `npm run deploy`

## Features

- Task manager: add, delete, mark complete
- Notes manager: add, edit, delete
- Soft pastel UI with responsive layout

Enjoy your cute productivity app! 🌸✨
