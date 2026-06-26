# Fully-Ai-Stack

Fully-Ai-Stack is an AI-native Ethereum engineering platform scaffold designed for Exa-first research, LangGraph-supervised orchestration, and a MoClaw-inspired dark dashboard UX.

## Vision

- Build and operate specialist Ethereum agents from one control plane.
- Run supervisor-driven multi-agent workflows with observable state.
- Support channel adapters (starting with Telegram) for real-world operations.

## Tech stack

- **Backend**: Python, FastAPI
- **Frontend**: Next.js, TypeScript
- **Architecture**: LangGraph-oriented supervisor + specialist agents
- **Integrations**: Telegram-first channel adapter model

## Repository structure

```text
backend/
  app/
    api/routes/
    core/
    graphs/
    nodes/
    agents/
    tools/
    schemas/
    services/
    workers/
frontend/
  app/dashboard/
  components/
docs/
  architecture/
  agents/
  integrations/
infra/
  docker/
  scripts/
```

## Getting started

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:3000/dashboard`.
