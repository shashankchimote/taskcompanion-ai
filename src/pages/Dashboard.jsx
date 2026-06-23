import Topbar from "../components/Topbar";
import ProgressCard from "../components/ProgressCard";
import GoalPoster from "../components/GoalPoster";
import BottomQuote from "../components/BottomQuote";
import { Target } from "lucide-react";

function Dashboard({ goals, completedCount, progress, aiMessage, personality, deleteGoal, toggleComplete }) {
  return (
    <main className="main">
      <Topbar completedCount={completedCount} totalGoals={goals.length} />

      <section className="jarvis-card">
        <p className="eyebrow">TaskCompanion AI</p>
        <h2>Good evening, Shashank.</h2>
        <p>
          You completed <b>{completedCount}</b> out of <b>{goals.length}</b> tasks today.
          Your current productivity score is <b>{progress}%</b>.
        </p>
        <p>
          {progress >= 70
            ? "Your streak is protected. Keep the momentum alive."
            : "Your streak is at risk. Start with one small task now."}
        </p>
      </section>

      <ProgressCard progress={progress} />

      <section className="goals-head">
        <h3><Target size={27} /> Today's Goals</h3>
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