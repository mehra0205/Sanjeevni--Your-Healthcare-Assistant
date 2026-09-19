import { Link } from "react-router-dom";

export default function ServiceCard({ icon, title, text, to, danger = false }) {
  return (
    <Link className={`service-card ${danger ? "danger-card" : ""}`} to={to}>
      <div className="service-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <span>Open service →</span>
    </Link>
  );
}
