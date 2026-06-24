import { useState } from "react";
import { Target } from "lucide-react";

import Topbar from "../components/Topbar";
import ProgressCard from "../components/ProgressCard";
import GoalPoster from "../components/GoalPoster";
import BottomQuote from "../components/BottomQuote";
import JarvisCard from "../components/JarvisCard";
import LongGoalMonitor from "../components/LongGoalMonitor";
import DaySummary from "../components/DaySummary";

function Dashboard({
  user,
  goals,
  completedCount,
  progress,
  aiMessage,
  personality,
  deleteGoal,
  toggleComplete,
  longGoals,
  notifications,
  notificationOpen,
  setNotificationOpen,
  markNotificationsRead,
  clearNotifications,
}) {
  const [summaryOpen, setSummaryOpen] = useState(false);

  return (
    <main className="main">
      <Topbar
        user={user}
        completedCount={completedCount}
        totalGoals={goals.length}
        notifications={notifications}
        notificationOpen={notificationOpen}
        setNotificationOpen={setNotificationOpen}
        markNotificationsRead={markNotificationsRead}
        clearNotifications={clearNotifications}
        setSummaryOpen={setSummaryOpen}
      />

      <DaySummary
        summaryOpen={summaryOpen}
        setSummaryOpen={setSummaryOpen}
        completedCount={completedCount}
        totalGoals={goals.length}
        progress={progress}
        longGoals={longGoals}
      />

      <JarvisCard
        personality={personality}
        goals={goals}
        completedCount={completedCount}
        progress={progress}
      />

      <LongGoalMonitor longGoals={longGoals} />

      <ProgressCard progress={progress} />

      <section className="goals-head">
        <h3>
          <Target size={27} /> Today's Goals
        </h3>
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

      <BottomQuote aiMessage={aiMessage} personality={personality} />
    </main>
  );
}

export default Dashboard;