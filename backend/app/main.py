from fastapi import FastAPI

from app.api.routes import agents, health, runs
from app.core.config import settings

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Exa-first, LangGraph-supervised Ethereum engineering backend.",
)

app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(agents.router, prefix="/api", tags=["agents"])
app.include_router(runs.router, prefix="/api", tags=["runs"])


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "Fully AI Stack backend is running."}
