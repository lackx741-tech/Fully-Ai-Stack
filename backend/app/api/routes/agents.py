from fastapi import APIRouter

router = APIRouter()


@router.get("/agents")
async def list_agents() -> dict[str, list[dict[str, str]]]:
    return {
        "agents": [
            {"id": "blockchain-builder", "name": "Blockchain Builder", "status": "idle"},
            {
                "id": "web3-research-orchestrator",
                "name": "Web3 Research Orchestrator",
                "status": "idle",
            },
            {"id": "dev-forge", "name": "Dev Forge", "status": "idle"},
            {"id": "telegram-ops", "name": "Telegram Ops Agent", "status": "idle"},
        ]
    }
