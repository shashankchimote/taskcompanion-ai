import { Calendar, Flame, Clock3, Target } from "lucide-react";

function DaySummary({
  summaryOpen,
  setSummaryOpen,
  completedCount,
  totalGoals,
  progress,
  longGoals,
}) {
  if (!summaryOpen) return null;

  const activeGoal = longGoals.find((goal) => !goal.archived);

  const longProgress =
    activeGoal && activeGoal.items.length > 0
      ? Math.round(
          (activeGoal.items.filter((item) => item.completed).length /
            activeGoal.items.length) *
            100
        )
      : 0;

  let focusStats = { sessions: 0, minutes: 0 };

  try {
    focusStats = JSON.parse(localStorage.getItem("focusStats")) || {
      sessions: 0,
      minutes: 0,
    };
  } catch {
    focusStats = { sessions: 0, minutes: 0 };
  }

  return (
    <div className="summary-overlay" onClick={() => setSummaryOpen(false)}>
      <div className="summary-panel" onClick={(e) => e.stopPropagation()}>
        <div className="summary-head">
          <h2>
            <Calendar size={22} />
            Today Summary
          </h2>

          <button onClick={() => setSummaryOpen(false)}>Close</button>
        </div>

        <div className="summary-grid">
          <div>
            <Target size={24} />
            <span>Goals</span>
            <b>
              {completedCount}/{totalGoals}
            </b>
          </div>

          <div>
            <Flame size={24} />
            <span>Progress</span>
            <b>{progress}%</b>
          </div>

          <div>
            <Clock3 size={24} />
            <span>Focus Time</span>
            <b>{focusStats.minutes} min</b>
          </div>

          <div>
            <Calendar size={24} />
            <span>Long Goal</span>
            <b>{longProgress}%</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DaySummary;