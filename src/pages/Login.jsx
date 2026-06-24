import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import {
  ShieldCheck,
  Sparkles,
  Brain,
  Target,
  Flame,
  BarChart3,
} from "lucide-react";

function clearOldWorkspace() {
  localStorage.removeItem("goals");
  localStorage.removeItem("dailyPlans");
  localStorage.removeItem("longGoals");
  localStorage.removeItem("notifications");
  localStorage.removeItem("aiMessage");
  localStorage.removeItem("activePage");
  localStorage.removeItem("focusTaskId");
  localStorage.removeItem("focusStats");
  localStorage.removeItem("focusSecondsLeft");
}

function Login({ setUser }) {
  async function handleLogin() {
    try {
      const result = await signInWithPopup(auth, provider);

      const userData = {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };

      const previousUser = JSON.parse(localStorage.getItem("user") || "null");

      if (previousUser && previousUser.uid !== userData.uid) {
        clearOldWorkspace();
      }

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="login-page">
      <section className="login-shell">
        <div className="login-left">
          <div className="login-brand">
            <ShieldCheck size={42} />
            <div>
              <h1>TaskCompanion AI</h1>
              <p>Your AI accountability partner</p>
            </div>
          </div>

          <h2>Turn chaos into a focused daily system.</h2>

          <p className="login-subtitle">
            Plan tasks, build streaks, track long-term goals, analyze behavior,
            and stay accountable with an AI companion.
          </p>

          <button className="google-login-btn" onClick={handleLogin}>
            <span>G</span>
            Continue with Google
          </button>

          <p className="login-note">
            Your workspace syncs securely with Firebase.
          </p>
        </div>

        <div className="login-right">
          <div className="login-glow"></div>

          <div className="login-orbit-card main-orbit">
            <Sparkles size={22} />
            <h3>Jarvis Companion</h3>
            <p>Personalized daily guidance.</p>
          </div>

          <div className="login-feature-grid">
            <div>
              <Brain size={22} />
              <b>AI Planner</b>
              <span>Smart task breakdown</span>
            </div>

            <div>
              <Target size={22} />
              <b>Focus Mode</b>
              <span>Minimal deep work timer</span>
            </div>

            <div>
              <Flame size={22} />
              <b>Streaks</b>
              <span>Daily discipline tracking</span>
            </div>

            <div>
              <BarChart3 size={22} />
              <b>Analytics</b>
              <span>Behavior + weekly reports</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;