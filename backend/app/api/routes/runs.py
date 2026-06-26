from fastapi import APIRouter

router = APIRouter()


@router.get("/runs")
async def list_runs() -> dict[str, list[dict[str, str]]]:
    return {
        "runs": [
            {
                "id": "example-run-001",
                "agent_id": "web3-research-orchestrator",
                "status": "queued",
            }
        ]
    }
