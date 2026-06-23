import AchievementCard from "../components/AchievementCard";

function Achievements({ progress }) {
  return (
    <main className="main">
      <header className="topbar">
        <div>
          <h2>Achievements 🏆</h2>
          <p>Your badge collection and discipline milestones.</p>
        </div>
      </header>

      <AchievementCard progress={progress} />
    </main>
  );
}

export default Achievements;