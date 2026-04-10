# Synapse

A cute pastel full-stack app for managing tasks and notes.

## Project structure

- `client` - React frontend
- `server` - Node.js + Express backend
- `server/db` - SQLite database initialization

## Setup

### 1. Install dependencies

From `server`:

```powershell
cd c:\Users\aarus\Synapse\server
npm install
```

From `client`:

```powershell
cd c:\Users\aarus\Synapse\client
npm install
```
```

### 2. Run the backend

```powershell
cd c:\Users\aarus\Synapse\server
npm start
```

This starts the API on `http://localhost:5000`.

### 3. Run the frontend

```powershell
cd c:\Users\aarus\Synapse\client
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:3000`).

## Features

- Task manager: add, delete, mark complete
- Notes manager: add, edit, delete
- Soft pastel UI with responsive layout
- SQLite database persistence via Express API

## API routes

- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`
- `GET /notes`
- `POST /notes`
- `PUT /notes/:id`
- `DELETE /notes/:id`

Enjoy your cute productivity app! 🌸✨
