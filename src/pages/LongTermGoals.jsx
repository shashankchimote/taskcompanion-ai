import { useState } from "react";
import { generateChecklist } from "../generateChecklist";
import { Compass, Sparkles, CheckCircle2, Trash2, Archive } from "lucide-react";

function LongTermGoals({ longGoals, setLongGoals }) {
  const [goalInput, setGoalInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function createLongGoal() {
    if (goalInput.trim() === "") return;

    setLoading(true);

    try {
      const result = await generateChecklist(goalInput);

      const newGoal = {
        id: crypto.randomUUID(),
        title: result.title || goalInput,
        duration: result.duration || "Flexible",
        createdAt: Date.now(),
        archived: false,
        items: (result.items || []).map((item) => ({
          id: crypto.randomUUID(),
          topic: item.topic || "Untitled topic",
          source: item.source || "Search online",
          time: item.time || "Flexible",
          completed: false,
        })),
      };

      setLongGoals((prev) => [newGoal, ...prev]);
      setGoalInput("");
    } catch (error) {
      console.error(error);
      alert("Gemini couldn't create checklist.");
    } finally {
      setLoading(false);
    }
  }

  function toggleItem(goalId, itemId) {
    setLongGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              items: goal.items.map((item) =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            }
          : goal
      )
    );
  }

  function deleteGoal(goalId) {
    setLongGoals((prev) => prev.filter((goal) => goal.id !== goalId));
  }

  function archiveGoal(goalId) {
    setLongGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId ? { ...goal, archived: true } : goal
      )
    );
  }

  const activeGoals = longGoals.filter((goal) => !goal.archived);

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <h2>Long Term Goals 🧭</h2>
          <p>Tell AI what you want to learn or build. It creates a checklist.</p>
        </div>
      </header>

      <section className="long-goal-input-card">
        <h3>
          <Sparkles size={22} /> AI Roadmap Generator
        </h3>

        <div className="long-goal-input-row">
          <input
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
            placeholder="Example: I want to learn AI ML"
          />

          <button
            className="generate-btn"
            onClick={createLongGoal}
            disabled={loading}
          >
            {loading ? "Generating checklist..." : "Generate Checklist ✨"}
          </button>
        </div>
      </section>

      <section className="long-goals-list">
        {activeGoals.length === 0 ? (
          <div className="empty-long-goal">
            <Compass size={34} />
            <h3>No long-term goals yet</h3>
            <p>Create your first AI-generated roadmap.</p>
          </div>
        ) : (
          activeGoals.map((goal) => {
            const completed = goal.items.filter((item) => item.completed).length;
            const progress = Math.round((completed / goal.items.length) * 100);

            return (
              <div key={goal.id} className="long-goal-card">
                <div className="long-goal-head">
                  <div>
                    <p className="eyebrow">Long Term Goal</p>
                    <h3>{goal.title}</h3>
                    <span>{goal.duration} · {progress}% complete</span>
                  </div>

                  <div className="long-goal-actions">
                    {progress === 100 && (
                      <button onClick={() => archiveGoal(goal.id)}>
                        <Archive size={17} />
                      </button>
                    )}

                    <button onClick={() => deleteGoal(goal.id)}>
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>

                <div className="minimal-meter">
                  <div style={{ width: `${progress}%` }}></div>
                </div>

                <div className="checklist-items">
                  {goal.items.map((item) => (
                    <div
                      key={item.id}
                      className={`checklist-item ${
                        item.completed ? "checked" : ""
                      }`}
                    >
                      <button onClick={() => toggleItem(goal.id, item.id)}>
                        <CheckCircle2 size={19} />
                      </button>

                      <div>
                        <b>{item.topic}</b>
                        <span>{item.source} · {item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </section>
    </main>
  );
}

export default LongTermGoals;