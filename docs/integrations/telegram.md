# Telegram Integration

Telegram acts as a channel adapter for inbound user requests and outbound agent responses.

## Integration model

- Telegram webhook receives user events.
- Backend maps chat/session context to run state.
- Supervisor selects one or more specialist agents.
- Response payload is returned through Telegram Bot API.

## Telegram-focused agent support

`Telegram Ops Agent` is responsible for moderation-friendly formatting, conversational continuity, and routing to builder or research specialists when deeper execution is needed.

## Current API slice

- `POST /api/telegram/webhook` accepts `chat_id`, `text`, and optional `username`.
- `GET /api/telegram/state` returns channel health and latest message metadata.
- Telegram events are converted into supervisor run records and surfaced by `GET /api/runs`.
