
import StreakCard from "../components/StreakCard";
import ReflectionCard from "../components/ReflectionCard";

function Habits({ personality, completedCount, goals, progress }) {
  return (
    <main className="main">
      <header className="topbar">
        <div>
          <h2>Habits 🔥</h2>
          <p>Track streaks, consistency, and daily reflection.</p>
        </div>
      </header>

      <StreakCard personality={personality} progress={progress} />

      <ReflectionCard
        personality={personality}
        completedCount={completedCount}
        totalGoals={goals.length}
        progress={progress}
      />
    </main>
  );
}

export default Habits;