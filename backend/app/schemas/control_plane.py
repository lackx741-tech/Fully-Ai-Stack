from datetime import UTC, datetime

from pydantic import BaseModel, Field


class AgentStatus(BaseModel):
    id: str
    name: str
    role: str
    status: str


class ChannelStatus(BaseModel):
    id: str
    name: str
    status: str


class RunRecord(BaseModel):
    id: str
    prompt: str
    channel: str
    route: str
    assigned_agent_id: str
    status: str
    output: str | None = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))


class StartRunRequest(BaseModel):
    prompt: str
    channel: str = "dashboard"
    requested_agent_id: str | None = None


class TelegramWebhookEvent(BaseModel):
    chat_id: str
    text: str
    username: str | None = None


class TelegramState(BaseModel):
    status: str
    last_chat_id: str | None = None
    last_text: str | None = None
    event_count: int = 0
