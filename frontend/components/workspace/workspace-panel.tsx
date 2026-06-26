export function WorkspacePanel() {
  return (
    <section className="panel workspace">
      <header className="workspace-header">
        <h1>Supervisor Workspace</h1>
        <button type="button">Start Run</button>
      </header>
      <div className="workspace-body">
        <p>Prompt input, execution logs, and streamed outputs will appear here.</p>
      </div>
    </section>
  );
}
