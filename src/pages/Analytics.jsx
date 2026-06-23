import BehaviorAnalysisCard from "../components/BehaviorAnalysisCard";
import WeeklyReportCard from "../components/WeeklyReportCard";

function Analytics({ personality, goals, progress }) {
  return (
    <main className="main">
      <header className="topbar">
        <div>
          <h2>Analytics 📊</h2>
          <p>Understand your productivity patterns.</p>
        </div>
      </header>

      <BehaviorAnalysisCard personality={personality} goals={goals} />

      <WeeklyReportCard personality={personality} progress={progress} />
    </main>
  );
}

export default Analytics;