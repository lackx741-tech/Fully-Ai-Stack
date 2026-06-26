import { InspectorPanel } from "../../components/inspector/inspector-panel";
import { AppSidebar } from "../../components/sidebar/app-sidebar";
import { WorkspacePanel } from "../../components/workspace/workspace-panel";

type Agent = { id: string; name: string; status: string };
type Channel = { id: string; name: string; status: string };
type Run = {
  id: string;
  prompt: string;
  status: string;
  route: string;
  assigned_agent_id: string;
  channel: string;
};
type TelegramState = {
  status: string;
  last_chat_id: string | null;
  last_text: string | null;
  event_count: number;
};

async function loadDashboardData(): Promise<{
  agents: Agent[];
  channels: Channel[];
  runs: Run[];
  telegram: TelegramState;
}> {
  const fallback = {
    agents: [
      { id: "blockchain-builder", name: "Blockchain Builder", status: "idle" },
      { id: "web3-research-orchestrator", name: "Web3 Research Orchestrator", status: "idle" },
      { id: "dev-forge", name: "Dev Forge", status: "idle" },
      { id: "telegram-ops", name: "Telegram Ops Agent", status: "idle" },
    ],
    channels: [
      { id: "telegram", name: "Telegram", status: "connected" },
      { id: "slack", name: "Slack", status: "disconnected" },
      { id: "discord", name: "Discord", status: "disconnected" },
    ],
    runs: [],
    telegram: { status: "connected", last_chat_id: null, last_text: null, event_count: 0 },
  };
  const baseUrl = process.env.API_BASE_URL ?? "http://127.0.0.1:8000";

  try {
    const [agentsResponse, channelsResponse, runsResponse, telegramResponse] = await Promise.all([
      fetch(`${baseUrl}/api/agents`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/channels`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/runs`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/telegram/state`, { cache: "no-store" }),
    ]);

    if (
      !agentsResponse.ok ||
      !channelsResponse.ok ||
      !runsResponse.ok ||
      !telegramResponse.ok
    ) {
      return fallback;
    }

    const [agentsPayload, channelsPayload, runsPayload, telegramPayload] = await Promise.all([
      agentsResponse.json(),
      channelsResponse.json(),
      runsResponse.json(),
      telegramResponse.json(),
    ]);

    return {
      agents: agentsPayload.agents ?? fallback.agents,
      channels: channelsPayload.channels ?? fallback.channels,
      runs: runsPayload.runs ?? fallback.runs,
      telegram: telegramPayload.telegram ?? fallback.telegram,
    };
  } catch {
    return fallback;
  }
}

export default async function DashboardPage() {
  const data = await loadDashboardData();

  return (
    <main className="dashboard-layout">
      <AppSidebar channels={data.channels} agents={data.agents} />
      <WorkspacePanel runs={data.runs} />
      <InspectorPanel telegram={data.telegram} latestRun={data.runs[0] ?? null} />
    </main>
  );
}
