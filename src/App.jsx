import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AIPlanner from "./pages/AIPlanner";
import Habits from "./pages/Habits";
import Analytics from "./pages/Analytics";
import Achievements from "./pages/Achievements";
import ChallengeMode from "./pages/ChallengeMode";

import { generateTasks } from "./generateTasks";
import { Target, Code2, BookOpen, Dumbbell, FileText } from "lucide-react";

const personalities = {
  Coach: { emoji: "🛡️", quote: "Discipline today, freedom tomorrow." },
  Roast: {
    emoji: "💀",
    quote: "Bro really thought the assignment would complete itself.",
  },
  Friendly: { emoji: "❤️", quote: "One small step at a time." },
  Meme: { emoji: "😂", quote: "Your CGPA is watching." },
  Monk: { emoji: "🧘", quote: "Focus on the present task." },
};

const loadingMessages = {
  Coach: ["🛡️ Building a winning day...", "🔥 Turning goals into action..."],
  Roast: [
    "💀 Calculating procrastination damage...",
    "☠️ Emergency productivity rescue...",
  ],
  Friendly: ["❤️ Organizing your day gently...", "✨ Creating a calm plan..."],
  Meme: ["😂 Converting chaos into content...", "☕ Brewing panic productivity..."],
  Monk: ["🧘 Finding clarity...", "🌿 Creating a peaceful plan..."],
};

function chooseIcon(title) {
  const text = title.toLowerCase();

  if (text.includes("gym") || text.includes("workout")) return Dumbbell;
  if (text.includes("ml") || text.includes("course") || text.includes("study"))
    return BookOpen;
  if (
    text.includes("paper") ||
    text.includes("report") ||
    text.includes("assignment")
  )
    return FileText;
  if (text.includes("code") || text.includes("dsa") || text.includes("leetcode"))
    return Code2;

  return Target;
}

function getDefaultGoals() {
  return [
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
  ];
}

function loadSavedGoals() {
  try {
    const savedGoals = localStorage.getItem("goals");

    if (!savedGoals) {
      return getDefaultGoals();
    }

    return JSON.parse(savedGoals).map((goal) => ({
      ...goal,
      icon: chooseIcon(goal.title || ""),
    }));
  } catch (error) {
    console.error("Failed to load saved goals:", error);
    return getDefaultGoals();
  }
}

function App() {
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem("activePage") || "Dashboard";
  });

  const [personality, setPersonality] = useState(() => {
    return localStorage.getItem("personality") || "Coach";
  });

  const [taskInput, setTaskInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState(() => {
    return localStorage.getItem("aiMessage") || "";
  });

  const [loadingMessage, setLoadingMessage] = useState(() => {
    const savedPersonality = localStorage.getItem("personality") || "Coach";
    return loadingMessages[savedPersonality][0];
  });

  const [goals, setGoals] = useState(loadSavedGoals);

  useEffect(() => {
    localStorage.setItem("personality", personality);
    setLoadingMessage(loadingMessages[personality][0]);
  }, [personality]);

  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  useEffect(() => {
    const goalsWithoutIcons = goals.map(({ icon, ...rest }) => rest);
    localStorage.setItem("goals", JSON.stringify(goalsWithoutIcons));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem("aiMessage", aiMessage);
  }, [aiMessage]);

  const completedCount = goals.filter((goal) => goal.completed).length;
  const progress =
    goals.length === 0 ? 0 : Math.round((completedCount / goals.length) * 100);

  async function generatePlan() {
    if (taskInput.trim() === "") return;

    setLoading(true);
    setAiMessage("");

    const messages = loadingMessages[personality];
    setLoadingMessage(messages[Math.floor(Math.random() * messages.length)]);

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

      setGoals((prev) => [...newGoals, ...prev]);
      setTaskInput("");
    } catch (error) {
      console.error(error);
      alert("Gemini couldn't understand the task.");
    } finally {
      setLoading(false);
    }
  }

  function deleteGoal(id) {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  }

  function toggleComplete(id) {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  }

  const commonProps = {
    personality,
    goals,
    completedCount,
    progress,
    taskInput,
    setTaskInput,
    loading,
    loadingMessage,
    generatePlan,
    aiMessage,
    deleteGoal,
    toggleComplete,
  };

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        personalities={personalities}
        personality={personality}
        setPersonality={setPersonality}
      />

      {activePage === "Dashboard" && <Dashboard {...commonProps} />}
      {activePage === "AI Planner" && <AIPlanner {...commonProps} />}
      {activePage === "Habits" && <Habits {...commonProps} />}
      {activePage === "Analytics" && <Analytics {...commonProps} />}
      {activePage === "Achievements" && <Achievements {...commonProps} />}
      {activePage === "Challenge Mode" && (
        <ChallengeMode personality={personality} />
      )}
      {activePage === "Settings" && <Dashboard {...commonProps} />}
    </div>
  );
}

export default App;