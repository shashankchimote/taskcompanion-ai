import BehaviorAnalysisCard from "../components/BehaviorAnalysisCard";
import WeeklyReportCard from "../components/WeeklyReportCard";
import DisciplineDNACard from "../components/DisciplineDNACard";
import ProductivityHeatmap from "../components/ProductivityHeatmap";
import StatisticsCard from "../components/StatisticsCard";

function Analytics({ personality, goals, progress }) {
  return (
    <main className="main">
      <header className="topbar">
        <div>
          <h2>Analytics 📊</h2>
          <p>Understand your productivity patterns.</p>
        </div>
      </header>

      <StatisticsCard goals={goals} progress={progress} />

      <BehaviorAnalysisCard personality={personality} goals={goals} />

      <WeeklyReportCard personality={personality} progress={progress} />

      <DisciplineDNACard progress={progress} />

      <ProductivityHeatmap />
    </main>
  );
}

export default Analytics;