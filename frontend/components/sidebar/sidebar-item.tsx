export function SidebarItem({ name, status }: { name: string; status: string }) {
  return (
    <div className="sidebar-item">
      <span>{name}</span>
      <small>{status}</small>
    </div>
  );
}
