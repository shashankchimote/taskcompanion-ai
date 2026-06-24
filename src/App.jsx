import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AIPlanner from "./pages/AIPlanner";
import Habits from "./pages/Habits";
import Analytics from "./pages/Analytics";
import Achievements from "./pages/Achievements";
import ChallengeMode from "./pages/ChallengeMode";
import LongTermGoals from "./pages/LongTermGoals";
import FocusMode from "./pages/FocusMode";
import Settings from "./pages/Settings";

import { generateTasks } from "./generateTasks";
import { Target, Code2, BookOpen, Dumbbell, FileText, Repeat } from "lucide-react";

const personalities = {
  Coach: { emoji: "🛡️", quote: "Discipline today, freedom tomorrow." },
  Roast: { emoji: "💀", quote: "Bro really thought the assignment would complete itself." },
  Friendly: { emoji: "❤️", quote: "One small step at a time." },
  Meme: { emoji: "😂", quote: "Your CGPA is watching." },
  Monk: { emoji: "🧘", quote: "Focus on the present task." },
};

const loadingMessages = {
  Coach: ["🛡️ Building a winning day...", "🔥 Turning goals into action..."],
  Roast: ["💀 Calculating procrastination damage...", "☠️ Emergency productivity rescue..."],
  Friendly: ["❤️ Organizing your day gently...", "✨ Creating a calm plan..."],
  Meme: ["😂 Converting chaos into content...", "☕ Brewing panic productivity..."],
  Monk: ["🧘 Finding clarity...", "🌿 Creating a peaceful plan..."],
};

function todayKey() {
  return new Date().toISOString().split("T")[0];
}

function nowTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function chooseIcon(title) {
  const text = title.toLowerCase();
  if (text.includes("gym") || text.includes("workout")) return Dumbbell;
  if (text.includes("ml") || text.includes("course") || text.includes("study")) return BookOpen;
  if (text.includes("paper") || text.includes("report") || text.includes("assignment")) return FileText;
  if (text.includes("code") || text.includes("dsa") || text.includes("leetcode")) return Code2;
  return Target;
}

function getDefaultGoals() {
  return [
    { id: 1, title: "DSA Assignment", icon: Code2, due: "Tomorrow", time: "3 - 4 hrs", priority: "HIGH PRIORITY", type: "high", completed: false },
    { id: 2, title: "ML Course Module", icon: BookOpen, due: "Sunday", time: "2 - 3 hrs", priority: "MEDIUM PRIORITY", type: "medium", completed: false },
    { id: 3, title: "Gym", icon: Dumbbell, due: "Daily", time: "1 hr", priority: "LOW PRIORITY", type: "low", completed: false },
  ];
}

function loadSavedGoals() {
  try {
    const savedGoals = localStorage.getItem("goals");
    if (!savedGoals) return getDefaultGoals();
    return JSON.parse(savedGoals).map((goal) => ({
      ...goal,
      icon: chooseIcon(goal.title || ""),
    }));
  } catch {
    return getDefaultGoals();
  }
}

function loadDailyPlans() {
  try {
    const savedPlans = localStorage.getItem("dailyPlans");
    if (!savedPlans) return [];
    return JSON.parse(savedPlans).map((plan) => ({
      ...plan,
      icon: Repeat,
      recurring: true,
      type: "calm",
      priority: "DAILY PLAN",
    }));
  } catch {
    return [];
  }
}

function loadLongGoals() {
  try {
    return JSON.parse(localStorage.getItem("longGoals")) || [];
  } catch {
    return [];
  }
}

function loadNotifications() {
  try {
    return JSON.parse(localStorage.getItem("notifications")) || [];
  } catch {
    return [];
  }
}

