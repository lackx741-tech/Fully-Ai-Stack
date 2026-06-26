type RunRecord = {
  id: string;
  prompt: string;
  status: string;
  assigned_agent_id: string;
  channel: string;
};

export function WorkspacePanel({ runs }: { runs: RunRecord[] }) {
  const recentRuns = runs.slice(0, 3);

  return (
    <section className="panel workspace">
      <header className="workspace-header">
        <h1>Supervisor Workspace</h1>
        <button type="button">Start Run</button>
      </header>
      <div className="workspace-body">
        {recentRuns.length === 0 ? (
          <p>Prompt input, execution logs, and streamed outputs will appear here.</p>
        ) : (
          <ul className="run-list">
            {recentRuns.map((run) => (
              <li key={run.id} className="run-item">
                <p className="run-item-prompt">{run.prompt}</p>
                <small>
                  {run.channel} • {run.assigned_agent_id} • {run.status}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
