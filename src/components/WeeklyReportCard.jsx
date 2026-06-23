import { BarChart3, CalendarDays, Trophy, Flame, Sparkles } from "lucide-react";

function getWeeklyInsight(personality) {
  if (personality === "Roast") {
    return "Gym discipline looks solid. Assignments, however, are playing hide and seek with responsibility 💀.";
  }

  if (personality === "Friendly") {
    return "You showed up well this week. Keep your gym consistency and gently improve your academic rhythm.";
  }

  if (personality === "Meme") {
    return "This week’s plot: gym was the hero, assignments were the villain arc 😂.";
  }

  if (personality === "Monk") {
    return "The week shows effort and imbalance. Restore harmony by placing difficult work earlier in the day.";
  }

  return "Strong week overall. Fitness consistency is high, but academic work should be moved earlier in the day.";
}

function WeeklyReportCard({ personality, progress }) {
  const completedThisWeek = 42;
  const consistency = Math.max(68, progress);
  const streak = progress >= 70 ? 9 : 6;
  const disciplineScore = Math.min(100, 72 + Math.floor(progress / 5));

  const heatmap = [
    { day: "Mon", value: 70 },
    { day: "Tue", value: 92 },
    { day: "Wed", value: 45 },
    { day: "Thu", value: 82 },
    { day: "Fri", value: 76 },
    { day: "Sat", value: 30 },
    { day: "Sun", value: 58 },
  ];

  return (
    <section className="weekly-card">
      <div className="weekly-header">
        <div>
          <p className="eyebrow">Weekly Report Agent</p>
          <h3><BarChart3 size={22} /> Productivity Wrapped</h3>
        </div>

        <div className="weekly-badge">
          <CalendarDays size={18} />
          Week 27
        </div>
      </div>

      <div className="weekly-stats">
        <div>
          <span>Tasks Completed</span>
          <b>{completedThisWeek}</b>
        </div>

        <div>
          <span>Consistency</span>
          <b>{consistency}%</b>
        </div>

        <div>
          <span>Streak</span>
          <b>{streak} days</b>
        </div>

        <div>
          <span>Discipline Score</span>
          <b>{disciplineScore}</b>
        </div>
      </div>

      <div className="weekly-split">
        <div className="weekly-panel">
          <h4><Trophy size={18} /> Highlights</h4>
          <p>💪 Strongest Area: Fitness</p>
          <p>📚 Weakest Area: Academics</p>
          <p>🏆 Most Productive Day: Tuesday</p>
          <p>⚠ Most Delayed Category: Study Work</p>
        </div>

        <div className="weekly-panel">
          <h4><Flame size={18} /> Productivity Heatmap</h4>

          <div className="heatmap-list">
            {heatmap.map((item) => (
              <div key={item.day} className="heatmap-row">
                <span>{item.day}</span>
                <div className="heatmap-bar">
                  <div style={{ width: `${item.value}%` }}></div>
                </div>
                <b>{item.value}%</b>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="weekly-insight">
        <h4><Sparkles size={18} /> AI Weekly Insight</h4>
        <p>{getWeeklyInsight(personality)}</p>
      </div>
    </section>
  );
}

export default WeeklyReportCard;