function App() {
  const [activePage, setActivePage] = useState(() => localStorage.getItem("activePage") || "Dashboard");
  const [personality, setPersonality] = useState(() => localStorage.getItem("personality") || "Coach");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  const [taskInput, setTaskInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState(() => localStorage.getItem("aiMessage") || "");
  const [loadingMessage, setLoadingMessage] = useState(() => loadingMessages[personality][0]);
  const [goals, setGoals] = useState(loadSavedGoals);
  const [dailyPlans, setDailyPlans] = useState(loadDailyPlans);
  const [longGoals, setLongGoals] = useState(loadLongGoals);

  const [notifications, setNotifications] = useState(loadNotifications);
  const [notificationOpen, setNotificationOpen] = useState(false);

  function addNotification(title, message) {
    const newNotification = {
      id: crypto.randomUUID(),
      title,
      message,
      time: nowTime(),
      read: false,
    };

    setNotifications((prev) => [newNotification, ...prev].slice(0, 20));
  }

  function markNotificationsRead() {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        read: true,
      }))
    );
  }

  function clearNotifications() {
    setNotifications([]);
  }

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-mode" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    const lastResetDate = localStorage.getItem("lastResetDate");
    const currentDate = todayKey();

    if (lastResetDate !== currentDate) {
      setDailyPlans((prev) =>
        prev.map((plan) => ({
          ...plan,
          completed: false,
        }))
      );

      setGoals((prev) =>
        prev
          .filter((goal) => !goal.completed)
          .map((goal) => ({
            ...goal,
            completed: false,
          }))
      );

      addNotification(
        "Daily reset complete",
        "Daily plans were unchecked and completed tasks were cleaned up."
      );

      localStorage.setItem("lastResetDate", currentDate);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("personality", personality);
    setLoadingMessage(loadingMessages[personality][0]);
  }, [personality]);

  useEffect(() => localStorage.setItem("activePage", activePage), [activePage]);

  useEffect(() => {
    const goalsWithoutIcons = goals.map(({ icon, ...rest }) => rest);
    localStorage.setItem("goals", JSON.stringify(goalsWithoutIcons));
  }, [goals]);

  useEffect(() => {
    const plansWithoutIcons = dailyPlans.map(({ icon, ...rest }) => rest);
    localStorage.setItem("dailyPlans", JSON.stringify(plansWithoutIcons));
  }, [dailyPlans]);

  useEffect(() => localStorage.setItem("longGoals", JSON.stringify(longGoals)), [longGoals]);
  useEffect(() => localStorage.setItem("aiMessage", aiMessage), [aiMessage]);

  const allGoals = [...dailyPlans, ...goals];
  const completedCount = allGoals.filter((goal) => goal.completed).length;
  const progress = allGoals.length === 0 ? 0 : Math.round((completedCount / allGoals.length) * 100);

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
          priority: priority === "high" ? "HIGH PRIORITY" : priority === "medium" ? "MEDIUM PRIORITY" : "LOW PRIORITY",
          type: priority === "high" ? "high" : priority === "medium" ? "medium" : "low",
          completed: false,
        };
      });

      setGoals((prev) => [...newGoals, ...prev]);
      setTaskInput("");

      addNotification(
        "Smart plan generated",
        `${newGoals.length} tasks were added to your dashboard.`
      );
    } catch (error) {
      console.error(error);
      alert("Gemini couldn't understand the task.");
    } finally {
      setLoading(false);
    }
  }

  function addDailyPlan(title, time) {
    if (!title.trim()) return;

    const newPlan = {
      id: crypto.randomUUID(),
      title,
      icon: Repeat,
      due: "Daily",
      time: time || "Anytime",
      priority: "DAILY PLAN",
      type: "calm",
      completed: false,
      recurring: true,
    };

    setDailyPlans((prev) => [newPlan, ...prev]);

    addNotification(
      "Daily plan added",
      `${title} will now appear every day.`
    );
  }

  function deleteDailyPlan(id) {
    setDailyPlans((prev) => prev.filter((plan) => plan.id !== id));
    addNotification("Daily plan removed", "A daily routine was removed.");
  }

  function deleteGoal(id) {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
    setDailyPlans((prev) => prev.filter((plan) => plan.id !== id));
    addNotification("Task deleted", "A task was removed from today's plan.");
  }

  function toggleComplete(id) {
    const target = allGoals.find((goal) => goal.id === id);

    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );

    setDailyPlans((prev) =>
      prev.map((plan) =>
        plan.id === id ? { ...plan, completed: !plan.completed } : plan
      )
    );

    if (target && !target.completed) {
      addNotification(
        "Task completed",
        `${target.title} marked as complete.`
      );
    }
  }

  const commonProps = {
    personality,
    goals: allGoals,
    normalGoals: goals,
    dailyPlans,
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
    addDailyPlan,
    deleteDailyPlan,
    longGoals,
    theme,
    setTheme,
    notifications,
    notificationOpen,
    setNotificationOpen,
    markNotificationsRead,
    clearNotifications,
  };

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        personalities={personalities}
        personality={personality}
        setPersonality={setPersonality}
        theme={theme}
        setTheme={setTheme}
      />

      {activePage === "Dashboard" && <Dashboard {...commonProps} />}
      {activePage === "AI Planner" && <AIPlanner {...commonProps} />}
      {activePage === "Focus Mode" && (
        <FocusMode goals={allGoals} toggleComplete={toggleComplete} />
      )}
      {activePage === "Long Term Goals" && (
        <LongTermGoals longGoals={longGoals} setLongGoals={setLongGoals} />
      )}
      {activePage === "Habits" && <Habits {...commonProps} />}
      {activePage === "Analytics" && <Analytics {...commonProps} />}
      {activePage === "Achievements" && <Achievements {...commonProps} />}
      {activePage === "Challenge Mode" && <ChallengeMode personality={personality} />}
      {activePage === "Settings" && (
        <Settings
         personality={personality}
          setPersonality={setPersonality}
          theme={theme}
          setTheme={setTheme}
         />
      )}
    </div>
  );
}

export default App;