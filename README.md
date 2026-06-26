# Fully-Ai-Stack

Fully-Ai-Stack is an AI-native Ethereum engineering platform scaffold. It combines a FastAPI backend, a Next.js dashboard, and architecture notes for a supervisor-led multi-agent workflow with Telegram as the first channel adapter.

## Current status

This repository is currently a working scaffold:

- The **backend** exposes control-plane and Telegram-oriented API routes.
- The **frontend** renders a dashboard that reads agent, channel, run, and Telegram state from the backend.
- The **docs** describe the intended architecture, agents, and integration model.
- The **infra** area is still a placeholder for container and environment assets.

## Tech stack

- **Backend:** Python, FastAPI, Pydantic Settings
- **Frontend:** Next.js 15, React 18, TypeScript
- **Architecture direction:** LangGraph-style supervisor plus specialist agents
- **Initial integration:** Telegram webhook and state adapter

## Repository structure

```text
backend/
  app/
    api/routes/          FastAPI routes for health, agents, runs, and Telegram
    core/                application settings
    schemas/             request and response models
    services/            in-memory control-plane logic
    agents/              agent package placeholder
    graphs/              LangGraph package placeholder
    nodes/               workflow node package placeholder
    tools/               tool package placeholder
    workers/             worker package placeholder
frontend/
  app/                   Next.js app routes
  components/            dashboard UI panels and sidebar pieces
docs/
  architecture/          system and workflow design notes
  agents/                specialist-agent responsibilities
  integrations/          channel integration notes
infra/
  docker/                containerization placeholder
```

## What is implemented today

### Backend API

The backend entrypoint is `backend/app/main.py` and mounts these routes under `/api`:

- `GET /api/health` — basic health check
- `GET /api/agents` — returns known specialist agents
- `GET /api/channels` — returns known channel adapters
- `GET /api/runs` — returns the current run list
- `POST /api/runs` — creates a new run from a prompt
- `GET /api/telegram/state` — returns Telegram adapter state
- `POST /api/telegram/webhook` — ingests Telegram messages and creates runs

Current control-plane behavior is in-memory and lives in `backend/app/services/control_plane.py`. It includes:

- a static agent registry
- a static channel registry
- simple prompt routing
- in-memory run creation and status advancement
- Telegram event ingestion and lightweight state tracking

### Frontend dashboard

The main UI lives at `frontend/app/dashboard/page.tsx`.

It loads data from the backend and renders:

- **Sidebar** for computers, channels, and agents
- **Workspace** for recent run activity
- **Inspector** for current Telegram and run state

If the backend is unavailable, the dashboard falls back to local placeholder data so the UI still renders.

### Architecture and product docs

Repository documentation already includes:

- `docs/architecture/system-overview.md`
- `docs/architecture/langgraph-workflow.md`
- `docs/agents/agent-responsibilities.md`
- `docs/integrations/telegram.md`

These files describe the intended supervision model, specialist responsibilities, and Telegram-first operating pattern.

## Local development setup

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend default URL:

- `http://127.0.0.1:8000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend default URL:

- `http://localhost:3000`
- Dashboard: `http://localhost:3000/dashboard`

### Frontend environment note

The dashboard reads `API_BASE_URL` and falls back to `http://127.0.0.1:8000` when the variable is not set.

## Validation commands

The following commands are currently valid in this repository:

### Frontend

```bash
cd frontend
npm install
npm run typecheck
npm run lint
npm run build
```

### Backend

```bash
# run from the repository root
python -m pip install -r backend/requirements.txt
python -m compileall backend/app
```

## Gaps before the platform is production-ready

The scaffold is clean and functional, but several pieces are still placeholders:

- no persistent database or run store
- no real LangGraph graph implementation yet
- no real tool execution or agent runtime
- no authentication or authorization
- no environment example files
- no Docker Compose or full local orchestration
- no automated backend test suite
- no CI workflow for lint, typecheck, build, and backend validation
- no deployed webhook, secret management, or Telegram bot configuration guide

## Recommended next final setup

The recommended next steps are documented in:

- `docs/final-setup-checklist.md`

In short, the highest-value final setup work is:

1. add environment templates for backend, frontend, and Telegram
2. add persistent storage for runs, agents, and channel events
3. replace in-memory routing with the real supervisor/graph execution flow
4. wire frontend actions to real backend mutations
5. add Docker Compose and CI validation
6. harden security, secrets, auth, and deployment settings

## Reference files

- Root overview: `README.md`
- System architecture: `docs/architecture/system-overview.md`
- Workflow design: `docs/architecture/langgraph-workflow.md`
- Agent roles: `docs/agents/agent-responsibilities.md`
- Telegram notes: `docs/integrations/telegram.md`
- Final setup checklist: `docs/final-setup-checklist.md`
