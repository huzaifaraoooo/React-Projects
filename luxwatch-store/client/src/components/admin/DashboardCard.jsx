function DashboardCard({ icon, title, value, note }) {
  return (
    <article className="dashboard-card">
      <div className="dashboard-card-icon">{icon}</div>

      <div>
        <span>{title}</span>
        <h3>{value}</h3>
        <p>{note}</p>
      </div>
    </article>
  );
}

export default DashboardCard;