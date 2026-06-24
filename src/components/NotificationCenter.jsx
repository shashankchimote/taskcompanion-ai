import { Bell, X, CheckCheck, Trash2 } from "lucide-react";

function NotificationCenter({
  notifications,
  notificationOpen,
  setNotificationOpen,
  markNotificationsRead,
  clearNotifications,
}) {
  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <div className="notification-wrapper">
      <button
        className="notification-bell"
        onClick={() => {
          setNotificationOpen(!notificationOpen);
          markNotificationsRead();
        }}
      >
        <Bell size={22} />
        {unreadCount > 0 && <span>{unreadCount}</span>}
      </button>

      {notificationOpen && (
        <div className="notification-panel">
          <div className="notification-head">
            <div>
              <h3>Notifications</h3>
              <p>{notifications.length} updates</p>
            </div>

            <div className="notification-actions">
              <button onClick={markNotificationsRead}>
                <CheckCheck size={16} />
              </button>

              <button onClick={clearNotifications}>
                <Trash2 size={16} />
              </button>

              <button onClick={() => setNotificationOpen(false)}>
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <p className="empty-notifications">No notifications yet.</p>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className={`notification-item ${item.read ? "read" : "unread"}`}
                >
                  <b>{item.title}</b>
                  <p>{item.message}</p>
                  <span>{item.time}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationCenter;