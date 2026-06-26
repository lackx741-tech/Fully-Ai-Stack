import { InspectorPanel } from "../../components/inspector/inspector-panel";
import { AppSidebar } from "../../components/sidebar/app-sidebar";
import { WorkspacePanel } from "../../components/workspace/workspace-panel";

export default function DashboardPage() {
  return (
    <main className="dashboard-layout">
      <AppSidebar />
      <WorkspacePanel />
      <InspectorPanel />
    </main>
  );
}
