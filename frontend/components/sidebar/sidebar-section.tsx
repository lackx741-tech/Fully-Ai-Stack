export function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="sidebar-section">
      <p className="sidebar-title">{title}</p>
      <div>{children}</div>
    </section>
  );
}
