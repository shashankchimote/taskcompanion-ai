import { Calendar } from "lucide-react";
import NotificationCenter from "./NotificationCenter";

function Topbar({
  user,
  completedCount,
  totalGoals,
  notifications,
  notificationOpen,
  setNotificationOpen,
  markNotificationsRead,
  clearNotifications,
  setSummaryOpen,
}) {
  const firstName = user?.name?.split(" ")[0] || "User";

  return (
    <header className="topbar">
      <div>
        <h2>Good evening, {firstName} 👋</h2>
        <p>
          {completedCount} of {totalGoals} goals completed today.
        </p>
      </div>

      <div className="top-actions">
        <NotificationCenter
          notifications={notifications}
          notificationOpen={notificationOpen}
          setNotificationOpen={setNotificationOpen}
          markNotificationsRead={markNotificationsRead}
          clearNotifications={clearNotifications}
        />

        <button className="date-btn" onClick={() => setSummaryOpen(true)}>
          <Calendar size={17} /> Today
        </button>
      </div>
    </header>
  );
}

export default Topbar;