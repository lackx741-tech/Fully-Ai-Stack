from fastapi import APIRouter

from app.schemas.control_plane import TelegramWebhookEvent
from app.services.control_plane import get_telegram_state, ingest_telegram_event

router = APIRouter()


@router.get("/telegram/state")
async def telegram_state() -> dict[str, object]:
    state = get_telegram_state()
    return {"telegram": state.model_dump(mode="json")}


@router.post("/telegram/webhook")
async def telegram_webhook(payload: TelegramWebhookEvent) -> dict[str, object]:
    run = ingest_telegram_event(payload)
    state = get_telegram_state()
    return {
        "status": "accepted",
        "telegram": state.model_dump(mode="json"),
        "run": run.model_dump(mode="json"),
    }
