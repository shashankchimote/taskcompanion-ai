import { Target } from "lucide-react";

import Topbar from "../components/Topbar";
import ProgressCard from "../components/ProgressCard";
import GoalPoster from "../components/GoalPoster";
import BottomQuote from "../components/BottomQuote";
import JarvisCard from "../components/JarvisCard";

function Dashboard({
  goals,
  completedCount,
  progress,
  aiMessage,
  personality,
  deleteGoal,
  toggleComplete,
}) {
  return (
    <main className="main">
      <Topbar completedCount={completedCount} totalGoals={goals.length} />

      <JarvisCard
        personality={personality}
        goals={goals}
        completedCount={completedCount}
        progress={progress}
      />

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