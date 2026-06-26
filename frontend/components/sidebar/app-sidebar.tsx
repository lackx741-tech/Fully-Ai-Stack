import { SidebarSection } from "./sidebar-section";
import { SidebarItem } from "./sidebar-item";

type SidebarResource = {
  id: string;
  name: string;
  status: string;
};

export function AppSidebar({
  channels,
  agents,
}: {
  channels: SidebarResource[];
  agents: SidebarResource[];
}) {
  return (
    <aside className="panel sidebar">
      <div className="brand">Fully AI Stack</div>
      <SidebarSection title="COMPUTERS">
        <SidebarItem name="AI Cloud Computer" status="ready" />
        <SidebarItem name="Local Runner" status="idle" />
      </SidebarSection>
      <SidebarSection title="CHANNELS">
        {channels.map((channel) => (
          <SidebarItem key={channel.id} name={channel.name} status={channel.status} />
        ))}
      </SidebarSection>
      <SidebarSection title="AGENTS">
        {agents.map((agent) => (
          <SidebarItem key={agent.id} name={agent.name} status={agent.status} />
        ))}
      </SidebarSection>
    </aside>
  );
}
