import { useState } from "react";
import AIPlannerCard from "../components/AIPlannerCard";
import BottomQuote from "../components/BottomQuote";
import { Repeat, Trash2, Plus } from "lucide-react";

function AIPlanner({
  taskInput,
  setTaskInput,
  loading,
  loadingMessage,
  generatePlan,
  personality,
  aiMessage,
  dailyPlans,
  addDailyPlan,
  deleteDailyPlan,
}) {
  const [dailyTitle, setDailyTitle] = useState("");
  const [dailyTime, setDailyTime] = useState("");

  function handleAddDailyPlan() {
    addDailyPlan(dailyTitle, dailyTime);
    setDailyTitle("");
    setDailyTime("");
  }

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <h2>AI Planner 🧠</h2>
          <p>Turn messy thoughts into prioritized tasks and save daily routines.</p>
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

      <section className="daily-plan-card">
        <div className="daily-plan-header">
          <div>
            <p className="eyebrow">Daily Plans</p>
            <h3>
              <Repeat size={22} /> Recurring Routine
            </h3>
          </div>
        </div>

        <div className="daily-plan-form">
          <input
            type="text"
            placeholder="Example: Take doggy for walk"
            value={dailyTitle}
            onChange={(e) => setDailyTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Time: 5 PM"
            value={dailyTime}
            onChange={(e) => setDailyTime(e.target.value)}
          />

          <button className="generate-btn" onClick={handleAddDailyPlan}>
            <Plus size={17} /> Add Daily Plan
          </button>
        </div>

        <div className="daily-plan-list">
          {dailyPlans.length === 0 ? (
            <p className="empty-daily">No daily plans yet. Add one routine you do every day.</p>
          ) : (
            dailyPlans.map((plan) => (
              <div key={plan.id} className="daily-plan-item">
                <div>
                  <b>{plan.title}</b>
                  <span>Daily · {plan.time}</span>
                </div>

                <button onClick={() => deleteDailyPlan(plan.id)}>
                  <Trash2 size={17} />
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <BottomQuote aiMessage={aiMessage} personality={personality} />
    </main>
  );
}

export default AIPlanner;