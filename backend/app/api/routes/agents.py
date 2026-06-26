from fastapi import APIRouter

from app.services.control_plane import list_agents, list_channels

router = APIRouter()


@router.get("/agents")
async def get_agents() -> dict[str, list[dict[str, str]]]:
    return {"agents": [agent.model_dump() for agent in list_agents()]}


@router.get("/channels")
async def get_channels() -> dict[str, list[dict[str, str]]]:
    return {"channels": [channel.model_dump() for channel in list_channels()]}
