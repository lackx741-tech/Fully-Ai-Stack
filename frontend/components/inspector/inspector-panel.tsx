type TelegramState = {
  status: string;
  last_chat_id: string | null;
  last_text: string | null;
  event_count: number;
};

type RunSummary = {
  route: string;
  assigned_agent_id: string;
  status: string;
};

export function InspectorPanel({
  telegram,
  latestRun,
}: {
  telegram: TelegramState;
  latestRun: RunSummary | null;
}) {
  return (
    <aside className="panel inspector">
      <h2>Inspector</h2>
      <ul>
        <li>Current node: {latestRun ? "response_node" : "router_node"}</li>
        <li>Active agent: {latestRun?.assigned_agent_id ?? "Web3 Research Orchestrator"}</li>
        <li>Channel: Telegram ({telegram.status})</li>
        <li>Status: {latestRun?.status ?? "Waiting for run"}</li>
        <li>Last route: {latestRun?.route ?? "N/A"}</li>
        <li>Telegram events: {telegram.event_count}</li>
      </ul>
    </aside>
  );
}
