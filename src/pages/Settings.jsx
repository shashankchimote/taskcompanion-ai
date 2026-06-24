import {
  Moon,
  Sun,
  Palette,
  Bell,
  UserRound,
  LogOut,
} from "lucide-react";

import { auth, signOut } from "../firebase";

function Settings({
  personality,
  setPersonality,
  theme,
  setTheme,
  user,
}) {
  const personalities = ["Coach", "Roast", "Friendly", "Meme", "Monk"];

  async function handleLogout() {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <h2>Settings ⚙️</h2>
          <p>Customize TaskCompanion AI for your workflow.</p>
        </div>
      </header>

      <section className="settings-card">
        <div className="settings-section">
          <div className="settings-title">
            <UserRound size={22} />

            <div>
              <h3>Account</h3>
              <p>
                {user?.name || "TaskCompanion User"}
                <br />
                {user?.email || "No email found"}
              </p>
            </div>
          </div>

          <div className="settings-options">
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-title">
            <Palette size={22} />
            <div>
              <h3>Appearance</h3>
              <p>Choose light or dark mode.</p>
            </div>
          </div>

          <div className="settings-options">
            <button
              className={theme === "light" ? "settings-selected" : ""}
              onClick={() => setTheme("light")}
            >
              <Sun size={18} /> Light
            </button>

            <button
              className={theme === "dark" ? "settings-selected" : ""}
              onClick={() => setTheme("dark")}
            >
              <Moon size={18} /> Dark
            </button>
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-title">
            <UserRound size={22} />
            <div>
              <h3>AI Personality</h3>
              <p>Select how TaskCompanion talks to you.</p>
            </div>
          </div>

          <div className="settings-options personality-settings">
            {personalities.map((mode) => (
              <button
                key={mode}
                className={personality === mode ? "settings-selected" : ""}
                onClick={() => setPersonality(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-title">
            <Bell size={22} />
            <div>
              <h3>Notifications</h3>
              <p>
                Notification Center is active. Browser reminders can be added
                later.
              </p>
            </div>
          </div>

          <div className="settings-note">
            Local notifications are saved in your browser storage.
          </div>
        </div>
      </section>
    </main>
  );
}

export default Settings;