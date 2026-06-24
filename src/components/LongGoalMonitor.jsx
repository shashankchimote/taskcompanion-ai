import { Compass } from "lucide-react";

function LongGoalMonitor({ longGoals }) {
  const activeGoal = longGoals.find((goal) => !goal.archived);

  if (!activeGoal) return null;

  const completed = activeGoal.items.filter((item) => item.completed).length;
  const total = activeGoal.items.length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section className="long-monitor">
      <div>
        <p className="eyebrow">Long Term Goal</p>
        <h3>
          <Compass size={20} /> {activeGoal.title}
        </h3>
        <span>
          {completed}/{total} topics completed
        </span>
      </div>

      <div className="curve-meter">
        <div
          className="curve-fill"
          style={{ transform: `rotate(${progress * 1.8 - 90}deg)` }}
        ></div>
        <b>{progress}%</b>
      </div>
    </section>
  );
}

export default LongGoalMonitor;