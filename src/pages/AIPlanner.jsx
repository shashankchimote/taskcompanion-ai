import AIPlannerCard from "../components/AIPlannerCard";
import BottomQuote from "../components/BottomQuote";

function AIPlanner({
  taskInput,
  setTaskInput,
  loading,
  loadingMessage,
  generatePlan,
  personality,
  aiMessage,
}) {
  return (
    <main className="main">
      <header className="topbar">
        <div>
          <h2>AI Planner 🧠</h2>
          <p>Turn messy thoughts into prioritized tasks.</p>
        </div>
      </header>

      <AIPlannerCard
        taskInput={taskInput}
        setTaskInput={setTaskInput}
        loading={loading}
        loadingMessage={loadingMessage}
        generatePlan={generatePlan}
        personality={personality}
      />

      <BottomQuote aiMessage={aiMessage} personality={personality} />
    </main>
  );
}

export default AIPlanner;