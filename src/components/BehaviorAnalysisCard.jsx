import { Brain, Dumbbell, BookOpen, Clock, Moon, Sparkles } from "lucide-react";

function getCategory(title) {
  const text = title.toLowerCase();

  if (text.includes("gym") || text.includes("workout")) return "Fitness";
  if (
    text.includes("dsa") ||
    text.includes("assignment") ||
    text.includes("exam") ||
    text.includes("study") ||
    text.includes("course") ||
    text.includes("ml") ||
    text.includes("dbms")
  ) return "Academics";

  return "General";
}

function getInsight(personality, strongest, weakest) {
  if (personality === "Roast") {
    return `${strongest} is doing fine, but ${weakest} is clearly trying to escape responsibility 💀.`;
  }

  if (personality === "Friendly") {
    return `You are doing well with ${strongest}. Let’s gently improve ${weakest} next.`;
  }

  if (personality === "Meme") {
    return `${strongest}: main character energy. ${weakest}: “kal karenge” energy 😂.`;
  }

  if (personality === "Monk") {
    return `Observe the pattern. Strengthen ${weakest} without guilt, one focused session at a time.`;
  }

  return `Your strongest area is ${strongest}. Your weakest area is ${weakest}. Start tomorrow with ${weakest}.`;
}

function BehaviorAnalysisCard({ personality, goals }) {
  const categories = {};

  goals.forEach((goal) => {
    const category = getCategory(goal.title);

    if (!categories[category]) {
      categories[category] = { total: 0, completed: 0 };
    }

    categories[category].total += 1;

    if (goal.completed) {
      categories[category].completed += 1;
    }
  });

  const categoryStats = Object.entries(categories).map(([name, data]) => ({
    name,
    rate: Math.round((data.completed / data.total) * 100),
  }));

  const strongest =
    categoryStats.length > 0
      ? [...categoryStats].sort((a, b) => b.rate - a.rate)[0]
      : { name: "None", rate: 0 };

  const weakest =
    categoryStats.length > 0
      ? [...categoryStats].sort((a, b) => a.rate - b.rate)[0]
      : { name: "None", rate: 0 };

  return (
    <section className="behavior-card">
      <div className="behavior-header">
        <div>
          <p className="eyebrow">Behavior Analysis Agent</p>
          <h3><Brain size={22} /> Real Pattern Detection</h3>
        </div>

        <div className="behavior-badge">
          <Sparkles size={18} />
          Live Analysis
        </div>
      </div>

      <div className="behavior-grid">
        <div className="behavior-item">
          <Dumbbell size={22} />
          <span>Strongest Area</span>
          <b>{strongest.name}</b>
          <small>{strongest.rate}% completion</small>
        </div>

        <div className="behavior-item">
          <BookOpen size={22} />
          <span>Weakest Area</span>
          <b>{weakest.name}</b>
          <small>{weakest.rate}% completion</small>
        </div>

        <div className="behavior-item">
          <Clock size={22} />
          <span>Peak Productivity</span>
          <b>{strongest.rate >= 70 ? "Today" : "Needs data"}</b>
          <small>Based on completed tasks</small>
        </div>

        <div className="behavior-item">
          <Moon size={22} />
          <span>Risk Zone</span>
          <b>{weakest.name}</b>
          <small>Most delayed category</small>
        </div>
      </div>

      <div className="behavior-insight">
        <h4>AI Recommendation</h4>
        <p>{getInsight(personality, strongest.name, weakest.name)}</p>
      </div>
    </section>
  );
}

export default BehaviorAnalysisCard;