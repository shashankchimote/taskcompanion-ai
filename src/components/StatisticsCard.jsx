import { BarChart3, CheckCircle2, Target, Flame, Trophy, Gauge } from "lucide-react";

function StatisticsCard({ goals, progress }) {
  const totalTasks = goals.length;
  const completedTasks = goals.filter((goal) => goal.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const currentStreak = progress >= 70 ? 7 : 3;
  const longestStreak = 23;
  const disciplineScore = Math.min(100, 50 + currentStreak * 5);

  const stats = [
    {
      icon: Target,
      label: "Total Tasks",
      value: totalTasks,
    },
    {
      icon: CheckCircle2,
      label: "Completed",
      value: completedTasks,
    },
    {
      icon: BarChart3,
      label: "Completion Rate",
      value: `${progress}%`,
    },
    {
      icon: Flame,
      label: "Current Streak",
      value: `${currentStreak} days`,
    },
    {
      icon: Trophy,
      label: "Longest Streak",
      value: `${longestStreak} days`,
    },
    {
      icon: Gauge,
      label: "Discipline Score",
      value: disciplineScore,
    },
  ];

  return (
    <section className="stats-card">
      <div className="stats-header">
        <div>
          <p className="eyebrow">Statistics</p>
          <h3>
            <BarChart3 size={22} /> Productivity Metrics
          </h3>
        </div>

        <div className="stats-badge">
          {pendingTasks} pending
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="stats-item">
              <Icon size={22} />
              <span>{item.label}</span>
              <b>{item.value}</b>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default StatisticsCard;