import { Bell, Calendar } from "lucide-react";

function Topbar({ completedCount, totalGoals }) {
  return (
    <header className="topbar">
      <div>
        <h2>Good evening, Shashank 👋</h2>
        <p>{completedCount} of {totalGoals} goals completed today.</p>
      </div>

      <div className="top-actions">
        <Bell size={22} />
        <button className="date-btn">
          <Calendar size={17} /> Today
        </button>
      </div>
    </header>
  );
}

export default Topbar;