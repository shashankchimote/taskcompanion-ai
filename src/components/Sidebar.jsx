import {
  Home,
  Calendar,
  Swords,
  Target,
  BarChart3,
  Trophy,
  Settings,
  ShieldCheck,
  ChevronRight,
  Compass,
  Clock,
  Moon,
  Sun,
} from "lucide-react";

function Sidebar({
  activePage,
  setActivePage,
  personalities,
  personality,
  setPersonality,
  theme,
  setTheme,
}) {
  const navItems = [
    ["Dashboard", Home],
    ["AI Planner", Calendar],
    ["Focus Mode", Clock],
    ["Long Term Goals", Compass],
    ["Challenge Mode", Swords],
    ["Habits", Target],
    ["Analytics", BarChart3],
    ["Achievements", Trophy],
    ["Settings", Settings],
  ];

  const current = personalities[personality];

  return (
    <aside className="sidebar">
      <div className="brand">
        <ShieldCheck size={38} />
        <h1>TaskCompanion AI</h1>
        <p>Your AI accountability partner</p>
      </div>

      <nav>
        {navItems.map(([name, Icon]) => (
          <button
            key={name}
            className={`nav ${activePage === name ? "active" : ""}`}
            onClick={() => setActivePage(name)}
          >
            <Icon size={20} /> {name}
          </button>
        ))}
      </nav>

      <div className="theme-toggle">
        <button
          className={theme === "light" ? "selected-theme" : ""}
          onClick={() => setTheme("light")}
        >
          <Sun size={16} /> Light
        </button>

        <button
          className={theme === "dark" ? "selected-theme" : ""}
          onClick={() => setTheme("dark")}
        >
          <Moon size={16} /> Dark
        </button>
      </div>

      <div className="personality-card">
        <div className="personality-head">
          <span>🎭</span>
          <div>
            <p>Personality Mode</p>
            <h4>{personality} Mode</h4>
          </div>
          <ChevronRight size={18} />
        </div>

        <div className="divider"></div>

        <div className="personality-options">
          {Object.keys(personalities).map((mode) => (
            <button
              key={mode}
              className={`personality-option ${
                personality === mode ? "selected-personality" : ""
              }`}
              onClick={() => setPersonality(mode)}
            >
              {personalities[mode].emoji} {mode}
            </button>
          ))}
        </div>

        <div className="helmet">{current.emoji}</div>
        <p className="quote">“{current.quote}”</p>
      </div>
    </aside>
  );
}

export default Sidebar;