import { Sparkles } from "lucide-react";

function AIPlannerCard({ taskInput, setTaskInput, loading, loadingMessage, generatePlan, personality }) {
  return (
    <section className="ai-card">
      <h3><Sparkles size={22} /> AI Task Capture</h3>
      <p>Describe multiple tasks using commas or “and”.</p>

      <textarea
        placeholder="Example: DSA assignment tomorrow, gym daily, ML course by Sunday..."
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        disabled={loading}
      />

      <div className="ai-actions">
        <div className="chips">
          <span>✣ Smart Parse</span>
          <span>{personality} Mode</span>
          <span>Priority Agent</span>
          <span>AI Message</span>
        </div>

        <button className="generate-btn" onClick={generatePlan} disabled={loading}>
          {loading ? loadingMessage : "Generate Smart Plan ✨"}
        </button>
      </div>
    </section>
  );
}

export default AIPlannerCard;