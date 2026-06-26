from fastapi import APIRouter

from app.schemas.control_plane import StartRunRequest
from app.services.control_plane import create_run, list_runs

router = APIRouter()


@router.get("/runs")
async def get_runs() -> dict[str, list[dict[str, str]]]:
    return {"runs": [run.model_dump(mode="json") for run in list_runs()]}


@router.post("/runs")
async def start_run(payload: StartRunRequest) -> dict[str, object]:
    run = create_run(payload)
    return {"run": run.model_dump(mode="json")}
