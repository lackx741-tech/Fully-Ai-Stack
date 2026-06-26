from datetime import UTC, datetime
from uuid import uuid4

from app.schemas.control_plane import (
    AgentStatus,
    ChannelStatus,
    RunRecord,
    StartRunRequest,
    TelegramState,
    TelegramWebhookEvent,
)

_AGENTS: list[AgentStatus] = [
    AgentStatus(
        id="blockchain-builder",
        name="Blockchain Builder",
        role="solidity-delivery",
        status="idle",
    ),
    AgentStatus(
        id="web3-research-orchestrator",
        name="Web3 Research Orchestrator",
        role="exa-first-research",
        status="idle",
    ),
    AgentStatus(
        id="dev-forge",
        name="Dev Forge",
        role="integration-delivery",
        status="idle",
    ),
    AgentStatus(
        id="telegram-ops",
        name="Telegram Ops Agent",
        role="channel-operations",
        status="idle",
    ),
]

_CHANNELS: list[ChannelStatus] = [
    ChannelStatus(id="telegram", name="Telegram", status="connected"),
    ChannelStatus(id="slack", name="Slack", status="disconnected"),
    ChannelStatus(id="discord", name="Discord", status="disconnected"),
]

_RUNS: list[RunRecord] = [
    RunRecord(
        id="example-run-001",
        prompt="Summarize latest Ethereum L2 upgrade notes.",
        channel="dashboard",
        route="research",
        assigned_agent_id="web3-research-orchestrator",
        status="completed",
        output="Supervisor routed to research specialist and produced a concise summary.",
        created_at=datetime(2026, 1, 1, tzinfo=UTC),
    )
]

_TELEGRAM_STATE = TelegramState(status="connected")


def list_agents() -> list[AgentStatus]:
    return _AGENTS


def list_channels() -> list[ChannelStatus]:
    return _CHANNELS


def list_runs() -> list[RunRecord]:
    return sorted(_RUNS, key=lambda run: run.created_at, reverse=True)


def get_telegram_state() -> TelegramState:
    return _TELEGRAM_STATE


def create_run(request: StartRunRequest) -> RunRecord:
    route = _route_prompt(request.prompt)
    assigned_agent_id = request.requested_agent_id or _agent_for_route(route)
    run = RunRecord(
        id=f"run-{uuid4().hex[:8]}",
        prompt=request.prompt,
        channel=request.channel,
        route=route,
        assigned_agent_id=assigned_agent_id,
        status="completed",
        output=f"Supervisor routed to {assigned_agent_id} via {route} path.",
    )
    _RUNS.append(run)
    return run


def ingest_telegram_event(event: TelegramWebhookEvent) -> RunRecord:
    _TELEGRAM_STATE.last_chat_id = event.chat_id
    _TELEGRAM_STATE.last_text = event.text
    _TELEGRAM_STATE.event_count += 1
    run_request = StartRunRequest(prompt=event.text, channel="telegram")
    return create_run(run_request)


def _route_prompt(prompt: str) -> str:
    lowered = prompt.lower()
    if any(keyword in lowered for keyword in ("research", "compare", "explain")):
        return "research"
    if any(keyword in lowered for keyword in ("build", "deploy", "contract", "solidity")):
        return "builder"
    if "telegram" in lowered:
        return "telegram-ops"
    return "delivery"


def _agent_for_route(route: str) -> str:
    route_map = {
        "research": "web3-research-orchestrator",
        "builder": "blockchain-builder",
        "telegram-ops": "telegram-ops",
        "delivery": "dev-forge",
    }
    return route_map.get(route, "dev-forge")
