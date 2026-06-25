import {
  Bot,
  Flame,
  Dumbbell,
  BookOpen,
  Sparkles,
} from "lucide-react";

function getJarvisTone(personality, progress) {
  if (personality === "Roast") {
    return progress >= 70
      ? "You somehow kept the streak alive. Historians may call this discipline."
      : "The streak is looking nervous. Even your pending tasks are judging you.";
  }

  if (personality === "Friendly") {
    return progress >= 70
      ? "You did well today. Keep this rhythm gently and steadily."
      : "It is okay. Start with one small task and rebuild momentum.";
  }

  if (personality === "Meme") {
    return progress >= 70
      ? "Bro survived another productivity arc 😂."
      : "Bro is entering the procrastination cinematic universe 💀.";
  }

  if (personality === "Monk") {
    return progress >= 70
      ? "Progress grows from repeated acts of focus."
      : "Return to the present. One task is enough to begin again.";
  }

  return progress >= 70
    ? "Excellent work. Protect your streak and attack your hardest task early tomorrow."
    : "Your streak needs protection. Start with the smallest possible task now.";
}

function getStrongestArea(goals) {
  const fitnessTasks = goals.filter(
    (goal) =>
      goal.title.toLowerCase().includes("gym") ||
      goal.title.toLowerCase().includes("workout")
  );

  const academicTasks = goals.filter(
    (goal) =>
      goal.title.toLowerCase().includes("dsa") ||
      goal.title.toLowerCase().includes("assignment") ||
      goal.title.toLowerCase().includes("exam") ||
      goal.title.toLowerCase().includes("ml") ||
      goal.title.toLowerCase().includes("course") ||
      goal.title.toLowerCase().includes("study")
  );

  const fitnessCompleted = fitnessTasks.filter(
    (goal) => goal.completed
  ).length;

  const academicCompleted = academicTasks.filter(
    (goal) => goal.completed
  ).length;

  if (fitnessCompleted >= academicCompleted) return "Fitness";

  return "Academics";
}

function getWeakestArea(goals) {
  const fitnessTasks = goals.filter(
    (goal) =>
      goal.title.toLowerCase().includes("gym") ||
      goal.title.toLowerCase().includes("workout")
  );

  const academicTasks = goals.filter(
    (goal) =>
      goal.title.toLowerCase().includes("dsa") ||
      goal.title.toLowerCase().includes("assignment") ||
      goal.title.toLowerCase().includes("exam") ||
      goal.title.toLowerCase().includes("ml") ||
      goal.title.toLowerCase().includes("course") ||
      goal.title.toLowerCase().includes("study")
  );

  const fitnessRate =
    fitnessTasks.length === 0
      ? 0
      : Math.round(
          (fitnessTasks.filter((goal) => goal.completed).length /
            fitnessTasks.length) *
            100
        );

  const academicRate =
    academicTasks.length === 0
      ? 0
      : Math.round(
          (academicTasks.filter((goal) => goal.completed).length /
            academicTasks.length) *
            100
        );

  if (academicRate <= fitnessRate) return "Academics";

  return "Fitness";
}

function JarvisCard({
  user,
  personality,
  goals,
  completedCount,
  progress,
}) {
  const firstName = user?.name?.split(" ")[0] || "User";

  const strongestArea = getStrongestArea(goals);
  const weakestArea = getWeakestArea(goals);
  const streakStatus = progress >= 70 ? "protected" : "at risk";

  return (
    <section className="jarvis-v2-card">
      <div className="jarvis-v2-head">
        <div>
          <p className="eyebrow">Jarvis Companion</p>

          <h2>
            <Bot size={30} /> Good evening, {firstName}.
          </h2>
        </div>

        <div className="jarvis-mode">
          <Sparkles size={17} />
          {personality} Mode
        </div>
      </div>

      <p className="jarvis-main-text">
        You completed <b>{completedCount}</b> out of{" "}
        <b>{goals.length}</b> tasks today.
        Your productivity score is <b>{progress}%</b>.
      </p>

      <div className="jarvis-insight-grid">
        <div>
          <Flame size={20} />
          <span>Streak</span>
          <b>{streakStatus}</b>
        </div>

        <div>
          <Dumbbell size={20} />
          <span>Strongest Area</span>
          <b>{strongestArea}</b>
        </div>

        <div>
          <BookOpen size={20} />
          <span>Needs Attention</span>
          <b>{weakestArea}</b>
        </div>
      </div>

      <div className="jarvis-recommendation">
        <h4>Recommendation</h4>
        <p>{getJarvisTone(personality, progress)}</p>
      </div>

      <p className="jarvis-signature">— TaskCompanion AI</p>
    </section>
  );
}

export default JarvisCard;