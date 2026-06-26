# LangGraph Workflow

The platform is structured for a supervisor-first LangGraph pipeline.

## Supervisor flow

1. `router_node` classifies the request.
2. `planner_node` creates execution steps.
3. `context_node` merges memory, docs, and Exa-first research context.
4. Specialist nodes run in sequence or parallel:
   - research
   - builder
   - validator
   - critic (optional)
5. `response_node` formats results for UI and channel adapters.

## State model

A shared run state should capture route, plan, findings, tool calls, validation, and final artifacts for full traceability.
