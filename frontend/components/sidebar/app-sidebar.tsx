import { SidebarSection } from "./sidebar-section";
import { SidebarItem } from "./sidebar-item";

export function AppSidebar() {
  return (
    <aside className="panel sidebar">
      <div className="brand">Fully AI Stack</div>
      <SidebarSection title="COMPUTERS">
        <SidebarItem name="AI Cloud Computer" status="ready" />
        <SidebarItem name="Local Runner" status="idle" />
      </SidebarSection>
      <SidebarSection title="CHANNELS">
        <SidebarItem name="Telegram" status="connected" />
        <SidebarItem name="Slack" status="disconnected" />
        <SidebarItem name="Discord" status="disconnected" />
      </SidebarSection>
      <SidebarSection title="AGENTS">
        <SidebarItem name="Blockchain Builder" status="idle" />
        <SidebarItem name="Web3 Research Orchestrator" status="idle" />
        <SidebarItem name="Dev Forge" status="idle" />
        <SidebarItem name="Telegram Ops Agent" status="idle" />
      </SidebarSection>
    </aside>
  );
}
