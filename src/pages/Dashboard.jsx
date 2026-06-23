import { useState } from "react";
import { generateTasks } from "../generateTasks";
import { Target, Code2, BookOpen, Dumbbell, FileText, ChevronRight } from "lucide-react";

import Topbar from "../components/Topbar";
import ProgressCard from "../components/ProgressCard";
import AIPlannerCard from "../components/AIPlannerCard";
import GoalPoster from "../components/GoalPoster";
import BottomQuote from "../components/BottomQuote";
import ReflectionCard from "../components/ReflectionCard";
import StreakCard from "../components/StreakCard";
import BehaviorAnalysisCard from "../components/BehaviorAnalysisCard";
import WeeklyReportCard from "../components/WeeklyReportCard";
import AchievementCard from "../components/AchievementCard";

function chooseIcon(title) {
  const text = title.toLowerCase();

  if (text.includes("gym") || text.includes("workout")) return Dumbbell;
  if (text.includes("ml") || text.includes("course") || text.includes("study")) return BookOpen;
  if (text.includes("paper") || text.includes("report") || text.includes("assignment")) return FileText;
  if (text.includes("code") || text.includes("dsa") || text.includes("leetcode")) return Code2;

  return Target;
}

const loadingMessages = {
  Coach: ["🛡️ Building a winning day...", "🔥 Turning goals into action...", "⚡ Preparing your productivity plan..."],
  Roast: ["💀 Calculating procrastination damage...", "📉 Checking how bad the situation is...", "☠️ Preparing emergency productivity rescue..."],
  Friendly: ["❤️ Organizing your day gently...", "🌱 Making your tasks feel lighter...", "✨ Creating a calm plan..."],
  Meme: ["😂 Converting chaos into content...", "📚 Summoning academic survival mode...", "☕ Brewing productivity with extra panic..."],
  Monk: ["🧘 Finding clarity...", "🍃 Removing mental clutter...", "🌿 Creating a peaceful plan..."],
};

function Dashboard({ personality }) {
  const [taskInput, setTaskInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[personality][0]);

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "DSA Assignment",
      icon: Code2,
      due: "Tomorrow",
      time: "3 - 4 hrs",
      priority: "HIGH PRIORITY",
      type: "high",
      completed: false,
    },
    {
      id: 2,
      title: "ML Course Module",
      icon: BookOpen,
      due: "Sunday",
      time: "2 - 3 hrs",
      priority: "MEDIUM PRIORITY",
      type: "medium",
      completed: false,
    },
    {
      id: 3,
      title: "Gym",
      icon: Dumbbell,
      due: "Daily",
      time: "1 hr",
      priority: "LOW PRIORITY",
      type: "low",
      completed: false,
    },
  ]);

  async function generatePlan() {
    if (taskInput.trim() === "") return;

    setLoading(true);
    setAiMessage("");

    const selectedMessages = loadingMessages[personality];
    setLoadingMessage(selectedMessages[Math.floor(Math.random() * selectedMessages.length)]);

    try {
      const result = await generateTasks(taskInput, personality);
      const aiTasks = Array.isArray(result) ? result : result.tasks || [];

      setAiMessage(result.message || "");

      const newGoals = aiTasks.map((task) => {
        const priority = String(task.priority || "low").toLowerCase();

        return {
          id: crypto.randomUUID(),
          title: task.title || "Untitled Task",
          icon: chooseIcon(task.title || ""),
          due: task.due || "Flexible",
          time: task.time || "1 hr",
          priority:
            priority === "high"
              ? "HIGH PRIORITY"
              : priority === "medium"
              ? "MEDIUM PRIORITY"
              : "LOW PRIORITY",
          type:
            priority === "high"
              ? "high"
              : priority === "medium"
              ? "medium"
              : "low",
          completed: false,
        };
      });

      setGoals((previousGoals) => [...newGoals, ...previousGoals]);
      setTaskInput("");
    } catch (error) {
      console.error(error);
      alert("Gemini couldn't understand the task.");
    } finally {
      setLoading(false);
    }
  }

  function deleteGoal(id) {
    setGoals((previousGoals) => previousGoals.filter((goal) => goal.id !== id));
  }

  function toggleComplete(id) {
    setGoals((previousGoals) =>
      previousGoals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  }

  const completedCount = goals.filter((goal) => goal.completed).length;
  const progress = goals.length === 0 ? 0 : Math.round((completedCount / goals.length) * 100);

  return (
    <main className="main">
      <Topbar completedCount={completedCount} totalGoals={goals.length} />

      <ProgressCard progress={progress} />

      <StreakCard personality={personality} progress={progress} />

      <AIPlannerCard
        taskInput={taskInput}
        setTaskInput={setTaskInput}
        loading={loading}
        loadingMessage={loadingMessage}
        generatePlan={generatePlan}
        personality={personality}
      />

      <section className="goals-head">
        <h3><Target size={27} /> Today's Goals</h3>
        <button>View All <ChevronRight size={16} /></button>
      </section>

      <section className="goals-grid">
        {goals.map((goal) => (
          <GoalPoster
            key={goal.id}
            goal={goal}
            onDelete={deleteGoal}
            onComplete={toggleComplete}
          />
        ))}
      </section>

      <ReflectionCard
        personality={personality}
        completedCount={completedCount}
        totalGoals={goals.length}
        progress={progress}
      />

      <BehaviorAnalysisCard personality={personality} goals={goals} />

      <WeeklyReportCard personality={personality} progress={progress} />

      <AchievementCard progress={progress} />

      <BottomQuote aiMessage={aiMessage} personality={personality} />
    </main>
  );
}

export default Dashboard;